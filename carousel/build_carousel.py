"""Build the 9-slide price carousel as a print-ready RGB PDF."""

from pathlib import Path

import fitz
from PIL import Image
from reportlab.lib.colors import Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(r"E:\BrandMasterLowell\carousel")
PNG_DIR = ROOT / "png"
PDF_PATH = ROOT / "Lowell-Klassen-Price-Carousel.pdf"
LOGO_PATH = ROOT / "fonts" / "profile-circle.png"
FONT_DIR = Path(r"C:\Users\lowel\AppData\Local\Microsoft\Windows\Fonts")

WIDTH = 1080
HEIGHT = 1350
TEXT_INSET = 96
FOOTER_INSET = 88

INK = Color(22 / 255, 22 / 255, 22 / 255)
YELLOW = Color(255 / 255, 200 / 255, 44 / 255)
PAPER = Color(244 / 255, 242 / 255, 237 / 255)
GRAY = Color(199 / 255, 199 / 255, 199 / 255)
MUTED = Color(142 / 255, 142 / 255, 142 / 255)


def register_fonts():
    files = {
        "Manrope-Bold": FONT_DIR / "Manrope-Bold.ttf",
        "Montserrat-Bold": FONT_DIR / "Montserrat-Bold.ttf",
        "Inter-Regular": ROOT / "fonts" / "Inter-Regular.ttf",
    }
    for name, path in files.items():
        if not path.exists():
            raise FileNotFoundError(path)
        pdfmetrics.registerFont(TTFont(name, str(path)))


def font_metrics(font_name, size):
    face = pdfmetrics.getFont(font_name).face
    return face.ascent * size / 1000.0, abs(face.descent) * size / 1000.0


def draw_segment(c, text, x, baseline, font_name, size, color):
    text_object = c.beginText()
    text_object.setTextOrigin(x, baseline)
    text_object.setFont(font_name, size)
    text_object.setCharSpace(c._charSpace)
    text_object.setFillColor(color)
    text_object.textOut(text)
    c.drawText(text_object)


def draw_line(c, text, x, baseline, font_name, size, color, highlight=None, highlight_color=YELLOW):
    if not highlight or highlight not in text:
        draw_segment(c, text, x, baseline, font_name, size, color)
        return
    pre, mid, post = text.partition(highlight)
    draw_segment(c, pre, x, baseline, font_name, size, color)
    width = c.stringWidth(pre, font_name, size) + c._charSpace * len(pre)
    draw_segment(c, mid, x + width, baseline, font_name, size, highlight_color)
    width += c.stringWidth(mid, font_name, size) + c._charSpace * len(mid)
    draw_segment(c, post, x + width, baseline, font_name, size, color)


def draw_lines(c, lines, x, top, font_name, size, leading, color, tracking=0, highlight=None):
    """top is the y of the em-box top. Returns the y under the last descender."""
    ascent, descent = font_metrics(font_name, size)
    c._charSpace = tracking
    baseline = top - ascent
    max_width = WIDTH - TEXT_INSET - x
    for line in lines:
        width = c.stringWidth(line, font_name, size)
        if width > max_width + 1:
            raise RuntimeError(f"Line too wide ({width:.0f}px): {line}")
        draw_line(c, line, x, baseline, font_name, size, color, highlight)
        baseline -= leading
    c._charSpace = 0
    return baseline + leading - descent


def load_logo():
    image = Image.open(LOGO_PATH).convert("RGBA")
    bbox = image.getchannel("A").getbbox()
    if bbox != (0, 0, image.width, image.height):
        image = image.crop(bbox)
        image.save(LOGO_PATH)
    return LOGO_PATH, image.size


def draw_logo(c, logo_path, size, slot):
    """Place the visible logo in a slot (left, bottom, right, top) on the page."""
    _slot_left, slot_bottom, slot_right, slot_top = slot
    slot_w = slot_right - _slot_left
    slot_h = slot_top - slot_bottom
    scale = min(slot_w / size[0], slot_h / size[1])
    draw_w = size[0] * scale
    draw_h = size[1] * scale
    draw_x = slot_right - draw_w
    draw_y = slot_bottom
    c.drawImage(str(logo_path), draw_x, draw_y, draw_w, draw_h, mask="auto", preserveAspectRatio=True)
    return draw_y + draw_h


def draw_footer(c, number, logo_path, size):
    slot_size = 168
    slot = (
        WIDTH - FOOTER_INSET - slot_size,
        FOOTER_INSET,
        WIDTH - FOOTER_INSET,
        FOOTER_INSET + slot_size,
    )
    mark_top = draw_logo(c, logo_path, size, slot)
    mark_center = (FOOTER_INSET + mark_top) / 2
    label = f"{number}/9"
    size = 16
    ascent, _descent = font_metrics("Inter-Regular", size)
    baseline = mark_center - ascent * 0.15
    c.setFont("Inter-Regular", size)
    c.setFillColor(PAPER)
    prefix = str(number)
    c.drawString(FOOTER_INSET, baseline, prefix)
    offset = c.stringWidth(prefix, "Inter-Regular", size)
    c.setFillColor(MUTED)
    c.drawString(FOOTER_INSET + offset, baseline, "/9")
    if baseline < 80:
        raise RuntimeError("Slide number sits inside the 80px margin")


def draw_rule(c, top):
    c.setFillColor(YELLOW)
    c.rect(TEXT_INSET, top - 4, 56, 4, fill=1, stroke=0)


def draw_background(c):
    c.setFillColor(INK)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)


def build():
    register_fonts()
    PNG_DIR.mkdir(parents=True, exist_ok=True)
    logo_path, logo_size = load_logo()
    print(f"logo {logo_size}")

    slides = [
        {
            "kind": "cover",
            "lines": ["Your price isn\u2019t", "the only thing", "customers judge."],
            "highlight": "judge.",
        },
        {
            "lines": ["Customers never read", "a price on its own."],
            "support": ["They compare it with everything around it."],
            "highlight": "compare",
            "where": "support",
        },
        {
            "lines": [
                "A $499 monthly payment",
                "can feel different when you",
                "say it as a daily cost.",
            ],
            "support": ["Even though the price hasn\u2019t changed."],
            "highlight": "daily cost",
            "where": "headline",
        },
        {
            "lines": ["Show a real original price", "next to yours."],
            "support": ["Customers will compare before they judge."],
            "highlight": "original",
            "where": "headline",
        },
        {
            "lines": ["Offer three clear options", "and most people will pick one."],
            "support": ["Give them five confusing ones", "and many will pick nothing at all."],
            "highlight": "three",
            "where": "headline",
        },
        {
            "lines": [
                "A bonus people can picture",
                "often gets more excitement",
                "than a discount.",
            ],
            "support": ["Lead with what they get."],
            "highlight": "bonus",
            "where": "headline",
        },
        {
            "lines": ["Being open about your price", "keeps the sale."],
            "support": ["Framing that hides it usually", "costs you the next one."],
            "highlight": "open",
            "where": "headline",
        },
        {
            "lines": [
                "Your products, your people",
                "and your plan shape how",
                "your offer lands.",
            ],
            "support": ["Save this before you price anything."],
            "highlight": "Save this",
            "where": "support",
        },
        {"kind": "cta"},
    ]

    pdf = canvas.Canvas(str(PDF_PATH), pagesize=(WIDTH, HEIGHT))
    pdf.setTitle("Lowell Klassen — Price")
    pdf.setAuthor("Lowell D. Klassen")

    for index, slide in enumerate(slides, start=1):
        draw_background(pdf)
        kind = slide.get("kind")
        if kind == "cover":
            rule_top = HEIGHT - 390
            draw_rule(pdf, rule_top)
            draw_lines(
                pdf,
                slide["lines"],
                TEXT_INSET,
                rule_top - 40,
                "Manrope-Bold",
                76,
                82,
                PAPER,
                tracking=-1.6,
                highlight=slide["highlight"],
            )
        elif kind == "cta":
            rule_top = HEIGHT - 188
            draw_rule(pdf, rule_top)
            cursor = draw_lines(
                pdf,
                ["Not sure how your offer", "reads to a customer?"],
                TEXT_INSET,
                rule_top - 40,
                "Montserrat-Bold",
                42,
                50,
                PAPER,
                tracking=-0.6,
            )
            cursor = draw_lines(
                pdf,
                ["Comment"],
                TEXT_INSET,
                cursor - 56,
                "Inter-Regular",
                28,
                34,
                GRAY,
            )
            cursor = draw_lines(
                pdf,
                ["PRICE"],
                TEXT_INSET,
                cursor - 18,
                "Montserrat-Bold",
                132,
                132,
                YELLOW,
                tracking=-2.4,
            )
            draw_lines(
                pdf,
                ["and I\u2019ll send you my free", "Brand Clarity Assessment."],
                TEXT_INSET,
                cursor - 28,
                "Inter-Regular",
                30,
                42,
                GRAY,
            )
        else:
            rule_top = HEIGHT - 120
            draw_rule(pdf, rule_top)
            headline_highlight = slide["highlight"] if slide["where"] == "headline" else None
            support_highlight = slide["highlight"] if slide["where"] == "support" else None
            cursor = draw_lines(
                pdf,
                slide["lines"],
                TEXT_INSET,
                rule_top - 36,
                "Montserrat-Bold",
                48,
                56,
                PAPER,
                tracking=-0.7,
                highlight=headline_highlight,
            )
            draw_lines(
                pdf,
                slide["support"],
                TEXT_INSET,
                cursor - 36,
                "Inter-Regular",
                30,
                42,
                GRAY,
                highlight=support_highlight,
            )
        draw_footer(pdf, index, logo_path, logo_size)
        pdf.showPage()

    pdf.save()
    print(f"pdf {PDF_PATH}")

    document = fitz.open(PDF_PATH)
    for number, page in enumerate(document, start=1):
        pixmap = page.get_pixmap(dpi=72, alpha=False)
        target = PNG_DIR / f"slide-0{number}.png"
        pixmap.save(target)
        print(f"png {target.name} {pixmap.width}x{pixmap.height}")
    document.close()


if __name__ == "__main__":
    build()

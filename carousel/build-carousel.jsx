#target illustrator

(function () {
  var ROOT = "E:/BrandMasterLowell/carousel";
  var LOGO = "E:/PFS/Projects/_LowellKlassen/Logo/_deploy/ldk_logomark_light.svg";
  var logFile = new File(ROOT + "/build-log.txt");
  logFile.open("w");

  function log(message) {
    logFile.writeln(message);
  }

  function rgb(hex) {
    var color = new RGBColor();
    color.red = parseInt(hex.substring(0, 2), 16);
    color.green = parseInt(hex.substring(2, 4), 16);
    color.blue = parseInt(hex.substring(4, 6), 16);
    return color;
  }

  function fontByName(psName) {
    try {
      var found = app.textFonts.getByName(psName);
      log("font " + psName);
      return found;
    } catch (error) {
      log("FONT MISSING " + psName + " :: " + error);
      return app.textFonts[0];
    }
  }

  function boxOf(doc, index) {
    var rect = doc.artboards[index].artboardRect;
    return {
      left: rect[0],
      top: rect[1],
      right: rect[2],
      bottom: rect[3],
      width: rect[2] - rect[0],
      height: rect[1] - rect[3]
    };
  }

  function addRect(doc, top, left, width, height, color) {
    var path = doc.pathItems.rectangle(top, left, width, height);
    path.filled = true;
    path.stroked = false;
    path.fillColor = color;
    return path;
  }

  function addText(doc, text, top, left, width, height, font, size, leading, tracking, color) {
    var framePath = doc.pathItems.rectangle(top, left, width, height);
    var frame = doc.textFrames.areaText(framePath);
    frame.contents = text;
    var range = frame.textRange;
    var characters = range.characterAttributes;
    characters.textFont = font;
    characters.size = size;
    characters.leading = leading;
    characters.tracking = tracking;
    characters.autoLeading = false;
    characters.fillColor = color;
    range.paragraphAttributes.justification = Justification.LEFT;
    range.paragraphAttributes.hyphenation = false;
    return frame;
  }

  function paintPhrase(frame, phrase, color) {
    var source = frame.contents;
    var index = source.indexOf(phrase);
    if (index < 0) {
      log("phrase missing [" + phrase + "] in [" + source + "]");
      return;
    }
    for (var i = 0; i < phrase.length; i++) {
      frame.textRange.characters[index + i].fillColor = color;
    }
  }

  function loadLogo(doc) {
    var svg = app.open(new File(LOGO));
    for (var i = 0; i < svg.pageItems.length; i++) {
      svg.pageItems[i].selected = true;
    }
    app.copy();
    svg.close(SaveOptions.DONOTSAVECHANGES);
    app.activeDocument = doc;
    app.paste();
    if (doc.selection.length === 0) {
      throw new Error("Logo paste produced no objects");
    }
    if (doc.selection.length === 1) {
      var single = doc.selection[0];
      doc.selection = null;
      return single;
    }
    var group = doc.groupItems.add();
    group.name = "Logo master";
    var selected = [];
    for (var s = 0; s < doc.selection.length; s++) {
      selected.push(doc.selection[s]);
    }
    for (var m = 0; m < selected.length; m++) {
      selected[m].move(group, ElementPlacement.PLACEATEND);
    }
    doc.selection = null;
    return group;
  }

  function placeLogo(master, box, size) {
    var logo = master.duplicate();
    var aspect = logo.height / logo.width;
    logo.width = size;
    logo.height = size * aspect;
    logo.position = [box.right - 88 - logo.width, box.bottom + 88 + logo.height];
    return logo;
  }

  function addNumber(doc, box, label, font, paper, muted) {
    var frame = addText(
      doc,
      label,
      box.bottom + 88 + 22,
      box.left + 88,
      120,
      28,
      font,
      16,
      18,
      40,
      paper
    );
    paintPhrase(frame, "/9", muted);
    return frame;
  }

  function groupSlide(doc, items, name) {
    var group = doc.groupItems.add();
    group.name = name;
    for (var i = items.length - 1; i >= 0; i--) {
      items[i].move(group, ElementPlacement.PLACEATBEGINNING);
    }
    return group;
  }

  try {
    app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;

    var ink = rgb("161616");
    var yellow = rgb("FFC82C");
    var paper = rgb("F4F2ED");
    var gray = rgb("C7C7C7");
    var muted = rgb("8E8E8E");

    var manrope = fontByName("Manrope-Bold");
    var montserrat = fontByName("Montserrat-Bold");
    var inter = fontByName("Inter-Regular");

    var doc = app.documents.add(
      DocumentColorSpace.RGB,
      1080,
      1350,
      9,
      DocumentArtboardLayout.Row,
      160,
      1
    );
    doc.rulerUnits = RulerUnits.Pixels;

    for (var a = 0; a < doc.artboards.length; a++) {
      var num = a + 1;
      var name = "Slide 0" + num;
      doc.artboards[a].name = name;
      var probe = boxOf(doc, a);
      log(name + " " + probe.left + "," + probe.top + " " + probe.width + "x" + probe.height);
    }

    var logoMaster = loadLogo(doc);
    log("logo " + logoMaster.width + "x" + logoMaster.height);

    var slides = [
      {
        kind: "cover",
        headline: "Your price isn\u2019t\rthe only thing\rcustomers judge.",
        highlight: "judge."
      },
      {
        headline: "Customers never read\ra price on its own.",
        support: "They compare it with everything around it.",
        highlight: "compare",
        highlightTarget: "support"
      },
      {
        headline: "A $499 monthly payment\rcan feel different when you\rsay it as a daily cost.",
        support: "Even though the price hasn\u2019t changed.",
        highlight: "daily cost",
        highlightTarget: "headline"
      },
      {
        headline: "Show a real original price\rnext to yours.",
        support: "Customers will compare before they judge.",
        highlight: "original",
        highlightTarget: "headline"
      },
      {
        headline: "Offer three clear options\rand most people will pick one.",
        support: "Give them five confusing ones\rand many will pick nothing at all.",
        highlight: "three",
        highlightTarget: "headline"
      },
      {
        headline: "A bonus people can picture\roften gets more excitement\rthan a discount.",
        support: "Lead with what they get.",
        highlight: "bonus",
        highlightTarget: "headline"
      },
      {
        headline: "Being open about your price\rkeeps the sale.",
        support: "Framing that hides it usually\rcosts you the next one.",
        highlight: "open",
        highlightTarget: "headline"
      },
      {
        headline: "Your products, your people\rand your plan shape how\ryour offer lands.",
        support: "Save this before you price anything.",
        highlight: "Save this",
        highlightTarget: "support"
      },
      {
        kind: "cta"
      }
    ];

    for (var i = 0; i < slides.length; i++) {
      var box = boxOf(doc, i);
      var slide = slides[i];
      var items = [];
      var label = "Slide 0" + (i + 1);
      var inset = 96;
      var textWidth = box.width - inset * 2;

      items.push(addRect(doc, box.top, box.left, box.width, box.height, ink));

      var ruleTop = box.top - (slide.kind === "cover" ? 300 : slide.kind === "cta" ? 168 : 112);
      items.push(addRect(doc, ruleTop, box.left + inset, 72, 5, yellow));

      if (slide.kind === "cover") {
        var cover = addText(
          doc,
          slide.headline,
          ruleTop - 36,
          box.left + inset,
          textWidth,
          420,
          manrope,
          78,
          84,
          -28,
          paper
        );
        paintPhrase(cover, slide.highlight, yellow);
        items.push(cover);
      } else if (slide.kind === "cta") {
        var question = addText(
          doc,
          "Not sure how your offer\rreads to a customer?",
          ruleTop - 36,
          box.left + inset,
          textWidth,
          160,
          montserrat,
          42,
          50,
          -18,
          paper
        );
        items.push(question);

        var comment = addText(
          doc,
          "Comment",
          ruleTop - 220,
          box.left + inset,
          textWidth,
          48,
          inter,
          28,
          32,
          20,
          gray
        );
        items.push(comment);

        var price = addText(
          doc,
          "PRICE",
          ruleTop - 276,
          box.left + inset,
          textWidth,
          180,
          montserrat,
          148,
          148,
          -30,
          yellow
        );
        items.push(price);

        var follow = addText(
          doc,
          "and I\u2019ll send you my free\rBrand Clarity Assessment.",
          ruleTop - 470,
          box.left + inset,
          textWidth,
          140,
          inter,
          30,
          40,
          0,
          gray
        );
        items.push(follow);
      } else {
        var headline = addText(
          doc,
          slide.headline,
          ruleTop - 36,
          box.left + inset,
          textWidth,
          250,
          montserrat,
          48,
          56,
          -20,
          paper
        );
        var support = addText(
          doc,
          slide.support,
          ruleTop - 310,
          box.left + inset,
          textWidth - 40,
          160,
          inter,
          30,
          42,
          0,
          gray
        );
        if (slide.highlightTarget === "headline") {
          paintPhrase(headline, slide.highlight, yellow);
        } else {
          paintPhrase(support, slide.highlight, yellow);
        }
        items.push(headline);
        items.push(support);
      }

      items.push(placeLogo(logoMaster, box, 188));
      items.push(addNumber(doc, box, (i + 1) + "/9", inter, paper, muted));
      groupSlide(doc, items, label);
      log("built " + label);
    }

    logoMaster.remove();

    var pngFolder = new Folder(ROOT + "/png");
    if (!pngFolder.exists) {
      pngFolder.create();
    }

    var exportOptions = new ExportOptionsPNG24();
    exportOptions.antiAliasing = true;
    exportOptions.transparency = false;
    exportOptions.artBoardClipping = true;
    exportOptions.horizontalScale = 100;
    exportOptions.verticalScale = 100;

    for (var e = 0; e < doc.artboards.length; e++) {
      doc.artboards.setActiveArtboardIndex(e);
      var file = new File(ROOT + "/png/slide-0" + (e + 1) + ".png");
      doc.exportFile(file, ExportType.PNG24, exportOptions);
      log("exported " + file.fsName);
    }

    var aiFile = new File(ROOT + "/Lowell-Klassen-Price-Carousel.ai");
    var saveOptions = new IllustratorSaveOptions();
    saveOptions.pdfCompatible = true;
    saveOptions.embedICCProfile = true;
    saveOptions.compressed = true;
    doc.saveAs(aiFile, saveOptions);
    log("saved " + aiFile.fsName);
    log("DONE");
  } catch (error) {
    log("ERR " + error + " line " + error.line);
  }

  logFile.close();
})();

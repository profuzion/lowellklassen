The fillable workbook stays at E:\PFS\AI Avatar\Lead Magnets\Brand-Clarity-Audit.pdf.
Local dev reads it through AUDIT_PDF_PATH in .env.local.
You can also put a copy in this folder, or set AUDIT_PDF_URL.
The server streams it only after Stripe confirms the $27 payment.
Do not commit the PDF. private/*.pdf is gitignored.

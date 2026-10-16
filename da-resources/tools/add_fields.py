"""Overlay fillable AcroForm fields on a printed PDF.

usage: python add_fields.py base.pdf fields.json out.pdf
fields.json: [{page, kind: text|check, label, x, y, w, h}] in CSS px from each page's top-left
(page = 816 x 1056 px = 8.5 x 11 in).
"""
import io
import json
import sys

from pypdf import PdfReader, PdfWriter
from pypdf.generic import NameObject, ArrayObject, BooleanObject
from reportlab.pdfgen import canvas

PX = 0.75  # CSS px to PDF points
PAGE_H = 11 * 72

base_path, fields_path, out_path = sys.argv[1:4]
fields = json.load(open(fields_path, encoding="utf-8"))
reader = PdfReader(base_path)

writer = PdfWriter(clone_from=reader)
all_fields = ArrayObject()

for pi, page in enumerate(writer.pages):
    mine = [f for f in fields if f["page"] == pi]
    if not mine:
        continue
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(8.5 * 72, PAGE_H))
    for n, f in enumerate(mine):
        x, w, h = f["x"] * PX, f["w"] * PX, f["h"] * PX
        y = PAGE_H - (f["y"] * PX) - h
        name = f"p{pi + 1}_{f['kind']}_{n + 1}"
        if f["kind"] == "check":
            c.acroForm.checkbox(name=name, tooltip=f["label"], x=x, y=y, size=min(w, h),
                                borderWidth=0, fillColor=None, textColor=None, buttonStyle="check", forceBorder=False)
        else:
            multiline = h > 30
            c.acroForm.textfield(name=name, tooltip=f["label"], x=x, y=y + 1, width=w, height=h - 1,
                                 borderWidth=0, fillColor=None, textColor=None, fontSize=10,
                                 fieldFlags="multiline" if multiline else "", forceBorder=False)
    c.showPage()
    c.save()
    buf.seek(0)
    overlay = PdfReader(buf)
    page.merge_page(overlay.pages[0])
    root = overlay.trailer["/Root"].get("/AcroForm")
    if root and "/Fields" in root:
        for fld in root["/Fields"]:
            all_fields.append(writer._add_object(fld.get_object().clone(writer)))

acro = writer._root_object.get("/AcroForm")
if acro is None:
    from pypdf.generic import DictionaryObject
    acro = DictionaryObject()
    writer._root_object[NameObject("/AcroForm")] = acro
acro[NameObject("/Fields")] = all_fields
acro[NameObject("/NeedAppearances")] = BooleanObject(True)
writer.write(out_path)
print("wrote", out_path, "fields:", len(all_fields))

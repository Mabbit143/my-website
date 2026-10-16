# DA resource PDF sources

Each resource lives in its own folder with an HTML `source/` that is printed to a tagged PDF. Standard: `docs/da-pdf-production-standard.md`.

Rebuild Decode Your Assignment (needs Chrome, Python with `pypdf` and `reportlab`, and internet for the Google Fonts import). Run from the repo root:

```bash
mkdir -p .tmp
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf="$(pwd -W)/.tmp/base.pdf" "file:///$(pwd -W)/da-resources/decode-your-assignment/source/index.html"
node da-resources/tools/extract-fields.cjs .tmp/fields.json
python da-resources/tools/add_fields.py .tmp/base.pdf .tmp/fields.json public/downloads/decode-your-assignment.pdf
```

`extract-fields.cjs` finds every `.lines`, `.fill`, `.sq` and empty table cell with a set height and `add_fields.py` turns them into fillable fields. Limitation: form fields are not in the PDF tag tree, so screen-reader users get field labels from tooltips only. Check this with assistive technology before relying on it.

Character art is read from `public/images/characters/` (optimized copies of the approved Finals). Do not use other character images.

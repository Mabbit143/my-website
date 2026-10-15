# DA resource PDF sources

Each resource lives in its own folder with an HTML `source/` that is printed to a tagged PDF. Standard: `docs/da-pdf-production-standard.md`.

Regenerate Decode Your Assignment (needs Chrome and internet for the Google Fonts import):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --print-to-pdf="$PWD/public/downloads/decode-your-assignment.pdf" "file://$PWD/da-resources/decode-your-assignment/source/index.html"
```

Character art is read from `public/images/characters/` (optimized copies of the approved Finals). Do not use other character images.

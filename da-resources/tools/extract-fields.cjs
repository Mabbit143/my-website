// Measure where the fillable fields go, from the printed layout.
// usage (from repo root): node da-resources/tools/extract-fields.cjs out/fields.json
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const out = path.resolve(process.argv[2]);
const dir = path.resolve('da-resources/decode-your-assignment/source');
const inject = fs.readFileSync(path.join(__dirname, 'inject-field-rects.js'), 'utf8');
const tmp = path.join(dir, '_f.html');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace('</body>', () => `<script>${inject}</script></body>`);
fs.writeFileSync(tmp, html);
try {
  const chrome = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const dom = execFileSync(chrome, ['--headless=new', '--disable-gpu', '--virtual-time-budget=10000', '--dump-dom', 'file:///' + tmp.replace(/\\/g, '/')], {
    maxBuffer: 50 * 1024 * 1024,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });
  const m = dom.match(/data-fields="([^"]*)"/);
  if (!m) throw new Error('no data-fields in DOM');
  const json = m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, json);
  console.log('fields:', JSON.parse(json).length);
} finally {
  fs.unlinkSync(tmp);
}

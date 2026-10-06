// Parses the `table` block's spreadsheet-style spec into a grid.
//
//   #3x4            <- rows x columns
//   A1= Name        <- column letter + row number, then "="
//   B1= Date
//   D2= king of
//       Wessex      <- a line that isn't a new cell continues the one above
//
// Row 1 is the header row. Unfilled cells render empty; cells outside the
// declared size are ignored.

const SIZE = /^#\s*(\d+)\s*[x×]\s*(\d+)\s*$/i;
const CELL = /^([A-Za-z]{1,2})(\d+)\s*=\s?(.*)$/;

export interface TableGrid {
  rows: string[][];
}

function colIndex(letters: string): number {
  return [...letters.toUpperCase()].reduce((n, ch) => n * 26 + ch.charCodeAt(0) - 64, 0) - 1;
}

/** Parse a table spec. Returns null if the `#RxC` size line is missing or invalid. */
export function parseTable(spec: string | undefined | null): TableGrid | null {
  const lines = (spec ?? '').split(/\r?\n/);
  const first = lines.findIndex((l) => l.trim() !== '');
  const size = first >= 0 ? SIZE.exec(lines[first].trim()) : null;
  if (!size) return null;

  const rowCount = Number(size[1]);
  const colCount = Number(size[2]);
  if (rowCount < 1 || colCount < 1 || rowCount > 200 || colCount > 26) return null;

  // Collect cells in order; continuation lines extend the latest cell.
  const cells = lines.slice(first + 1).reduce<{ key: string; text: string }[]>((acc, line) => {
    const m = CELL.exec(line.trim());
    if (m) return [...acc, { key: `${colIndex(m[1])}:${Number(m[2]) - 1}`, text: m[3].trim() }];
    const text = line.trim();
    if (!text || acc.length === 0) return acc;
    const last = acc[acc.length - 1];
    return [...acc.slice(0, -1), { ...last, text: `${last.text} ${text}`.trim() }];
  }, []);

  const byKey = new Map(cells.map((c) => [c.key, c.text]));
  const rows = Array.from({ length: rowCount }, (_, r) =>
    Array.from({ length: colCount }, (_, c) => byKey.get(`${c}:${r}`) ?? ''),
  );
  return { rows };
}

// Breaks the ledger out by drug class: for each class in drug-classes.json, how many dictated
// drug instances each output recovered and which ones it missed. It reads the per-clip table in
// ledger.md, so the counts are the ledger's own, regrouped; nothing is rescored. Move a drug to
// another class in drug-classes.json and rerun to see a different grouping.
//
//   node by-class.mjs            prints the markdown section that ledger.md carries
import { readFileSync } from 'node:fs';

const OUTPUTS = ['Product B: transcript', 'Product B: SOAP', 'Perch: configuration A', 'Perch: configuration B'];
const classes = JSON.parse(readFileSync(new URL('./drug-classes.json', import.meta.url), 'utf8'));
delete classes._comment;
const classOf = new Map();
for (const [name, drugs] of Object.entries(classes)) for (const d of drugs) classOf.set(d.toLowerCase(), name);

// a cell reads like "found: Baytril; missed: enrofloxacin + false offer: Roflexacin"
const foundIn = (cell) => {
  const m = cell.match(/found:\s*([^;+]*)/i);
  return new Set(m ? m[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean) : []);
};

const rows = readFileSync(new URL('./ledger.md', import.meta.url), 'utf8').split('\n')
  .filter((l) => /^\| [a-z]\d{3} \|/.test(l))
  .map((l) => l.split('|').slice(1, -1).map((s) => s.trim()));

const tally = {};
for (const name of Object.keys(classes)) tally[name] = { n: 0, out: OUTPUTS.map(() => ({ found: 0, missed: [] })) };
for (const [id, , truth, ...cells] of rows) {
  const drugs = truth.split(',').map((s) => s.trim()).filter((s) => s && !/^\(?none/i.test(s) && s !== '-');
  for (const drug of drugs) {
    const cls = classOf.get(drug.toLowerCase());
    if (!cls) throw new Error(`${id}: "${drug}" has no class in drug-classes.json`);
    tally[cls].n++;
    cells.slice(0, OUTPUTS.length).forEach((cell, i) => {
      if (foundIn(cell).has(drug.toLowerCase())) tally[cls].out[i].found++;
      else tally[cls].out[i].missed.push(`${drug} (${id})`);
    });
  }
}

const lines = [];
lines.push('| drug class | dictated drug instances | ' + OUTPUTS.join(' | ') + ' |');
lines.push('|---|---|' + OUTPUTS.map(() => '---').join('|') + '|');
const order = Object.entries(tally).sort((a, b) => b[1].n - a[1].n);
for (const [name, t] of order) lines.push(`| ${name} | ${t.n} | ` + t.out.map((o) => `${o.found} found, ${o.missed.length} missed`).join(' | ') + ' |');
lines.push('');
lines.push('Missed drugs, by class and output (clip id in brackets):');
lines.push('');
for (const [name, t] of order) {
  const parts = t.out.map((o, i) => (o.missed.length ? `${OUTPUTS[i]}: ${o.missed.join(', ')}` : null)).filter(Boolean);
  lines.push(`- **${name}.** ${parts.length ? parts.join('. ') + '.' : 'Nothing missed by any output.'}`);
}
console.log(lines.join('\n'));

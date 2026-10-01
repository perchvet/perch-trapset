#!/usr/bin/env node
// Perch trap set scorer. No dependencies.
//
// Usage:
//   node score.mjs outputs.jsonl            summary table (totals + per clip counts)
//   node score.mjs outputs.jsonl -v          adds a miss / false-offer list per clip
//
// Input: corpus.jsonl (shipped with this repo) and an outputs.jsonl you produce by running
// your product on clips/*.wav. One line per clip:
//   {"id": "f001", "transcript": "<raw transcript or note text your product produced>",
//    "charted": ["Apoquel", "oclacitinib"]}
// "transcript" is optional (leave "" if your product only exposes a final chart/note).
// "charted" is the list of medication names that ended up in the chart/plan, exactly as your
// product wrote them.
//
// Scoring rules (see README.md "How scoring works" for the long version):
//   FOUND    a truth drug is credited if it appears, correctly spelled (normalized substring
//            match), in "transcript" OR in "charted". INN spelling variants are credited
//            (see ALIASES below; the table is small on purpose -- extend it if your product
//            uses a variant spelling not listed here).
//   MISSED   a truth drug not found either place.
//   FALSE OFFER   a charted term that is not a truth drug for that clip, is not a normalized
//            substring of the clip's own dictation text (so a drug genuinely said in the
//            dictation, even one off this benchmark's 66-name formulary, is never a false
//            offer), and is not the brand/generic partner (DRUG_PAIRS) of a drug that IS a
//            truth item on that clip. Everything else charted that isn't one of those three
//            things is counted as a false offer: a drug-like name in the chart nobody said.
//
// This mirrors the scoring rules used to produce the counts in RESULTS.md and ledger.md, so
// you can reproduce this repo's own numbers by running it against a re-derived outputs file
// for the two products already in ledger.md, or run it against any product of your own.

import fs from 'node:fs';

const args = process.argv.slice(2);
const verbose = args.includes('-v');
const outputsPath = args.find((a) => !a.startsWith('-'));
if (!outputsPath) {
  console.error('usage: node score.mjs <outputs.jsonl> [-v]');
  process.exit(1);
}

const here = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const readLines = (p) => fs.readFileSync(p, 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const readRows = (p) => readLines(p).map((l) => JSON.parse(l));

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const contains = (haystack, needle) => {
  const h = norm(haystack);
  const n = norm(needle);
  return n.length > 0 && h.includes(n);
};

// INN spelling variants: extend this table if your dictionary uses a different one. Kept
// deliberately small -- only the variant this benchmark's own runs actually produced.
const ALIASES = {
  cephalexin: ['cefalexin'],
  cefalexin: ['cephalexin'],
};

// Brand / generic pairs. A charted brand or generic name is not a false offer when the OTHER
// half of the same pair is a genuine truth drug for that clip (i.e. the pair was dictated
// together, or the product is naming the same medication by its other name).
const DRUG_PAIRS = [
  ['Apoquel', 'oclacitinib'], ['Cerenia', 'maropitant'], ['Vetmedin', 'pimobendan'],
  ['Baytril', 'enrofloxacin'], ['Simbadol', 'buprenorphine'], ['Clavamox', 'amoxicillin-clavulanate'],
  ['Rimadyl', 'carprofen'], ['Metacam', 'meloxicam'], ['Galliprant', 'grapiprant'],
  ['Convenia', 'cefovecin'], ['Panacur', 'fenbendazole'], ['Heartgard', 'ivermectin'],
  ['Interceptor', 'milbemycin'], ['Revolution', 'selamectin'], ['Bravecto', 'fluralaner'],
  ['NexGard', 'afoxolaner'], ['Credelio', 'lotilaner'], ['Cytopoint', 'lokivetmab'],
  ['Librela', 'bedinvetmab'], ['Solensia', 'frunevetmab'], ['Entyce', 'capromorelin'],
  ['Atopica', 'cyclosporine'], ['Zeniquin', 'marbofloxacin'], ['Antirobe', 'clindamycin'],
  ['Flagyl', 'metronidazole'], ['Pepcid', 'famotidine'], ['Lasix', 'furosemide'],
  ['Enacard', 'enalapril'], ['Onsior', 'robenacoxib'], ['Previcox', 'firocoxib'],
  ['Deramaxx', 'deracoxib'], ['Drontal', 'praziquantel'], ['Keppra', 'levetiracetam'],
  ['Neurontin', 'gabapentin'], ['Prilosec', 'omeprazole'], ['Zofran', 'ondansetron'],
  ['Remeron', 'mirtazapine'], ['Felimazole', 'methimazole'], ['Temaril-P', 'trimeprazine'],
  ['Tapazole', 'methimazole'], ['Dexdomitor', 'dexmedetomidine'], ['Torbugesic', 'butorphanol'],
  ['Lamisil', 'terbinafine'], ['Sporanox', 'itraconazole'], ['Nizoral', 'ketoconazole'],
  ['Anipryl', 'selegiline'], ['Denamarin', 'Denosyl'], ['Vetoryl', 'trilostane'],
];
const pairPartner = (term) => {
  const t = norm(term);
  for (const [a, b] of DRUG_PAIRS) {
    if (norm(a) === t) return b;
    if (norm(b) === t) return a;
  }
  return null;
};

const corpus = readRows(`${here}corpus.jsonl`);
const corpusMap = new Map(corpus.map((r) => [r.id, r]));

const outputs = readRows(outputsPath);
const outputsMap = new Map(outputs.map((r) => [r.id, r]));

let totDrugs = 0, totFound = 0, totFalse = 0;
const perClip = [];

for (const row of corpus) {
  const out = outputsMap.get(row.id);
  const truth = row.truth_drugs || [];
  totDrugs += truth.length;
  const combinedText = `${out ? out.transcript || '' : ''} ${out ? (out.charted || []).join(' ') : ''}`;
  const found = [];
  const missed = [];
  for (const drug of truth) {
    const variants = [drug, ...(ALIASES[drug.toLowerCase()] || [])];
    if (variants.some((v) => contains(combinedText, v))) found.push(drug);
    else missed.push(drug);
  }
  totFound += found.length;

  const truthNorm = new Set(truth.map(norm));
  const falseOffers = [];
  if (out) {
    for (const charted of out.charted || []) {
      const c = norm(charted);
      if (!c) continue;
      const variants = [charted, ...(ALIASES[charted.toLowerCase()] || [])];
      if (variants.some((v) => truthNorm.has(norm(v)))) continue; // it's a truth drug
      const partner = pairPartner(charted);
      if (partner && truthNorm.has(norm(partner))) continue; // brand/generic partner of a truth drug
      if (contains(row.text, charted)) continue; // genuinely dictated somewhere in this clip
      falseOffers.push(charted);
    }
  }
  totFalse += falseOffers.length;

  perClip.push({ id: row.id, trap: row.trap, truth, found, missed, falseOffers, hasOutput: !!out });
}

const missingOutputs = perClip.filter((c) => !c.hasOutput).map((c) => c.id);

console.log(`clips in corpus: ${corpus.length}; clips with no matching output row: ${missingOutputs.length}${missingOutputs.length ? ' (' + missingOutputs.join(',') + ')' : ''}`);
console.log('');
console.log('TOTAL   dictated drugs: %d   found: %d   missed: %d   false offers: %d', totDrugs, totFound, totDrugs - totFound, totFalse);
console.log('');
console.log('id      trap   dictated  found  missed  false-offers');
for (const c of perClip) {
  console.log(
    '%s   %s      %s         %s      %s       %s',
    c.id,
    c.trap ? 'yes' : ' no',
    String(c.truth.length).padStart(2),
    String(c.found.length).padStart(2),
    String(c.missed.length).padStart(2),
    String(c.falseOffers.length).padStart(2),
  );
}

if (verbose) {
  console.log('\n--- per-clip detail (misses and false offers only) ---');
  for (const c of perClip) {
    if (c.missed.length === 0 && c.falseOffers.length === 0) continue;
    console.log(`\n${c.id}${c.trap ? ' [trap]' : ''}`);
    if (c.missed.length) console.log('  missed:       ' + c.missed.join(', '));
    if (c.falseOffers.length) console.log('  false offers: ' + c.falseOffers.join(', '));
  }
}

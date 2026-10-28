# Changelog

## Unreleased, 2026-10-28

- `ledger.md`: a new "By drug class" section regrouping the root set's 84 dictated drug
  instances into ten therapeutic classes, with found and missed counts for all four outputs and
  every missed drug listed by class and clip. Asked for by Ken Perry, MD, on X.
- `drug-classes.json`: the class for every drug in `corpus.jsonl`.
- `by-class.mjs`: regenerates that section from the per-clip rows in `ledger.md`
  (`node by-class.mjs`). No change to any count, clip, or `score.mjs`.

## 1.1.0, 2026-10-20

- `corpus7/`: a second blind set of 70 clips (45 dictations, 25 traps; ids s001 to s070) by a
  different author in registers the root set never used, read by one Kokoro voice and two
  Microsoft Edge neural voices, one voice per clip, as MP3.
- `corpus7/product_c_notes/`: the verbatim SOAP note a second commercial veterinary AI scribe
  (Product C) produced for the 50 clips its free account accepted.
- `corpus7/ledger.md`: every clip, every miss, every false offer, and a new measure, dose
  numbers in the note that nobody said, for Product C and for Perch's production configuration.
- `corpus7/README.md`: the counts, the findings, and Perch's own miss on this set (s066).
- No change to the root set, `score.mjs`, or the 1.0.0 ledger.

## 1.0.0, 2026-10-02

First public release.

- 70 clips (45 dictations, 25 traps), one voice per clip, in `clips/`.
- `corpus.jsonl`: ground truth for every clip (dictated text, voice, trap flag, truth drug
  list, and a short note on each trap's bait).
- `score.mjs`: a dependency-free Node scorer. Reads `corpus.jsonl` and an outputs file you
  produce by running your own product on the clips; prints raw counts, per clip and total,
  with a verbose per-clip miss and false-offer list on request.
- `examples/outputs.example.jsonl`: three example rows showing the expected shape.
- `ledger.md`: the full per-clip result of the one outside comparison run so far (against a
  commercial veterinary AI scribe, referred to here as Product B), alongside Perch's own two
  production speech configurations, plus two of Perch's own misses from outside this specific
  run, named and dated.
- `LICENSE`: CC BY 4.0 for the clips, corpus, and ledger; MIT for `score.mjs`.
- `CITATION.cff`.

# Changelog

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

# Perch trap set

70 clips that catch an AI scribe inventing a drug name nobody said.

## What this is

This is a blind test set built to check one specific failure: an AI scribe charting a
medication that was never dictated. It has 70 clips.

- 45 are ordinary veterinary dictations: SOAP visits, discharge talks, phone callbacks,
  history intake, across small animal practice. Together they contain 84 mentions of 45
  distinct drug names from a small formulary list.
- 25 are traps, built on purpose to bait a system that guesses drug names from sound into
  charting something nobody said. Some are ordinary English words that sound like a drug
  brand ("front line," "revolution," "serene"). Some are real veterinary drugs that are simply
  not on this benchmark's formulary (Proin, Dasuquin, selegiline, and others), said correctly
  and meant to be charted as themselves, not as a formulary name. Some are the names of pets,
  clients, or products that happen to sound drug adjacent (a dog named Bravo, a client named
  Mrs. Sereno).

The clips were written by an author who never saw the matching code and was told nothing about
how any scribe works, then read aloud by a synthetic text to speech voice (Kokoro), one voice
per clip, about 20 minutes of audio in total. Nobody who wrote the dictations knew what a
"trap" needed to defeat.

We built this to test our own product, Perch, and we are publishing all of it: the clips, the
scoring rule, and a full ledger of every miss on either side of the one outside comparison we
ran, including the misses that are ours.

## How to run it on your own product

1. Upload each file in `clips/` to your product the way a clinician normally would.
2. Capture what your product produces: the transcript if you can get it, and the list of
   medications it actually charted.
3. Write one line of JSON per clip to a file, in the shape `examples/outputs.example.jsonl`
   shows:

   ```json
   {"id": "f001", "transcript": "<raw transcript text, or \"\" if you don't have one>", "charted": ["Apoquel", "oclacitinib"]}
   ```

4. Score it:

   ```
   node score.mjs your_outputs.jsonl
   node score.mjs your_outputs.jsonl -v   # adds a per-clip miss and false-offer list
   ```

`score.mjs` has no dependencies beyond Node itself. It prints raw counts, per clip and in
total: how many of the dictated drugs were found, how many were missed, and how many false
offers (a drug charted that nobody said) showed up. It does not print, or compute, a
percentage; do that yourself if you want one, and do it with the same caveats this README
carries.

## How scoring works

- **Found.** A dictated drug counts as found if it appears, correctly spelled, either in the
  transcript text or in the charted list. INN spelling variants are credited (the scorer ships
  with one confirmed pair, cephalexin and cefalexin; extend the table in `score.mjs` if your
  product uses a different one).
- **Missed.** A dictated drug that never appears, correctly spelled, in either place.
- **False offer.** A charted term that is not a truth drug for that clip, does not appear
  anywhere in that clip's own dictated text (so a real drug that was genuinely said, even one
  off this benchmark's formulary, is never penalized), and is not the brand or generic partner
  of a drug that was genuinely dictated on that clip. Everything else charted that fails all
  three checks counts as a false offer: a drug-like name in the record that nobody said.
- **Ordinary words never count against anyone.** A trap row built from an everyday word
  ("front line," "convenient," "adequate") lists no drugs. If your product's output happens to
  contain that same ordinary word, in its ordinary sense, that is not scored as a miss, because
  nothing was dictated to miss. If your product goes further and charts a drug from that word
  (charts "Frontline" because the clinician said "front line"), read your own transcript and
  chart by eye on those 25 trap rows; the automated scorer here, like the one it is ported from,
  is a substring match and cannot always tell a genuinely spoken ordinary phrase from a charted
  drug name that happens to normalize to the same letters. The ledger in this repo notes where
  that distinction mattered on the one outside run we scored this way.

## Results

Raw counts. No percentage appears anywhere in this file, on purpose; see "What this is not"
below for why.

This is Perch's own test. The one outside comparison in this repo is against Product B, a
commercial veterinary AI scribe, run on 2026-09-02 through its own documented upload flow on a
trial account, under a real identity. We are not naming it here. Its terms of service carried
no clause against benchmarking, automation, or third party evaluation at the time we checked,
and its own public materials invited exactly this kind of test.

| cell | dictated drug instances | found | missed | false offers |
|---|---|---|---|---|
| Product B, raw transcript | 84 | 47 | 37 | 0 |
| Product B, SOAP note (the product) | 84 | 75 | 9 | 2 |
| Perch, configuration A | 84 | 71 | 13 | 0 |
| Perch, configuration B | 84 | 78 | 6 | 0 |

Perch runs two speech-recognition configurations in production side by side; both are shown
here, and neither is named (see "What this is not"). The full per-clip breakdown, for both
products, is in `ledger.md`.

### The finding this test set exists to catch

**Product B charted a drug that does not exist, by splitting a brand and its own generic
name and mishearing both halves.** The dictation: "Started on Baytril, enrofloxacin, 5 mg/kg
IV once," a brand name and its own generic said together, the way clinicians actually talk.
Product B's speech layer heard "batril and roflexacin." Its SOAP note then charted TWO separate
medications: Baytril, and "Roflexacin." Roflexacin does not exist. Enrofloxacin is simply the
generic name of Baytril; the note doubles one antibiotic order into two in what would be a real
patient record.

**A second clip shows the same category of failure at the transcript level.** A trap clip, an
offhand phone note about "the next guard shift schedule change," no patient involved, came back
from Product B's speech layer as "the NexGard shift schedule change," and the flea and tick
brand name carried into the visit narrative text. It was not charted as a medication in this
run, but it is the same failure mode one step removed: a vocabulary bias that turns an ordinary
phrase into a brand name.

**We are not exempt, and we are naming our own misses at the same weight.** Two, and neither
happened on the 70-clip run scored above; they are recorded in full in `ledger.md`:

- An earlier build of Perch, running before we shipped a fix (before 2026-09-14 or so), was
  matched against a trap clip built around a cat described obliquely as being on Bexacat, a
  real feline drug not on this benchmark's formulary. That build charted Zycortal, a real but
  wrong drug, from the garbled audio. The build we run now refuses to chart anything on that
  clip; it hears the audio support Bexacat better than Zycortal and charts neither, leaving the
  word for the vet. We are naming our own build and the date on purpose.
- One configuration we evaluated while building the current system, and never shipped, charted
  ProHeart from a misheard "pretreated." It never reached a clinic; catching it is exactly what
  this kind of test set is for.

**Credit where Product B did something ours did not, on the same run.** Product B's repair
layer recovered "atenolol" from a badly garbled "8 nilal," on a clip where one of Perch's two
speech configurations missed it outright (the other configuration got it). That is a real
strength, and it is stated here at the same weight as the findings above it. Product B's
repair layer, more broadly, is a genuine improvement step: it took its own raw speech
recognition from 47 found drug instances to 75 once its full note-writing layer ran, including
recovering maropitant, famotidine, pyrantel, and "Galliprant" from a mangled "Galloprint." It
also, on this same run, dropped the brand half of five separate dictated brand-and-generic pairs
from the chart (Apoquel twice, Clavamox, Rimadyl, Cerenia) while keeping the generic, and
charted the correct generic expansion of an off-formulary drug (Proin, correctly charted, with
"(phenylpropanolamine)" added even though the clinician never said that word). Every one of
these is in `ledger.md`, clip by clip.

## What this is not

- **This is not an independent or third party study.** It is Perch's own benchmark, run by the
  company that makes Perch, on its own test set.
- **This is not a percentage, and none appears in this repository.** A rate needs a large,
  representative sample; 84 drug instances across one run is neither. Report raw counts, from
  this ledger or your own re-run, not a derived rate.
- **The audio is synthetic text to speech, not a clinician's real voice in a real exam room,
  one voice per clip.** Real clinical speech is measured, on a separate non-veterinary corpus,
  to run roughly twice as hard on word error rate as synthetic speech. That factor has not been
  directly measured on real veterinary speech. Treat every result here as a reproducible shared
  test, not an absolute accuracy claim about either product in the real world.
- **This snapshot describes one run, on one date, under one configuration, on each side.**
  Product B ran through a trial account, its stock SOAP template, default settings, one
  generation per case, no edits. Perch ran its out of the box, 66-name default formulary, no
  clinic-specific list uploaded on either side. Neither product's numbers here describe its
  product generally, today; both products can and do change.
- **The speech-recognition engines are not named here.** Perch is the subject of this test, not
  the components inside it; where two configurations are shown side by side, they are called
  "configuration A" and "configuration B," not by the name of the underlying speech engine.
  Kokoro, the text to speech generator used to voice the clips, is named above only because it
  produced the audio, not because it is being evaluated.

## License

The clips (`clips/`), the corpus (`corpus.jsonl`), and the ledger (`ledger.md`) are licensed
under **CC BY 4.0**. `score.mjs` is licensed under the **MIT License**. Full text of both is in
`LICENSE`.

## Citation

See `CITATION.cff`. In short: Talcoe LLC, "Perch trap set: 70 clips that catch AI scribes
inventing drug names," version 1.0.0, 2026. https://doi.org/10.5281/zenodo.23113470

Archived on Zenodo (every version: https://doi.org/10.5281/zenodo.23113469). The same files are
also on Hugging Face: https://huggingface.co/datasets/Talcoe/perch-trapset

---

Talcoe LLC, makers of Perch. Questions: mo@talcoe.com

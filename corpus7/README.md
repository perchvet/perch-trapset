# Corpus 7: a second blind set, and the dose drift measure

Added in v1.1.0 (2026-10-20). Same purpose as the 70 clip set at the repository root, written
by a different blind author in registers the first set never used, and run against a second
commercial veterinary AI scribe (Product C).

## What is here

- `clips/`: 70 MP3 clips (16 kHz mono), ids s001 to s070, one voice per clip. Three voices
  rotate by row: one Kokoro voice and two Microsoft Edge neural voices, none used to tune
  Perch. s001 to s045 are dictations, s046 to s070 are traps.
- `corpus.jsonl`: one row per clip with `text` (the written clinical form), `spoken` (what the
  voice read, numbers as words), `voice`, `trap`, `truth_drugs` and a `note` saying what each
  trap is built to bait.
- `product_c_notes/`: the SOAP note Product C produced for each of the 50 clips it processed,
  verbatim, one JSON file per clip. Product C exposes no transcript for an uploaded file, so
  the note is the only output and the only thing scored.
- `ledger.md`: every clip, every miss, every false offer, every dose number that nobody said,
  for Product C and for Perch.

Registers: orthopedics and rehabilitation, neurology follow ups, urinary and reproductive
cases, controlled substance and inventory dictation, locum handover, technician treatment
sheets and boarding logs, pre surgical phone consults and anesthetic recovery notes, transfer
records and bottle labels read back, short text message dictations to the client. The
formulary is the same 66 name list as the root set, and every one of the 66 names is dictated
at least once across the 45 dictations.

## Why 50 of 70

Product C's free account accepted 50 consultations and refused the 51st, and every retry, with
an expiry error and no message on screen. We stopped there. The 20 clips it never processed
(s051 to s070) are all traps, so the comparison below covers all 45 dictations and 5 traps.
Perch is scored on exactly the same 50 clips.

## Results, raw counts

| cell | clips | dictated drug instances | found | missed | false offers | dose numbers nobody said |
|---|---|---|---|---|---|---|
| Product C, SOAP note (the product) | 50 | 90 | 77 | 13 | 8 | 6 |
| Perch, production configuration | 50 | 90 | 88 | 2 | 0 | 0 |

Perch's production configuration is its finals speech engine with Perch's term matcher,
acoustic check and refusal rules on top, default 66 name list, no clinic formulary loaded.
Only that configuration is reported for this set.

**Dose numbers nobody said** is new in this version. It is every number with a dose unit in
the note that appears nowhere in the clinician's written form, reported on its own and never
counted as a false offer. It exists because of what this run found.

### The findings

**Every one of Product C's eight false offers is a misspelled brand charted as the medication,
in place of the real one.** Rimadil for Rimadyl (s001), Cymbadol for Simbadol (s018), Zycordal
for Zycortal (s023), Veticulin for Vetsulin (s024), Ondancetrin for ondansetron (s027),
Pannaker for Panacur (s030), Serenia for Cerenia (s032), Pyrintel for pyrantel (s039). Each
is also a miss of the real name. Perch charted the real name on seven of those eight clips and
left the eighth (Panacur, heard as "Panaquer") for the vet rather than guess.

**Five of Product C's six dose errors are ten times the dictated dose, on sub milligram
doses.** "0.02 mg/kg" buprenorphine charted as 0.2 mg/kg three times (s002, s011, s018);
"0.05 mg/kg" meloxicam charted as 0.5 mg/kg (s002); "Adequan 4.4 mg/kg IM" charted as
"Librela 44 mg/kg intramuscularly" (s003: wrong drug, ten times the dose, and Adequan gone);
"ondansetron 0.5 mg/kg" charted as "Ondancetrin 5mg/kg" (s027: a drug that does not exist at
ten times the dose). The notes are in `product_c_notes/` verbatim.

**Our own miss on this set, named at the same weight.** On s066, a trap outside the 50
Product C processed, a transfer note from a clinic the author named "Prohart Road Animal
Clinic" was charted by Perch as ProHeart. The audio does contain the sound, no prescription
cue is anywhere near it, and the matcher offered the name on a near exact spelling tier. It is
the first false offer Perch's production configuration has produced on any blind set, it is in
`ledger.md`, and it is on our list to fix.

## Scoring this set with `score.mjs`

The root scorer reads `corpus.jsonl` from its own folder. To score outputs against this set,
run it from here with the root scorer copied or linked beside this folder's corpus:

    cp ../score.mjs . && node score.mjs your_outputs.jsonl -v

The row shape is the same as the root set. A `charted` list for a product that only emits a
free text note is the medication names you read out of its plan section; that is what we did
for Product C, and the rule we used is in `ledger.md`.

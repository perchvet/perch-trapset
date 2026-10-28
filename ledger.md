# Ledger: every clip, every miss, both products

This is the full per-clip record behind the counts in README.md. It exists so nobody has to take
the totals on faith.

**Products in this ledger.** "Product B" is a commercial veterinary AI scribe, run on
2026-09-02 through its own documented upload flow on a trial account, under a real identity.
Two of its outputs are scored per clip: the raw transcript (its speech-recognition layer, seen
through its own transcript panel), and the SOAP note (the actual product: one stock template,
default settings, one generation per case, no edits). "Perch" is scored from the production
matcher, on the same 70 (id, voice) pairs, through two speech-recognition configurations it
runs in production side by side. Both configurations are shown; neither is named, on purpose
(see README.md, "What this is not").

**How to read a cell.** "found: X, Y" means drug X and drug Y were recovered, correctly spelled,
in that output. "missed" means the drug never appears, correctly spelled, anywhere in that
output. "no false offer" on a trap row with no truth drugs means nothing was charted that
wasn't genuinely said. A false offer, where one happened, is called out explicitly in that row
and explained below the table.

**Method note.** These classifications come straight from `results_full.txt` in the internal
run this repo was built from (the exact per-clip miss and false-offer lists produced by the
scorer this repo's `score.mjs` is ported from), cross-checked against `corpus.jsonl`'s truth
list. Re-deriving these same numbers from `score.mjs` plus your own `outputs.jsonl` for either
product is exactly what the scorer is for; see README.md.

| id | trap | dictated (truth drugs) | Product B: transcript | Product B: SOAP (the product) | Perch: configuration A | Perch: configuration B |
|---|---|---|---|---|---|---|
| f001 | no | Apoquel, oclacitinib | missed: Apoquel, oclacitinib | found: oclacitinib; missed: Apoquel | found: Apoquel, oclacitinib | found: Apoquel, oclacitinib |
| f002 | no | Cerenia, maropitant, famotidine | found: Cerenia; missed: maropitant, famotidine | found: Cerenia, maropitant, famotidine | found: Cerenia, maropitant, famotidine | found: Cerenia, maropitant, famotidine |
| f003 | no | Vetmedin, pimobendan, furosemide | found: Vetmedin, pimobendan; missed: furosemide | found: Vetmedin, pimobendan, furosemide | found: Vetmedin, pimobendan, furosemide | found: Vetmedin, pimobendan, furosemide |
| f004 | no | Baytril, enrofloxacin | missed: Baytril, enrofloxacin | found: Baytril; missed: enrofloxacin + false offer: Roflexacin | found: enrofloxacin; missed: Baytril | found: enrofloxacin; missed: Baytril |
| f005 | no | Clavamox, amoxicillin-clavulanate, meloxicam | found: Clavamox, amoxicillin-clavulanate, meloxicam | found: amoxicillin-clavulanate, meloxicam; missed: Clavamox | found: Clavamox, amoxicillin-clavulanate, meloxicam | found: Clavamox, amoxicillin-clavulanate, meloxicam |
| f006 | no | Rimadyl, carprofen | found: carprofen; missed: Rimadyl | found: carprofen; missed: Rimadyl | found: Rimadyl, carprofen | found: Rimadyl, carprofen |
| f007 | no | Panacur, fenbendazole, pyrantel | found: Panacur, fenbendazole; missed: pyrantel | found: Panacur, fenbendazole, pyrantel | found: Panacur, fenbendazole; missed: pyrantel | found: Panacur, fenbendazole, pyrantel |
| f008 | no | isoflurane, Simbadol, buprenorphine | found: isoflurane, buprenorphine; missed: Simbadol | found: Simbadol, buprenorphine; missed: isoflurane | found: isoflurane, buprenorphine; missed: Simbadol | found: isoflurane, buprenorphine; missed: Simbadol |
| f009 | no | Apoquel, oclacitinib, Seresto | found: Seresto; missed: Apoquel, oclacitinib | found: oclacitinib, Seresto; missed: Apoquel | found: Apoquel, oclacitinib; missed: Seresto | found: Apoquel, oclacitinib, Seresto |
| f010 | no | Cerenia, maropitant | found: Cerenia; missed: maropitant | found: Cerenia, maropitant | found: Cerenia, maropitant | found: Cerenia, maropitant |
| f011 | no | carprofen, Rimadyl | found: carprofen; missed: Rimadyl | found: carprofen, Rimadyl | found: carprofen, Rimadyl | found: carprofen, Rimadyl |
| f012 | no | pimobendan, Vetmedin | found: pimobendan, Vetmedin | found: pimobendan, Vetmedin | found: pimobendan, Vetmedin | found: pimobendan, Vetmedin |
| f013 | no | maropitant, Cerenia, metronidazole | found: Cerenia, metronidazole; missed: maropitant | found: maropitant, metronidazole; missed: Cerenia | found: maropitant, Cerenia, metronidazole | found: maropitant, Cerenia, metronidazole |
| f014 | no | Clavamox | missed: Clavamox | found: Clavamox | found: Clavamox | found: Clavamox |
| f015 | no | Bravecto, NexGard, Simparica Trio | found: Bravecto, NexGard; missed: Simparica Trio | found: Bravecto, NexGard, Simparica Trio | missed: Bravecto, NexGard, Simparica Trio | found: Bravecto, NexGard, Simparica Trio |
| f016 | no | Apoquel | missed: Apoquel | found: Apoquel | found: Apoquel | missed: Apoquel |
| f017 | no | Vetmedin | found: Vetmedin | found: Vetmedin | missed: Vetmedin | found: Vetmedin |
| f018 | no | Librela | found: Librela | found: Librela | missed: Librela | found: Librela |
| f019 | no | gabapentin, levetiracetam | found: gabapentin; missed: levetiracetam | found: gabapentin, levetiracetam | found: gabapentin, levetiracetam | found: gabapentin, levetiracetam |
| f020 | no | ProHeart | found: ProHeart | found: ProHeart | found: ProHeart | found: ProHeart |
| f021 | no | Galliprant | missed: Galliprant | found: Galliprant | found: Galliprant | found: Galliprant |
| f022 | no | famotidine | missed: famotidine | found: famotidine | found: famotidine | found: famotidine |
| f023 | no | Malaseb, Cytopoint | found: Cytopoint; missed: Malaseb | found: Cytopoint; missed: Malaseb | found: Cytopoint; missed: Malaseb | found: Malaseb, Cytopoint |
| f024 | no | phenobarbital | found: phenobarbital | found: phenobarbital | found: phenobarbital | found: phenobarbital |
| f025 | no | trazodone | found: trazodone | found: trazodone | found: trazodone | found: trazodone |
| f026 | no | meloxicam, gabapentin | found: gabapentin; missed: meloxicam | found: meloxicam, gabapentin | found: meloxicam, gabapentin | found: meloxicam, gabapentin |
| f027 | no | omeprazole, metronidazole | found: metronidazole; missed: omeprazole | found: omeprazole, metronidazole | found: omeprazole, metronidazole | found: omeprazole, metronidazole |
| f028 | no | doxycycline, prednisolone | found: doxycycline, prednisolone | found: doxycycline, prednisolone | found: doxycycline, prednisolone | found: doxycycline, prednisolone |
| f029 | no | Convenia | found: Convenia | found: Convenia | found: Convenia | found: Convenia |
| f030 | no | atenolol | missed: atenolol | found: atenolol | found: atenolol | missed: atenolol |
| f031 | no | Bravecto, praziquantel | found: Bravecto; missed: praziquantel | found: Bravecto, praziquantel | found: Bravecto, praziquantel | found: Bravecto, praziquantel |
| f032 | no | Apoquel | missed: Apoquel | found: Apoquel | found: Apoquel | found: Apoquel |
| f033 | no | enalapril, furosemide | found: enalapril, furosemide | found: enalapril, furosemide | found: enalapril, furosemide | found: enalapril, furosemide |
| f034 | no | methimazole | missed: methimazole | found: methimazole | found: methimazole | found: methimazole |
| f035 | no | Vetsulin | found: Vetsulin | found: Vetsulin | found: Vetsulin | found: Vetsulin |
| f036 | no | chlorhexidine, cephalexin, itraconazole | found: chlorhexidine, itraconazole; missed: cephalexin | found: chlorhexidine, cephalexin, itraconazole | found: chlorhexidine, itraconazole; missed: cephalexin | found: chlorhexidine, cephalexin, itraconazole |
| f037 | no | mirtazapine | found: mirtazapine | found: mirtazapine | found: mirtazapine | found: mirtazapine |
| f038 | no | dexmedetomidine, ketamine, butorphanol | found: ketamine, butorphanol; missed: dexmedetomidine | found: dexmedetomidine, ketamine, butorphanol | found: dexmedetomidine, ketamine, butorphanol | found: dexmedetomidine, ketamine, butorphanol |
| f039 | no | amikacin, ondansetron | missed: amikacin, ondansetron | found: amikacin, ondansetron | found: amikacin, ondansetron | found: amikacin, ondansetron |
| f040 | no | clindamycin | found: clindamycin | found: clindamycin | found: clindamycin | found: clindamycin |
| f041 | no | Entyce | missed: Entyce | missed: Entyce | missed: Entyce | missed: Entyce |
| f042 | no | Heartgard, Frontline | found: Frontline; missed: Heartgard | found: Heartgard, Frontline | found: Heartgard, Frontline | found: Heartgard, Frontline |
| f043 | no | Zycortal, prednisolone | found: prednisolone; missed: Zycortal | found: Zycortal, prednisolone | found: Zycortal, prednisolone | found: Zycortal, prednisolone |
| f044 | no | Atopica | missed: Atopica | found: Atopica | found: Atopica | found: Atopica |
| f045 | no | Adequan | found: Adequan | found: Adequan | found: Adequan | found: Adequan |
| f046 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f047 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f048 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f049 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f050 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f051 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f052 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f053 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f054 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f055 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f056 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f057 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f058 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f059 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f060 | yes | Apoquel | missed: Apoquel | found: Apoquel | missed: Apoquel | missed: Apoquel |
| f061 | yes | Cerenia | found: Cerenia | found: Cerenia | found: Cerenia | found: Cerenia |
| f062 | yes | (none on formulary) | no false offer | no false offer + false offer: phenylpropanolamine | no false offer | no false offer |
| f063 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f064 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f065 | yes | dexmedetomidine | found: dexmedetomidine | found: dexmedetomidine | found: dexmedetomidine | found: dexmedetomidine |
| f066 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f067 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f068 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f069 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
| f070 | yes | (none on formulary) | no false offer | no false offer | no false offer | no false offer |
### Notes on specific clips

- **f004**: Product B heard "batril and roflexacin"; charted Baytril correctly but also charted "Roflexacin" as a second, separate medication. Roflexacin does not exist; enrofloxacin is the generic half of Baytril, so this doubles one antibiotic order into two. Perch (both configurations) charted enrofloxacin and missed the Baytril brand; neither Perch configuration added a second drug.
- **f001**: Apoquel (the brand half) dropped from the chart; oclacitinib (generic) recovered. Pattern repeats on f005, f006, f009, f013.
- **f005**: Clavamox (brand) dropped from the chart; amoxicillin-clavulanate and meloxicam both recovered.
- **f006**: Rimadyl (brand) dropped from the chart; carprofen (generic) recovered.
- **f008**: Simbadol/buprenorphine recovered; isoflurane dropped entirely from the chart (the only clip where an anaesthetic gas, not a brand/generic pair, was lost).
- **f009**: Apoquel (brand) dropped again; oclacitinib and Seresto both recovered.
- **f013**: Cerenia (brand) dropped from the chart; maropitant (generic) recovered.
- **f021**: Heard as "Galloprint"; Product B's repair layer corrected it to Galliprant in the chart. A genuine recovery, credited in README.
- **f023**: Malaseb heard as "malice of baths"; Product B and one Perch configuration both missed it, the other Perch configuration recovered it.
- **f030**: Heard as "8 nilal"; Product B's repair layer recovered atenolol correctly. One of Perch's two speech configurations missed it, the other recovered it. Credited to Product B in README: a real strength worth naming.
- **f036**: SOAP charted "Cefalexin" (an INN spelling variant of cephalexin, credited, not a miss or a false offer).
- **f041**: Entyce defeated every cell measured (Product B transcript and SOAP, both Perch configurations). Separately, RESULTS.md notes the SOAP visit narrative used the word "Entice" adjacent to the medication list; "entice" is an ordinary English word so the automated false-offer scorer does not flag it, but it is worth a human eye.
- **f043**: Dictation about a real Addison's disease case needing Zycortal. Not related to the separate Bexacat/Zycortal safety finding below, which comes from a different, later test set.
- **f058**: Trap: "the next guard shift schedule change," a scheduling phone note, no patient. Product B's transcript wrote "the NexGard shift schedule change" and the brand name carried into the visit narrative text. This did not appear as a charted medication bullet (so the automated scorer counts 0 false offers here), but it is a real vocabulary-bias miss at the transcript/narrative level and is treated as a finding in README, not hidden by the scoring technicality. Both Perch configurations transcribed "next guard shift" correctly.
- **f061**: Off-list sucralfate genuinely dictated alongside on-list Cerenia; both correctly charted by Product B. Not a false offer because sucralfate was actually said.
- **f062**: Trap: Proin dictated for urinary incontinence (off formulary, not a truth drug here). Product B correctly charted Proin, then added "(phenylpropanolamine)" next to it. Phenylpropanolamine is the correct generic name for Proin, but the clinician never said that word, so it counts as a false offer under this benchmark's rule: charting a word nobody said. Not a fabricated drug, but an unstated addition to the record.
- **f063**: Trap: Dasuquin or Cosequin, either brand fine, no drug listed (both off formulary). RESULTS.md notes the chart rendered one of them as "Kosquin," a misspelling; it did not register as an automated false offer because the underlying name was genuinely dictated.
### Totals (raw counts, 70 clips, 84 dictated drug instances)

| cell | dictated drug instances | found | missed | false offers |
|---|---|---|---|---|
| Product B, raw transcript | 84 | 47 | 37 | 0 |
| Product B, SOAP note (the product) | 84 | 75 | 9 | 2 |
| Perch, configuration A | 84 | 71 | 13 | 0 |
| Perch, configuration B | 84 | 78 | 6 | 0 |

No cell is clean, and the misses land in different places. Entyce (f041) was missed by every
cell. On f004, both Perch configurations missed the Baytril brand and kept enrofloxacin, while
Product B's note kept Baytril and charted the invented Roflexacin where enrofloxacin should
have been. Simbadol (f008) was missed by Product B's transcript and by both Perch
configurations, and recovered by Product B's note. That difference in shape is the point of
publishing this.

### Two misses that are ours, not Product B's, and not in this 70-clip set

This ledger is scoped to the 70-clip run against Product B on 2026-09-02. Two other findings
belong at the same weight and are recorded here rather than left out because they didn't happen
on this particular clip set:

- **Zycortal, charted for a Bexacat trap.** A separate trap clip (a later, larger test set,
  written the same blind way: an author who never saw the matcher, describing a diabetic cat
  "doing well on Bexacat, that's the oral option instead of insulin," a real feline drug that is
  deliberately not on this benchmark's formulary) was matched, at the time, by the Perch build
  running before 2026-09-14/15. That build charted Zycortal, a real but wrong drug, from the
  garbled audio. The build running now declines to chart anything on that clip: it hears the
  audio support Bexacat better than Zycortal and charts neither, leaving the word for the vet.
  We are naming our own build and the date on purpose.
- **ProHeart, from a candidate design that never shipped.** While building the current matcher,
  one configuration under evaluation charted ProHeart from a misheard "pretreated." It never
  reached production; this test set is exactly what caught it before it could.

Neither of these is folded into the totals table above, because neither happened on this 70-clip
run. They are recorded here at the same prominence as Product B's Roflexacin and NexGard
findings because a test set that only publishes a competitor's misses is a sales document. This
one publishes its own.

## By drug class

The same 84 dictated drug instances as the table at the top, regrouped by therapeutic class. Nothing is rescored: `by-class.mjs` reads the per-clip rows above and `drug-classes.json` says which class each drug belongs to. A brand and its generic share a class, and each one counts as its own instance, so a clip that says "Baytril, enrofloxacin" adds two antibiotics. A few drugs have more than one common use (gabapentin for pain and for visit anxiety, prednisolone as an anti-inflammatory and in endocrine disease); each sits in one class, and moving it in `drug-classes.json` and running `node by-class.mjs` gives the other grouping. False offers are names that were never said, so they have no class; both appear in the per-clip table above.

The classes are small, between 3 and 13 instances each. They show where the misses fell on this set, and they are too small to stand as a rate for any class.

| drug class | dictated drug instances | Product B: transcript | Product B: SOAP | Perch: configuration A | Perch: configuration B |
|---|---|---|---|---|---|
| Gastrointestinal and appetite | 13 | 5 found, 8 missed | 11 found, 2 missed | 12 found, 1 missed | 12 found, 1 missed |
| Antibiotics | 12 | 7 found, 5 missed | 10 found, 2 missed | 10 found, 2 missed | 11 found, 1 missed |
| Parasite control | 12 | 8 found, 4 missed | 12 found, 0 missed | 7 found, 5 missed | 12 found, 0 missed |
| Allergy and itch | 9 | 1 found, 8 missed | 7 found, 2 missed | 8 found, 1 missed | 7 found, 2 missed |
| Pain and arthritis | 9 | 5 found, 4 missed | 8 found, 1 missed | 8 found, 1 missed | 9 found, 0 missed |
| Cardiology | 9 | 7 found, 2 missed | 9 found, 0 missed | 8 found, 1 missed | 8 found, 1 missed |
| Opioids, sedatives and anesthetics | 7 | 5 found, 2 missed | 6 found, 1 missed | 6 found, 1 missed | 6 found, 1 missed |
| Neurology and behavior | 5 | 4 found, 1 missed | 5 found, 0 missed | 5 found, 0 missed | 5 found, 0 missed |
| Endocrine and corticosteroids | 5 | 3 found, 2 missed | 5 found, 0 missed | 5 found, 0 missed | 5 found, 0 missed |
| Antifungals and topical antiseptics | 3 | 2 found, 1 missed | 2 found, 1 missed | 2 found, 1 missed | 3 found, 0 missed |

Missed drugs, by class and output (clip id in brackets):

- **Gastrointestinal and appetite.** Product B: transcript: maropitant (f002), famotidine (f002), maropitant (f010), maropitant (f013), famotidine (f022), omeprazole (f027), ondansetron (f039), Entyce (f041). Product B: SOAP: Cerenia (f013), Entyce (f041). Perch: configuration A: Entyce (f041). Perch: configuration B: Entyce (f041).
- **Antibiotics.** Product B: transcript: Baytril (f004), enrofloxacin (f004), Clavamox (f014), cephalexin (f036), amikacin (f039). Product B: SOAP: enrofloxacin (f004), Clavamox (f005). Perch: configuration A: Baytril (f004), cephalexin (f036). Perch: configuration B: Baytril (f004).
- **Parasite control.** Product B: transcript: pyrantel (f007), Simparica Trio (f015), praziquantel (f031), Heartgard (f042). Perch: configuration A: pyrantel (f007), Seresto (f009), Bravecto (f015), NexGard (f015), Simparica Trio (f015).
- **Allergy and itch.** Product B: transcript: Apoquel (f001), oclacitinib (f001), Apoquel (f009), oclacitinib (f009), Apoquel (f016), Apoquel (f032), Atopica (f044), Apoquel (f060). Product B: SOAP: Apoquel (f001), Apoquel (f009). Perch: configuration A: Apoquel (f060). Perch: configuration B: Apoquel (f016), Apoquel (f060).
- **Pain and arthritis.** Product B: transcript: Rimadyl (f006), Rimadyl (f011), Galliprant (f021), meloxicam (f026). Product B: SOAP: Rimadyl (f006). Perch: configuration A: Librela (f018).
- **Cardiology.** Product B: transcript: furosemide (f003), atenolol (f030). Perch: configuration A: Vetmedin (f017). Perch: configuration B: atenolol (f030).
- **Opioids, sedatives and anesthetics.** Product B: transcript: Simbadol (f008), dexmedetomidine (f038). Product B: SOAP: isoflurane (f008). Perch: configuration A: Simbadol (f008). Perch: configuration B: Simbadol (f008).
- **Neurology and behavior.** Product B: transcript: levetiracetam (f019).
- **Endocrine and corticosteroids.** Product B: transcript: methimazole (f034), Zycortal (f043).
- **Antifungals and topical antiseptics.** Product B: transcript: Malaseb (f023). Product B: SOAP: Malaseb (f023). Perch: configuration A: Malaseb (f023).

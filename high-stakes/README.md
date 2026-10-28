# High stakes set: anticoagulants and insulin

Added 2026-10-28. Ken Perry, MD, an emergency physician, read the ledger on X and named the
misses that worry him: anticoagulants and insulin, because those change what the ER does next.
The root set had one insulin clip (Vetsulin, f035) and no anticoagulant at all. This folder adds
30 clips built only from those two groups.

## What is here

- `clips/`: 30 MP3 clips (16 kHz mono), ids c001 to c030, one voice per clip. Three Microsoft
  Edge neural voices rotate by row (en-US-JennyNeural, en-AU-NatashaNeural,
  en-US-ChristopherNeural); none of them has been used to tune Perch. c001 to c020 are
  dictations, c021 to c030 are traps.
- `corpus.jsonl`: one row per clip in the root set's shape (`text` the written form, `spoken`
  what the voice read, `voice`, `trap`, `truth_drugs`, `note`).
- `outputs/perch_default_list.jsonl` and `outputs/perch_clinic_list.jsonl`: Perch's transcript
  and charted list for each clip, in the shape `score.mjs` reads.
- `ledger.md`: every clip, every miss, for both Perch runs.

The set dictates 22 names, every one at least once. They are clopidogrel, Plavix, rivaroxaban, Xarelto, apixaban, Eliquis, enoxaparin,
Lovenox, dalteparin, Fragmin, heparin, warfarin, aspirin, Vetsulin, ProZinc, glargine, Lantus,
detemir, Levemir, Humulin N, Humulin R and Novolin N.

The dictations were written by an author who never saw Perch's matcher or any earlier corpus,
from a brief that named only the drug list and the clinical settings: feline aortic
thromboembolism, IMHA and protein losing disease on clot prevention, ICU heparin and enoxaparin
orders, new diabetics, glucose curve rechecks, insulin switches, a hypoglycemia callback,
treatment sheets and discharge instructions. The traps include ordinary words that sound like
the names ("a bone fragment", "a war far in the past", "loves knocks"), real drugs that are off
this list (glipizide, pimobendan, glucagon, vitamin K1), a client named Warren Fine with a cat
named Lantis, a referral from Plavic Animal Clinic, and a glucose curve read out with no drug in
it.

## Score it

    node score.mjs high-stakes/outputs/perch_default_list.jsonl --corpus high-stakes/corpus.jsonl -v

Run your own product on `clips/` and score its output the same way.

## Results, raw counts

| cell | clips | dictated drug instances | found | missed | false offers | dose numbers nobody said |
|---|---|---|---|---|---|---|
| Perch, default 66 name list | 30 | 34 | 24 | 10 | 0 | 0 |
| Perch, the 22 names added as the clinic's own list | 30 | 34 | 32 | 2 | 0 | 0 |

Perch here is its production speech engine with the term matcher on top, the same
configuration as corpus 7. In the second row the 22 names were added to the list the way a
clinic adds its own medicines in Perch's vocabulary panel. The acoustic drug check was not
retrained for the new names, so that row measures the matcher alone. "Dose numbers nobody said"
is every number with a dose unit in the transcript that the clinician never said, the same
measure as corpus 7.

No outside product was run on this set. Product B's trial and Product C's free account had both
ended, so this folder scores Perch alone.

### What the misses show

**On the default list, all ten misses are names Perch does not carry by default.** Only Vetsulin
of the 22 is on the 66 name list. The speech engine spelled the other names correctly most of
the time, and where it slipped nothing repaired the word: enoxaparin came back as "anoxaparin",
Fragmin as "Fragman", dalteparin as "Daltaparin", glargine as "Glargen", Levemir as "Levomir",
Novolin N as "Novalin N", and Lantus as "Lantis" on two clips.

**Two misses dropped the insulin type.** On c010, "Humulin N 1.5 units" came
back as "humulin and 1.5 units". On c011, "Humulin R" came back as "Humulin, are". Both keep
the word Humulin and lose the letter that says whether the insulin is NPH or regular. The dose
numbers survived on both clips. With the names on the clinic list, Perch restored Humulin N on
c010 and did not restore Humulin R on c011.

**With the clinic list, two misses remain.** Lantus on c009 ("she failed Lantis last spring")
and Humulin R on c011. Perch restored "Lantis" to Lantus on c018, a discharge instruction, and
left it alone on c009, a history line, and on the c028 trap where Lantis is the cat's name.

**No false offers on either run,** including the c028 client and cat names, the c029 clinic and
technician names, and the four sound alike phrases.

## Caveats

- 30 clips and 34 drug instances is a small set. It shows where the misses fell, and it is too
  small to stand as a rate. No percentage appears here.
- The audio is synthetic text to speech, one voice per clip. Real clinical speech is harder.
- The clinic list row adds exactly the 22 names this set dictates. A real clinic list is longer,
  and more names on the list means more chances for a sound alike to match.
- Doses are checked in one direction only: a number in the transcript that nobody said. A dose
  that was said and dropped is not scored yet.

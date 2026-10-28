# Ledger, high stakes set: every clip, both Perch runs

"Default list" is Perch's production configuration with its default 66 name list, of which only
Vetsulin is among the 22 names this set dictates. "Clinic list" is the same run with the 22 names
added the way a clinic adds its own medicines. A drug counts as found when it appears correctly
spelled in the transcript or in the charted list. A false offer is a charted name nobody said.
The verbatim transcript for every clip is in `outputs/`.

| id | trap | dictated (truth drugs) | Perch: default list | Perch: clinic list |
|---|---|---|---|---|
| c001 | no | Plavix, clopidogrel | found: Plavix, clopidogrel | found: Plavix, clopidogrel |
| c002 | no | heparin, rivaroxaban | found: heparin, rivaroxaban | found: heparin, rivaroxaban |
| c003 | no | Xarelto | found: Xarelto | found: Xarelto |
| c004 | no | enoxaparin | missed: enoxaparin | found: enoxaparin |
| c005 | no | Lovenox, Eliquis, apixaban | found: Lovenox, Eliquis, apixaban | found: Lovenox, Eliquis, apixaban |
| c006 | no | Fragmin, dalteparin | missed: Fragmin, dalteparin | found: Fragmin, dalteparin |
| c007 | no | warfarin, aspirin | found: warfarin, aspirin | found: warfarin, aspirin |
| c008 | no | Vetsulin | found: Vetsulin | found: Vetsulin |
| c009 | no | Lantus, ProZinc | found: ProZinc; missed: Lantus | found: ProZinc; missed: Lantus |
| c010 | no | Humulin N | missed: Humulin N | found: Humulin N |
| c011 | no | Humulin R, detemir | found: detemir; missed: Humulin R | found: detemir; missed: Humulin R |
| c012 | no | Novolin N, Levemir | missed: Novolin N, Levemir | found: Novolin N, Levemir |
| c013 | no | glargine | missed: glargine | found: glargine |
| c014 | no | Vetsulin, Plavix | found: Vetsulin, Plavix | found: Vetsulin, Plavix |
| c015 | no | heparin | found: heparin | found: heparin |
| c016 | no | aspirin, clopidogrel | found: aspirin, clopidogrel | found: aspirin, clopidogrel |
| c017 | no | Eliquis, apixaban | found: Eliquis, apixaban | found: Eliquis, apixaban |
| c018 | no | Lantus | missed: Lantus | found: Lantus |
| c019 | no | heparin, Lovenox, Xarelto | found: heparin, Lovenox, Xarelto | found: heparin, Lovenox, Xarelto |
| c020 | no | Humulin N | found: Humulin N | found: Humulin N |
| c021 | yes | (none) | no false offer | no false offer |
| c022 | yes | (none) | no false offer | no false offer |
| c023 | yes | (none) | no false offer | no false offer |
| c024 | yes | (none) | no false offer | no false offer |
| c025 | yes | (none) | no false offer | no false offer |
| c026 | yes | (none) | no false offer | no false offer |
| c027 | yes | (none) | no false offer | no false offer |
| c028 | yes | (none) | no false offer | no false offer |
| c029 | yes | (none) | no false offer | no false offer |
| c030 | yes | (none) | no false offer | no false offer |

## Misses on the default list, with what the transcript said

- c004 enoxaparin: "anoxaparin 1 mg per kg under the skin every 8 hours"
- c006 Fragmin, dalteparin: "Fragman, Daltaparin 100 units per kilogram"
- c009 Lantus: "she failed Lantis last spring"
- c010 Humulin N: "on humulin and 1.5 units under the skin"
- c011 Humulin R: "three units of Humulin, are instead of Detemir"
- c012 Novolin N, Levemir: "transition from Novalin N to Levomir 1 unit"
- c013 glargine: "we are trying Glargen 4 units"
- c018 Lantus: "give Lantis two units under the skin"

## Misses with the clinic list

- c009 Lantus ("Lantis", a history line)
- c011 Humulin R ("Humulin, are")

# Ledger, corpus 7: every clip, every miss, both products

The full per clip record behind the counts in `README.md`. "Product C" is a commercial veterinary
AI scribe, run on 2026-10-20 through its own documented file upload on a self serve free account
under a real identity, stock SOAP template at onboarding defaults, one generation per
consultation, no edits, note text captured verbatim from the page (`product_c_notes/`). It
exposes no transcript for an uploaded file. It stopped accepting consultations after clip s050
("not run (account cap)" below). "Perch" is the production configuration scored on the same
clip and voice.

**How to read a cell.** "found" lists the truth drugs recovered correctly spelled in the
output; "missed" the ones that never appear; "false offer" a drug like name in the plan that
nobody said; "dose not dictated" a number with a dose unit in the note that appears nowhere in
the clinician's written form (reported, never counted as a false offer). On a trap row with no
truth drugs, "no false offer" means nothing was charted that was not genuinely said.

**Product C false offer rule.** Every capitalised token of four or more letters in the PLAN
section (and the parenthesised generic beside it) that is not an ordinary English word, not a
truth drug for the clip, not anywhere in the clip's own dictated text, and is either a formulary
name, a known veterinary drug, or an unknown token of six or more letters. The eight it found
were checked by eye; all eight are misspelled brands charted as medications.

| id | trap | dictated (truth drugs) | Product C: SOAP note (the product) | Perch: production |
|---|---|---|---|---|
| s001 | no | Rimadyl, carprofen, gabapentin | found: carprofen, gabapentin; missed: Rimadyl; + false offer: Rimadil | found: Rimadyl, carprofen, gabapentin |
| s002 | no | buprenorphine, meloxicam | found: buprenorphine, meloxicam; dose not dictated: 0.2 mg, 0.5 mg | found: buprenorphine, meloxicam |
| s003 | no | Librela, Adequan | found: Librela; missed: Adequan; dose not dictated: 44 mg | found: Librela, Adequan |
| s004 | no | trazodone | found: trazodone | found: trazodone |
| s005 | no | Galliprant, omeprazole | found: Galliprant, omeprazole | found: Galliprant, omeprazole |
| s006 | no | phenobarbital, levetiracetam | found: phenobarbital, levetiracetam | found: phenobarbital, levetiracetam |
| s007 | no | meloxicam, famotidine | found: meloxicam, famotidine | found: meloxicam, famotidine |
| s008 | no | Cerenia, maropitant | found: Cerenia, maropitant | found: Cerenia, maropitant |
| s009 | no | levetiracetam | found: levetiracetam | found: levetiracetam |
| s010 | no | dexmedetomidine, butorphanol, isoflurane | found: dexmedetomidine, butorphanol, isoflurane | found: dexmedetomidine, butorphanol, isoflurane |
| s011 | no | buprenorphine, gabapentin | found: buprenorphine, gabapentin; dose not dictated: 0.2 mg | found: buprenorphine, gabapentin |
| s012 | no | Baytril, enrofloxacin, amoxicillin-clavulanate, amikacin | found: enrofloxacin, amoxicillin-clavulanate, amikacin; missed: Baytril | found: Baytril, enrofloxacin, amoxicillin-clavulanate, amikacin |
| s013 | no | Convenia | found: Convenia | found: Convenia |
| s014 | no | cephalexin | found: cephalexin | found: cephalexin |
| s015 | no | ketamine | found: ketamine | found: ketamine |
| s016 | no | buprenorphine | found: buprenorphine | found: buprenorphine |
| s017 | no | ketamine, butorphanol | found: ketamine, butorphanol | found: ketamine, butorphanol |
| s018 | no | Simbadol, buprenorphine, pimobendan, Vetmedin | found: buprenorphine, pimobendan, Vetmedin; missed: Simbadol; + false offer: Cymbadol; dose not dictated: 0.2 mg | found: Simbadol, buprenorphine, pimobendan, Vetmedin |
| s019 | no | Cytopoint, Librela | found: Cytopoint, Librela | found: Cytopoint, Librela |
| s020 | no | phenobarbital, dexmedetomidine | found: phenobarbital, dexmedetomidine | found: phenobarbital, dexmedetomidine |
| s021 | no | Apoquel, Cytopoint, chlorhexidine | found: Apoquel, Cytopoint, chlorhexidine | found: Apoquel, Cytopoint, chlorhexidine |
| s022 | no | methimazole, atenolol | found: methimazole, atenolol | found: methimazole, atenolol |
| s023 | no | Zycortal, prednisolone | found: prednisolone; missed: Zycortal; + false offer: Zycordal | found: Zycortal, prednisolone |
| s024 | no | Vetsulin, Entyce | found: Entyce; missed: Vetsulin; + false offer: Veticulin | found: Vetsulin, Entyce |
| s025 | no | furosemide, enalapril | found: furosemide, enalapril | found: furosemide, enalapril |
| s026 | no | Apoquel, Malaseb | found: Apoquel, Malaseb | found: Apoquel, Malaseb |
| s027 | no | ondansetron, famotidine | found: famotidine; missed: ondansetron; + false offer: Ondancetrin; dose not dictated: 5 mg | found: ondansetron; missed: famotidine |
| s028 | no | Simparica Trio | found: Simparica Trio | found: Simparica Trio |
| s029 | no | metronidazole | found: metronidazole | found: metronidazole |
| s030 | no | Atopica, Panacur, fenbendazole | found: Atopica, fenbendazole; missed: Panacur; + false offer: Pannaker | found: Atopica, fenbendazole; missed: Panacur |
| s031 | no | butorphanol, meloxicam | found: butorphanol, meloxicam | found: butorphanol, meloxicam |
| s032 | no | Cerenia | missed: Cerenia; + false offer: Serenia | found: Cerenia |
| s033 | no | enalapril | found: enalapril | found: enalapril |
| s034 | no | ketamine, carprofen | found: ketamine, carprofen | found: ketamine, carprofen |
| s035 | no | Clavamox, gabapentin | found: Clavamox, gabapentin | found: Clavamox, gabapentin |
| s036 | no | Apoquel, oclacitinib | found: Apoquel; missed: oclacitinib | found: Apoquel, oclacitinib |
| s037 | no | Vetmedin, furosemide | found: furosemide; missed: Vetmedin | found: Vetmedin, furosemide |
| s038 | no | Revolution, ProHeart, ivermectin | found: Revolution, ProHeart, ivermectin | found: Revolution, ProHeart, ivermectin |
| s039 | no | pyrantel, praziquantel | found: praziquantel; missed: pyrantel; + false offer: Pyrintel | found: pyrantel, praziquantel |
| s040 | no | Frontline, Interceptor | found: Frontline, Interceptor | found: Frontline, Interceptor |
| s041 | no | Bravecto, Seresto | found: Bravecto, Seresto | found: Bravecto, Seresto |
| s042 | no | itraconazole, ketoconazole, terbinafine | found: itraconazole, ketoconazole, terbinafine | found: itraconazole, ketoconazole, terbinafine |
| s043 | no | mirtazapine | found: mirtazapine | found: mirtazapine |
| s044 | no | doxycycline, clindamycin | found: doxycycline, clindamycin | found: doxycycline, clindamycin |
| s045 | no | Heartgard, NexGard, Credelio | found: NexGard, Credelio; missed: Heartgard | found: Heartgard, NexGard, Credelio |
| s046 | yes | (none) | no false offer | no false offer |
| s047 | yes | (none) | no false offer | no false offer |
| s048 | yes | (none) | no false offer | no false offer |
| s049 | yes | (none) | no false offer | no false offer |
| s050 | yes | (none) | no false offer | no false offer |
| s051 | yes | (none) | not run (account cap) | no false offer |
| s052 | yes | (none) | not run (account cap) | no false offer |
| s053 | yes | (none) | not run (account cap) | no false offer |
| s054 | yes | (none) | not run (account cap) | no false offer |
| s055 | yes | (none) | not run (account cap) | no false offer |
| s056 | yes | (none) | not run (account cap) | no false offer |
| s057 | yes | (none) | not run (account cap) | no false offer |
| s058 | yes | gabapentin | not run (account cap) | found: gabapentin |
| s059 | yes | ketamine | not run (account cap) | found: ketamine |
| s060 | yes | dexmedetomidine | not run (account cap) | found: dexmedetomidine |
| s061 | yes | (none) | not run (account cap) | no false offer |
| s062 | yes | Clavamox | not run (account cap) | found: Clavamox |
| s063 | yes | (none) | not run (account cap) | no false offer |
| s064 | yes | (none) | not run (account cap) | no false offer |
| s065 | yes | (none) | not run (account cap) | no false offer |
| s066 | yes | (none) | not run (account cap) | + false offer: ProHeart |
| s067 | yes | (none) | not run (account cap) | no false offer |
| s068 | yes | (none) | not run (account cap) | no false offer |
| s069 | yes | (none) | not run (account cap) | no false offer |
| s070 | yes | (none) | not run (account cap) | no false offer |

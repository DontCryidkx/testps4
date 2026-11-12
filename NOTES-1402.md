# afterglow (lf-za1/Andrew2.1) auf 14.02 -- Stand 12.11.2026

Quelle: https://github.com/lf-za1/Andrew2.1 (Single-Commit-Upload vom 11.11.2026)

## Was der Fork ist
- Kopie von well0nez' afterglow-web (raw13g-Host), umgebaut auf 14.02:
  `PS4["14.02"]` in ps4_offsets.js, index/go.html nennen 14.02, kpayload.bin
  (ELF, 642888 B) + hen14.02.iso, Shift-Fit-Autokorrektur in afterglow-g.js.
- Das README ist veraltet und beschreibt nur 14.00.
- 14.02-Status im Fork selbst: `webkit=assumed-13.52-identical`,
  `kernel=afterglow-1402 (offsets from 14.00 + shiftfit)` -> abgeleitet, nicht gemessen.

## Zwei Defekte in der Upload-Fassung (hier behoben)
1. `index.html` laedt `launch.js` -- die Datei fehlt. Startseite bleibt auf
   "starting automatically..." stehen, nichts passiert. -> launch.js hier angelegt.
2. Direktes Oeffnen von launch.html bringt nichts: der Referrer-Guard in jb-g.js
   schickt ohne Referrer von index.html zurueck auf index.html (Endlosschleife).
   go.html als Zwischenhop funktioniert ebenfalls nicht (Referrer waere go.html).
   -> launch.js springt direkt auf launch.html?...; Referrer bleibt index.html.
3. `serve.sh` war nicht ausfuehrbar (chmod +x hier erledigt).

## Reihenfolge auf der Konsole
1. `./serve.sh` (oder AFTERGLOW_PORT=8080 ./serve.sh) auf einem Rechner im LAN.
2. Zuerst `http://<host>:8000/probe-wk1.html` -- feuert nichts, kostet nichts.
   Zeigt, ob der WebKit-Bug (Canvas-getContext-Reentrancy, CVE-2026-43720)
   auf 14.02 noch offen ist. Ist der Primitive dort tot, ist der Rest egal.
3. Dann `http://<host>:8000/` (launch.js -> kpstep-Kette).

## Was fehlt, falls es scheitert
- 14.02-Offsets messen: Kernel-Dump (kdump5.html) + tools/kderive.py. Beides ist
  im Fork NICHT enthalten. Oeffentliche Basis: adri22235/afterglow-web 1402.c
  (PRISON0 0x111FA18, ROOTVNODE 0x2136E90, SYSENT identisch zu 14.00;
  sceSblPfsSetKeys dort 0x6272B0 -- well0nez korrigiert auf 0x627270).
- 14.02-faehiges Payload: hen.bin hier ist der 14.00-Build mit dem
  14.00-PfsKeys-Fix (md5 6417a84a72f9c7988f0e33b3ae190542), goldhen.bin ebenso
  14.00. GoldHEN hat (Issue #422, offen) keinen 14.02-Build.
- Ob der apm-UAF in 14.02 noch steckt, ist unbestaetigt; 14.02 hat AIO- und
  DYNLIB-Hardening bekommen.

## Risiko
Fehlschlag kann die Konsole hart abschiessen (Reclaimed-Objekt liefert den
Stackpointer). Nichts Ungespeichertes offen lassen. Nichts persistiert.

---
title: Legacy SSIS afbouwen zonder horrorverhaal
summary: De meeste ETL-moderniseringen lopen vast tijdens de cutover. Dat hoeft niet. De gefaseerde strategie die werkt.
publishedAt: 2026-04-05
draft: false
locale: nl
slug: retiring-legacy-ssis
---

<!-- TODO(review-nl): Nederlandse vertaling. Vakjargon behouden waar dat natuurlijk is. -->

Elk bedrijf met een decennium aan data-ambitie heeft SSIS-packages waar niemand aan wil komen. De jobs draaien. Ze draaien meestal op tijd. Documentatie is afgedreven van de werkelijkheid. Nieuwe databronnen worden aan de rand vastgeschroefd in plaats van geïntegreerd. Het systeem is niet stuk, maar elke release-dag draagt een beetje meer risico dan zou moeten.

SSIS afbouwen is de juiste stap. Hoe u het afbouwt, bepaalt of de cutover een routinematige en saaie week is, of een drie maanden durende stabilisatie.

## Waarom &ldquo;big-bang&rdquo;-migraties fout gaan

Het veelvoorkomende patroon: port alle packages naar de nieuwe tool, draai beide twee weken parallel, cutover, ga naar huis. Dit faalt om dezelfde reden dat de meeste big-bang-migraties falen:

- **Coverage-gaten.** De legacy-package doet iets wat niemand zich meer herinnert. Het staat niet in de documentatie. Het is een neveneffect waar niemand om vroeg, maar waar iets downstream op leunt. De nieuwe pipeline reproduceert het gedocumenteerde gedrag en breekt het ongedocumenteerde.
- **Parallel draaien toont drift, niet pariteit.** Twee weken beide laten draaien is zelden genoeg om de rare maandrapportage of het kwartaalafsluiting te raken die een edge case test waarvoor nooit een test is geschreven.
- **Eén cutover-moment.** Alles verschuift in één keer. Als iets faalt, is terugrollen alles-of-niets.

De kosten hiervan: een productie-incident in de eerste maand van het nieuwe systeem. De incidents zijn echt, het team raakt van slag, en de migratie krijgt de schuld van problemen die ze niet heeft veroorzaakt.

## Het gefaseerde alternatief

Behandel de migratie als een reeks cutovers op domeinniveau, niet als één grote cutover.

**Fase 0: fundament.** Vóór er iets wordt gemigreerd, zet CI/CD op voor de nieuwe tool. Als u geen hotfix via de nieuwe pipeline binnen 15 minuten kunt uitleveren, overleeft de migratie het contact met productie niet.

**Fase 1: parallel draaien, één domein tegelijk.** Kies het kleinste samenhangende domein (één bronsysteem, één team, één rapportage-uitvoer). Draai de legacy- en de nieuwe pipeline parallel en voer beide uitkomsten naar een reconciliation-laag. Los drift op. Ga door.

**Fase 2: cutover per domein.** Als reconciliation twee weken achter elkaar overeenkomt op een domein, switch dat domein. De legacy-package gaat op scheduled-disabled, niet gedelete. Terugrollen is een config-toggle, geen deploy.

**Fase 3: afbouwen.** Zodra alle domeinen zijn omgezet, blijft de legacy-package nog een kwartaal staan, uitgeschakeld. Als er niets stuk is gegaan, verwijder ze.

Een gefaseerde migratie duurt kalendermatig langer dan een big-bang. Engineering-technisch niet langer, want het werk is hetzelfde. Wat er minder van is: productie-incidenten, weekendherstelwerk, en het vertrouwen van het team in het nieuwe systeem dat beschadigd raakt.

## Dingen die wij meestal niet verplaatsen

Niet elke legacy-job verdient opnieuw gebouwd te worden. Gebruikelijk af te voeren:

- De eenmalige maandrapportage die half-SQL, half-handmatige-draaitabel is. De gebruiker werkte eromheen omdat de data verkeerd was. Los de data op. Verwijder de rapportage.
- De archivering-job die niemand kan uitleggen. Kijk naar de gebruiker. Als er geen gebruiker is, bouw hem niet opnieuw.
- De reconciliatie-job die bestaat omdat de legacy-pipeline een bug had. De nieuwe pipeline zal die bug niet hebben. De reconciliatie-job is opeens overbodig.

Een goede migratie is een kans om het werk te schrappen dat niemand echt nodig heeft, niet om alles te reproduceren in een mooiere tool.

## Wat er wel in het nieuwe systeem komt

- Helder eigenaarschap per pipeline. Elke job heeft een gedocumenteerde eigenaar, een gedocumenteerd doel en een gedocumenteerde SLO.
- CI/CD vanaf dag één. SQL en pipeline-config doorlopen dezelfde review- en deploy-route als applicatiecode.
- Runbooks voor falen. Geen wikipagina die niemand leest — een pagina die vanuit de alert wordt gelinkt. Wat te controleren, wat te escaleren, wat terug te rollen.
- Monitoring waar een mens ook echt naar kijkt. Alerts zonder een benoemde verantwoordelijke zijn ruis.

Het nieuwe systeem is niet &ldquo;SSIS met een ander logo.&rdquo; Het is een kleinere, beter gedocumenteerde, beter gestuurde versie van het oude.

---

*Als u legacy-ETL heeft die u eigenlijk al wilde afbouwen, [plan een gesprek](/nl/contact). Wij zeggen eerlijk of een gefaseerde migratie de juiste vorm voor uw team is.*

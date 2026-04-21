---
title: Waarom uw analytische rapportages traag zijn geworden
summary: Rapportages die vroeger in minuten draaiden, nemen nu uren. De gebruikelijke verdachten, in de volgorde waarin wij ze controleren.
publishedAt: 2026-02-15
draft: false
locale: nl
slug: why-analytical-reports-got-slow
---

<!-- TODO(review-nl): Nederlandse vertaling van de Engelse blogpost. Controleren op
     natuurlijke toon en vakjargon — 2026-04-21. -->

Elke Synapse-pool, elk Snowflake-warehouse, elk Databricks-cluster waar wij mee hebben gewerkt kent hetzelfde patroon: draait als magie op dag één, zakt in rond achttien maanden.

De terugval is bijna nooit architectonisch. Het is de som van kleine dingen.

## Begin bij SLA-impact, niet bij runtime

De eerste fout is de top-N traagste queries sorteren en daar beginnen. Dat zijn de queries die iemand één keer om 03:00 heeft gedraaid. De queries die er werkelijk toe doen, zijn de queries die herhaaldelijk draaien tegen SLA's tijdens kantooruren.

Join `top queries by runtime × runs per day` en werk die lijst af. Twee derde van de winst zit in het midden van de runtime-ranglijst, niet bovenaan.

## Statistieken die achterlopen

Warehouse-optimizers plannen queries op basis van statistieken. Statistieken verouderen. Tabellen groeien scheef. Het plan dat optimaal was bij een miljoen rijen, is niet het plan dat optimaal is bij honderd miljoen.

De fix is bijna altijd goedkoop: werk statistieken op de zwaarste tabellen op een planning bij. Niet dagelijks — meestal is wekelijks genoeg — en meet het verschil zodat u weet of het onderhoudsvenster zich terugverdient. Als uw warehouse een auto-update-mechanisme heeft, controleer dan of het daadwerkelijk draait.

## Indexen die aansluiten op de werkelijkheid

De indexeringsstrategie bij de start weerspiegelt de queries die de directie bij de start vroeg. Achttien maanden later stelt het team andere vragen. De indexen zijn niet meegegroeid.

Kijk naar de join-kolommen in de zwaarste queries. Zijn ze geïndexeerd? Liggen ze in lijn met de distributiesleutel? Als de tabel groot is en de join terugkerend, is een clustered columnstore-index op de fact plus gerichte non-clustered-indexen op join-kolommen vaak de volledige fix.

## Materialised views voor hete reads

Een klein aantal queries draait onevenredig vaak. Directiedashboards. Maandagochtend-omzetrollups. De "hoe liep de afgelopen week"-rapportages. Dat zijn kandidaten voor een materialised view: eenmaal rekenen, vele malen lezen.

Wij vinden meestal drie of vier hete reads per warehouse die een materialised view verdienen. Vaak minder dan een dag werk, vaak 40-60% runtime-reductie op de reads die ze aanraken.

## Partition pruning dat daadwerkelijk pruunt

Partitionering is vaak correct geconfigureerd en vervolgens nooit geverifieerd. Een veelvoorkomend probleem: de rapportages filteren op een berekende kolom die niet overeenkomt met de partitie-expressie. De optimizer kan niet prunen. Scant elke partitie.

Bekijk het execution plan. Als u een full table scan ziet op een op-datum-gepartitioneerde tabel met een datumfilter in de WHERE, dan verslaat iets in de query de pruning. Meestal een type-cast, een functie rond de filterkolom, of een OR die over partities heen reikt.

## Wat wij meestal niet doen

Wij adviseren vrijwel nooit om te herarchitecteren naar een nieuw warehouse of een nieuwe engine. Het team dat voor ons staat, heeft al in de huidige stack geïnvesteerd. Ze hebben nodig dat de huidige stack stopt met wrijven, niet een migratie.

Indexering, statistieken, materialised views en query-rewrites dekken het grootste deel van analytische traagheid. Als na een tuning-slag het systeem nog steeds traag is, verandert het gesprek — maar dat is zelden het eerste gesprek.

---

*Als uw analytics wrijving geven, [plan een gesprek](/nl/contact). Wij zeggen in dat gesprek of tuning de juiste volgende stap is — of dat er iets anders speelt.*

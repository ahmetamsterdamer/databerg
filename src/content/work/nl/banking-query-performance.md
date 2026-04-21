---
title: Data warehouse van een bankengroep circa 40% dichter bij real-time gebracht
sector: Retailbanken
location: EMEA
duration: 2019 – 2022 (3+ jaar)
stack:
  - Databricks
  - Azure Data Factory
  - Airflow
  - Delta Lake
  - T-SQL
services:
  - data-pipelines
summary: Dagelijkse rapportagequeries op fact-tabellen van een miljard rijen waren opgerekt van minuten tot uren. Indexering, partitionering en herbruikbare T-SQL-bibliotheken brachten de performance terug en hielden die stand terwijl het team groeide.
outcomes:
  - metric: "~40%"
    note: Snellere queries op de grootste fact-tabellen
  - metric: 4 &rarr; 1
    note: Teams convergeren op één T-SQL-bibliotheek in plaats van vier kopieën
  - metric: Juniors
    note: Query-tuning en indexering overgedragen via mentorschap
publishedAt: 2022-09-30
featured: false
locale: nl
slug: banking-query-performance
---

<!-- TODO(review-nl): Nederlandse vertaling. "u"-vorm gehanteerd. Termen als clustered
     columnstore en SLA blijven onvertaald — vakjargon dat het doelpubliek kent. -->

## Het startpunt

Het data warehouse bediende een groeiend aantal downstream-rapportages bij risk, finance en operations. De grootste fact-tabellen bevatten miljarden rijen en groeiden dagelijks. Rapportages die vroeger in minuten draaiden, namen aan het begin van het traject uren in beslag.

Elk team had zijn eigen SQL-patronen, en de helft daarvan was dezelfde transformaties opnieuw aan het uitvinden.

## Wat wij deden

- Opslag van de grote tabellen opnieuw ontworpen met clustered columnstore-indexen, partitioneringsschema's uitgelijnd op de rapportagevensters en indexering op de join-kolommen die de downstream-rapportages daadwerkelijk gebruiken.
- Herbruikbare T-SQL-bibliotheken gebouwd voor gangbare transformaties, aggregaties en data-quality-checks — zodat vier teams niet langer vier bijna-identieke kopieën onderhielden.
- SQL-based orkestratielogica ingevoerd in ADF en Airflow met SLA-monitoring en retry-conventies, zodat fouten zichtbaar werden in plaats van onopgemerkt te blijven.
- Mentorschapssessies met junior engineers gehouden over query-tuning, stored-procedure-ontwerp en indexeringsstrategie. De werkwijze bleef hangen omdat hij met onderbouwing kwam, niet met regels.

## Wat er veranderde

- **Query-performance op de grootste fact-tabellen ongeveer 40% omhoog.** Rapportages die waren teruggezakt tot "start ze vanavond, bekijk ze morgen" draaiden weer binnen een strak tijdvenster.
- **Patroonconsolidatie.** Nieuwe rapportages hergebruikten bibliotheekcode in plaats van het wiel opnieuw uit te vinden. Minder plekken om te onderhouden, minder plekken waar dezelfde bug kan opduiken.
- **Team op niveau.** Het mentorschap was expliciet omdat het traject lang genoeg liep om daarin te investeren. De werkwijze overleefde het traject.

Een langlopend traject als dit is geen set fixes — het is een set gewoontes die in het team blijven nadat wij weg zijn.

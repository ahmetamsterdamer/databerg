---
title: Analytische rapportagelatency met circa 60% teruggebracht bij een Nederlandse zorgverzekeraar
sector: Zorgverzekering
location: Nederland
duration: 2023 – heden
stack:
  - Azure Synapse Analytics
  - Azure Data Factory
  - T-SQL
  - Python
  - Power BI
  - Log Analytics
services:
  - data-pipelines
  - process-automation
summary: Analytische rapportages die de directie maandagochtend bekijkt, stonden zondagnacht nog te laden. Een gestructureerde tuning-slag op T-SQL en Synapse verkortte het zwaarste gedeelte met ongeveer 60%, en de ETL-pipeline verloor een derde van zijn handmatige overdrachten onderweg.
outcomes:
  - metric: "~60%"
    note: Snellere analytische rapportageruntimes
  - metric: "~30%"
    note: Minder handmatig ETL-werk per week
  - metric: Zichtbaar
    note: SLA-status die het team ziet vóór de directie
publishedAt: 2026-01-15
featured: true
locale: nl
slug: health-insurer-analytics
---

<!-- TODO(review-nl): Nederlandse vertaling — controleren op natuurlijke toon, "u"-vorm,
     en vakjargon. Gemaakt op 2026-04-21, gebaseerd op de Engelse originele versie. -->

## Het startpunt

Het team draaide analytische rapportages op een Synapse dedicated SQL pool. Dashboards die de directie maandagochtend bekeek, waren zondagnacht nog aan het bijwerken. Rapportageruntimes groeiden kwartaal op kwartaal door toenemende datavolumes, en het data-engineering-team besteedde een substantieel deel van de week aan handmatige interventies — ETL-jobs opnieuw starten, loads opnieuw valideren, &ldquo;klopt dit cijfer?&rdquo;-tickets beantwoorden.

Er was geen enkel ding stuk. Een dozijn kleine dingen bij elkaar.

## Wat wij deden

Wij behandelden het als twee problemen, niet één: de trage rapportages, en het team dat tijd verloor aan handmatig werk.

**Op rapportageperformance.** Wij auditeerden de dertig zwaarste analytische queries op SLA-impact en pasten partitionering en clustered columnstore-indexen toe waar de leespatronen dat rechtvaardigden. Wij bouwden materialised views voor de vier queries die tien keer per dag draaiden, en optimaliseerden execution plans in Synapse met distributiesleutels die aansloten op de join-patronen.

**Op het handmatige werk.** Wij vervingen de met de hand gedraaide scripts door T-SQL stored procedures, functions en triggers die de logica eenmaal vastlegden en ter plekke testten. SQL-based validatieregels — constraints, checksum-validatie, gestructureerde exception handling — zorgden dat dataproblemen in de juiste laag opdoken in plaats van in het dashboard. Wij bouwden ook SQL-gedreven feature stores op de Synapse dedicated pool, zodat het data science-team niet meer afhankelijk was van engineers voor afgeleide views.

Tot slot ontwierpen wij SQL-based monitoring-dashboards met Log Analytics en Synapse-queries, zodat het team SLA-issues zag voordat de directie dat deed.

## Wat er veranderde

- **Analytische rapportageperformance ongeveer 60% omhoog.** De maandagochtend-dashboards waren ververst voordat het team aan tafel zat.
- **Handmatig ETL-werk ongeveer 30% omlaag.** De uren die eerder naar het herstarten van jobs gingen, kwamen terug in het bouwen van nieuwe functionaliteit.
- **Datakwaliteit werd zichtbaar.** Het team had eindelijk helder zicht op wat er afwijkt en waarom, in plaats van tickets achterna te jagen.

Het traject loopt nog. De verbeteringen houden stand omdat de discipline is blijven hangen — nieuwe analytische oppervlakken worden tegen dezelfde standaarden gebouwd.

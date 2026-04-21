---
title: Legacy SSIS afgebouwd bij een wereldwijde IT-consultancypartner
sector: IT-consultancy
location: Wereldwijd
duration: 12 maanden (2022)
stack:
  - Azure Data Factory
  - Databricks
  - Delta Lake
  - Azure DevOps
  - T-SQL
services:
  - data-pipelines
  - process-automation
summary: Legacy SSIS-jobs waren moeilijk te onderhouden en traag te wijzigen. Migratie naar ADF en Databricks met CI/CD-beheerde SQL maakte van een risicovol deployproces routinematig engineeringswerk.
outcomes:
  - metric: Afgebouwd
    note: Legacy SSIS ETL-footprint buiten gebruik gesteld
  - metric: Routine
    note: SQL-deployments door dezelfde CI/CD-gate als applicatiecode
  - metric: Herbruikbaar
    note: Ingestie-templates zodat nieuwe bronnen een copy-and-configure werden
publishedAt: 2023-01-31
featured: false
locale: nl
slug: consulting-ssis-migration
---

<!-- TODO(review-nl): Nederlandse vertaling. Anonimisering lichter dan in EN
     ("global IT consulting partner" → "wereldwijde IT-consultancypartner"). -->

## Het startpunt

De ETL-ruggengraat was SSIS en was organisch over jaren gegroeid. Een wijziging uitleveren betekende afstemmen tussen teams, deployen naar een handvol servers en hopen dat de verschillen tussen dev en prod niemand zouden verrassen. Nieuwe databronnen werden vastgeschroefd in plaats van geïntegreerd. Niets was catastrofaal mis — elke release-dag droeg alleen iets meer risico dan zou moeten.

## Wat wij deden

- De legacy SSIS-jobs gemigreerd naar Azure Data Factory en Databricks, met SQL-based orkestratie en transformatielogica.
- Ingestie-pipelines gebouwd met SQL-scripts die schema-validatie en error handling afdwongen bij ingest — problemen kwamen naar boven op de plek van herkomst, niet drie schakels verderop.
- SQL-queries op Databricks Delta-tabellen getuned met clustering keys en partition pruning, zodat downstream-reads voorspelbaar bleven bij groeiende volumes.
- Deployment van SQL-scripts geautomatiseerd via Azure DevOps. Een wijziging ging van commit naar productie zonder een meeting.
- Herbruikbare SQL-templates ontwikkeld voor ingestie en auditing. Nieuwe databronnen krompen van weken maatwerk tot een kopie-en-configureer-stap.

## Wat er veranderde

- De legacy SSIS-footprint werd afgebouwd. Het team droeg de onderhoudskosten van het oude systeem niet langer mee.
- Deployments werden routine. Een SQL-wijziging ging door dezelfde CI/CD-gate als applicatiecode — beoordeelbaar, terug te draaien, auditbaar.
- Onboarden van een nieuwe databron ging van weken naar dagen omdat het patroon klaarstond, getest was en was gedocumenteerd.

De echte winst zat niet in een specifieke migratiestap. Het was dat het uitleveren van een wijziging aan de pipeline geen gebeurtenis meer was.

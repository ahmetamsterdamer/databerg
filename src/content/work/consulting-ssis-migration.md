---
title: Retiring legacy SSIS at a global IT consulting partner
sector: IT consulting
location: Global
duration: 12 months (2022)
stack:
  - Azure Data Factory
  - Databricks
  - Delta Lake
  - Azure DevOps
  - T-SQL
services:
  - data-pipelines
  - process-automation
summary: Legacy SSIS jobs had grown hard to maintain and slow to ship. Migration to ADF and Databricks with CI/CD-managed SQL turned a risk-heavy deploy process into routine engineering.
outcomes:
  - metric: Retired
    note: Legacy SSIS ETL footprint decommissioned
  - metric: Routine
    note: SQL deployments moved through the same CI/CD gate as application code
  - metric: Reusable
    note: Ingestion templates so new sources became copy-and-configure
publishedAt: 2023-01-31
featured: false
---

<!-- TODO(review): "A global IT consulting partner" is loose on purpose. If the real client
     prefers even less framing, switch to "A multinational technology services firm." -->

## The starting point

The ETL backbone was SSIS, and it had grown organically over years. Shipping a change meant coordinating across teams, deploying to a handful of servers, and hoping the differences between dev and prod did not surprise anyone. New data sources got bolted on rather than integrated. Nothing was catastrophically wrong &mdash; every shipping day just carried a little more risk than it should have.

## What we did

- Migrated the legacy SSIS jobs to Azure Data Factory and Databricks, with SQL-based orchestration and transformation logic.
- Built ingestion pipelines with SQL scripts that enforced schema validation and error handling at ingest &mdash; issues surfaced next to their source, not three hops downstream.
- Tuned SQL queries against Databricks Delta tables using clustering keys and partition pruning, so downstream reads stayed predictable as volumes grew.
- Automated deployment of SQL scripts via Azure DevOps pipelines. A change moved from commit to production without a meeting.
- Developed reusable SQL templates for ingestion and auditing. New data sources collapsed from weeks of bespoke build to a copy-and-configure step.

## What changed

- The legacy SSIS footprint was retired. The team stopped carrying the maintenance cost of the old system.
- Deployments became routine. A SQL change went through the same CI/CD gate as any other code &mdash; reviewable, revertible, auditable.
- Onboarding a new data source went from weeks to days because the pattern was in place, tested, and documented.

The real win was not any individual migration step. It was that shipping a change to the pipeline stopped being an event.

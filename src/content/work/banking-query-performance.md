---
title: Taking a banking group's data warehouse ~40% closer to real-time
sector: Retail banking
location: EMEA
duration: 2019 – 2022 (3+ years)
stack:
  - Databricks
  - Azure Data Factory
  - Airflow
  - Delta Lake
  - T-SQL
services:
  - data-pipelines
summary: Daily reporting queries on billion-row fact tables had stretched from minutes to hours. Indexing, partitioning, and reusable T-SQL libraries restored the performance and kept it that way as the team grew.
outcomes:
  - metric: "~40%"
    note: Faster queries on the largest fact tables
  - metric: 4 &rarr; 1
    note: Teams converging on one T-SQL library instead of four copies
  - metric: Juniors
    note: Query tuning and indexing practices transferred through mentorship
publishedAt: 2022-09-30
featured: false
---

<!-- TODO(review): confirm anonymisation (sector + EMEA region) is sufficient. CV publishes
     the engagement under the client's name, but the public site keeps it unnamed. -->

## The starting point

The data warehouse served a growing set of downstream reports across risk, finance, and operations. The largest fact tables held billions of rows and grew daily. Reports that used to run in minutes were taking hours by the time the engagement started.

Every team had its own SQL patterns, and half of them were reinventing the same transformations.

## What we did

- Redesigned large-table storage with clustered columnstore indexes, partitioning schemes aligned to reporting windows, and indexing on the join columns the downstream reports actually used.
- Built reusable T-SQL libraries for common transformations, aggregations, and data-quality checks &mdash; so four teams stopped maintaining four near-identical copies.
- Introduced SQL-based orchestration logic in ADF and Airflow with SLA monitoring and retry conventions, so failures became visible instead of swallowed.
- Ran mentorship sessions with junior engineers on query tuning, stored procedure design, and indexing strategy. The practices stuck because they came with reasoning, not rules.

## What changed

- **Query performance on the largest fact tables up by roughly 40%.** Reports that had slipped back to "kick it off and come back tomorrow" ran inside a tight window again.
- **Pattern consolidation.** New reports reused library code instead of reinventing it. Fewer places to maintain, fewer places for the same bug to live.
- **Team levelled up.** The mentorship was explicit because the engagement ran long enough to invest in it. The practices outlasted the engagement.

A multi-year engagement like this is not a set of fixes &mdash; it is a set of habits that stay in the team after we have gone.

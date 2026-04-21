---
title: Cutting analytical report latency by ~60% at a Dutch health insurer
sector: Health insurance
location: Netherlands
duration: 2023 – Present
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
summary: Monday-morning analytical reports were still backfilling Sunday night. A structured tuning pass on T-SQL and Synapse cut the worst of it by roughly 60%, and the ETL pipeline lost a third of its manual handoffs along the way.
outcomes:
  - metric: "~60%"
    note: Faster analytical report runtimes
  - metric: "~30%"
    note: Less manual ETL work each week
  - metric: Visible
    note: SLA status the team sees before leadership does
publishedAt: 2026-01-15
featured: true
---

<!-- TODO(review): confirm the anonymisation level is acceptable to the real client before
     publishing. Facts below match the CV and public engagement dates; no client name is used. -->

## The starting point

The team was running analytical reports on a Synapse dedicated SQL pool. Dashboards that leadership reviewed on Monday mornings were still backfilling Sunday night. Report runtimes crept up quarter by quarter as data volumes grew, and the data engineering team spent a noticeable chunk of the week on manual interventions — rerunning ETL jobs, re-validating loads, answering &ldquo;is this number right?&rdquo; tickets.

No single thing was broken. A dozen small things added up.

## What we did

We treated it as two problems, not one: the slow reports, and the team losing time to manual work.

**On report performance.** We audited the thirty heaviest analytical queries by SLA impact and applied partitioning and clustered columnstore indexes where the read patterns justified them. We built materialised views for the four queries that ran ten times a day each, and tuned execution plans in Synapse with distribution keys aligned to the join patterns.

**On the manual workload.** We replaced the hand-run scripts with T-SQL stored procedures, functions, and triggers that encoded the logic once and tested it in place. SQL-based validation rules — constraints, checksum validation, structured exception handling — meant data issues surfaced at the right layer instead of at the dashboard. We also built SQL-driven feature stores on the Synapse dedicated pool so the data-science team stopped having to ask engineers for derived views.

Finally, we designed SQL-based monitoring dashboards using Log Analytics and Synapse queries so the team saw SLA issues before leadership did.

## What changed

- **Analytical report performance up by roughly 60%.** The Monday-morning dashboards refreshed before the team sat down.
- **Manual ETL workload down by roughly 30%.** The hours that were spent rerunning jobs went back into building.
- **Data quality became visible.** The team now had a clear read on what was drifting and why, rather than chasing tickets.

The engagement is ongoing. The improvements compound because the discipline stuck — new analytical surfaces are built against the same standards.

---
title: Why your analytical reports got slow
summary: Reports that used to run in minutes now run in hours. The usual suspects, in the order we check them.
publishedAt: 2026-02-15
draft: false
---

<!-- TODO(review): this post is a draft based on patterns observed in the author's
     T-SQL / Synapse / Databricks tuning engagements. Read, edit to match the voice,
     and flip draft to true or amend before publishing. -->

Every Synapse pool, every Snowflake warehouse, every Databricks cluster we have worked on shares the same pattern: runs like magic on day one, slumps somewhere around eighteen months in.

The slump is almost never architectural. It is the sum of small things.

## Start with SLA impact, not runtime

The first mistake is sorting the top-N slowest queries and starting there. Those are the queries someone ran once at 3am. The queries that actually matter are the ones running repeatedly against business-hour SLAs.

Join `top queries by runtime × runs per day` and work that list. Two-thirds of the wins hide in the middle of the runtime ranking, not the top.

## Statistics drift

Warehouse optimizers plan queries based on statistics. Statistics go stale. Tables grow skewed. The plan that was optimal at a million rows is not the plan that is optimal at a hundred million.

The fix is almost always cheap: update stats on the heaviest tables on a schedule. Not daily &mdash; usually weekly is enough &mdash; and measure the delta so you know it is worth the maintenance window. If your warehouse has an auto-update mechanism, make sure it is actually running.

## Indexes that match reality

The indexing strategy at launch reflects the queries leadership asked for at launch. Eighteen months later, the team is asking different questions. The indexes have not caught up.

Look at the join columns in the heaviest queries. Are they indexed? Are they aligned with the distribution key? If the table is large and the join is recurring, a clustered columnstore index on the fact plus targeted non-clustered indexes on join columns is often the entire fix.

## Materialised views for hot reads

A small number of queries run disproportionately often. Leadership dashboards. Monday-morning revenue rollups. The "how did last week go" reports. Those are materialised-view candidates: compute once, read many times.

We usually find three or four hot reads per warehouse that deserve a materialised view. Often less than a day of work, often 40-60% runtime reduction on the reads that touch them.

## Partition pruning that actually prunes

Partitioning is often configured correctly and then never verified. Common failure: the reports filter on a computed column that does not match the partition expression. The optimizer cannot prune. Scans every partition.

Check the execution plan. If you see a full table scan on a date-partitioned table with a date filter in the WHERE, something in the query is defeating pruning. Usually a type cast, a function wrap on the filter column, or an OR that spans partitions.

## What we usually do not do

We almost never recommend rearchitecting to a new warehouse or a new engine. The team in front of us has already bought into the current stack. They need the current stack to stop dragging, not a migration.

Indexing, stats, materialised views, and query rewrites cover the majority of analytical slowness. If after a tuning pass the system is still slow, the conversation changes &mdash; but it is rarely the first conversation.

---

*If your analytics are dragging, [book a call](/contact). We will tell you on the call whether tuning is the right next step &mdash; or whether something else is going on.*

---
title: Retiring legacy SSIS without a horror story
summary: Most ETL modernizations go sideways mid-cutover. They do not have to. The phased strategy that works.
publishedAt: 2026-04-05
draft: false
---

<!-- TODO(review): draft based on a real SSIS → Azure lakehouse migration the author ran.
     Confirm the tactical specifics match how you would describe the project, edit, publish. -->

Every company with a decade of data ambition has SSIS packages that nobody wants to touch. The jobs run. They mostly run on time. Documentation has drifted from reality. New data sources get bolted onto the edge rather than integrated. The system is not broken, but every shipping day carries a little more risk than it should.

Retiring SSIS is the right move. How you retire it determines whether the cutover is a routine and boring week or a three-month stabilisation.

## Why "big-bang" migrations go sideways

The common pattern: port all the packages to the new tool, run both side-by-side for two weeks, cut over, go home. This fails for the same reason most big-bang migrations fail:

- **Coverage gaps.** The legacy package does something nobody remembers. It is not documented. It is a side-effect nobody asked for but something downstream depends on. The new pipeline reproduces the documented behaviour and breaks the undocumented one.
- **Parallel running reveals drift, not parity.** Two weeks of running both is rarely enough to hit the weird monthly report or the quarterly close that tests an edge case nobody wrote a test for.
- **One cutover event.** Everything shifts at once. If something fails, rollback is all-or-nothing.

The cost of each of these is a production incident in the first month of the new system. The incidents are real, the team is rattled, and the migration gets blamed for problems it did not cause.

## The phased alternative

Treat the migration as a sequence of domain-sized cutovers, not one big cutover.

**Phase 0: foundation.** Before migrating anything, put CI/CD in place for the new tool. If you cannot ship a hotfix through the new pipeline in under 15 minutes, the migration will not survive contact with production.

**Phase 1: parallel run, one domain at a time.** Pick the smallest coherent domain (a single source system, a single team, a single report output). Run the legacy and the new pipeline side by side, feeding both outputs into a reconciliation layer. Fix drift. Move on.

**Phase 2: cutover per domain.** When reconciliation agrees for two consecutive weeks on a domain, cut that domain over. Legacy package goes to scheduled-disabled, not deleted. Rollback is a config toggle, not a deploy.

**Phase 3: decommission.** Once all domains are cut over, the legacy packages stay around for a quarter, disabled. If nothing broke, delete them.

A phased migration takes longer calendar time than a big-bang. It does not take longer engineering time, because the work is the same. What it takes less of: production incidents, weekend recovery work, and the team's trust in the new system.

## Things we usually do not move

Not every legacy job deserves to be rebuilt. Common ones to retire without replacing:

- The one-off monthly report that is half-SQL, half-manual-pivot-table. The consumer was working around the fact that the data was wrong. Fix the data. Delete the report.
- The archival job nobody can explain. Check the consumer. If there is no consumer, do not rebuild it.
- The reconciliation job that exists because the legacy pipeline had a bug. The new pipeline will not have that bug. The reconciliation job is suddenly unnecessary.

A good migration is an opportunity to drop the work nobody actually needs, not to reproduce all of it in a nicer tool.

## What goes into the new system

- Clear ownership per pipeline. Every job has a documented owner, a documented purpose, and a documented SLO.
- CI/CD from day one. SQL and pipeline config flow through the same review and deploy path as application code.
- Runbooks for failure. Not a wiki page nobody reads &mdash; a page linked from the alert. What to check, what to escalate, what to roll back.
- Monitoring that a human will actually look at. Alerts without a named responder are noise.

The new system is not "SSIS with a different logo." It is a smaller, better-documented, better-owned version of the old system.

---

*If you have legacy ETL you have been meaning to retire, [book a call](/contact). We will tell you honestly whether a phased migration is the right shape for your team.*

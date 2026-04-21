---
title: Where cloud bills hide the biggest savings
summary: The quiet 20-40% most cloud infrastructures carry. An audit checklist in order of payoff.
publishedAt: 2026-03-10
draft: false
---

<!-- TODO(review): draft based on the author's cloud-cost audit patterns. Specific numbers
     omitted; qualitative only. Edit / confirm / flip draft before publishing. -->

Most cloud bills are 20 to 40 percent larger than the work justifies. The extra spend does not hide in any single catastrophic failure &mdash; it hides in a thousand small decisions, made quickly, never revisited.

Here is the order we check them.

## 01 &middot; Idle compute

The single largest category in almost every audit. Three shapes:

- **Dev and test environments running at production scale.** Someone needed the scale once, spun it up, never dialed it back. Right-sizing dev to actually dev-shaped workloads usually knocks a meaningful chunk off the bill.
- **Pre-production environments that run 24/7.** They do not need to. Schedule them to sleep outside working hours and you reclaim roughly two-thirds of their runtime cost.
- **Over-provisioned production.** Provisioned for peaks that never come. Check the last 90 days of CPU and memory utilisation graphs. If the peak is under 40% of allocation, the instance is at least one size too large.

## 02 &middot; Orphaned resources

The second-largest bucket. Snapshots, volumes, and load balancers from projects that ended months ago. Databases that were temporarily spun up for a migration and then forgotten. IP addresses with nothing attached.

Cloud providers keep billing for these indefinitely. No one on the team is looking at them unless someone is specifically assigned to.

The fix is a one-afternoon sweep, plus a monthly reminder to repeat it. The return on the afternoon is often measured in thousands per month.

## 03 &middot; Committed use that no longer matches usage

Reserved instances, committed use discounts, and savings plans are powerful tools &mdash; when the commitment matches current usage. When it does not, you pay for capacity you are not using *and* your discount structure is wrong for the capacity you actually need.

Pull the reservation utilisation reports. If reservations are utilised below 80%, rework the commitment. If they are over-utilised, you are paying on-demand rates for the overflow.

## 04 &middot; Storage tiering

Cold data stored on hot tiers. Warm data stored on archival tiers (cheap, but then you pay egress when you need it). Backups kept beyond their retention policy because nobody wrote the retention policy down.

Storage is usually smaller than compute on the bill, but storage problems compound quietly over years. Worth the audit.

## 05 &middot; Support tiers you do not need

Enterprise support tiers make sense when you have an enterprise-sized team leaning on them. If you do not, you are paying a percentage of spend for a tier you never call. Downgrade and use the savings to hire the expertise in-house.

## 06 &middot; Egress

The sneaky one. Egress charges between regions, between clouds, or to the internet rack up quickly when data moves in ways the architecture did not anticipate. Inspect the networking cost breakdown. If egress is a top-three line item, something is moving that should not be.

## What an audit looks like

Two to four weeks, depending on the footprint. Read-only access. A written audit with a ranked list of fixes, each with an estimated saving and an estimated risk. The team executes the top three with us; the rest they can run at their pace.

No finders-fees on savings. No percentage-of-saved-spend model. A flat scope, a flat price.

---

*If your cloud bill has been slowly growing faster than the business, [book a call](/contact). We will tell you on the call whether a structured audit is the right next step.*

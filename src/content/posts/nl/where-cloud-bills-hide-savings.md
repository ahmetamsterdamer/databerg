---
title: Waar cloudrekeningen de grootste besparingen verbergen
summary: De stille 20 tot 40 procent die de meeste cloudinfrastructuren meedragen. Een audit-checklist in volgorde van opbrengst.
publishedAt: 2026-03-10
draft: false
locale: nl
slug: where-cloud-bills-hide-savings
---

<!-- TODO(review-nl): Nederlandse vertaling. "u"-vorm, B2B-toon. -->

De meeste cloudrekeningen liggen 20 tot 40 procent hoger dan het werk rechtvaardigt. De extra uitgaven schuilen niet in één catastrofale fout — ze schuilen in duizend kleine beslissingen, snel genomen, nooit herzien.

Dit is de volgorde waarin wij ze controleren.

## 01 &middot; Idle compute

De grootste categorie in bijna elke audit. Drie verschijningsvormen:

- **Dev- en test-omgevingen die op productieschaal draaien.** Iemand had de schaal eenmaal nodig, heeft ze opgespind, nooit teruggeschaald. Dev terugbrengen naar daadwerkelijk dev-vormig werk scheelt meestal een flink stuk van de rekening.
- **Pre-productie-omgevingen die 24/7 draaien.** Dat hoeft niet. Plan ze buiten kantooruren in slaap en u wint circa twee derde van hun runtime-kosten terug.
- **Over-provisioned productie.** Gebouwd voor pieken die nooit komen. Bekijk de CPU- en geheugengebruiksgrafieken van de afgelopen 90 dagen. Als de piek onder de 40% van de toewijzing ligt, is de instance minstens één maat te groot.

## 02 &middot; Verweesde resources

De tweede grote categorie. Snapshots, volumes en load balancers van projecten die maanden geleden zijn geëindigd. Databases die tijdelijk zijn opgespind voor een migratie en daarna vergeten. IP-adressen waaraan niets meer hangt.

Cloudproviders blijven die onbeperkt factureren. Niemand in het team kijkt ernaar tenzij iemand daar specifiek voor is aangewezen.

De fix is een middag vegen, plus een maandelijkse herinnering om het opnieuw te doen. De opbrengst van die middag telt vaak in duizenden per maand.

## 03 &middot; Committed use die niet meer aansluit

Reserved instances, committed use-kortingen en savings plans zijn krachtige instrumenten — als de commitment overeenkomt met het huidige gebruik. Als dat niet zo is, betaalt u voor capaciteit die u niet gebruikt *en* zit uw kortingsstructuur niet goed voor de capaciteit die u wél nodig heeft.

Haal de reservation-gebruiksrapporten op. Als reserveringen onder de 80% worden benut, herzie dan de commitment. Als ze over-benut zijn, betaalt u on-demand-tarieven voor de overflow.

## 04 &middot; Storage-tiering

Koude data op hete tiers. Warme data op archival-tiers (goedkoop, maar dan betaalt u egress als u erbij moet). Back-ups die langer bewaard worden dan de retention-policy voorschrijft — omdat niemand die policy heeft opgeschreven.

Opslag is meestal kleiner dan compute op de rekening, maar opslagproblemen stapelen zich stil op over jaren. De audit waard.

## 05 &middot; Support-tiers die u niet nodig heeft

Enterprise-support-tiers zijn logisch als u een team op enterprise-schaal heeft dat daarop leunt. Als dat niet zo is, betaalt u een percentage van de spend voor een tier die u nooit belt. Schaal af en gebruik de besparing om de expertise intern op te bouwen.

## 06 &middot; Egress

De stiekeme categorie. Egress-kosten tussen regio's, tussen clouds of naar het internet lopen snel op wanneer data op manieren beweegt die de architectuur niet heeft voorzien. Bekijk de netwerkkostenuitsplitsing. Als egress in de top drie van posten staat, beweegt er iets wat niet zou mogen bewegen.

## Hoe een audit eruitziet

Twee tot vier weken, afhankelijk van de footprint. Lees-toegang. Een geschreven audit met een geprioriteerde lijst fixes, elk met een geschatte besparing en een geschat risico. Het team voert de top drie samen met ons uit; de rest kunnen ze op eigen tempo afronden.

Geen success fees op besparingen. Geen percentage-van-bespaarde-kosten-model. Een vaste scope, een vaste prijs.

---

*Als uw cloudrekening stilletjes harder groeit dan het bedrijf, [plan een gesprek](/nl/contact). Wij zeggen in het gesprek of een gestructureerde audit de juiste volgende stap is.*

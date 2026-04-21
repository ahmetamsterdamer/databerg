// TODO(copy): see earlier review notes for EN content.
// TODO(review-nl): Dutch translations below use B2B-formal "u" register.
// A native-speaker pass is advised before launch.

import type { Locale } from './i18n';

export interface EngagementShape {
  duration: string;
  team: string;
  access: string;
  keep: string;
}

export interface ServiceContent {
  category: string;
  title: string;
  summary: string;
  lede: string;
  problem: string;
  approach: string[];
  outcome: string;
  engagement: EngagementShape;
}

export interface Service extends ServiceContent {
  slug: string;
  nl: ServiceContent;
}

export const services: Service[] = [
  {
    slug: 'cloud-cost',
    category: 'Infrastructure',
    title: 'Cloud cost optimization',
    summary:
      'AWS, GCP, or Azure bills bigger than they need to be. We audit the infrastructure, identify unused and over-provisioned resources, and cut cost without touching performance.',
    lede:
      'Most cloud bills are 20–40% larger than the work justifies. The extra spend is spread thin across a thousand small decisions — a staging cluster at production scale, a database that backs up more often than the SLA asks, a reserved instance from an experiment that shipped six months ago. None of it is wrong individually. Together, it is the quiet cost of growing fast.',
    problem:
      'The bill keeps growing and no one on the team has an afternoon to untangle why. Dev environments run at production scale because coordinating a scale-down takes three standups. Instances stay on because someone might need them. Storage accumulates. The finance team flags it; the engineering team says they will look into it; everyone moves on.',
    approach: [
      'Audit the last 90 days of billing data end-to-end — compute, storage, egress, support tier, commitments.',
      'Map spend to workloads and owners. Find the silent chunk no one on the team can name.',
      'Identify right-sizing opportunities that do not change application behaviour.',
      'Catch unused reserved instances, orphaned snapshots, unattached volumes, legacy support tiers.',
      'Produce a ranked action list with estimated savings and risk notes per item.',
      'Execute the top-tier fixes with your team; document the rest for them to run at their pace.',
    ],
    outcome:
      'A smaller monthly bill, and a team that understands where the bill comes from. The savings compound because the audit leaves behind a shared mental model — the next month is not a regression.',
    engagement: {
      duration: '2–4 weeks, depending on footprint',
      team: 'One senior engineer from us; one billing or infra owner from you',
      access: 'Read-only on billing and resource tags; read on deploy and tagging conventions',
      keep: 'A written audit, a prioritised action list, and handover docs for everything we changed',
    },
    nl: {
      category: 'Infrastructuur',
      title: 'Cloudkostenoptimalisatie',
      summary:
        'AWS-, GCP- of Azure-rekeningen die groter zijn dan nodig. Wij auditen de infrastructuur, brengen ongebruikte en over-provisioned resources in kaart en verlagen de kosten zonder dat prestaties eronder lijden.',
      lede:
        'De meeste cloudrekeningen liggen 20 tot 40 procent hoger dan het werk rechtvaardigt. De extra uitgaven zijn verdeeld over duizend kleine beslissingen — een staging-cluster op productieschaal, een database die vaker back-upt dan de SLA voorschrijft, een reserved instance van een experiment dat zes maanden geleden al live ging. Afzonderlijk is niets fout. Bij elkaar zijn het de stille kosten van snel groeien.',
      problem:
        'De rekening groeit en niemand in het team heeft een middag om uit te zoeken waarom. Dev-omgevingen draaien op productieschaal omdat het terugschakelen drie standups kost. Instances blijven aan omdat iemand ze misschien nodig heeft. Opslag stapelt zich op. Finance signaleert het; engineering belooft ernaar te kijken; iedereen gaat door met de dag.',
      approach: [
        'Audit van de afgelopen 90 dagen aan facturatiegegevens — compute, opslag, egress, support-tier, commitments.',
        'Uitgaven koppelen aan workloads en eigenaars. Het stille deel vinden dat niemand in het team kan benoemen.',
        'Right-sizing-kansen identificeren die het applicatiegedrag niet veranderen.',
        'Onbenutte reserved instances, verweesde snapshots, losse volumes en verouderde support-tiers opsporen.',
        'Een geprioriteerde actielijst opleveren met besparingen en risico-notities per punt.',
        'De belangrijkste fixes met uw team uitvoeren; de rest documenteren zodat u het zelf kunt afronden.',
      ],
      outcome:
        'Een lagere maandrekening, en een team dat weet waar die rekening vandaan komt. De besparingen houden stand omdat de audit een gedeeld denkmodel achterlaat — de volgende maand is geen terugval.',
      engagement: {
        duration: '2–4 weken, afhankelijk van de omvang',
        team: 'Één senior engineer van ons; één billing- of infrabeheerder van u',
        access: 'Leestoegang op facturatie en resource-tags; inzage in deploy- en tag-conventies',
        keep:
          'Een geschreven audit, een geprioriteerde actielijst en overdrachtsdocumentatie voor alles wat we hebben aangepast',
      },
    },
  },
  {
    slug: 'data-pipelines',
    category: 'Data',
    title: 'Data & pipelines',
    summary:
      'Data scattered across tools, warehouses, and spreadsheets. We consolidate the sources, design the pipelines, and hand you one system the team actually trusts.',
    lede:
      'The business runs on five dashboards that do not quite agree with each other. The data team spends their week reconciling duplicates instead of building. Every important decision has a "let me check one more thing" moment. The problem is rarely the tooling — it is the absence of an agreed place for the truth to live.',
    problem:
      'Source systems multiplied faster than anyone could track. A spreadsheet became a source of truth by accident. The warehouse has two customer tables, three definitions of active, and a column no one can remember naming. The team knows what to do — they do not have the week it takes to stop and do it.',
    approach: [
      'Map every source system feeding decisions — ERP, CRM, billing, finance exports, the warehouse, and the spreadsheets that quietly became authoritative.',
      'Identify duplicates, timing mismatches, and fields that nobody on the team fully trusts.',
      'Design a consolidated pipeline into one warehouse with explicit ownership per source.',
      'Build dedup and reconciliation logic at ingest, not in the reports.',
      'Ship the pipeline with handover documentation and a short training session for the team.',
    ],
    outcome:
      'One place to ask a question. Reports leadership can read without reservation. A data team back to building the work only they can do.',
    engagement: {
      duration: '4–8 weeks, depending on source complexity',
      team: 'One senior data engineer from us; one internal stakeholder per source system',
      access: 'Read-only on source systems; write on the destination warehouse',
      keep: 'Pipeline code in your repo, an ownership map, and the recorded training session',
    },
    nl: {
      category: 'Data',
      title: 'Data & pipelines',
      summary:
        'Data verspreid over tools, warehouses en spreadsheets. Wij consolideren de bronnen, ontwerpen de pipelines en leveren één systeem op waar het team daadwerkelijk op vertrouwt.',
      lede:
        'Het bedrijf draait op vijf dashboards die elkaar net niet bevestigen. Het data-team verzoent elke week duplicaten in plaats van te bouwen. Bij elke belangrijke beslissing zit er een "laat me nog even iets controleren" in. Het probleem zit zelden in de tools — er is geen afgesproken plek waar de waarheid woont.',
      problem:
        'Bronnensystemen zijn sneller vermenigvuldigd dan iemand kon bijhouden. Een spreadsheet werd per ongeluk een source of truth. Het warehouse heeft twee klanttabellen, drie definities van "actief" en een kolom waarvan niemand zich meer herinnert waarom die zo heet. Het team weet wat er moet gebeuren — alleen de week ontbreekt om het daadwerkelijk te doen.',
      approach: [
        'Elk bronsysteem in kaart brengen dat beslissingen voedt — ERP, CRM, facturatie, finance-exports, het warehouse en de spreadsheets die stiekem gezaghebbend zijn geworden.',
        'Duplicaten, timingverschillen en velden identificeren die niemand volledig vertrouwt.',
        'Eén geconsolideerde pipeline ontwerpen naar één warehouse met expliciet eigenaarschap per bron.',
        'Dedup- en reconciliatielogica inbouwen bij ingest, niet in de rapportages.',
        'De pipeline opleveren met overdrachtsdocumentatie en een korte trainingssessie voor het team.',
      ],
      outcome:
        'Eén plek om een vraag te stellen. Rapportages die de directie zonder voorbehoud kan lezen. Een data-team dat weer bouwt aan werk dat alleen zij kunnen doen.',
      engagement: {
        duration: '4–8 weken, afhankelijk van de complexiteit van de bronnen',
        team: 'Één senior data engineer van ons; één interne stakeholder per bronsysteem',
        access: 'Leestoegang op bronsystemen; schrijftoegang op het doel-warehouse',
        keep: 'Pipeline-code in uw eigen repository, een eigenaarschapskaart en de opname van de trainingssessie',
      },
    },
  },
  {
    slug: 'process-automation',
    category: 'Process',
    title: 'Process automation',
    summary:
      'The manual work that eats your team&rsquo;s week. We map it, build the automation, and ship it with handover documentation anyone on the team can read.',
    lede:
      'There is a workflow that touches five people, takes four days, and should take an hour. Every individual step is fifteen minutes of clear work. The rest is waiting — for an email, for an approval, for the next person in the chain to notice it is their turn. Automation is not the goal; removing the waiting is.',
    problem:
      'Ten hours of the team&rsquo;s week disappears into chasing status updates. The process is documented, but the document has drifted from reality. New hires learn it by asking. It is slow, it drops balls, and no one has the afternoon to sit with it long enough to fix it.',
    approach: [
      'Shadow the process end-to-end — the meetings, the shared drives, the "wait, who owns this" moments.',
      'Map every handoff, decision point, and rework loop. Separate the work from the waiting.',
      'Identify what to eliminate, what to automate, and what genuinely needs a human decision.',
      'Build the automation using your existing tools where possible; introduce a new tool only when the saving is clearly worth it.',
      'Ship with clear runbooks for when something goes wrong — the automation is only trustworthy if the recovery is obvious.',
    ],
    outcome:
      'A shorter cycle time, fewer dropped handoffs, and a team that stops spending its energy chasing updates. The workflow becomes boring, which is the highest compliment a workflow can receive.',
    engagement: {
      duration: '3–6 weeks per workflow',
      team: 'One senior engineer from us; one process owner from you',
      access: 'Read/write on the workflow&rsquo;s tools, access to recent examples of the work',
      keep: 'The automation logic in your repo (or no-code platform), runbooks for every step, and a plain-English summary of what is automated and what is not',
    },
    nl: {
      category: 'Proces',
      title: 'Procesautomatisering',
      summary:
        'Het handwerk dat de week van uw team opslokt. Wij brengen het in kaart, bouwen de automatisering en leveren het op met overdrachtsdocumentatie die iedereen in het team kan lezen.',
      lede:
        'Er is een workflow die vijf mensen raakt, vier dagen duurt en een uur zou moeten duren. Elke afzonderlijke stap is vijftien minuten helder werk. De rest is wachten — op een mail, op een akkoord, tot de volgende in de keten merkt dat het zijn beurt is. Automatiseren is niet het doel; het wachten wegnemen is het doel.',
      problem:
        'Tien uur van de week van het team verdwijnt in het achtervolgen van statusupdates. Het proces is gedocumenteerd, maar het document wijkt inmiddels af van de praktijk. Nieuwe medewerkers leren het door rond te vragen. Het is traag, er vallen dingen tussen wal en schip, en niemand heeft de middag om er lang genoeg mee te zitten om het op te lossen.',
      approach: [
        'Het proces van begin tot eind meelopen — de meetings, de gedeelde drives, de "wacht, wie is hiervan ook alweer?"-momenten.',
        'Elke overdracht, beslismoment en herwerklus in kaart brengen. Het werk scheiden van het wachten.',
        'Bepalen wat weg kan, wat automatiseerbaar is en waarbij echt een menselijk oordeel nodig blijft.',
        'De automatisering bouwen met bestaande tools waar mogelijk; een nieuwe tool alleen introduceren als de besparing dat duidelijk rechtvaardigt.',
        'Opleveren met duidelijke runbooks voor als er iets misgaat — automatisering is pas betrouwbaar als het herstelpad duidelijk is.',
      ],
      outcome:
        'Een kortere doorlooptijd, minder verloren overdrachten en een team dat zijn energie niet meer in statusvragen steekt. De workflow wordt saai, en dat is het grootste compliment dat een workflow kan krijgen.',
      engagement: {
        duration: '3–6 weken per workflow',
        team: 'Één senior engineer van ons; één proceseigenaar van u',
        access: 'Lees-/schrijftoegang op de tools van de workflow, toegang tot recente voorbeelden van het werk',
        keep:
          'De automatiseringslogica in uw eigen repository (of no-code-platform), runbooks voor elke stap en een leesbaar overzicht van wat wel en niet geautomatiseerd is',
      },
    },
  },
  {
    slug: 'systems-strategy',
    category: 'Strategy',
    title: 'Systems strategy',
    summary:
      'When you&rsquo;re not sure what&rsquo;s broken or where to start. We run a two-week audit and give you a ranked, cost-aware plan — yours to keep regardless.',
    lede:
      'Leadership knows something is costing more than it should, or taking longer than it should. They cannot point at it. They cannot afford another "let us just try this" that saturates the team for a month. What is needed is a clear picture of what is broken, what matters, and what to do first.',
    problem:
      'The team has a backlog of "we keep meaning to fix that." Each item feels small; together they are what is slowing the company down. A quick fix here would regret an architectural choice there. Without a read of the whole system, any single change is a guess. The cost of guessing is quietly compounding.',
    approach: [
      'Two weeks of structured discovery — interviews with each team lead, a read of the current systems and their billing, a read of the incident log, the backlog, and the "we keep meaning to" list.',
      'Map the opportunity landscape across cost, time, risk, and team morale. Nothing gets ranked in isolation.',
      'Produce a ranked plan: the top three actions, with estimated cost to fix, expected return, and prerequisites.',
      'Present to leadership with the reasoning and the tradeoffs. If we disagree on a ranking, we say so on the page.',
    ],
    outcome:
      'A plain-English plan leadership can use to decide what happens next. Yours to keep — execute it with us, with someone else, or yourselves. No retainer, no lock-in.',
    engagement: {
      duration: '2 weeks, fixed',
      team: 'One senior consultant from us; scheduled time from each department head',
      access: 'Read-only on systems, 30–60 minutes with each stakeholder, billing summaries',
      keep: 'The written plan, the stakeholder notes, and the reasoning behind every recommendation',
    },
    nl: {
      category: 'Strategie',
      title: 'Systeemstrategie',
      summary:
        'Als u niet zeker weet wat er hapert of waar te beginnen. Wij doen een audit van twee weken en leveren een geprioriteerd, kostenbewust plan op — dat u in alle gevallen mag houden.',
      lede:
        'De directie weet dat iets meer kost dan zou moeten, of langer duurt dan zou moeten. Maar ze kunnen er niet naar wijzen. En een nieuwe "laten we dit even proberen" die het team een maand lang bezet, is onacceptabel. Wat nodig is, is een helder beeld van wat er stuk is, wat belangrijk is en wat als eerste moet.',
      problem:
        'Het team heeft een backlog van "dat wilden we al fixen." Elk item lijkt klein; samen zijn ze wat het bedrijf vertraagt. Een quick fix hier zou spijt opleveren bij een architectuurkeuze daar. Zonder beeld van het hele systeem is elke afzonderlijke wijziging een gok. De prijs van gokken stapelt zich stilletjes op.',
      approach: [
        'Twee weken gestructureerd ontdekken — gesprekken met elke team lead, inzage in de huidige systemen en hun facturatie, de incidentenlog, de backlog en de "dat wilden we al fixen"-lijst.',
        'Het kansenlandschap in kaart brengen langs kosten, tijd, risico en teammoraal. Niets wordt in isolatie beoordeeld.',
        'Een geprioriteerd plan opleveren: de top drie acties met geschatte kosten, verwachte opbrengst en voorwaarden.',
        'Presenteren aan de directie met de redenering en de trade-offs. Als wij van mening verschillen over een prioriteit, zeggen we dat op papier.',
      ],
      outcome:
        'Een plan in heldere taal waarmee de directie kan beslissen wat er gaat gebeuren. U houdt het — voer het uit met ons, met iemand anders, of zelf. Geen retainer, geen lock-in.',
      engagement: {
        duration: '2 weken, vaste duur',
        team: 'Één senior consultant van ons; ingeplande tijd bij elke afdelingshoofd',
        access: 'Leestoegang op systemen, 30–60 minuten per stakeholder, facturatieoverzichten',
        keep: 'Het geschreven plan, de stakeholder-notities en de onderbouwing van elke aanbeveling',
      },
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Return a localized view of a service — base for EN, merged with `.nl` overrides for NL. */
export function getLocalizedService(slug: string, locale: Locale): (ServiceContent & { slug: string }) | undefined {
  const svc = getService(slug);
  if (!svc) return undefined;
  if (locale === 'nl') {
    return { slug: svc.slug, ...svc.nl };
  }
  const { nl, ...rest } = svc;
  return rest;
}

/** Return all services for a given locale. */
export function getLocalizedServices(locale: Locale): (ServiceContent & { slug: string })[] {
  return services.map((s) => {
    if (locale === 'nl') return { slug: s.slug, ...s.nl };
    const { nl, ...rest } = s;
    return rest;
  });
}

import type { Localized } from "../i18n/pickLocale";

export type Founder = {
  name: string;
  title: Localized<string>;
  image: string;
  alt: string;
  bio: Localized<string>;
  email: string;
};

export type TeamCard = {
  name: string;
  title: Localized<string>;
  image: string;
  alt: string;
  bio: Localized<string>;
};

export type Affiliate = {
  name: string;
  description: Localized<string>;
  href: string;
  label: Localized<string>;
};

export type Service = {
  slug: string;
  name: Localized<string>;
  tagline: Localized<string>;
  description: Localized<string>;
  industries: Localized<string>[];
  deliverables: Localized<string>[];
  longform: {
    challenge: Localized<string>;
    approach: Localized<string>[];
    signals: Localized<string>[];
  };
};

export type CaseStudy = {
  title: Localized<string>;
  industry: Localized<string>;
  challenge: Localized<string>;
  shortSummary?: Localized<string>;
  team?: Localized<string>;
  image: string;
  imageAlt: Localized<string>;
  metrics: Array<{ value: string; label: Localized<string> }>;
};

export type InsightItem = {
  badge: Localized<string>;
  date: string;
  author: string;
  title: Localized<string>;
  excerpt: Localized<string>;
  href: string;
  linkLabel: Localized<string>;
  image?: string;
  imageAlt?: Localized<string>;
};

export type AcademyProgram = {
  title: Localized<string>;
  description: Localized<string>;
  icon: string;
};

export type Capability = {
  title: string;
  icon: string;
};

export const founders: Founder[] = [
  {
    name: "Ingo Heijnen",
    title: { en: "Managing Partner", nl: "Managing Partner" },
    image: "/assets/team/IngoHeijnen_grijs.jpg",
    alt: "Ingo Heijnen",
    bio: {
      en: "Ingo Heijnen is Managing Partner and co-founder of Duke Strategies with 27 years of experience in strategic communications and public affairs. As former CEO of Hill+Knowlton Strategies Netherlands, he advised boards and C-suites on crisis management, M&A communications, and corporate governance across high-pressure sectors.",
      nl: "Ingo Heijnen is Managing Partner en medeoprichter van Duke Strategies met 27 jaar ervaring in strategische communicatie en public affairs. Als voormalig CEO van Hill+Knowlton Strategies Nederland adviseerde hij bestuurders en directies over crisis management, M&A-communicatie en corporate governance in sectoren onder hoge druk.",
    },
    email: "ingo.heijnen@dukestrategies.eu",
  },
  {
    name: "Ariën Stuijt",
    title: { en: "Managing Partner", nl: "Managing Partner" },
    image: "/assets/team/ArienStuijt_grijs.jpg",
    alt: "Ariën Stuijt",
    bio: {
      en: "Ariën Stuijt is Managing Partner and co-founder of Duke Strategies with 17 years of experience spanning journalism, strategic communications, and AI-driven stakeholder intelligence. A former Wall Street Journal reporter, he brings investigative rigor to stakeholder strategy, media positioning, and data-backed public affairs advisory.",
      nl: "Ariën Stuijt is Managing Partner en medeoprichter van Duke Strategies met 17 jaar ervaring in journalistiek, strategische communicatie en AI-gestuurde stakeholder intelligence. Als voormalig verslaggever van de Wall Street Journal brengt hij onderzoeksmatige scherpte in stakeholderstrategie, mediapositionering en datagedreven public affairs-advies.",
    },
    email: "arien.stuijt@dukestrategies.eu",
  },
];

export const expertPartners: TeamCard[] = [
  {
    name: "Pieter Cobelens",
    title: { en: "Expert Partner", nl: "Expert Partner" },
    image: "/assets/team/Pieter-Cobelens.jpg",
    alt: "Pieter Cobelens",
    bio: {
      en: "Retired Major General and former Director of the Dutch Military Intelligence and Security Service (MIVD), Pieter Cobelens brings intelligence-grade geopolitical risk analysis, threat assessment, and crisis management experience to highly sensitive stakeholder environments.",
      nl: "Gepensioneerd generaal-majoor en voormalig directeur van de Militaire Inlichtingen- en Veiligheidsdienst (MIVD), Pieter Cobelens brengt geopolitieke risicoanalyse, dreigingsbeoordeling en crisis management-ervaring van inlichtingenniveau in bij zeer gevoelige stakeholderomgevingen.",
    },
  },
  {
    name: "Thomas Tindemans",
    title: { en: "Expert Partner", nl: "Expert Partner" },
    image: "/assets/team/ThomasTindemans_grijs.jpg",
    alt: "Thomas Tindemans",
    bio: {
      en: "Thomas Tindemans is an independent EU public affairs advisor with deep expertise in regulatory issues, legislative procedure, and political developments across the EU institutions and member states. He previously led Hill & Knowlton Brussels and the public affairs practice at White & Case LLP.",
      nl: "Thomas Tindemans is een onafhankelijk EU public affairs-adviseur met diepgaande expertise in regelgevingskwesties, wetgevingsprocedures en politieke ontwikkelingen binnen de EU-instellingen en lidstaten. Hij leidde eerder Hill & Knowlton Brussel en de public affairs-praktijk bij White & Case LLP.",
    },
  },
  {
    name: "Bas van 't Wout",
    title: { en: "Expert Partner", nl: "Expert Partner" },
    image: "/assets/team/BasVantWout_grijs.jpg",
    alt: "Bas van 't Wout",
    bio: {
      en: "Former Minister of Economic Affairs and Climate Policy of the Netherlands, Bas van 't Wout advises clients on government relations, political strategy, and navigating the Dutch and European policy landscape in complex corporate contexts.",
      nl: "Voormalig minister van Economische Zaken en Klimaat, Bas van 't Wout adviseert cliënten over overheidsbetrekkingen, politieke strategie en het navigeren van het Nederlandse en Europese beleidslandschap in complexe bedrijfsmatige contexten.",
    },
  },
];

export const associates: TeamCard[] = [
  {
    name: "Wilgert Hart",
    title: { en: "Finance Associate", nl: "Finance Associate" },
    image: "/assets/team/Wilgert-Zwart-wit-1.jpg",
    alt: "Wilgert Hart",
    bio: {
      en: "Wilgert Hart oversees Duke Strategies' finance and administration processes. His background as CFO and controller across global professional services and media organizations brings operational rigor to the firm.",
      nl: "Wilgert Hart is verantwoordelijk voor de financiële en administratieve processen van Duke Strategies. Zijn achtergrond als CFO en controller bij internationale professionele dienstverleners en mediaorganisaties brengt operationele scherpte in het bedrijf.",
    },
  },
  {
    name: "William Masquelier",
    title: { en: "Data Analyst & Research Associate", nl: "Data Analyst & Research Associate" },
    image: "/assets/team/William-black-white-1.jpg",
    alt: "William Masquelier",
    bio: {
      en: "William Masquelier develops Duke Strategies' AI-driven stakeholder intelligence infrastructure, combining analytics, automation, and data pipelines to turn complex stakeholder environments into actionable strategic insight.",
      nl: "William Masquelier ontwikkelt de AI-gestuurde stakeholder intelligence-infrastructuur van Duke Strategies en combineert analyse, automatisering en datapipelines om complexe stakeholderomgevingen om te zetten in bruikbaar strategisch inzicht.",
    },
  },
  {
    name: "Emma van Gelder",
    title: { en: "Communications Associate", nl: "Communications Associate" },
    image: "/assets/team/Foto-Emma_zwartwit.jpg",
    alt: "Emma van Gelder",
    bio: {
      en: "Emma van Gelder focuses on brand narratives, stakeholder engagement, and corporate communications. She helps clients shape positioning that connects strategic intent with stakeholder expectations.",
      nl: "Emma van Gelder richt zich op merkverhalen, stakeholderbetrokkenheid en bedrijfscommunicatie. Zij helpt cliënten bij het vormgeven van een positionering die strategische intentie verbindt met de verwachtingen van stakeholders.",
    },
  },
];

export const affiliates: Affiliate[] = [
  {
    name: "Paritee",
    description: {
      en: "We are affiliated with Paritee, owner of the agencies GeelmuydenKiese in Scandinavia, Brands2Life in the UK and US, LHLK Gruppe in Germany and DVA Creative Technology Studio in Sweden.",
      nl: "Wij zijn geaffilieerd met Paritee, eigenaar van de bureaus GeelmuydenKiese in Scandinavië, Brands2Life in het Verenigd Koninkrijk en de VS, LHLK Gruppe in Duitsland en DVA Creative Technology Studio in Zweden.",
    },
    href: "https://paritee.com",
    label: {
      en: "Visit Paritee",
      nl: "Bezoek Paritee",
    },
  },
  {
    name: "Strait Insights",
    description: {
      en: "For consultancy support in the USA, we have an affiliation with Strait Insights, a board advisory firm from Charlotte, North Carolina, USA.",
      nl: "Voor adviesondersteuning in de VS hebben wij een samenwerking met Strait Insights, een bestuursadviesbureau uit Charlotte, North Carolina, VS.",
    },
    href: "https://straitinsights.com",
    label: {
      en: "Visit Strait Insights",
      nl: "Bezoek Strait Insights",
    },
  },
];

export const services: Service[] = [
  {
    slug: "strategic-advisory",
    name: { en: "Strategic Advisory", nl: "Strategisch advies" },
    tagline: {
      en: "Stakeholder-proof strategy for boards and leadership teams",
      nl: "Stakeholder-proof strategie voor bestuurders en leiderschapsteams",
    },
    description: {
      en: "High-level strategic counsel for boards, executives, and leadership teams navigating complex corporate, political, and societal challenges. We develop stakeholder-proof strategies that align business objectives with external expectations.",
      nl: "Strategisch advies op het hoogste niveau voor bestuurders, directies en leiderschapsteams die complexe bedrijfsmatige, politieke en maatschappelijke uitdagingen navigeren. Wij ontwikkelen stakeholder-proof strategieën die bedrijfsdoelstellingen afstemmen op externe verwachtingen.",
    },
    industries: [
      { en: "Energy", nl: "Energie" },
      { en: "Technology", nl: "Technologie" },
      { en: "Financial Services", nl: "Financiële dienstverlening" },
      { en: "Industrial", nl: "Industrie" },
      { en: "Public Sector", nl: "Publieke sector" },
    ],
    deliverables: [
      { en: "Strategic Assessment", nl: "Strategische beoordeling" },
      { en: "Stakeholder Strategy", nl: "Stakeholderstrategie" },
      { en: "Position Papers", nl: "Positiedocumenten" },
      { en: "Board Advisory Reports", nl: "Bestuursadviesrapporten" },
    ],
    longform: {
      challenge: {
        en: "Leadership teams face increasingly complex stakeholder landscapes where corporate strategy, political dynamics, and societal expectations collide. Without a unified framework, strategic decisions risk blind spots that erode trust and derail execution.",
        nl: "Leiderschapsteams worden geconfronteerd met steeds complexere stakeholderlandschappen waarin bedrijfsstrategie, politieke dynamiek en maatschappelijke verwachtingen samenkomen. Zonder een samenhangend kader lopen strategische beslissingen het risico op blinde vlekken die vertrouwen ondermijnen en uitvoering vertragen.",
      },
      approach: [
        { en: "Map the full stakeholder landscape using proprietary AI-driven analysis", nl: "Het volledige stakeholderlandschap in kaart brengen met behulp van eigen AI-gestuurde analyse" },
        { en: "Conduct structured interviews with board members and key executives", nl: "Gestructureerde interviews voeren met bestuursleden en belangrijke bestuurders" },
        { en: "Identify strategic vulnerabilities and misalignments between intent and perception", nl: "Strategische kwetsbaarheden en discrepanties tussen intentie en perceptie identificeren" },
        { en: "Develop a stakeholder-proof strategy that integrates business goals with external realities", nl: "Een stakeholder-proof strategie ontwikkelen die bedrijfsdoelen integreert met externe realiteiten" },
        { en: "Deliver board-ready advisory reports with clear decision points", nl: "Bestuursklare adviesrapporten opleveren met heldere beslispunten" },
      ],
      signals: [
        { en: "Your board is navigating a politically sensitive strategic shift", nl: "Uw bestuur navigeert een politiek gevoelige strategische koerswijziging" },
        { en: "External stakeholders are misaligned with your corporate direction", nl: "Externe stakeholders zijn niet op één lijn met uw bedrijfsrichting" },
        { en: "You need an independent strategic assessment before a major decision", nl: "U heeft een onafhankelijke strategische beoordeling nodig vóór een belangrijke beslissing" },
        { en: "Internal strategy documents don't account for external stakeholder dynamics", nl: "Interne strategiedocumenten houden geen rekening met externe stakeholderdynamiek" },
      ],
    },
  },
  {
    slug: "crisis-communications",
    name: { en: "Crisis Communications", nl: "Crisiscommunicatie" },
    tagline: {
      en: "Rapid-response crisis management that protects reputation",
      nl: "Snelle crisisrespons die reputatie beschermt",
    },
    description: {
      en: "Rapid-response crisis management and communications support. From preparation and simulation to real-time crisis management, we help organizations protect their reputation and maintain stakeholder confidence during high-pressure situations.",
      nl: "Snelle crisisrespons en communicatieondersteuning. Van voorbereiding en simulatie tot real-time crisis management helpen wij organisaties hun reputatie te beschermen en het vertrouwen van stakeholders te behouden onder hoge druk.",
    },
    industries: [
      { en: "Energy", nl: "Energie" },
      { en: "Technology", nl: "Technologie" },
      { en: "Financial Services", nl: "Financiële dienstverlening" },
      { en: "Industrial", nl: "Industrie" },
      { en: "Healthcare", nl: "Gezondheidszorg" },
    ],
    deliverables: [
      { en: "Crisis Preparedness Audit", nl: "Crisis Preparedness Audit" },
      { en: "Crisis Communications Plan", nl: "Crisiscommunicatieplan" },
      { en: "Media Response Protocols", nl: "Mediaresponsprotocollen" },
      { en: "Stakeholder Notification Framework", nl: "Stakeholder Notificatie Framework" },
      { en: "Post-Crisis Recovery Strategy", nl: "Post-crisis Recovery Strategy" },
    ],
    longform: {
      challenge: {
        en: "Crises are unpredictable, but the damage they cause is not. Organizations that lack preparation lose control of the narrative within hours, face lasting reputational harm, and struggle to regain stakeholder confidence.",
        nl: "Crises zijn onvoorspelbaar, maar de schade die zij veroorzaken niet. Organisaties die niet voorbereid zijn, verliezen binnen enkele uren de controle over het narratief, ondervinden blijvende reputatieschade en worstelen om het vertrouwen van stakeholders te herwinnen.",
      },
      approach: [
        { en: "Audit existing crisis preparedness against industry benchmarks", nl: "Bestaande crisisparaatheid toetsen aan benchmarks in de sector" },
        { en: "Design a crisis communications plan with clear escalation paths", nl: "Een crisiscommunicatieplan ontwerpen met duidelijke escalatiepaden" },
        { en: "Develop media response protocols and stakeholder notification frameworks", nl: "Mediaresponsprotocollen en stakeholder notificatie frameworks ontwikkelen" },
        { en: "Run crisis simulation exercises with leadership teams", nl: "Crisissimulatieoefeningen uitvoeren met leiderschapsteams" },
        { en: "Provide real-time crisis management support during active incidents", nl: "Real-time crisis management-ondersteuning bieden tijdens actieve incidenten" },
        { en: "Execute post-crisis recovery and reputation rebuilding strategies", nl: "Post-crisisherstel- en reputatieopbouwstrategieën uitvoeren" },
      ],
      signals: [
        { en: "You have no formal crisis communications plan or it hasn't been tested", nl: "U heeft geen formeel crisiscommunicatieplan of het is niet getest" },
        { en: "A crisis is unfolding and you need immediate expert support", nl: "Er ontvouwt zich een crisis en u heeft onmiddellijke expertondersteuning nodig" },
        { en: "Your industry is entering a period of heightened regulatory or public scrutiny", nl: "Uw sector betreedt een periode van verhoogd toezicht door toezichthouders of het publiek" },
        { en: "A previous crisis exposed gaps in your communications response", nl: "Een eerdere crisis heeft lacunes in uw communicatierespons blootgelegd" },
      ],
    },
  },
  {
    slug: "stakeholder-mapping",
    name: { en: "Stakeholder Mapping & Engagement", nl: "Stakeholder Mapping & Engagement" },
    tagline: {
      en: "AI-driven stakeholder intelligence and engagement strategy",
      nl: "AI-gestuurde stakeholder intelligence en engagementstrategie",
    },
    description: {
      en: "AI-driven stakeholder identification, mapping, and engagement strategy. We use proprietary analytics to map influence networks, assess sentiment, and design targeted engagement programs that build coalitions and neutralize opposition.",
      nl: "AI-gestuurde stakeholderidentificatie, mapping en engagementstrategie. Wij gebruiken eigen analysetools om invloedsnetwerken in kaart te brengen, sentiment te beoordelen en gerichte engagementprogramma's te ontwerpen die coalities bouwen en oppositie neutraliseren.",
    },
    industries: [
      { en: "Energy", nl: "Energie" },
      { en: "Technology", nl: "Technologie" },
      { en: "Infrastructure", nl: "Infrastructuur" },
      { en: "Public Sector", nl: "Publieke sector" },
      { en: "Financial Services", nl: "Financiële dienstverlening" },
    ],
    deliverables: [
      { en: "Stakeholder Map & Influence Analysis", nl: "Stakeholderkaart & invloedsanalyse" },
      { en: "Sentiment Analysis Report", nl: "Sentiment Analysis Report" },
      { en: "Engagement Strategy & Playbook", nl: "Engagement Strategy & Playbook" },
      { en: "Coalition Building Plan", nl: "Coalitievormingsplan" },
      { en: "Monitoring Dashboard", nl: "Monitoring Dashboard" },
    ],
    longform: {
      challenge: {
        en: "Traditional stakeholder analysis relies on intuition and outdated lists. In complex regulatory, political, and commercial environments, this approach misses hidden influencers, underestimates opposition, and leads to reactive rather than proactive engagement.",
        nl: "Traditionele stakeholderanalyse steunt op intuïtie en verouderde lijsten. In complexe regelgevende, politieke en commerciële omgevingen mist deze aanpak verborgen beïnvloeders, onderschat oppositie en leidt tot reactief in plaats van proactief engagement.",
      },
      approach: [
        { en: "Deploy AI-driven analysis to identify and map all relevant stakeholders", nl: "AI-gestuurde analyse inzetten om alle relevante stakeholders te identificeren en in kaart te brengen" },
        { en: "Assess influence networks, sentiment, and likely positions on key issues", nl: "Invloedsnetwerken, sentiment en waarschijnlijke posities ten aanzien van kernkwesties beoordelen" },
        { en: "Segment stakeholders by influence, alignment, and engagement priority", nl: "Stakeholders segmenteren op invloed, afstemming en engagement prioriteit" },
        { en: "Design targeted engagement playbooks for each segment", nl: "Gerichte engagement playbooks ontwerpen voor elk segment" },
        { en: "Build coalition strategies around shared interests", nl: "Coalitiestrategieën bouwen rond gedeelde belangen" },
        { en: "Establish ongoing monitoring dashboards to track shifts in sentiment and influence", nl: "Doorlopende monitoring dashboards inrichten om verschuivingen in sentiment en invloed te volgen" },
      ],
      signals: [
        { en: "You're entering a new market or jurisdiction with unfamiliar stakeholder dynamics", nl: "U betreedt een nieuwe markt of jurisdictie met onbekende stakeholderdynamiek" },
        { en: "A major project requires regulatory or political stakeholder buy-in", nl: "Een groot project vereist draagvlak bij toezichthouders of politieke stakeholders" },
        { en: "You suspect opposition is forming but can't see the full picture", nl: "U vermoedt dat er oppositie ontstaat maar kunt het volledige beeld niet overzien" },
        { en: "Your current stakeholder engagement feels generic and underperforming", nl: "Uw huidige stakeholderengagement voelt generiek en onderpresteert" },
      ],
    },
  },
  {
    slug: "ma-communications",
    name: { en: "M&A Communications", nl: "M&A-communicatie" },
    tagline: {
      en: "Strategic narrative control for transactions and corporate deals",
      nl: "Strategische narratiefcontrole voor transacties en bedrijfsdeals",
    },
    description: {
      en: "Strategic communications counsel for mergers, acquisitions, and corporate transactions. We manage the narrative across stakeholder groups, from regulators and media to employees and shareholders.",
      nl: "Strategisch communicatieadvies voor fusies, overnames en bedrijfstransacties. Wij beheren het narratief over alle stakeholdergroepen heen, van toezichthouders en media tot werknemers en aandeelhouders.",
    },
    industries: [
      { en: "Technology", nl: "Technologie" },
      { en: "Financial Services", nl: "Financiële dienstverlening" },
      { en: "Industrial", nl: "Industrie" },
      { en: "Energy", nl: "Energie" },
      { en: "Healthcare", nl: "Gezondheidszorg" },
    ],
    deliverables: [
      { en: "Transaction Communications Strategy", nl: "Transaction Communications Strategy" },
      { en: "Stakeholder Messaging Matrix", nl: "Stakeholder Messaging Matrix" },
      { en: "Media Management Plan", nl: "Mediamanagementplan" },
      { en: "Employee Communications Program", nl: "Employee Communications Programma" },
      { en: "Regulatory Narrative", nl: "Regulatory Narrative" },
    ],
    longform: {
      challenge: {
        en: "M&A transactions generate intense stakeholder scrutiny. Employees fear for their jobs, regulators question market impact, media speculate, and shareholders demand clarity. Without a coordinated communications strategy, the narrative fragments and deal value erodes.",
        nl: "M&A-transacties genereren intensief stakeholdertoezicht. Werknemers vrezen voor hun baan, toezichthouders bevragen de marktimpact, media speculeren en aandeelhouders eisen duidelijkheid. Zonder een gecoördineerde communicatiestrategie versplintert het narratief en erodeert de dealwaarde.",
      },
      approach: [
        { en: "Develop a transaction communications strategy aligned with deal milestones", nl: "Een transactiecommunicatiestrategie ontwikkelen die aansluit bij deal milestones" },
        { en: "Create a stakeholder messaging matrix — different messages for different audiences", nl: "Een stakeholder messaging matrix opstellen — verschillende boodschappen voor verschillende doelgroepen" },
        { en: "Design media management plans for announcement day and beyond", nl: "Mediamanagementplannen ontwerpen voor de aankondigingsdag en daarna" },
        { en: "Build employee communications programs that maintain morale and retention", nl: "Employee communications programma's opzetten die moreel en retentie waarborgen" },
        { en: "Craft regulatory narratives that support deal approval", nl: "Regulatory narratives opstellen die dealgoedkeuring ondersteunen" },
        { en: "Manage post-close integration communications", nl: "Communicatie na sluiting en integratie beheren" },
      ],
      signals: [
        { en: "A merger or acquisition is in planning or due diligence phase", nl: "Een fusie of overname bevindt zich in de plannings- of due diligence-fase" },
        { en: "You need to announce a deal and control the narrative across stakeholder groups", nl: "U moet een deal aankondigen en het narratief over alle stakeholdergroepen beheersen" },
        { en: "Employees are anxious about a pending transaction", nl: "Werknemers zijn ongerust over een aanstaande transactie" },
        { en: "Regulatory scrutiny of a deal requires a clear public affairs narrative", nl: "Toezicht van toezichthouders op een deal vereist een helder public affairs-narratief" },
      ],
    },
  },
  {
    slug: "media-training",
    name: { en: "Media Training & Positioning", nl: "Mediatraining & positionering" },
    tagline: {
      en: "Preparing leaders for high-stakes media and public moments",
      nl: "Leiders voorbereiden op mediamomenten en publieke optredens onder hoge druk",
    },
    description: {
      en: "Executive media training and public positioning programs. We prepare leaders for high-stakes media interactions, public appearances, and thought leadership campaigns.",
      nl: "Executive mediatraining en publieke positioneringsprogramma's. Wij bereiden leiders voor op mediamomenten onder hoge druk, publieke optredens en thought leadership-campagnes.",
    },
    industries: [
      { en: "All Sectors", nl: "Alle sectoren" },
    ],
    deliverables: [
      { en: "Media Training Sessions", nl: "Mediatrainingssessies" },
      { en: "Key Message Documents", nl: "Key Message Documents" },
      { en: "Interview Simulation Reports", nl: "Interview Simulatie Rapportages" },
      { en: "Thought Leadership Strategy", nl: "Thought leadership-strategie" },
      { en: "Speaker Briefing Packs", nl: "Speaker Briefing Packs" },
    ],
    longform: {
      challenge: {
        en: "Senior leaders are often the public face of their organization but lack the skills to perform under media pressure. A poorly handled interview or public appearance can undo months of careful strategy and damage credibility with key stakeholders.",
        nl: "Senior leiders zijn vaak het publieke gezicht van hun organisatie maar missen de vaardigheden om te presteren onder mediadruk. Een slecht afgehandeld interview of publiek optreden kan maanden van zorgvuldige strategie ongedaan maken en de geloofwaardigheid bij belangrijke stakeholders schaden.",
      },
      approach: [
        { en: "Assess each executive's current media presence and communication style", nl: "De huidige media presence en communicatiestijl van elke bestuurder beoordelen" },
        { en: "Develop tailored key messages aligned with corporate strategy", nl: "Op maat gemaakte kernboodschappen ontwikkelen die aansluiten bij de bedrijfsstrategie" },
        { en: "Run intensive media training sessions with realistic interview simulations", nl: "Intensieve mediatrainingssessies uitvoeren met realistische interviewsimulaties" },
        { en: "Provide detailed feedback and coaching on message delivery, body language, and bridging techniques", nl: "Gedetailleerde feedback en coaching bieden over berichtgeving, lichaamstaal en bridging technieken" },
        { en: "Design thought leadership positioning strategies for sustained public presence", nl: "Thought leadership-positioneringsstrategieën ontwerpen voor duurzame publieke aanwezigheid" },
        { en: "Prepare speaker briefing packs for specific events and appearances", nl: "Speaker briefing packs voorbereiden voor specifieke evenementen en optredens" },
      ],
      signals: [
        { en: "A CEO or board member will face media for the first time or in a new context", nl: "Een CEO of bestuurslid gaat voor het eerst of in een nieuwe context de media tegemoet" },
        { en: "An upcoming AGM, investor day, or public hearing requires executive preparation", nl: "Een aanstaande AVA, beleggersdag of openbare hoorzitting vereist voorbereiding van bestuurders" },
        { en: "Your organization wants to build thought leadership visibility for key leaders", nl: "Uw organisatie wil thought leadership-zichtbaarheid opbouwen voor belangrijke leiders" },
        { en: "A previous media interaction went poorly and you need to rebuild confidence", nl: "Een eerdere media-interactie is slecht verlopen en u moet het vertrouwen herstellen" },
      ],
    },
  },
  {
    slug: "change-management",
    name: { en: "Change Management Communications", nl: "Change Management Communicatie" },
    tagline: {
      en: "Communications that drive adoption and reduce resistance",
      nl: "Communicatie die adoptie stimuleert en weerstand vermindert",
    },
    description: {
      en: "Internal and external communications strategy for organizational transformation. We design and execute communication programs that build understanding, reduce resistance, and accelerate adoption.",
      nl: "Interne en externe communicatiestrategie voor organisatietransformatie. Wij ontwerpen en voeren communicatieprogramma's uit die begrip bevorderen, weerstand verminderen en adoptie versnellen.",
    },
    industries: [
      { en: "Technology", nl: "Technologie" },
      { en: "Financial Services", nl: "Financiële dienstverlening" },
      { en: "Industrial", nl: "Industrie" },
      { en: "Public Sector", nl: "Publieke sector" },
      { en: "Healthcare", nl: "Gezondheidszorg" },
    ],
    deliverables: [
      { en: "Change Communications Strategy", nl: "Change Communications Strategy" },
      { en: "Internal Messaging Framework", nl: "Internal Messaging Framework" },
      { en: "Leadership Talking Points", nl: "Leadership Talking Points" },
      { en: "Employee Engagement Plan", nl: "Employee Engagement Plan" },
      { en: "Progress Communications", nl: "Voortgangscommunicatie" },
    ],
    longform: {
      challenge: {
        en: "Organizational transformations fail when people don't understand, believe in, or feel part of the change. Without deliberate communications, resistance builds quietly and execution stalls — even when the strategy is sound.",
        nl: "Organisatietransformaties mislukken wanneer mensen de verandering niet begrijpen, er niet in geloven of zich er geen deel van voelen. Zonder bewuste communicatie bouwt weerstand zich stilletjes op en stokt de uitvoering — zelfs wanneer de strategie inhoudelijk klopt.",
      },
      approach: [
        { en: "Diagnose the change landscape — who is affected, how, and what they need to hear", nl: "Het veranderlandschap diagnosticeren — wie is betrokken, hoe, en wat zij moeten horen" },
        { en: "Design a change communications strategy integrated with the transformation timeline", nl: "Een change communications strategy ontwerpen die is geïntegreerd met de transformatietijdlijn" },
        { en: "Create internal messaging frameworks that cascade consistently through leadership levels", nl: "Internal messaging frameworks opstellen die consistent doorsijpelen via alle leiderschapsniveaus" },
        { en: "Develop leadership talking points and equip managers to be change ambassadors", nl: "Leadership talking points ontwikkelen en managers uitrusten als veranderambassadeurs" },
        { en: "Build employee engagement programs with feedback loops", nl: "Employee engagement programma's opzetten met feedback loops" },
        { en: "Deliver progress communications that maintain momentum and celebrate milestones", nl: "Voortgangscommunicatie leveren die momentum vasthoudt en mijlpalen viert" },
      ],
      signals: [
        { en: "A major restructuring, merger integration, or digital transformation is planned", nl: "Er is een grote herstructurering, fusie-integratie of digitale transformatie gepland" },
        { en: "Employee engagement or morale is declining during an ongoing change program", nl: "Employee engagement of moreel daalt tijdens een lopend veranderprogramma" },
        { en: "Leadership messages are inconsistent or not landing with the workforce", nl: "Leiderschapsboodschappen zijn inconsistent of komen niet aan bij het personeel" },
        { en: "You need a structured communications plan to support a transformation already in progress", nl: "U heeft een gestructureerd communicatieplan nodig ter ondersteuning van een reeds lopende transformatie" },
      ],
    },
  },
];

// Deprecated — capabilities are now consolidated into services.
// Kept as empty export for backward compatibility with type imports.
export const capabilities: Capability[] = [];

export const academyPrograms: AcademyProgram[] = [
  {
    title: {
      en: "Executive Presentation Training",
      nl: "Executive Presentatietraining",
    },
    description: {
      en: "Master the art of strategic and investor pitches. Learn to structure compelling narratives that resonate with boards, shareholders, and senior leadership audiences.",
      nl: "Beheers de kunst van strategische en beleggerspresentaties. Leer overtuigende verhaallijnen te structureren die resoneren bij bestuurders, aandeelhouders en senior leiderschapsdoelgroepen.",
    },
    icon: "presentation",
  },
  {
    title: {
      en: "Media Training",
      nl: "Mediatraining",
    },
    description: {
      en: "Prepare for interviews and public appearances with confidence. Develop techniques to stay on message, handle tough questions, and project authority under scrutiny.",
      nl: "Bereid u met vertrouwen voor op interviews en publieke optredens. Ontwikkel technieken om bij uw boodschap te blijven, lastige vragen te hanteren en autoriteit uit te stralen onder toezicht.",
    },
    icon: "edit",
  },
  {
    title: {
      en: "Stakeholder Dialogue Training",
      nl: "Stakeholderdialoogtraining",
    },
    description: {
      en: "Navigate high-stakes conversations with diverse stakeholders. Build skills for productive dialogue with investors, regulators, employees, and community leaders.",
      nl: "Navigeer gesprekken onder hoge druk met diverse stakeholders. Bouw vaardigheden op voor productieve dialoog met investeerders, toezichthouders, werknemers en maatschappelijke leiders.",
    },
    icon: "users",
  },
  {
    title: {
      en: "Crisis Communication Training",
      nl: "Crisiscommunicatietraining",
    },
    description: {
      en: "Perform under pressure when it matters most. Develop the composure, clarity, and decisiveness needed to lead communications through crisis situations.",
      nl: "Presteer onder druk wanneer het er het meest toe doet. Ontwikkel de kalmte, helderheid en vastberadenheid die nodig zijn om communicatie door crisissituaties te leiden.",
    },
    icon: "bolt",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: {
      en: "Corporate Reputation Recovery for European Industrial Group",
      nl: "Reputatieherstel voor een Europese industriële groep",
    },
    industry: { en: "Industrial / Manufacturing", nl: "Industrie / Productie" },
    challenge: {
      en: "A major European industrial group faced a severe reputational crisis following environmental compliance failures at multiple production facilities. Negative media coverage escalated rapidly, regulatory investigations were launched in three jurisdictions, and key institutional investors signaled concerns about governance oversight.",
      nl: "Een grote Europese industriële groep werd geconfronteerd met een ernstige reputatiecrisis na milieucompliance-tekortkomingen bij meerdere productiefaciliteiten. Negatieve mediaberichtgeving escaleerde snel, er werden regelgevingsonderzoeken gestart in drie jurisdicties en belangrijke institutionele beleggers gaven zorgen aan over het governance-toezicht.",
    },
    shortSummary: {
      en: "When a major European industrial group faced a multi-front reputational crisis involving regulatory scrutiny, media pressure and stakeholder erosion, Duke Strategies was brought in to map the full stakeholder landscape, develop a unified narrative and execute a structured recovery plan across all fronts simultaneously.",
      nl: "Toen een grote Europese industriële groep werd geconfronteerd met een reputatiecrisis op meerdere fronten — inclusief toezicht van toezichthouders, mediadruk en stakeholder-erosie — werd Duke Strategies ingeschakeld om het volledige stakeholderlandschap in kaart te brengen, een samenhangend narratief te ontwikkelen en een gestructureerd herstelplan op alle fronten tegelijk uit te voeren.",
    },
    team: { en: "Ingo Heijnen, Ariën Stuijt", nl: "Ingo Heijnen, Ariën Stuijt" },
    image: "/assets/images/cable-bridge-dark-sky-dramatic.jpg",
    imageAlt: { en: "Bridge architecture against a dark sky", nl: "Brugarchitectuur tegen een donkere lucht" },
    metrics: [
      { value: "3 weeks", label: { en: "Crisis contained", nl: "Crisis beheerst" } },
      { value: "80%", label: { en: "Share price recovery in 4 months", nl: "Koersherstel in 4 maanden" } },
      { value: "120+", label: { en: "Stakeholders engaged", nl: "Stakeholders betrokken" } },
      { value: "0", label: { en: "Additional sanctions", nl: "Aanvullende sancties" } },
    ],
  },
  {
    title: {
      en: "Cross-Border Technology Acquisition Communications",
      nl: "Communicatie bij grensoverschrijdende technologieovername",
    },
    industry: { en: "Technology", nl: "Technologie" },
    challenge: {
      en: "A European technology company was acquiring a US-based SaaS platform in a EUR 450M transaction that required regulatory approval in both the EU and US. The deal involved 800 employees at the target company, intense media interest in both markets, and complex stakeholder dynamics spanning customers, regulators, investors, and two distinct workforce cultures.",
      nl: "Een Europees technologiebedrijf nam een in de VS gevestigd SaaS-platform over in een transactie van EUR 450 miljoen die goedkeuring vereiste van toezichthouders in zowel de EU als de VS. De deal betrof 800 werknemers bij het doelbedrijf, intense media-aandacht in beide markten en complexe stakeholderdynamiek over klanten, toezichthouders, investeerders en twee afzonderlijke bedrijfsculturen.",
    },
    image: "/assets/images/cable-bridge-geometric-perspective.jpg",
    imageAlt: { en: "Geometric bridge perspective", nl: "Geometrisch brugperspectief" },
    metrics: [
      { value: "100%", label: { en: "Deal closed on schedule", nl: "Deal op schema gesloten" } },
      { value: "92%", label: { en: "Employee retention at 12 months", nl: "Personeelsretentie na 12 maanden" } },
      { value: "75%", label: { en: "Positive media coverage", nl: "Positieve mediaberichtgeving" } },
      { value: "8", label: { en: "Stakeholder groups managed", nl: "Stakeholdergroepen beheerd" } },
    ],
  },
  {
    title: {
      en: "AI-Driven Stakeholder Mapping for Energy Transition Program",
      nl: "AI-gestuurde Stakeholder Mapping voor energietransitieprogramma",
    },
    industry: { en: "Energy", nl: "Energie" },
    challenge: {
      en: "A European energy company was preparing a major renewable energy infrastructure program spanning three provinces, requiring engagement with over 500 stakeholders including local governments, environmental groups, landowners, and community organizations. Previous infrastructure projects had faced significant delays due to unexpected opposition coalitions.",
      nl: "Een Europees energiebedrijf bereidde een groot programma voor hernieuwbare energie-infrastructuur voor dat drie provincies bestreek en betrokkenheid vereiste van meer dan 500 stakeholders, waaronder lokale overheden, milieugroepen, grondeigenaren en maatschappelijke organisaties. Eerdere infrastructuurprojecten hadden aanzienlijke vertragingen opgelopen door onverwachte oppositiecoalities.",
    },
    image: "/assets/images/long-bridge-sunset-dramatic.jpg",
    imageAlt: { en: "Bridge at sunset", nl: "Brug bij zonsondergang" },
    metrics: [
      { value: "500+", label: { en: "Stakeholders mapped", nl: "Stakeholders in kaart gebracht" } },
      { value: "3", label: { en: "Opposition coalitions identified early", nl: "Oppositiecoalities vroegtijdig geïdentificeerd" } },
      { value: "4 months", label: { en: "Approval ahead of schedule", nl: "Goedkeuring voor op schema" } },
      { value: "78%", label: { en: "Community support achieved", nl: "Maatschappelijk draagvlak behaald" } },
    ],
  },
  {
    title: {
      en: "Technology Platform Regulatory & Government Relations Strategy",
      nl: "Regelgevings- en overheidsbetrekkingenstrategie voor technologieplatform",
    },
    industry: { en: "Technology", nl: "Technologie" },
    challenge: {
      en: "A global technology platform faced increasing regulatory pressure in the Netherlands and EU, with proposed legislation that could significantly impact its business model. The company had no established government relations function in the Netherlands and limited understanding of the political landscape and key decision-makers.",
      nl: "Een wereldwijd technologieplatform werd geconfronteerd met toenemende regelgevingsdruk in Nederland en de EU, met voorgestelde wetgeving die het bedrijfsmodel aanzienlijk zou kunnen beïnvloeden. Het bedrijf had geen gevestigde overheidsbetrekkingenfunctie in Nederland en beperkt inzicht in het politieke landschap en de belangrijkste besluitvormers.",
    },
    image: "/assets/images/modern-bridge-bw-dramatic.jpg",
    imageAlt: { en: "Modern bridge in black and white", nl: "Moderne brug in zwart-wit" },
    metrics: [
      { value: "25+", label: { en: "Political stakeholders engaged", nl: "Politieke stakeholders betrokken" } },
      { value: "3 of 5", label: { en: "Key positions in legislation", nl: "Kernposities in wetgeving" } },
      { value: "From 0", label: { en: "GR capability built", nl: "GR-capaciteit opgebouwd" } },
      { value: "12", label: { en: "Monthly intelligence reports", nl: "Maandelijkse inlichtingenrapporten" } },
    ],
  },
];

export const testimonials = [
  {
    quote: {
      en: "When the crisis hit, Duke Strategies did not just manage the media - they helped us understand our entire stakeholder landscape and rebuild trust systematically. Their combination of crisis experience and analytical rigour was exactly what we needed under pressure.",
      nl: "Toen de crisis toesloeg, beheerde Duke Strategies niet alleen de media — zij hielpen ons het volledige stakeholderlandschap te begrijpen en het vertrouwen systematisch te herstellen. Hun combinatie van crisiservaring en analytische grondigheid was precies wat wij nodig hadden onder druk.",
    },
    author: { en: "CEO, European Industrial Group", nl: "CEO, Europese industriële groep" },
  },
  {
    quote: {
      en: "Most communications advisors we had worked with relied on instinct. Duke brought data. Their stakeholder mapping showed us alliances and opposition risks we had completely missed, and that intelligence was decisive in getting our project approved ahead of schedule.",
      nl: "De meeste communicatieadviseurs waarmee wij hadden gewerkt vertrouwden op instinct. Duke bracht data. Hun stakeholder mapping toonde ons allianties en oppositierisico's die wij volledig hadden gemist, en die inlichtingen waren doorslaggevend bij het verkrijgen van goedkeuring voor ons project voor op schema.",
    },
    author: { en: "Head of External Affairs, European Energy Company", nl: "Hoofd External Affairs, Europees energiebedrijf" },
  },
  {
    quote: {
      en: "The deal was complex - two jurisdictions, 800 employees at the target, and intense media interest. Duke managed every stakeholder group with precision. The fact that we retained 92% of the target workforce speaks to the quality of their employee communications.",
      nl: "De deal was complex — twee jurisdicties, 800 werknemers bij het doelbedrijf en intense media-aandacht. Duke beheerde elke stakeholdergroep met precisie. Het feit dat wij 92% van het personeelsbestand van het doelbedrijf behielden, spreekt voor de kwaliteit van hun medewerkercommunicatie.",
    },
    author: { en: "General Counsel, European Technology Company", nl: "General Counsel, Europees technologiebedrijf" },
  },
  {
    quote: {
      en: "We needed to build government relations in the Netherlands from scratch, and we needed it fast. Duke's political insight gave us credibility we could not have built on our own.",
      nl: "Wij moesten overheidsbetrekkingen in Nederland vanuit het niets opbouwen, en dat moest snel. Het politieke inzicht van Duke gaf ons geloofwaardigheid die wij op eigen kracht niet hadden kunnen opbouwen.",
    },
    author: { en: "VP Government Affairs, Global Technology Platform", nl: "VP Government Affairs, wereldwijd technologieplatform" },
  },
];

export const insights: InsightItem[] = [
  {
    badge: { en: "Philosophy", nl: "Filosofie" },
    date: "Ingo Heijnen - March 2025",
    author: "Ingo Heijnen",
    title: {
      en: "Making business strategy stakeholder-proof",
      nl: "Bedrijfsstrategie stakeholder-proof maken",
    },
    excerpt: {
      en: "We scrutinise the motivation behind every strategic choice and advise on the adjustments needed to make those decisions credible and acceptable to internal and external stakeholders - before the communications even begin.",
      nl: "Wij onderzoeken de motivatie achter elke strategische keuze en adviseren over de aanpassingen die nodig zijn om die beslissingen geloofwaardig en aanvaardbaar te maken voor interne en externe stakeholders — voordat de communicatie zelfs maar begint.",
    },
    href: "https://www.consultancy.nl/nieuws/59605/hill-knowlton-veteranen-ingo-heijnen-en-arien-stuijt-starten-duke-strategies",
    linkLabel: { en: "Read the founding interview", nl: "Lees het oprichtingsinterview" },
    image: "/assets/insights/insight-01-founding.jpg",
    imageAlt: { en: "Ingo Heijnen and Ariën Stuijt launch Duke Strategies", nl: "Ingo Heijnen en Ariën Stuijt lanceren Duke Strategies" },
  },
  {
    badge: { en: "Perspective", nl: "Perspectief" },
    date: "Ariën Stuijt - March 2025",
    author: "Ariën Stuijt",
    title: {
      en: "Stakeholders see through the nonsense",
      nl: "Stakeholders prikken door de onzin heen",
    },
    excerpt: {
      en: "Too many companies still try to promote strategically flawed decisions - problematic acquisitions, disproportionate bonuses, unexplainable product choices - and then scramble to repair the damage. Modern stakeholders will not let that pass.",
      nl: "Nog steeds proberen te veel bedrijven strategisch gebrekkige beslissingen te promoten — problematische overnames, disproportionele bonussen, onverklaarbare productkeuzes — om vervolgens de schade te herstellen. Moderne stakeholders laten dat niet passeren.",
    },
    href: "https://mena.nl/artikel/ingo-heijnen-en-arien-stuijt-beginnen-nieuw-adviesbureau/",
    linkLabel: { en: "Read on M&A Magazine", nl: "Lees op M&A Magazine" },
    image: "/assets/insights/insight-02-mena-launch.jpg",
    imageAlt: { en: "M&A Magazine coverage of Duke Strategies launch", nl: "M&A Magazine-berichtgeving over de lancering van Duke Strategies" },
  },
  {
    badge: { en: "Capability", nl: "Capability" },
    date: "Duke Strategies - 2025",
    author: "Duke Strategies",
    title: {
      en: "Where AI meets stakeholder intelligence",
      nl: "Waar AI stakeholder intelligence ontmoet",
    },
    excerpt: {
      en: "Duke's data capability turns complex stakeholder ecosystems into actionable maps. AI-driven analytics identify influence networks, assess sentiment, and anticipate opposition coalitions - grounding strategic advice in evidence rather than instinct.",
      nl: "De datacapaciteit van Duke transformeert complexe stakeholder-ecosystemen in bruikbare kaarten. AI-gestuurde analyses identificeren invloedsnetwerken, beoordelen sentiment en anticiperen op oppositiecoalities — strategisch advies gefundeerd op bewijs in plaats van instinct.",
    },
    href: "https://www.consultancy.nl/nieuws/61667/duke-strategies-breidt-team-uit-met-emma-van-gelder-en-william-masquelier",
    linkLabel: { en: "Read team announcement", nl: "Lees de teamaankondiging" },
    image: "/assets/insights/insight-03-team.jpg",
    imageAlt: { en: "Duke Strategies team expansion announcement", nl: "Aankondiging uitbreiding team Duke Strategies" },
  },
  {
    badge: { en: "M&A", nl: "M&A" },
    date: "Ingo Heijnen - Archive",
    author: "Ingo Heijnen",
    title: {
      en: "Know your stakeholders before you need them",
      nl: "Ken uw stakeholders voordat u ze nodig heeft",
    },
    excerpt: {
      en: "In cross-border M&A, Dutch politics, works councils and industry associations increasingly shape the outcome. The lesson from two decades of deal advisory: build the stakeholder coalition long before an unsolicited bid forces your hand.",
      nl: "Bij grensoverschrijdende M&A bepalen de Nederlandse politiek, ondernemingsraden en brancheverenigingen steeds vaker de uitkomst. De les uit twee decennia dealadvies: bouw de stakeholdercoalitie ruim voordat een ongevraagd bod uw hand forceert.",
    },
    href: "https://mena.nl/artikel/kopers-en-verkopers-ken-uw-stakeholders-voordat-u-ze-nodig-hebt/",
    linkLabel: { en: "Read the article", nl: "Lees het artikel" },
    image: "/assets/insights/insight-04-stakeholders.jpg",
    imageAlt: { en: "Stakeholder mapping for cross-border M&A", nl: "Stakeholder mapping voor grensoverschrijdende M&A" },
  },
  {
    badge: { en: "ESG", nl: "ESG" },
    date: "Ingo Heijnen - Archive",
    author: "Ingo Heijnen",
    title: {
      en: "COVID put ESG firmly on the boardroom agenda",
      nl: "COVID zette ESG stevig op de bestuurskameragenda",
    },
    excerpt: {
      en: "Three-quarters of Dutch institutional investors now treat ESG as decisive. ESG stopped being a disclosure exercise and became a strategic filter for boards, investors, and stakeholders.",
      nl: "Driekwart van de Nederlandse institutionele beleggers beschouwt ESG nu als doorslaggevend. ESG is geen rapportageoefening meer maar een strategisch filter voor bestuurders, investeerders en stakeholders.",
    },
    href: "https://mena.nl/artikel/covid19-zet-esg-prominent-op-de-agenda/",
    linkLabel: { en: "Read the perspective", nl: "Lees het perspectief" },
    image: "/assets/insights/insight-05-esg.jpg",
    imageAlt: { en: "ESG moves to the top of the boardroom agenda", nl: "ESG verschuift naar de top van de bestuurskameragenda" },
  },
  {
    badge: { en: "Restructuring", nl: "Herstructurering" },
    date: "Ingo Heijnen & Tanno Massar - Archive",
    author: "Ingo Heijnen & Tanno Massar",
    title: {
      en: "Credibility and reputation are central to a pre-pack",
      nl: "Geloofwaardigheid en reputatie staan centraal bij een pre-pack",
    },
    excerpt: {
      en: "Pre-pack restructurings only work when stakeholders believe in the restart. That belief is not earned by press releases; it is built through meticulous stakeholder scenario planning before the filing.",
      nl: "Pre-pack herstructureringen werken alleen wanneer stakeholders geloven in de herstart. Dat geloof wordt niet verdiend met persberichten; het wordt opgebouwd door zorgvuldige stakeholder scenario planning vóór de indiening.",
    },
    href: "https://mena.nl/artikel/behoud-van-geloofwaardigheid-en-reputatie-centraal-bij-prepack/",
    linkLabel: { en: "Read the archive piece", nl: "Lees het archiefstuk" },
    image: "/assets/insights/insight-06-prepack.jpg",
    imageAlt: { en: "Credibility and reputation in pre-pack restructurings", nl: "Geloofwaardigheid en reputatie bij pre-pack herstructureringen" },
  },
];

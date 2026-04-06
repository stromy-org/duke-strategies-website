export type Founder = {
  name: string;
  title: string;
  image: string;
  alt: string;
  bio: string;
  email: string;
};

export type TeamCard = {
  name: string;
  title: string;
  image: string;
  alt: string;
  bio: string;
};

export type Affiliate = {
  name: string;
  description: string;
  href: string;
  label: string;
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  industries: string[];
  deliverables: string[];
  longform: {
    challenge: string;
    approach: string[];
    signals: string[];
  };
};

export type CaseStudy = {
  title: string;
  industry: string;
  challenge: string;
  shortSummary?: string;
  team?: string;
  image: string;
  imageAlt: string;
  metrics: Array<{ value: string; label: string }>;
};

export type InsightItem = {
  badge: string;
  date: string;
  author: string;
  title: string;
  excerpt: string;
  href: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
};

export type AcademyProgram = {
  title: string;
  description: string;
  icon: string;
};

export type Capability = {
  title: string;
  icon: string;
};

export const founders: Founder[] = [
  {
    name: "Ingo Heijnen",
    title: "Managing Partner",
    image: "/assets/team/IngoHeijnen_grijs.jpg",
    alt: "Ingo Heijnen",
    bio: "Ingo Heijnen is Managing Partner and co-founder of Duke Strategies with 27 years of experience in strategic communications and public affairs. As former CEO of Hill+Knowlton Strategies Netherlands, he advised boards and C-suites on crisis management, M&A communications, and corporate governance across high-pressure sectors.",
    email: "ingo.heijnen@dukestrategies.eu",
  },
  {
    name: "Arien Stuijt",
    title: "Managing Partner",
    image: "/assets/team/ArienStuijt_grijs.jpg",
    alt: "Arien Stuijt",
    bio: "Arien Stuijt is Managing Partner and co-founder of Duke Strategies with 17 years of experience spanning journalism, strategic communications, and AI-driven stakeholder intelligence. A former Wall Street Journal reporter, he brings investigative rigor to stakeholder strategy, media positioning, and data-backed public affairs advisory.",
    email: "arien.stuijt@dukestrategies.eu",
  },
];

export const expertPartners: TeamCard[] = [
  {
    name: "Pieter Cobelens",
    title: "Expert Partner",
    image: "/assets/team/Pieter-Cobelens.jpg",
    alt: "Pieter Cobelens",
    bio: "Retired Major General and former Director of the Dutch Military Intelligence and Security Service (MIVD), Pieter Cobelens brings intelligence-grade geopolitical risk analysis, threat assessment, and crisis management experience to highly sensitive stakeholder environments.",
  },
  {
    name: "Thomas Tindemans",
    title: "Expert Partner",
    image: "/assets/team/ThomasTindemans_grijs.jpg",
    alt: "Thomas Tindemans",
    bio: "Thomas Tindemans is an independent EU public affairs advisor with deep expertise in regulatory issues, legislative procedure, and political developments across the EU institutions and member states. He previously led Hill & Knowlton Brussels and the public affairs practice at White & Case LLP.",
  },
  {
    name: "Bas van 't Wout",
    title: "Expert Partner",
    image: "/assets/team/BasVantWout_grijs.jpg",
    alt: "Bas van 't Wout",
    bio: "Former Minister of Economic Affairs and Climate Policy of the Netherlands, Bas van 't Wout advises clients on government relations, political strategy, and navigating the Dutch and European policy landscape in complex corporate contexts.",
  },
];

export const associates: TeamCard[] = [
  {
    name: "Wilgert Hart",
    title: "Finance Associate",
    image: "/assets/team/Wilgert-Zwart-wit-1.jpg",
    alt: "Wilgert Hart",
    bio: "Wilgert Hart oversees Duke Strategies' finance and administration processes. His background as CFO and controller across global professional services and media organizations brings operational rigor to the firm.",
  },
  {
    name: "William Masquelier",
    title: "Data Analyst & Research Associate",
    image: "/assets/team/William-black-white-1.jpg",
    alt: "William Masquelier",
    bio: "William Masquelier develops Duke Strategies' AI-driven stakeholder intelligence infrastructure, combining analytics, automation, and data pipelines to turn complex stakeholder environments into actionable strategic insight.",
  },
  {
    name: "Emma van Gelder",
    title: "Communications Associate",
    image: "/assets/team/Foto-Emma_zwartwit.jpg",
    alt: "Emma van Gelder",
    bio: "Emma van Gelder focuses on brand narratives, stakeholder engagement, and corporate communications. She helps clients shape positioning that connects strategic intent with stakeholder expectations.",
  },
];

export const affiliates: Affiliate[] = [
  {
    name: "Paritee",
    description:
      "We are affiliated with Paritee, owner of the agencies GeelmuydenKiese in Scandinavia, Brands2Life in the UK and US, LHLK Gruppe in Germany and DVA Creative Technology Studio in Sweden.",
    href: "https://paritee.com",
    label: "Visit Paritee",
  },
  {
    name: "Strait Insights",
    description:
      "For consultancy support in the USA, we have an affiliation with Strait Insights, a board advisory firm from Charlotte, North Carolina, USA.",
    href: "https://straitinsights.com",
    label: "Visit Strait Insights",
  },
];

export const services: Service[] = [
  {
    slug: "strategic-advisory",
    name: "Strategic Advisory",
    tagline: "Stakeholder-proof strategy for boards and leadership teams",
    description:
      "High-level strategic counsel for boards, executives, and leadership teams navigating complex corporate, political, and societal challenges. We develop stakeholder-proof strategies that align business objectives with external expectations.",
    industries: ["Energy", "Technology", "Financial Services", "Industrial", "Public Sector"],
    deliverables: ["Strategic Assessment", "Stakeholder Strategy", "Position Papers", "Board Advisory Reports"],
    longform: {
      challenge: "Leadership teams face increasingly complex stakeholder landscapes where corporate strategy, political dynamics, and societal expectations collide. Without a unified framework, strategic decisions risk blind spots that erode trust and derail execution.",
      approach: [
        "Map the full stakeholder landscape using proprietary AI-driven analysis",
        "Conduct structured interviews with board members and key executives",
        "Identify strategic vulnerabilities and misalignments between intent and perception",
        "Develop a stakeholder-proof strategy that integrates business goals with external realities",
        "Deliver board-ready advisory reports with clear decision points",
      ],
      signals: [
        "Your board is navigating a politically sensitive strategic shift",
        "External stakeholders are misaligned with your corporate direction",
        "You need an independent strategic assessment before a major decision",
        "Internal strategy documents don't account for external stakeholder dynamics",
      ],
    },
  },
  {
    slug: "crisis-communications",
    name: "Crisis Communications",
    tagline: "Rapid-response crisis management that protects reputation",
    description:
      "Rapid-response crisis management and communications support. From preparation and simulation to real-time crisis management, we help organizations protect their reputation and maintain stakeholder confidence during high-pressure situations.",
    industries: ["Energy", "Technology", "Financial Services", "Industrial", "Healthcare"],
    deliverables: [
      "Crisis Preparedness Audit",
      "Crisis Communications Plan",
      "Media Response Protocols",
      "Stakeholder Notification Framework",
      "Post-Crisis Recovery Strategy",
    ],
    longform: {
      challenge: "Crises are unpredictable, but the damage they cause is not. Organizations that lack preparation lose control of the narrative within hours, face lasting reputational harm, and struggle to regain stakeholder confidence.",
      approach: [
        "Audit existing crisis preparedness against industry benchmarks",
        "Design a crisis communications plan with clear escalation paths",
        "Develop media response protocols and stakeholder notification frameworks",
        "Run crisis simulation exercises with leadership teams",
        "Provide real-time crisis management support during active incidents",
        "Execute post-crisis recovery and reputation rebuilding strategies",
      ],
      signals: [
        "You have no formal crisis communications plan or it hasn't been tested",
        "A crisis is unfolding and you need immediate expert support",
        "Your industry is entering a period of heightened regulatory or public scrutiny",
        "A previous crisis exposed gaps in your communications response",
      ],
    },
  },
  {
    slug: "stakeholder-mapping",
    name: "Stakeholder Mapping & Engagement",
    tagline: "AI-driven stakeholder intelligence and engagement strategy",
    description:
      "AI-driven stakeholder identification, mapping, and engagement strategy. We use proprietary analytics to map influence networks, assess sentiment, and design targeted engagement programs that build coalitions and neutralize opposition.",
    industries: ["Energy", "Technology", "Infrastructure", "Public Sector", "Financial Services"],
    deliverables: [
      "Stakeholder Map & Influence Analysis",
      "Sentiment Analysis Report",
      "Engagement Strategy & Playbook",
      "Coalition Building Plan",
      "Monitoring Dashboard",
    ],
    longform: {
      challenge: "Traditional stakeholder analysis relies on intuition and outdated lists. In complex regulatory, political, and commercial environments, this approach misses hidden influencers, underestimates opposition, and leads to reactive rather than proactive engagement.",
      approach: [
        "Deploy AI-driven analysis to identify and map all relevant stakeholders",
        "Assess influence networks, sentiment, and likely positions on key issues",
        "Segment stakeholders by influence, alignment, and engagement priority",
        "Design targeted engagement playbooks for each segment",
        "Build coalition strategies around shared interests",
        "Establish ongoing monitoring dashboards to track shifts in sentiment and influence",
      ],
      signals: [
        "You're entering a new market or jurisdiction with unfamiliar stakeholder dynamics",
        "A major project requires regulatory or political stakeholder buy-in",
        "You suspect opposition is forming but can't see the full picture",
        "Your current stakeholder engagement feels generic and underperforming",
      ],
    },
  },
  {
    slug: "ma-communications",
    name: "M&A Communications",
    tagline: "Strategic narrative control for transactions and corporate deals",
    description:
      "Strategic communications counsel for mergers, acquisitions, and corporate transactions. We manage the narrative across stakeholder groups, from regulators and media to employees and shareholders.",
    industries: ["Technology", "Financial Services", "Industrial", "Energy", "Healthcare"],
    deliverables: [
      "Transaction Communications Strategy",
      "Stakeholder Messaging Matrix",
      "Media Management Plan",
      "Employee Communications Program",
      "Regulatory Narrative",
    ],
    longform: {
      challenge: "M&A transactions generate intense stakeholder scrutiny. Employees fear for their jobs, regulators question market impact, media speculate, and shareholders demand clarity. Without a coordinated communications strategy, the narrative fragments and deal value erodes.",
      approach: [
        "Develop a transaction communications strategy aligned with deal milestones",
        "Create a stakeholder messaging matrix — different messages for different audiences",
        "Design media management plans for announcement day and beyond",
        "Build employee communications programs that maintain morale and retention",
        "Craft regulatory narratives that support deal approval",
        "Manage post-close integration communications",
      ],
      signals: [
        "A merger or acquisition is in planning or due diligence phase",
        "You need to announce a deal and control the narrative across stakeholder groups",
        "Employees are anxious about a pending transaction",
        "Regulatory scrutiny of a deal requires a clear public affairs narrative",
      ],
    },
  },
  {
    slug: "media-training",
    name: "Media Training & Positioning",
    tagline: "Preparing leaders for high-stakes media and public moments",
    description:
      "Executive media training and public positioning programs. We prepare leaders for high-stakes media interactions, public appearances, and thought leadership campaigns.",
    industries: ["All Sectors"],
    deliverables: [
      "Media Training Sessions",
      "Key Message Documents",
      "Interview Simulation Reports",
      "Thought Leadership Strategy",
      "Speaker Briefing Packs",
    ],
    longform: {
      challenge: "Senior leaders are often the public face of their organization but lack the skills to perform under media pressure. A poorly handled interview or public appearance can undo months of careful strategy and damage credibility with key stakeholders.",
      approach: [
        "Assess each executive's current media presence and communication style",
        "Develop tailored key messages aligned with corporate strategy",
        "Run intensive media training sessions with realistic interview simulations",
        "Provide detailed feedback and coaching on message delivery, body language, and bridging techniques",
        "Design thought leadership positioning strategies for sustained public presence",
        "Prepare speaker briefing packs for specific events and appearances",
      ],
      signals: [
        "A CEO or board member will face media for the first time or in a new context",
        "An upcoming AGM, investor day, or public hearing requires executive preparation",
        "Your organization wants to build thought leadership visibility for key leaders",
        "A previous media interaction went poorly and you need to rebuild confidence",
      ],
    },
  },
  {
    slug: "change-management",
    name: "Change Management Communications",
    tagline: "Communications that drive adoption and reduce resistance",
    description:
      "Internal and external communications strategy for organizational transformation. We design and execute communication programs that build understanding, reduce resistance, and accelerate adoption.",
    industries: ["Technology", "Financial Services", "Industrial", "Public Sector", "Healthcare"],
    deliverables: [
      "Change Communications Strategy",
      "Internal Messaging Framework",
      "Leadership Talking Points",
      "Employee Engagement Plan",
      "Progress Communications",
    ],
    longform: {
      challenge: "Organizational transformations fail when people don't understand, believe in, or feel part of the change. Without deliberate communications, resistance builds quietly and execution stalls — even when the strategy is sound.",
      approach: [
        "Diagnose the change landscape — who is affected, how, and what they need to hear",
        "Design a change communications strategy integrated with the transformation timeline",
        "Create internal messaging frameworks that cascade consistently through leadership levels",
        "Develop leadership talking points and equip managers to be change ambassadors",
        "Build employee engagement programs with feedback loops",
        "Deliver progress communications that maintain momentum and celebrate milestones",
      ],
      signals: [
        "A major restructuring, merger integration, or digital transformation is planned",
        "Employee engagement or morale is declining during an ongoing change program",
        "Leadership messages are inconsistent or not landing with the workforce",
        "You need a structured communications plan to support a transformation already in progress",
      ],
    },
  },
  {
    slug: "issue-management",
    name: "Issue Management",
    tagline: "Anticipate, monitor, and shape emerging issues before they escalate",
    description:
      "Proactive identification, monitoring, and management of emerging issues that could impact organizational reputation or operations. We combine media intelligence, political monitoring, and stakeholder analysis to anticipate and shape the narrative before issues escalate.",
    industries: ["Energy", "Technology", "Financial Services", "Public Sector", "Industrial"],
    deliverables: [
      "Issue Landscape Assessment",
      "Early Warning System Design",
      "Response Playbooks",
      "Narrative Strategy",
      "Monitoring Reports",
    ],
    longform: {
      challenge: "Issues that blindside organizations were almost always visible in advance — in media trends, political signals, regulatory movements, or stakeholder sentiment shifts. The cost of reacting after an issue has escalated is orders of magnitude higher than proactive management.",
      approach: [
        "Conduct an issue landscape assessment across media, political, and stakeholder domains",
        "Design early warning systems using AI-powered monitoring and analysis",
        "Develop response playbooks for high-probability issue scenarios",
        "Craft narrative strategies that position the organization ahead of the curve",
        "Establish regular monitoring and reporting cadences",
        "Provide rapid advisory when an emerging issue demands immediate attention",
      ],
      signals: [
        "Your industry faces growing public, regulatory, or political scrutiny",
        "You want to get ahead of an issue rather than reacting to it",
        "Media coverage of your sector or peers is shifting in tone or volume",
        "A policy or regulatory change could impact your operations or reputation",
      ],
    },
  },
];

// Deprecated — capabilities are now consolidated into services.
// Kept as empty export for backward compatibility with type imports.
export const capabilities: Capability[] = [];

export const academyPrograms: AcademyProgram[] = [
  {
    title: "Executive Presentation Training",
    description:
      "Master the art of strategic and investor pitches. Learn to structure compelling narratives that resonate with boards, shareholders, and senior leadership audiences.",
    icon: "presentation",
  },
  {
    title: "Media Training",
    description:
      "Prepare for interviews and public appearances with confidence. Develop techniques to stay on message, handle tough questions, and project authority under scrutiny.",
    icon: "edit",
  },
  {
    title: "Stakeholder Dialogue Training",
    description:
      "Navigate high-stakes conversations with diverse stakeholders. Build skills for productive dialogue with investors, regulators, employees, and community leaders.",
    icon: "users",
  },
  {
    title: "Crisis Communication Training",
    description:
      "Perform under pressure when it matters most. Develop the composure, clarity, and decisiveness needed to lead communications through crisis situations.",
    icon: "bolt",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    title: "Corporate Reputation Recovery for European Industrial Group",
    industry: "Industrial / Manufacturing",
    challenge:
      "A major European industrial group faced a severe reputational crisis following environmental compliance failures at multiple production facilities. Negative media coverage escalated rapidly, regulatory investigations were launched in three jurisdictions, and key institutional investors signaled concerns about governance oversight.",
    shortSummary:
      "When a major European industrial group faced a multi-front reputational crisis involving regulatory scrutiny, media pressure and stakeholder erosion, Duke Strategies was brought in to map the full stakeholder landscape, develop a unified narrative and execute a structured recovery plan across all fronts simultaneously.",
    team: "Ingo Heijnen, Arien Stuijt",
    image: "/assets/images/cable-bridge-dark-sky-dramatic.jpg",
    imageAlt: "Bridge architecture against a dark sky",
    metrics: [
      { value: "3 weeks", label: "Crisis contained" },
      { value: "80%", label: "Share price recovery in 4 months" },
      { value: "120+", label: "Stakeholders engaged" },
      { value: "0", label: "Additional sanctions" },
    ],
  },
  {
    title: "Cross-Border Technology Acquisition Communications",
    industry: "Technology",
    challenge:
      "A European technology company was acquiring a US-based SaaS platform in a EUR 450M transaction that required regulatory approval in both the EU and US. The deal involved 800 employees at the target company, intense media interest in both markets, and complex stakeholder dynamics spanning customers, regulators, investors, and two distinct workforce cultures.",
    image: "/assets/images/cable-bridge-geometric-perspective.jpg",
    imageAlt: "Geometric bridge perspective",
    metrics: [
      { value: "100%", label: "Deal closed on schedule" },
      { value: "92%", label: "Employee retention at 12 months" },
      { value: "75%", label: "Positive media coverage" },
      { value: "8", label: "Stakeholder groups managed" },
    ],
  },
  {
    title: "AI-Driven Stakeholder Mapping for Energy Transition Program",
    industry: "Energy",
    challenge:
      "A European energy company was preparing a major renewable energy infrastructure program spanning three provinces, requiring engagement with over 500 stakeholders including local governments, environmental groups, landowners, and community organizations. Previous infrastructure projects had faced significant delays due to unexpected opposition coalitions.",
    image: "/assets/images/long-bridge-sunset-dramatic.jpg",
    imageAlt: "Bridge at sunset",
    metrics: [
      { value: "500+", label: "Stakeholders mapped" },
      { value: "3", label: "Opposition coalitions identified early" },
      { value: "4 months", label: "Approval ahead of schedule" },
      { value: "78%", label: "Community support achieved" },
    ],
  },
  {
    title: "Technology Platform Regulatory & Government Relations Strategy",
    industry: "Technology",
    challenge:
      "A global technology platform faced increasing regulatory pressure in the Netherlands and EU, with proposed legislation that could significantly impact its business model. The company had no established government relations function in the Netherlands and limited understanding of the political landscape and key decision-makers.",
    image: "/assets/images/modern-bridge-bw-dramatic.jpg",
    imageAlt: "Modern bridge in black and white",
    metrics: [
      { value: "25+", label: "Political stakeholders engaged" },
      { value: "3 of 5", label: "Key positions in legislation" },
      { value: "From 0", label: "GR capability built" },
      { value: "12", label: "Monthly intelligence reports" },
    ],
  },
];

export const testimonials = [
  {
    quote:
      "When the crisis hit, Duke Strategies did not just manage the media - they helped us understand our entire stakeholder landscape and rebuild trust systematically. Their combination of crisis experience and analytical rigour was exactly what we needed under pressure.",
    author: "CEO, European Industrial Group",
  },
  {
    quote:
      "Most communications advisors we had worked with relied on instinct. Duke brought data. Their stakeholder mapping showed us alliances and opposition risks we had completely missed, and that intelligence was decisive in getting our project approved ahead of schedule.",
    author: "Head of External Affairs, European Energy Company",
  },
  {
    quote:
      "The deal was complex - two jurisdictions, 800 employees at the target, and intense media interest. Duke managed every stakeholder group with precision. The fact that we retained 92% of the target workforce speaks to the quality of their employee communications.",
    author: "General Counsel, European Technology Company",
  },
  {
    quote:
      "We needed to build government relations in the Netherlands from scratch, and we needed it fast. Duke's political insight gave us credibility we could not have built on our own.",
    author: "VP Government Affairs, Global Technology Platform",
  },
];

export const insights: InsightItem[] = [
  {
    badge: "Philosophy",
    date: "Ingo Heijnen - March 2025",
    author: "Ingo Heijnen",
    title: "Making business strategy stakeholder-proof",
    excerpt:
      "We scrutinise the motivation behind every strategic choice and advise on the adjustments needed to make those decisions credible and acceptable to internal and external stakeholders - before the communications even begin.",
    href: "https://www.consultancy.nl/nieuws/59605/hill-knowlton-veteranen-ingo-heijnen-en-arien-stuijt-starten-duke-strategies",
    linkLabel: "Read the founding interview",
    image: "/assets/insights/insight-01-founding.jpg",
    imageAlt: "Ingo Heijnen and Arien Stuijt launch Duke Strategies",
  },
  {
    badge: "Perspective",
    date: "Arien Stuijt - March 2025",
    author: "Arien Stuijt",
    title: "Stakeholders see through the nonsense",
    excerpt:
      "Too many companies still try to promote strategically flawed decisions - problematic acquisitions, disproportionate bonuses, unexplainable product choices - and then scramble to repair the damage. Modern stakeholders will not let that pass.",
    href: "https://mena.nl/artikel/ingo-heijnen-en-arien-stuijt-beginnen-nieuw-adviesbureau/",
    linkLabel: "Read on M&A Magazine",
    image: "/assets/insights/insight-02-mena-launch.jpg",
    imageAlt: "M&A Magazine coverage of Duke Strategies launch",
  },
  {
    badge: "Capability",
    date: "Duke Strategies - 2025",
    author: "Duke Strategies",
    title: "Where AI meets stakeholder intelligence",
    excerpt:
      "Duke's data capability turns complex stakeholder ecosystems into actionable maps. AI-driven analytics identify influence networks, assess sentiment, and anticipate opposition coalitions - grounding strategic advice in evidence rather than instinct.",
    href: "https://www.consultancy.nl/nieuws/61667/duke-strategies-breidt-team-uit-met-emma-van-gelder-en-william-masquelier",
    linkLabel: "Read team announcement",
    image: "/assets/insights/insight-03-team.jpg",
    imageAlt: "Duke Strategies team expansion announcement",
  },
  {
    badge: "M&A",
    date: "Ingo Heijnen - Archive",
    author: "Ingo Heijnen",
    title: "Know your stakeholders before you need them",
    excerpt:
      "In cross-border M&A, Dutch politics, works councils and industry associations increasingly shape the outcome. The lesson from two decades of deal advisory: build the stakeholder coalition long before an unsolicited bid forces your hand.",
    href: "https://mena.nl/artikel/kopers-en-verkopers-ken-uw-stakeholders-voordat-u-ze-nodig-hebt/",
    linkLabel: "Read the article",
    image: "/assets/insights/insight-04-stakeholders.jpg",
    imageAlt: "Stakeholder mapping for cross-border M&A",
  },
  {
    badge: "ESG",
    date: "Ingo Heijnen - Archive",
    author: "Ingo Heijnen",
    title: "COVID put ESG firmly on the boardroom agenda",
    excerpt:
      "Three-quarters of Dutch institutional investors now treat ESG as decisive. ESG stopped being a disclosure exercise and became a strategic filter for boards, investors, and stakeholders.",
    href: "https://mena.nl/artikel/covid19-zet-esg-prominent-op-de-agenda/",
    linkLabel: "Read the perspective",
    image: "/assets/insights/insight-05-esg.jpg",
    imageAlt: "ESG moves to the top of the boardroom agenda",
  },
  {
    badge: "Restructuring",
    date: "Ingo Heijnen & Tanno Massar - Archive",
    author: "Ingo Heijnen & Tanno Massar",
    title: "Credibility and reputation are central to a pre-pack",
    excerpt:
      "Pre-pack restructurings only work when stakeholders believe in the restart. That belief is not earned by press releases; it is built through meticulous stakeholder scenario planning before the filing.",
    href: "https://mena.nl/artikel/behoud-van-geloofwaardigheid-en-reputatie-centraal-bij-prepack/",
    linkLabel: "Read the archive piece",
    image: "/assets/insights/insight-06-prepack.jpg",
    imageAlt: "Credibility and reputation in pre-pack restructurings",
  },
];

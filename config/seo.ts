import type { Metadata, MetadataRoute } from "next";

/**
 * ============================================================================
 * CHESSMATE ACADEMY - CENTRAL SEO CONFIGURATION FILE  (v2 - audit-driven)
 * ============================================================================
 *
 * SINGLE SOURCE OF TRUTH for all SEO settings across the website.
 *
 *  1. Global site settings (domain, verification codes, social profiles)
 *  2. Per-page metadata (title, description, keywords, canonical, OG)
 *  3. Structured data (Organization, LocalBusiness, WebSite, Courses, FAQs,
 *     Breadcrumbs) - sitewide + per-page
 *  4. Crawl files: robots.txt config and llms.txt content generators
 *
 * POSITIONING: Chessmate's differentiator is that it teaches ADULTS as well as
 * kids (dedicated 1-on-1 adult programme, no kid batches). Every sitewide
 * title/description/schema block leads with "kids & adults" and the adult
 * landing page (/chess-classes-for-adults) is the primary growth page.
 *
 * LENGTH RULES (checked against the audit): titles 50-60 chars,
 * descriptions 120-160 chars. Keep new entries inside these ranges.
 *
 * WIRING (see bottom of file for full snippets):
 *   - every page.tsx:    export const metadata = getSeoMetadata("<pageKey>");
 *   - every page body:   <JsonLd data={getStructuredDataSchemas("<pageKey>")} />
 *   - app/robots.ts:     export default getRobotsConfig;
 *   - app/llms.txt/route.ts: return new Response(getLlmsTxt())
 * ============================================================================
 */

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_URL = "https://thechessmate.org";

export const SEO_CONFIG = {
  // ─── 1. GLOBAL SITE & WEBMASTER SETTINGS ──────────────────────────────────
  site: {
    siteName: "Chessmate Academy",
    // NOTE: the site currently answers on BOTH thechessmate.org and
    // www.thechessmate.org. Canonicals point to the non-www URL below, so add
    // a 301 redirect www -> non-www (Cloudflare Redirect Rule) to consolidate
    // ranking signals. If you prefer www, change this one constant.
    siteUrl: SITE_URL,
    defaultTitle: "Online Chess Classes for Kids & Adults | Chessmate Academy",
    titleTemplate: "%s | Chessmate Academy",
    defaultDescription:
      "Live 1-on-1 and small-group online chess coaching by FIDE-rated coaches. Kids from age 5, plus dedicated adult programs. Book your free demo class today.",
    // Google ignores the meta-keywords tag; these are kept for Bing/other
    // engines and as the team's keyword map.
    defaultKeywords: [
      "online chess classes",
      "chess classes for adults",
      "chess classes for kids",
      "online chess coaching",
      "1-on-1 chess lessons",
      "FIDE rated chess coach",
      "Chessmate Academy",
      "Chess Mate Academy",
      "learn chess online",
      "chess coaching India",
    ],
    defaultOgImage: `${SITE_URL}/main.png`,
    // Only set if an X/Twitter account actually exists. "@thechess_mate" is the
    // Instagram handle and the audit found no linked X profile, so a wrong
    // twitter:creator tag is worse than none.
    twitterHandle: "",
    themeColor: "#7c3aed",
    locale: "en_IN",
    alternateLocales: ["en_US", "en_GB"], // students in USA/UK per testimonials

    // Webmaster verification - paste ONLY the token (the content="" value),
    // not the full <meta> tag. Verify BOTH Google Search Console and Bing
    // Webmaster Tools; Bing also powers ChatGPT/Copilot web search.
    googleSiteVerification: "",
    bingSiteVerification: "",
    yandexVerification: "",

    // Tag Manager & Analytics Tracking IDs
    gtmId: "GTM-PJMXNVT",
    gaId: "",
  },

  // ─── 1b. SOCIAL PROFILES (feeds Organization.sameAs) ──────────────────────
  // Empty strings are ignored. Fill these as the profiles are created -
  // LinkedIn + YouTube were flagged as missing in the audit.
  socialProfiles: {
    instagram: "https://www.instagram.com/thechess_mate",
    // VERIFY: facebook.com/chessmate is a very generic URL and may belong to
    // another business. A wrong sameAs link confuses entity matching. Replace
    // with the academy's own page URL, or leave empty.
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
  },

  // ─── 2. PER-PAGE METADATA CATALOG ─────────────────────────────────────────
  pages: {
    // 🏠 Home
    home: {
      title: "Online Chess Classes for Kids & Adults | Chessmate Academy",
      description:
        "Live 1-on-1 and small-group online chess coaching by FIDE-rated coaches. Kids from age 5, plus dedicated adult programs. Book your free demo class today.",
      keywords: [
        "online chess classes",
        "chess classes for adults",
        "chess classes for kids",
        "FIDE rated chess coach",
        "online chess coaching",
        "Chessmate Academy",
        "Chess Mate Academy",
        "learn chess online",
      ],
      canonical: "/",
      ogTitle: "Online Chess Classes for Kids & Adults | Chessmate Academy",
      ogDescription:
        "Chess for every generation: 1-on-1 and small-group online coaching for kids and adults with FIDE-rated coaches. Book a free demo class.",
      ogImage: "/main.png",
      noIndex: false,
    },

    // ♟️ Adults - THE differentiator / primary growth page
    adultClasses: {
      title: "Chess Classes for Adults Online | Chessmate Academy",
      description:
        "Private 1-on-1 online chess lessons for adults: beginners, returning players and rating improvers. Flexible timings, game analysis, free assessment.",
      keywords: [
        "chess classes for adults",
        "online chess classes for adults",
        "adult chess coaching",
        "online chess lessons for adults",
        "chess coach for adults",
        "learn chess as an adult",
        "chess lessons for adult beginners",
        "adult chess improver",
        "break chess rating plateau",
        "FIDE rated coach for adults",
      ],
      canonical: "/chess-classes-for-adults",
      ogTitle: "Online Chess Classes for Adults | 1-on-1 Coaching",
      ogDescription:
        "No kids batches. Private 1-on-1 chess coaching for adults with flexible schedules, deep game analysis and a custom plan to break your rating plateau.",
      ogImage: "/adult-coaching-hero.jpg",
      noIndex: false,
    },

    // Alias for adultClasses to maintain full compatibility across routes
    adults: {
      title: "Chess Classes for Adults Online | Chessmate Academy",
      description:
        "Private 1-on-1 online chess lessons for adults: beginners, returning players and rating improvers. Flexible timings, game analysis, free assessment.",
      keywords: [
        "chess classes for adults",
        "online chess classes for adults",
        "adult chess coaching",
        "online chess lessons for adults",
        "chess coach for adults",
        "learn chess as an adult",
        "chess lessons for adult beginners",
        "adult chess improver",
        "break chess rating plateau",
        "FIDE rated coach for adults",
      ],
      canonical: "/chess-classes-for-adults",
      ogTitle: "Online Chess Classes for Adults | 1-on-1 Coaching",
      ogDescription:
        "No kids batches. Private 1-on-1 chess coaching for adults with flexible schedules, deep game analysis and a custom plan to break your rating plateau.",
      ogImage: "/adult-coaching-hero.jpg",
      noIndex: false,
    },

    // 📖 About
    about: {
      title: "About Chessmate Academy | FIDE-Rated Online Chess Coaches",
      description:
        "Meet Chessmate Academy: an online chess academy teaching kids and adults with FIDE-rated coaches, a structured curriculum and a 24/7 training platform.",
      keywords: [
        "about Chessmate Academy",
        "online chess academy",
        "FIDE certified chess coaches",
        "chess academy for kids and adults",
        "Chessmate story",
      ],
      canonical: "/about",
      ogTitle: "About Chessmate Academy | Chess for Every Generation",
      ogDescription:
        "Learn how Chessmate teaches chess to kids and adults through FIDE-rated coaching, data-driven progress tracking and a gamified platform.",
      ogImage: "/home.jpeg",
      noIndex: false,
    },

    // 🎓 Courses
    courses: {
      title: "Online Chess Courses for All Levels | Chessmate Academy",
      description:
        "Structured online chess courses from Beginner to Master covering tactics, openings, endgames and calculation. 1-on-1 or small batches for kids and adults.",
      keywords: [
        "online chess courses",
        "beginner chess course",
        "intermediate chess training",
        "advanced chess coaching",
        "chess course for adults",
        "chess course for kids",
      ],
      canonical: "/courses",
      ogTitle: "Online Chess Courses: Beginner to Master | Chessmate Academy",
      ogDescription:
        "Four structured levels from first moves to tournament play, taught live by FIDE-rated coaches to kids and adults.",
      ogImage: "/training.png",
      noIndex: false,
    },

    // 📚 Curriculum
    curriculum: {
      title: "Chess Curriculum: 4-Level Learning Roadmap | Chessmate",
      description:
        "Explore Chessmate's four-phase chess curriculum: rules and checkmates, tactics and endgames, strategic mastery and master-level training with progress tracking.",
      keywords: [
        "chess curriculum",
        "chess syllabus",
        "chess learning roadmap",
        "step by step chess learning",
        "FIDE chess syllabus",
      ],
      canonical: "/curriculum",
      ogTitle: "Our Chess Curriculum | Chessmate Academy",
      ogDescription:
        "A phase-based chess learning roadmap from fundamentals to master level, with detailed progress tracking.",
      ogImage: "/method.jpeg",
      noIndex: false,
    },

    // 💻 1-on-1 Online Coaching
    onlineCoaching: {
      title: "Private 1-on-1 Online Chess Coaching | Chessmate Academy",
      description:
        "Personalized 1-on-1 online chess lessons on a live interactive board with FIDE-rated coaches: game analysis, custom homework and tournament guidance.",
      keywords: [
        "1 on 1 online chess coaching",
        "private chess tutor online",
        "personalized chess trainer",
        "live online chess lessons",
        "online chess classes for kids",
      ],
      canonical: "/online-coaching",
      ogTitle: "1-on-1 Online Chess Coaching | Chessmate Academy",
      ogDescription:
        "Private chess coaching with flexible scheduling and a custom lesson plan built around your goals.",
      ogImage: "/online.jpeg",
      noIndex: false,
    },

    // 🖥️ Training platform (LMS) - /training-platform should 301 to /platform
    platform: {
      title: "24/7 Online Chess Training Platform | Chessmate Academy",
      description:
        "Practice between classes on Chessmate's gamified training platform: interactive puzzles, structured lessons, leaderboards and progress tracking, 24/7.",
      keywords: [
        "online chess training platform",
        "chess learning platform",
        "chess LMS",
        "interactive chess puzzles",
        "gamified chess learning",
      ],
      canonical: "/platform",
      ogTitle: "24/7 Chess Training Platform | Chessmate Academy",
      ogDescription:
        "Gamified chess practice with interactive puzzles, leaderboards and clear progress tracking.",
      ogImage: "/main.png",
      noIndex: false,
    },

    // 🏆 Coaches
    coaches: {
      title: "FIDE-Rated Chess Coaches & Mentors | Chessmate Academy",
      description:
        "Meet Chessmate's FIDE-rated chess coaches: active tournament players who teach kids and adults with modern, practical, game-based methods.",
      keywords: [
        "FIDE rated chess coaches",
        "chess coaches online",
        "chess mentors",
        "chess academy instructors",
      ],
      canonical: "/coaches",
      ogTitle: "Meet Our FIDE-Rated Chess Coaches | Chessmate Academy",
      ogDescription:
        "Learn from active, FIDE-rated players who know what it takes to compete and improve.",
      ogImage: "/coaching.png",
      noIndex: false,
    },

    // 💰 Pricing - only used if a /pricing route exists (it is not in the
    // current sitemap; delete this entry if the route was never built).
    pricing: {
      title: "Online Chess Class Fees & Plans | Chessmate Academy",
      description:
        "Compare Chessmate's online chess class plans for kids and adults: 1-on-1 coaching and small batches. Book a free demo or assessment before you commit.",
      keywords: [
        "chess classes fee",
        "online chess coaching cost",
        "chess academy pricing",
        "affordable online chess classes",
      ],
      canonical: "/pricing",
      ogTitle: "Chess Class Fees & Plans | Chessmate Academy",
      ogDescription:
        "Flexible chess coaching plans for kids and adults, starting with a free demo class.",
      ogImage: "/main.png",
      noIndex: false,
    },

    // 🥇 Achievements
    achievements: {
      title: "Student Achievements & Tournament Wins | Chessmate Academy",
      description:
        "See the tournament results, rating gains and milestones of Chessmate Academy students, from young beginners to adult improvers.",
      keywords: [
        "chess academy achievements",
        "chess tournament winners",
        "chess rating improvement",
        "student success stories",
      ],
      canonical: "/achievements",
      ogTitle: "Student Achievements | Chessmate Academy",
      ogDescription:
        "Tournament wins and rating milestones from Chessmate students.",
      ogImage: "/best.jpeg",
      noIndex: false,
    },

    // 📅 Book a Demo
    bookDemo: {
      title: "Book a Free Chess Demo Class Online | Chessmate Academy",
      description:
        "Book a free 45-minute 1-on-1 chess demo or assessment with a FIDE-rated coach. For kids and adults of every level, with no obligation to enroll.",
      keywords: [
        "free chess demo class",
        "book free chess class",
        "free chess assessment",
        "trial chess lesson",
      ],
      canonical: "/bookdemo",
      ogTitle: "Book Your Free Chess Demo Class | Chessmate Academy",
      ogDescription:
        "A complimentary 45-minute live session with an expert chess coach. Kids and adults welcome.",
      ogImage: "/hero.jpg",
      noIndex: false,
    },

    // 🏆 Events
    events: {
      title: "Chess Events & Online Tournaments | Chessmate Academy",
      description:
        "Join Chessmate's online arenas, blitz tournaments and masterclass events to practice under real tournament conditions with players of your level.",
      keywords: [
        "online chess tournaments",
        "chess events",
        "chess competitions for kids",
        "chess arena tournaments",
      ],
      canonical: "/events",
      ogTitle: "Chess Tournaments & Events | Chessmate Academy",
      ogDescription:
        "Compete in regular online arenas and tournaments to sharpen your game.",
      ogImage: "/open.png",
      noIndex: false,
    },

    // 🖼️ Gallery
    gallery: {
      title: "Photo Gallery & Chess Class Moments | Chessmate Academy",
      description:
        "Browse photos from Chessmate Academy classes, camps, prize ceremonies and tournament days with our students and coaches.",
      keywords: ["Chessmate gallery", "chess academy photos", "chess camp pictures"],
      canonical: "/gallery",
      ogTitle: "Photo Gallery | Chessmate Academy",
      ogDescription: "Memorable moments from training sessions, camps and trophy days.",
      ogImage: "/chess2.png",
      noIndex: false,
    },

    // 📝 Blog
    blog: {
      title: "Chess Blog: Strategy Guides & Tips | Chessmate Academy",
      description:
        "Chess guides for kids and adults: openings for beginners, tactics, how to improve your rating, tournament prep and the cognitive benefits of chess.",
      keywords: [
        "chess blog",
        "how to improve chess rating",
        "best chess openings for beginners",
        "chess for adults",
        "benefits of chess for kids",
        "chess and ADHD",
        "chess and autism",
      ],
      canonical: "/blog",
      ogTitle: "Chess Strategy Blog & Guides | Chessmate Academy",
      ogDescription:
        "Practical chess guides, training tips and developmental insights from our coaches.",
      ogImage: "/blog.jpg",
      noIndex: false,
    },

    // 🏕️ Training Camps
    trainingCamps: {
      title: "Chess Training Camps & Holiday Bootcamps | Chessmate",
      description:
        "Accelerate your rating with intensive online chess camps: tactical workshops, endgame immersion and tournament preparation led by FIDE-rated coaches.",
      keywords: [
        "chess summer camp",
        "chess bootcamp",
        "holiday chess workshop",
        "intensive chess training",
      ],
      canonical: "/training-camps",
      ogTitle: "Chess Intensive Camps & Bootcamps | Chessmate Academy",
      ogDescription:
        "Short, intensive chess camps for faster rating growth and tournament readiness.",
      ogImage: "/training.png",
      noIndex: false,
    },

    // 🧩 Puzzles
    puzzles: {
      title: "Free Daily Chess Puzzles & Tactics | Chessmate Academy",
      description:
        "Sharpen your tactical vision with daily chess puzzles across Beginner, Intermediate and Advanced levels. Practice forks, pins, mates and calculation.",
      keywords: [
        "chess puzzles online",
        "daily chess puzzles",
        "chess tactics trainer",
        "mate in 1 puzzles",
      ],
      canonical: "/puzzles",
      ogTitle: "Interactive Chess Puzzles | Chessmate Academy",
      ogDescription: "Daily tactics for every skill level.",
      ogImage: "/tectics.jpeg",
      noIndex: false,
    },

    puzzlesBeginner: {
      title: "Beginner Chess Puzzles & Mate in 1 | Chessmate Academy",
      description:
        "Solve easy beginner chess puzzles: mate in one, basic captures and simple tactics. A perfect start for kids and adults learning chess.",
      keywords: ["beginner chess puzzles", "mate in 1", "easy chess puzzles", "chess tactics for beginners"],
      canonical: "/puzzles/beginner",
      ogImage: "/tectics.jpeg",
      noIndex: false,
    },

    puzzlesIntermediate: {
      title: "Intermediate Chess Tactics: Forks & Pins | Chessmate",
      description:
        "Train double attacks, forks, pins, skewers and multi-move combinations with intermediate chess puzzles that build real calculation skill.",
      keywords: ["intermediate chess puzzles", "chess forks and pins", "chess combinations"],
      canonical: "/puzzles/intermediate",
      ogImage: "/tectics.jpeg",
      noIndex: false,
    },

    puzzlesAdvanced: {
      title: "Advanced Chess Puzzles & Calculation Training | Chessmate",
      description:
        "Tackle advanced chess puzzles with quiet moves, deflection sacrifices and deep endgame calculation to sharpen your tournament-level vision.",
      keywords: ["advanced chess puzzles", "hard chess puzzles", "chess calculation training"],
      canonical: "/puzzles/advanced",
      ogImage: "/tectics.jpeg",
      noIndex: false,
    },

    // 🌟 FCS
    fcs: {
      title: "Future Champions Series (FCS) Chess League | Chessmate",
      description:
        "The Future Champions Series is Chessmate's competitive chess league with regular rated games, leaderboards and mentorship for ambitious young players.",
      keywords: [
        "Future Champions Series",
        "FCS chess league",
        "junior chess league",
        "online chess league for kids",
      ],
      canonical: "/fcs",
      ogTitle: "Future Champions Series (FCS) | Chessmate Academy",
      ogDescription: "A competitive proving ground for rising chess talent.",
      ogImage: "/fcs-logo.png",
      noIndex: false,
    },

    // 📞 Contact
    contact: {
      title: "Contact Chessmate Academy | Chess Classes Enquiries",
      description:
        "Contact Chessmate Academy by phone, WhatsApp or email for admissions, course details and free demo bookings for kids and adults.",
      keywords: [
        "contact Chessmate Academy",
        "chess classes enquiry",
        "chess academy phone number",
        "chess coaching WhatsApp",
      ],
      canonical: "/contact",
      ogTitle: "Contact Chessmate Academy",
      ogDescription: "Questions about classes or enrollment? Reach us on WhatsApp, phone or email.",
      ogImage: "/contact.png",
      noIndex: false,
    },

    // 📜 Terms
    terms: {
      title: "Terms, Refund Policy & Privacy | Chessmate Academy",
      description:
        "Read Chessmate Academy's service terms, class cancellation and refund policy, and privacy practices for students, parents and adult learners in one place.",
      keywords: ["Chessmate terms", "privacy policy", "refund policy"],
      canonical: "/terms",
      noIndex: false,
    },

    // 🔒 Payment pages - never indexed (also Disallowed in robots)
    pay: {
      title: "Secure Payment Portal | Chessmate Academy",
      description: "Secure tuition payment portal for Chessmate Academy programs.",
      keywords: ["payment", "tuition fee"],
      canonical: "/pay",
      noIndex: true,
    },

    quickPay: {
      title: "Quick Fee Checkout | Chessmate Academy",
      description: "Fast and secure payment link for course registrations and tournament fees.",
      keywords: ["quick pay", "checkout"],
      canonical: "/quick-pay",
      noIndex: true,
    },

    // 🎉 Thank You Page
    thankYou: {
      title: "Thank You | Chessmate Academy",
      description: "Thank you for contacting Chessmate Academy. Book your free demo class slot now.",
      keywords: ["thank you", "demo booking"],
      canonical: "/thank-you",
      noIndex: true,
    },
  },

  // ─── 3. SCHEMA.ORG STRUCTURED DATA (JSON-LD) ──────────────────────────────
  structuredData: {
    // 🏢 Brand entity. Alternate names deliberately cover the "Chess Mate" /
    // "Chessmate" spellings so search engines and AI tools resolve them to this
    // academy (and not to the unrelated "Chessmate" game/app).
    organization: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Chessmate Academy",
      alternateName: ["Chessmate", "Chess Mate Academy", "ChessMate", "The Chessmate"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.jpg`,
      },
      image: `${SITE_URL}/main.png`,
      slogan: "Chess for every generation - kids to adults",
      description:
        "Chessmate Academy is an online chess academy offering live 1-on-1 and small-group coaching by FIDE-rated coaches for kids from age 5 and for adults of every level, backed by a 24/7 gamified training platform.",
      knowsAbout: [
        "Chess coaching for adults",
        "Chess coaching for kids",
        "Chess tactics",
        "Chess openings",
        "Chess endgames",
        "Tournament preparation",
        "FIDE rating improvement",
      ],
      founder: { "@type": "Person", name: "Devam" },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
      ], // extend as you add markets
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thazhambur",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "603302",
        addressCountry: "IN",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-7990775581",
          contactType: "admissions",
          email: "contact@thechessmate.org",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-8733084949",
          contactType: "customer service",
          email: "contact@thechessmate.org",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      // Populated from socialProfiles above (empty ones are dropped below).
      sameAs: [] as string[],
    },

    // 📍 Local entity (fixes the audit's "No Local Business Schema" finding).
    // TODO: add geo {latitude, longitude} and the Google Business Profile URL
    // to sameAs once the GBP is created/claimed.
    localBusiness: {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "EducationalOrganization"],
      "@id": `${SITE_URL}/#localbusiness`,
      name: "Chessmate Academy",
      url: SITE_URL,
      image: `${SITE_URL}/main.png`,
      telephone: "+91-7990775581",
      email: "contact@thechessmate.org",
      priceRange: "$$",
      parentOrganization: { "@id": `${SITE_URL}/#organization` },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thazhambur",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "603302",
        addressCountry: "IN",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "09:00",
          closes: "21:00",
        },
      ],
    },

    // 🌐 WebSite entity - strengthens brand-name recognition ("Chess Mate")
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Chessmate Academy",
      alternateName: ["Chessmate", "Chess Mate Academy"],
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },

    // 🎓 Course catalog. Prices are intentionally omitted (not published
    // sitewide); add `offers` per course once public pricing exists.
    courses: [
      {
        key: "beginner",
        name: "Beginner Chess Course",
        description:
          "How to play chess: how the pieces move, how to checkmate, basic rules and fundamentals, and decision-making for new players of any age.",
        level: "Beginner",
        audience: "Kids and adults",
      },
      {
        key: "intermediate",
        name: "Intermediate Chess Course: Tactics & Endgames",
        description:
          "Tactics, basic endgames, calculation, basic openings and game analysis to correct recurring mistakes.",
        level: "Intermediate",
        audience: "Kids and adults",
      },
      {
        key: "advanced",
        name: "Advanced Chess Course: Strategy & Tournament Prep",
        description:
          "Opening repertoire development, strategic and positional mastery, advanced endgames and practical tournament preparation.",
        level: "Advanced",
        audience: "Kids and adults",
      },
      {
        key: "master",
        name: "Master-Level Chess Training",
        description:
          "Engine and database support, handling dynamic imbalances, performance optimization, mental training and high-level decision making.",
        level: "Expert",
        audience: "Competitive players",
      },
      {
        key: "adult",
        name: "Online Chess Classes for Adults (1-on-1)",
        description:
          "Private 1-on-1 online chess coaching built for adults: learn from scratch, return to the game or break a rating plateau, with analysis of your own games and flexible scheduling.",
        level: "Beginner to Advanced",
        audience: "Adults (18+)",
        adult: true,
      },
    ],

    // ❓ Sitewide FAQs. Render these SAME questions/answers visibly on the page
    // (map over this array) - structured data must match visible content.
    faqs: [
      {
        question: "What age groups does Chessmate Academy teach?",
        answer:
          "We teach chess from age 5 to adults with no upper age limit. Kids get gamified, focus-building coaching, teens get tournament-oriented training, and adults get dedicated 1-on-1 programs with no kids' batches.",
      },
      {
        question: "Do you offer chess classes for adults?",
        answer:
          "Yes. Chessmate runs dedicated 1-on-1 online chess classes for adults of every level, from complete beginners and returning players to rated improvers. Sessions are scheduled around your work hours, and your coach analyzes your own games.",
      },
      {
        question: "How do online chess classes work at Chessmate Academy?",
        answer:
          "Classes run live on an interactive digital chessboard with voice and video, taught by FIDE-rated coaches. Between classes, students practice on our 24/7 training platform with puzzles and assigned homework.",
      },
      {
        question: "Can I book a free demo class before enrolling?",
        answer:
          "Yes. We offer a free, no-obligation 45-minute 1-on-1 demo and assessment so the coach can understand your level and recommend the right program for you or your child.",
      },
      {
        question: "Are your coaches FIDE rated?",
        answer:
          "Yes. Chessmate's coaches are FIDE-rated players and certified trainers with competitive and coaching experience.",
      },
      {
        question: "Is there a structured curriculum for beginners?",
        answer:
          "Yes. Our curriculum has four phases: Beginner, Intermediate, Advanced and Master, so every student has a clear path from learning how the pieces move to tournament-level play.",
      },
      {
        question: "How do you track a student's progress?",
        answer:
          "Students receive regular performance breakdowns and Elo tracking, and parents of young students get monthly report cards covering training activity and rating growth.",
      },
      {
        question: "Do you help students prepare for tournaments?",
        answer:
          "Yes. We offer tournament preparation, live game analysis and post-game review, plus regular internal arenas and the Future Champions Series league for competitive practice.",
      },
    ],

    // ❓ Adult-page FAQs (use on /chess-classes-for-adults)
    adultFaqs: [
      {
        question: "Is it too late to get good at chess as an adult?",
        answer:
          "No. Adults bring strong focus and logical reasoning. What most adult players lack is structured guidance and blunder-proofing habits, which targeted 1-on-1 coaching and analysis of your own games provide.",
      },
      {
        question: "Will I be put in a class with children?",
        answer:
          "No. Our adult program is 1-on-1 and exclusively for adults. There are no kids' batches and no childish teaching metaphors.",
      },
      {
        question: "How flexible are class timings for work and family?",
        answer:
          "Timings are fully custom, including early mornings, evenings and weekends, and sessions can be rescheduled with 24 hours' notice.",
      },
      {
        question: "How are the adult online chess classes conducted?",
        answer:
          "Each lesson is a live 60-minute 1-on-1 session on an interactive digital board with voice and video, followed by personalized homework and practice on the Chessmate training platform.",
      },
      {
        question: "What happens in the free assessment session?",
        answer:
          "In a free 45-minute 1-on-1 session, a FIDE-rated coach reviews your recent games, identifies your main weaknesses and outlines a custom improvement roadmap.",
      },
      {
        question: "How much time do I need each week to improve?",
        answer:
          "Most adults train with one to two sessions per week plus around 15 minutes of daily puzzle practice. Casual plans start at 1-2 hours a week; 3-5 hours a week is recommended for faster progress.",
      },
    ],
  },
};

export type SeoPageKey = keyof typeof SEO_CONFIG.pages;

// ─── Internal helpers ───────────────────────────────────────────────────────
const absoluteUrl = (path: string) =>
  `${SEO_CONFIG.site.siteUrl}${path === "/" ? "" : path}`;

const absoluteImage = (img?: string) => {
  if (!img) return SEO_CONFIG.site.defaultOgImage;
  return img.startsWith("http") ? img : `${SEO_CONFIG.site.siteUrl}${img}`;
};

/**
 * Generate Next.js Metadata for any page.
 */
export function getSeoMetadata(pageKey: SeoPageKey): Metadata {
  const page = SEO_CONFIG.pages[pageKey] as PageSeoConfig | undefined;
  const { site } = SEO_CONFIG;

  if (!page) {
    return {
      title: site.defaultTitle,
      description: site.defaultDescription,
      keywords: site.defaultKeywords,
    };
  }

  const title = page.title;
  const description = page.description || site.defaultDescription;
  const canonicalUrl = absoluteUrl(page.canonical);
  const ogImage = absoluteImage(page.ogImage);
  const ogTitle = page.ogTitle || title;

  return {
    title: { absolute: title },
    description,
    keywords: page.keywords || site.defaultKeywords,
    metadataBase: new URL(site.siteUrl),
    applicationName: site.siteName,
    authors: [{ name: site.siteName, url: site.siteUrl }],
    creator: site.siteName,
    publisher: site.siteName,
    category: "education",
    alternates: {
      canonical: canonicalUrl,
      // Self-referencing hreflang + x-default (single English version).
      languages: {
        en: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    robots: page.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description: page.ogDescription || description,
      url: canonicalUrl,
      siteName: site.siteName,
      locale: site.locale,
      alternateLocale: site.alternateLocales,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: page.ogDescription || description,
      ...(site.twitterHandle ? { creator: site.twitterHandle, site: site.twitterHandle } : {}),
      images: [ogImage],
    },
    verification: {
      google: site.googleSiteVerification || undefined,
      yandex: site.yandexVerification || undefined,
      other: site.bingSiteVerification
        ? { "msvalidate.01": site.bingSiteVerification }
        : undefined,
    },
  };
}

/**
 * Metadata for individual blog posts (app/blog/[slug]/page.tsx).
 * Adds article-specific Open Graph + a self canonical.
 */
export function getArticleMetadata(opts: {
  title: string; // 50-60 chars, include the primary keyword
  description: string; // 120-160 chars
  slug: string; // e.g. "chess-for-adults-and-seniors"
  image?: string;
  publishedTime?: string; // ISO date
  modifiedTime?: string;
  keywords?: string[];
}): Metadata {
  const { site } = SEO_CONFIG;
  const url = `${site.siteUrl}/blog/${opts.slug}`;
  const image = absoluteImage(opts.image || "/blog.jpg");
  return {
    title: { absolute: opts.title },
    description: opts.description,
    keywords: opts.keywords,
    metadataBase: new URL(site.siteUrl),
    alternates: { canonical: url, languages: { en: url, "x-default": url } },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.siteName,
      locale: site.locale,
      type: "article",
      publishedTime: opts.publishedTime,
      modifiedTime: opts.modifiedTime || opts.publishedTime,
      authors: [site.siteName],
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

// ─── Structured data builders ───────────────────────────────────────────────
type FaqItem = { question: string; answer: string };

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

type CourseDef = (typeof SEO_CONFIG.structuredData.courses)[number];

function buildCourseSchema(c: CourseDef & { adult?: boolean }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    inLanguage: "en",
    educationalLevel: c.level,
    provider: {
      "@type": "EducationalOrganization",
      "@id": `${SEO_CONFIG.site.siteUrl}/#organization`,
      name: "Chessmate Academy",
      sameAs: SEO_CONFIG.site.siteUrl,
    },
    audience: c.adult
      ? { "@type": "PeopleAudience", suggestedMinAge: 18 }
      : { "@type": "Audience", audienceType: c.audience },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      ...(c.adult ? { courseWorkload: "PT1H" } : {}), // 60-min live sessions
    },
  };
}

const BREADCRUMB_LABELS: Record<string, string> = {
  "chess-classes-for-adults": "Chess Classes for Adults",
  "online-coaching": "1-on-1 Online Coaching",
  "training-camps": "Training Camps",
  bookdemo: "Book a Free Demo",
  fcs: "Future Champions Series",
  platform: "Training Platform",
  puzzles: "Chess Puzzles",
};

export function buildBreadcrumbSchema(pageKey: SeoPageKey) {
  const page = SEO_CONFIG.pages[pageKey] as PageSeoConfig;
  const { siteUrl } = SEO_CONFIG.site;
  const canonical = page?.canonical || `/${pageKey}`;
  const segments = canonical.split("/").filter(Boolean);

  const items = [{ name: "Home", url: siteUrl }];
  let path = "";
  segments.forEach((seg, i) => {
    path += `/${seg}`;
    items.push({
      name:
        BREADCRUMB_LABELS[seg] ||
        seg.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
      url: `${siteUrl}${path}`,
    });
    void i;
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Sitewide entity nodes (Organization + LocalBusiness + WebSite). */
function sitewideSchemas() {
  const { structuredData, socialProfiles } = SEO_CONFIG;
  const sameAs = Object.values(socialProfiles).filter(Boolean) as string[];
  return [
    { ...structuredData.organization, sameAs },
    structuredData.localBusiness,
    structuredData.website,
  ];
}

/**
 * Which page-specific schemas belong on which page. FAQ schema is only emitted
 * where the same Q&A is visibly rendered.
 */
const PAGE_SCHEMAS: Partial<
  Record<SeoPageKey, { courses?: string[]; faqs?: "faqs" | "adultFaqs" }>
> = {
  home: { courses: ["beginner", "intermediate", "advanced", "master", "adult"], faqs: "faqs" },
  courses: { courses: ["beginner", "intermediate", "advanced", "master", "adult"] },
  adultClasses: { courses: ["adult"], faqs: "adultFaqs" },
  adults: { courses: ["adult"], faqs: "adultFaqs" },
  curriculum: { courses: ["beginner", "intermediate", "advanced", "master"] },
};

/**
 * Build the JSON-LD array for a page.
 *
 *  - getStructuredDataSchemas("adultClasses")  -> RECOMMENDED: sitewide +
 *    page-specific (courses/FAQ only where relevant) + breadcrumbs.
 *  - getStructuredDataSchemas()                -> legacy behaviour (sitewide +
 *    all courses + sitewide FAQ) so existing layouts keep working. Migrate to
 *    the per-page call to avoid duplicate FAQ/Course nodes on every URL.
 */
export function getStructuredDataSchemas(pageKey?: SeoPageKey) {
  const { structuredData } = SEO_CONFIG;
  const sitewide = sitewideSchemas();

  if (!pageKey) {
    return [
      ...sitewide,
      ...structuredData.courses.map(buildCourseSchema),
      buildFaqSchema(structuredData.faqs),
    ];
  }

  const map = PAGE_SCHEMAS[pageKey];
  const out: object[] = pageKey === "home" ? [...sitewide] : [];

  if (pageKey !== "home") out.push(buildBreadcrumbSchema(pageKey));
  if (map?.courses) {
    out.push(
      ...structuredData.courses
        .filter((c) => map.courses!.includes(c.key))
        .map(buildCourseSchema)
    );
  }
  if (map?.faqs) out.push(buildFaqSchema(structuredData[map.faqs]));
  return out;
}

// ─── 4. CRAWL FILES ─────────────────────────────────────────────────────────

/**
 * app/robots.ts  ->  export { getRobotsConfig as default } from "@/config/seo";
 *
 * The previous robots.txt blocked ClaudeBot, anthropic-ai and Cohere-ai, which
 * keeps the academy out of AI answers (the audit's GEO warning). Set
 * `allowAiCrawlers` to false if you deliberately want to opt out of AI
 * training/answer crawlers - it's a business decision, not a technical one.
 */
const ROBOTS = {
  allowAiCrawlers: true,
  disallow: ["/pay", "/quick-pay", "/api/"],
  // Aggressive scrapers with no search/AI-answer value - keep blocked.
  blockedBots: ["PetalBot", "Bytespider"],
  aiCrawlers: [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "CCBot",
    "cohere-ai",
  ],
};

export function getRobotsConfig(): MetadataRoute.Robots {
  const rules: MetadataRoute.Robots["rules"] = [
    { userAgent: "*", allow: "/", disallow: ROBOTS.disallow },
    { userAgent: ROBOTS.blockedBots, disallow: "/" },
  ];
  if (ROBOTS.allowAiCrawlers) {
    rules.push({ userAgent: ROBOTS.aiCrawlers, allow: "/", disallow: ROBOTS.disallow });
  } else {
    rules.push({ userAgent: ROBOTS.aiCrawlers, disallow: "/" });
  }
  return {
    rules,
    sitemap: `${SEO_CONFIG.site.siteUrl}/sitemap.xml`,
  };
}

/**
 * app/llms.txt/route.ts
 *   export const dynamic = "force-static";
 *   export function GET() {
 *     return new Response(getLlmsTxt(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
 *   }
 */
export function getLlmsTxt(): string {
  const { siteUrl } = SEO_CONFIG.site;
  const p = SEO_CONFIG.pages;
  const link = (k: SeoPageKey, label: string) =>
    `- [${label}](${absoluteUrl(p[k].canonical)}): ${p[k].description}`;

  return `# Chessmate Academy

> Chessmate Academy (also written "Chess Mate Academy") is an online chess academy offering live 1-on-1 and small-group coaching by FIDE-rated coaches. It teaches kids from age 5 and, as its differentiator, adults of every level through dedicated 1-on-1 programs with no kids' batches. Students also get a 24/7 gamified training platform. Not to be confused with the "Chessmate" chess game/app.

Contact: +91-7990775581, +91-8733084949, contact@thechessmate.org
Website: ${siteUrl}

## Programs
${link("adultClasses", "Chess Classes for Adults")}
${link("onlineCoaching", "1-on-1 Online Chess Coaching")}
${link("courses", "Online Chess Courses")}
${link("curriculum", "Chess Curriculum")}
${link("trainingCamps", "Training Camps")}
${link("fcs", "Future Champions Series")}

## Platform & Practice
${link("platform", "Training Platform")}
${link("puzzles", "Chess Puzzles")}

## About & Enrollment
${link("about", "About Chessmate Academy")}
${link("coaches", "FIDE-Rated Coaches")}
${link("bookDemo", "Book a Free Demo")}
${link("contact", "Contact")}

## Resources
${link("blog", "Chess Blog")}

## Optional
${link("events", "Events & Tournaments")}
${link("achievements", "Student Achievements")}
`;
}

import type { Metadata } from "next";

/**
 * ============================================================================
 * CHESSMATE ACADEMY - CENTRAL SEO CONFIGURATION FILE
 * ============================================================================
 * 
 * 📌 INSTRUCTIONS FOR THE SEO TEAM:
 * This is the SINGLE SOURCE OF TRUTH for all SEO settings across the entire website.
 * You can modify:
 *  1. Global site settings (Domain, Verification codes, Default social previews)
 *  2. Per-page metadata (Title tags, Meta descriptions, Target keywords, Canonical URLs, OG Tags)
 *  3. Robots directives (Index / Noindex settings)
 *  4. Structured Data (Schema.org JSON-LD for Organization, Local Business, Courses, and FAQs)
 * 
 * Any changes made in this file automatically update the live metadata, social cards,
 * and search engine structured data across all pages.
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

export const SEO_CONFIG = {
  // ─── 1. GLOBAL SITE & WEBMASTER SETTINGS ──────────────────────────────────────
  site: {
    siteName: "Chessmate Academy",
    siteUrl: "https://thechessmate.org",
    defaultTitle: "Chessmate Academy | Where Champions Are Built",
    titleTemplate: "%s | Chessmate Academy",
    defaultDescription:
      "Nurturing young minds through strategic chess training. Expert-led 1:1 and group classes for ages 6-16 with FIDE-rated coaches.",
    defaultKeywords: [
      "Chess Academy Indirapuram",
      "Online Chess Classes",
      "Chessmate",
      "Chessmate Academy",
      "FIDE Rated Coaches",
      "Chess Coaching India",
      "Kids Chess Training",
      "Best Online Chess Academy",
      "Grandmaster Chess Coaching",
      "Chess Classes for Children"
    ],
    defaultOgImage: "https://thechessmate.org/main.png",
    twitterHandle: "@thechess_mate",
    themeColor: "#7c3aed",
    locale: "en_IN",
    
    // Webmaster Verification Codes (Add your tokens below)
    googleSiteVerification: "", // e.g. "google-site-verification=xxxx..."
    bingSiteVerification: "",   // e.g. "xxxx..."
    yandexVerification: "",
    
    // Tag Manager & Analytics Tracking IDs
    gtmId: "GTM-PJMXNVT",
    gaId: "", // e.g. "G-XXXXXXXXXX"
  },

  // ─── 2. PER-PAGE METADATA CATALOG ──────────────────────────────────────────
  pages: {
    // 🏠 Home Page
    home: {
      title: "Chessmate Academy | Where Champions Are Built",
      description:
        "Transform your child into a strategic thinker. Expert-led 1:1 and interactive group chess training for ages 6-16 with FIDE-rated mentors. Book a free demo class today!",
      keywords: [
        "Chess Academy Indirapuram",
        "Online Chess Classes",
        "Chessmate",
        "FIDE Rated Coaches",
        "Chess Coaching for Kids",
        "Best Online Chess School",
        "Learn Chess Online"
      ],
      canonical: "/",
      ogTitle: "Chessmate Academy | Where Champions Are Built",
      ogDescription:
        "Transform your child into a strategic thinker. Expert-led 1:1 and group chess coaching. Book a free demo class today.",
      ogImage: "/main.png",
      noIndex: false,
    },

    // 📖 About Us
    about: {
      title: "About Us | Top Chess Mentorship & Vision - Chessmate Academy",
      description:
        "Learn about Chessmate Academy's mission, grandmaster-backed curriculum, and passionate FIDE-rated coaches dedicated to nurturing the next generation of chess masters.",
      keywords: [
        "About Chessmate Academy",
        "Chess Academy Mission",
        "FIDE Certified Chess Mentors",
        "Chess Coaches Profile",
        "Chessmate Story"
      ],
      canonical: "/about",
      ogTitle: "About Us | Chessmate Academy",
      ogDescription:
        "Empowering kids with critical thinking and strategy through world-class chess mentorship.",
      ogImage: "/home.jpeg",
      noIndex: false,
    },

    // 🎓 Courses & Programs
    courses: {
      title: "Chess Courses for All Levels | Beginner to Advanced - Chessmate Academy",
      description:
        "Structured chess programs tailored for Beginners, Intermediate, and Advanced players. Master opening repertoire, tactical calculation, and endgame mastery with FIDE trainers.",
      keywords: [
        "Chess Courses Online",
        "Beginner Chess Course",
        "Intermediate Chess Training",
        "Advanced Chess Coaching",
        "FIDE Chess Curriculum"
      ],
      canonical: "/courses",
      ogTitle: "Chess Courses & Training Programs | Chessmate Academy",
      ogDescription:
        "Explore structured chess programs designed for young minds from foundational rules to tournament championships.",
      ogImage: "/training.png",
      noIndex: false,
    },

    // 📚 Curriculum
    curriculum: {
      title: "Comprehensive Chess Curriculum | Step-by-Step Mastery - Chessmate Academy",
      description:
        "Explore our structured 4-level chess curriculum covering foundational tactics, positional strategy, calculation techniques, and tournament preparation.",
      keywords: [
        "Chess Curriculum",
        "Chess Syllabus",
        "Step by step chess learning",
        "FIDE Chess Syllabus",
        "Chess Learning Roadmap"
      ],
      canonical: "/curriculum",
      ogTitle: "Our Chess Curriculum | Chessmate Academy",
      ogDescription:
        "A structured, scientifically backed chess learning roadmap from fundamentals to master level.",
      ogImage: "/method.jpeg",
      noIndex: false,
    },

    // 💻 Online Coaching
    onlineCoaching: {
      title: "1-on-1 Online Chess Coaching | Personalized Mentorship - Chessmate Academy",
      description:
        "Interactive 1:1 online chess coaching with live interactive digital boards, personalized game analysis, homework assignments, and tournament guidance.",
      keywords: [
        "1 on 1 Online Chess Coaching",
        "Personalized Chess Trainer",
        "Live Online Chess Lessons",
        "Private Chess Tutor",
        "Online Chess Classes for Kids"
      ],
      canonical: "/online-coaching",
      ogTitle: "1-on-1 Online Chess Coaching | Chessmate Academy",
      ogDescription:
        "Get personalized private coaching from international rated masters. Flexible scheduling and custom lesson plans.",
      ogImage: "/online.jpeg",
      noIndex: false,
    },

    // ♟️ Chess Classes for Adults
    adults: {
      title: "Personalized Online Chess Classes for Adults | 1-on-1 Coaching - Chessmate Academy",
      description:
        "Elite online chess classes for adults of all levels—beginners, returners, and rated improvers. 1-on-1 coaching, game analysis, custom training plans, and flexible timings designed for busy adults. Book a free assessment today!",
      keywords: [
        "chess classes for adults",
        "online chess classes for adults",
        "adult chess coaching",
        "online chess lessons for adults",
        "one-on-one chess coaching",
        "personalized chess training",
        "chess coach for adults",
        "chess lessons for beginners/intermediate adults",
        "adult chess improver",
        "FIDE rated coach for adults"
      ],
      canonical: "/chess-classes-for-adults",
      ogTitle: "Online Chess Classes for Adults | 1-on-1 Coaching - Chessmate Academy",
      ogDescription:
        "Tailored 1-on-1 chess coaching for adults. Flexible schedules, deep personal game analysis, and structured plans to break your rating plateau.",
      ogImage: "/adult-coaching-hero.jpg",
      noIndex: false,
    },

    // ⚡ ChessMate Training Platform & Product Features
    platform: {
      title: "ChessMate Training Platform | Continuous 24/7 Practice Ecosystem",
      description:
        "Your training doesn't end when the live class ends. Access personalized assignments, 10,000+ tactical puzzles, personal game analysis, gamified streaks, and online arena tournaments.",
      keywords: [
        "chess training platform",
        "online chess practice software",
        "personalized chess assignments",
        "chess tactics trainer",
        "chess puzzle database",
        "chess game analysis tool",
        "gamified chess learning",
        "chess homework app"
      ],
      canonical: "/platform",
      ogTitle: "ChessMate Training Platform | 24/7 Continuous Chess Training Ecosystem",
      ogDescription:
        "Practice between classes with personalized assignments, 10k+ puzzles, game analysis, and dynamic learning roadmaps.",
      ogImage: "/dashboard.jpeg",
      noIndex: false,
    },

    // 🏆 Coaches & Mentors
    coaches: {
      title: "Our Coaches | FIDE Rated Masters & Grandmaster Mentors - Chessmate Academy",
      description:
        "Meet our team of FIDE-rated trainers and experienced international chess masters committed to personal growth and tournament success for every student.",
      keywords: [
        "Chess Coaches",
        "FIDE Rated Trainers",
        "Chess Mentors",
        "Grandmaster Coaching",
        "Chess Academy Instructors"
      ],
      canonical: "/coaches",
      ogTitle: "Meet Our Expert Coaches | Chessmate Academy",
      ogDescription:
        "Learn from seasoned FIDE-rated coaches with proven track records of developing national champions.",
      ogImage: "/coaching.png",
      noIndex: false,
    },

    // 💰 Pricing & Plans
    pricing: {
      title: "Transparent Pricing & Plans | Affordable Chess Classes - Chessmate Academy",
      description:
        "Flexible and transparent pricing for 1:1 private classes, small batches, and masterclasses. No hidden fees. Book a free evaluation session today.",
      keywords: [
        "Chess Classes Fee",
        "Chess Coaching Cost",
        "Affordable Online Chess Training",
        "Chess Academy Pricing",
        "Chess Subscription"
      ],
      canonical: "/pricing",
      ogTitle: "Pricing & Membership Plans | Chessmate Academy",
      ogDescription:
        "Affordable, high-value chess training packages with flexible schedules and money-back guarantee options.",
      ogImage: "/main.png",
      noIndex: false,
    },

    // 🥇 Achievements & Wall of Fame
    achievements: {
      title: "Student Achievements & Wall of Fame | Chessmate Academy",
      description:
        "Celebrate the victories and milestones of Chessmate Academy students in district, state, national, and international FIDE rated tournaments.",
      keywords: [
        "Chess Academy Achievements",
        "Chess Tournament Winners",
        "FIDE Rating Gains",
        "Student Success Stories",
        "Chess Champions"
      ],
      canonical: "/achievements",
      ogTitle: "Student Achievements & Tournament Wins | Chessmate Academy",
      ogDescription:
        "Discover the remarkable tournament victories and FIDE rating milestones achieved by our young champions.",
      ogImage: "/best.jpeg",
      noIndex: false,
    },

    // 📅 Book a Demo
    bookDemo: {
      title: "Book a Free 1-on-1 Chess Demo Class | Chessmate Academy",
      description:
        "Claim a free 45-minute 1-on-1 trial chess session and skill assessment with a certified coach. Discover your child's chess potential with no commitment.",
      keywords: [
        "Free Chess Demo",
        "Book Free Chess Class",
        "Free Chess Assessment",
        "Trial Chess Lesson",
        "Chess Demo for Kids"
      ],
      canonical: "/bookdemo",
      ogTitle: "Book Your Free Chess Demo Class | Chessmate Academy",
      ogDescription:
        "Complimentary 45-minute live interactive evaluation session with an expert chess mentor.",
      ogImage: "/hero.jpg",
      noIndex: false,
    },

    // 🏆 Events & Tournaments
    events: {
      title: "Upcoming Chess Events & Tournaments | Chessmate Academy",
      description:
        "Stay updated on upcoming online arena tournaments, blitz championships, inter-school cups, and masterclass webinars organized by Chessmate Academy.",
      keywords: [
        "Chess Tournaments India",
        "Online Chess Competitions",
        "Kids Chess Contests",
        "Chess Events",
        "FIDE Rating Tournaments"
      ],
      canonical: "/events",
      ogTitle: "Chess Tournaments & Events | Chessmate Academy",
      ogDescription:
        "Participate in exciting competitive tournaments and sharpen your game under real tournament conditions.",
      ogImage: "/open.png",
      noIndex: false,
    },

    // 🖼️ Gallery
    gallery: {
      title: "Photo Gallery & Memorable Moments | Chessmate Academy",
      description:
        "Browse moments from our offline coaching camps, online batch celebrations, prize distributions, and tournament action.",
      keywords: [
        "Chessmate Gallery",
        "Chess Academy Photos",
        "Chess Camp Pictures",
        "Tournament Moments"
      ],
      canonical: "/gallery",
      ogTitle: "Photo Gallery | Chessmate Academy",
      ogDescription:
        "Memorable moments from training sessions, summer camps, and trophy celebrations.",
      ogImage: "/chess2.png",
      noIndex: false,
    },

    // 📝 Blog & Insights
    blog: {
      title: "Chess Blog, Strategy Guides & Educational Articles | Chessmate Academy",
      description:
        "Read in-depth chess guides, opening analysis, cognitive benefits of chess, neurodiversity insights, and parenting tips to support your young chess prodigy.",
      keywords: [
        "Chess Blog",
        "Chess Tips for Kids",
        "Chess Openings Guide",
        "Benefits of Chess for Children",
        "Chess and ADHD",
        "Chess and Autism",
        "Tactical Chess Calculation"
      ],
      canonical: "/blog",
      ogTitle: "Chess Strategy Blog & Guides | Chessmate Academy",
      ogDescription:
        "Expert tactical insights, training strategies, and developmental benefits of playing chess.",
      ogImage: "/blog.jpg",
      noIndex: false,
    },

    // 🏕️ Training Camps
    trainingCamps: {
      title: "Chess Intensive Training Camps & Bootcamps | Chessmate Academy",
      description:
        "Accelerate rating growth with intensive holiday bootcamps, tactical masterclasses, and endgame immersion camps led by grandmasters and international masters.",
      keywords: [
        "Chess Summer Camp",
        "Intensive Chess Bootcamp",
        "Holiday Chess Workshop",
        "Grandmaster Chess Camp"
      ],
      canonical: "/training-camps",
      ogTitle: "Chess Intensive Camps & Bootcamps | Chessmate Academy",
      ogDescription:
        "Accelerate your child's rating with intensive bootcamps and deep tactical immersion.",
      ogImage: "/training.png",
      noIndex: false,
    },

    // 🧩 Puzzles Portal
    puzzles: {
      title: "Interactive Chess Tactics & Daily Puzzles | Chessmate Academy",
      description:
        "Sharpen your tactical vision with curated daily chess puzzles across Beginner, Intermediate, and Advanced difficulty levels.",
      keywords: [
        "Chess Puzzles Online",
        "Daily Chess Tactics",
        "Tactical Calculation Puzzles",
        "Mate in 1 Puzzles",
        "Tactics Trainer"
      ],
      canonical: "/puzzles",
      ogTitle: "Interactive Chess Puzzles | Chessmate Academy",
      ogDescription:
        "Challenge your brain with tactical puzzles tailored for all skill levels.",
      ogImage: "/tectics.jpeg",
      noIndex: false,
    },

    puzzlesBeginner: {
      title: "Beginner Chess Puzzles & Mate in 1 | Chessmate Academy",
      description: "Solve easy beginner tactical puzzles, mate-in-one combinations, and basic piece capture tactics.",
      keywords: ["Beginner Chess Puzzles", "Mate in 1", "Easy Chess Puzzles", "Kids Chess Tactics"],
      canonical: "/puzzles/beginner",
      noIndex: false,
    },

    puzzlesIntermediate: {
      title: "Intermediate Chess Tactics & Combinations | Chessmate Academy",
      description: "Master double attacks, forks, pins, skewers, and multi-move tactical combinations.",
      keywords: ["Intermediate Chess Puzzles", "Chess Tactics Pins Forks", "Tactical Combinations"],
      canonical: "/puzzles/intermediate",
      noIndex: false,
    },

    puzzlesAdvanced: {
      title: "Advanced Chess Puzzles & Calculation Challenges | Chessmate Academy",
      description: "Complex tactical positions, quiet moves, deflection sacrifices, and deep endgame calculations.",
      keywords: ["Advanced Chess Puzzles", "Hard Chess Calculation", "Grandmaster Puzzles"],
      canonical: "/puzzles/advanced",
      noIndex: false,
    },

    // 🌟 FCS (Future Champions Series)
    fcs: {
      title: "Future Champions Series (FCS) | Elite League - Chessmate Academy",
      description:
        "An exclusive competitive platform empowering young chess talents with regular rating tournaments, leaderboard rewards, and mentorship opportunities.",
      keywords: [
        "Future Champions Series",
        "FCS Chess League",
        "Junior Chess Championship",
        "Competitive Chess League"
      ],
      canonical: "/fcs",
      ogTitle: "Future Champions Series (FCS) | Chessmate Academy",
      ogDescription:
        "The competitive proving ground for rising chess prodigies with monthly awards and ranking points.",
      ogImage: "/fcs-logo.png",
      noIndex: false,
    },

    // 📞 Contact Us
    contact: {
      title: "Contact Us | Enquire for Chess Classes - Chessmate Academy",
      description:
        "Get in touch with Chessmate Academy. Contact our support team for admissions, course details, demo bookings, or offline center visits.",
      keywords: [
        "Contact Chessmate Academy",
        "Chess Classes Enquiry",
        "Chess Academy Phone Number",
        "Chess Coaching WhatsApp"
      ],
      canonical: "/contact",
      ogTitle: "Contact Chessmate Academy",
      ogDescription:
        "Have questions about classes or enrollment? Contact our friendly support team on WhatsApp or email.",
      ogImage: "/contact.png",
      noIndex: false,
    },

    // 📜 Terms & Policies
    terms: {
      title: "Terms & Conditions & Privacy Policy | Chessmate Academy",
      description:
        "Read our service terms, class cancellation policies, refund guidelines, and privacy practices.",
      keywords: ["Chessmate Terms", "Privacy Policy", "Refund Policy"],
      canonical: "/terms",
      noIndex: false,
    },

    // 🔒 Payment Pages (Disallowed from indexing for security/privacy)
    pay: {
      title: "Secure Payment Portal | Chessmate Academy",
      description: "Secure tuition payment portal for Chessmate Academy programs.",
      keywords: ["Payment", "Tuition Fee"],
      canonical: "/pay",
      noIndex: true, // Instructs search engines not to index payment links
    },

    quickPay: {
      title: "Quick Fee Checkout | Chessmate Academy",
      description: "Fast and secure payment link for course registrations and tournament fees.",
      keywords: ["Quick Pay", "Checkout"],
      canonical: "/quick-pay",
      noIndex: true, // Instructs search engines not to index payment links
    },

    // 🎉 Thank You Page (After form submission)
    thankYou: {
      title: "Thank You! Book Your Demo Slot | Chessmate Academy",
      description: "Thank you for requesting a free demo class with Chessmate Academy. Select your preferred date and time slot.",
      keywords: ["Thank You", "Book Slot", "Demo Confirmation"],
      canonical: "/thank-you",
      noIndex: true,
    },
  },

  // ─── 3. SCHEMA.ORG STRUCTURED DATA (JSON-LD) ────────────────────────────────
  structuredData: {
    // 🏢 Sports / Educational Organization Profile
    organization: {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "@id": "https://thechessmate.org/#organization",
      name: "Chessmate Academy",
      alternateName: ["ChessMate", "Chessmate Academy India", "The Chessmate"],
      url: "https://thechessmate.org",
      logo: "https://thechessmate.org/logo.jpg",
      image: "https://thechessmate.org/main.png",
      description:
        "Premier international chess academy providing 1:1 and interactive small-group online chess training with certified FIDE trainers.",
      founder: {
        "@type": "Person",
        name: "Devam",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Thazhambur",
        addressLocality: "Chennai",
        addressRegion: "Tamil Nadu",
        postalCode: "603302",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7990775581",
        contactType: "customer service",
        email: "contact@thechessmate.org",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.facebook.com/chessmate",
        "https://www.instagram.com/thechess_mate",
      ],
    },

    // 📍 Local Business Search Schema
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": "https://thechessmate.org/#localbusiness",
      name: "Chessmate Academy",
      url: "https://thechessmate.org",
      telephone: "+91-7990775581",
      email: "contact@thechessmate.org",
      priceRange: "$$",
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

    // 🎓 Course Catalog Schema
    courses: [
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Beginner Chess Foundation Course",
        description:
          "Foundational chess training covering board geometry, piece movements, basic tactical motifs, and checkmating patterns for young beginners.",
        provider: {
          "@type": "Organization",
          name: "Chessmate Academy",
          sameAs: "https://thechessmate.org",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Intermediate Tactics & Positional Play",
        description:
          "Tactical calculation, opening principles, pawn structures, middle game strategy, and fundamental endgame techniques.",
        provider: {
          "@type": "Organization",
          name: "Chessmate Academy",
          sameAs: "https://thechessmate.org",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Advanced Tournament Preparation & FIDE Rating Mastery",
        description:
          "Grandmaster-curated training with deep calculation, complex endgames, opening repertoire formulation, and psychological tournament preparation.",
        provider: {
          "@type": "Organization",
          name: "Chessmate Academy",
          sameAs: "https://thechessmate.org",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Personalized Online Chess Coaching for Adults",
        description:
          "Personalized 1-on-1 chess coaching for adult improvers, beginners, and tournament players. Flexible scheduling, personalized game analysis, and custom study plans.",
        provider: {
          "@type": "Organization",
          name: "Chessmate Academy",
          sameAs: "https://thechessmate.org",
        },
      },
    ],

    // ❓ FAQ Rich Snippets (Appears directly in Google Search SERP)
    faqs: [
      {
        question: "What is the recommended age for kids to start learning chess?",
        answer:
          "Children can begin learning chess from ages 5 to 6. At this age, children develop strong spatial awareness, concentration, and logical reasoning through interactive game-based coaching.",
      },
      {
        question: "How do online chess classes work at Chessmate Academy?",
        answer:
          "Our online classes feature live interactive digital chessboards, real-time audio/video interaction with FIDE-rated coaches, instant position evaluation, and post-session puzzle homework.",
      },
      {
        question: "Can I book a trial demo class before enrolling?",
        answer:
          "Yes! We offer a completely free, no-obligation 45-minute 1-on-1 assessment and demo class to evaluate your child's current chess level and introduce our curriculum.",
      },
      {
        question: "Are your coaches FIDE rated and certified?",
        answer:
          "Yes, all lead mentors and instructors at Chessmate Academy are FIDE-rated players and certified trainers with extensive tournament and coaching experience.",
      },
      {
        question: "Do you help students participate in official tournaments?",
        answer:
          "Absolutely. We actively prepare our students for district, state, national, and official FIDE-rated rating tournaments, offering pre-tournament preparation and post-game analysis.",
      },
    ],
  },
};

export type SeoPageKey = keyof typeof SEO_CONFIG.pages;

/**
 * Helper function to generate Next.js Metadata for any page
 */
export function getSeoMetadata(pageKey: SeoPageKey): Metadata {
  const page = SEO_CONFIG.pages[pageKey];
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
  const keywords = page.keywords || site.defaultKeywords;
  const canonicalUrl = `${site.siteUrl}${page.canonical === "/" ? "" : page.canonical}`;
  const ogImage = page.ogImage
    ? page.ogImage.startsWith("http")
      ? page.ogImage
      : `${site.siteUrl}${page.ogImage}`
    : site.defaultOgImage;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords,
    metadataBase: new URL(site.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: page.noIndex
      ? {
          index: false,
          follow: false,
        }
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
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      url: canonicalUrl,
      siteName: site.siteName,
      locale: site.locale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: page.ogTitle || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      creator: site.twitterHandle,
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
 * Helper to build JSON-LD Script Schemas for root layout or page rendering
 */
export function getStructuredDataSchemas() {
  const { structuredData } = SEO_CONFIG;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: structuredData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return [
    structuredData.organization,
    structuredData.localBusiness,
    ...structuredData.courses,
    faqSchema,
  ];
}

/** Home page copy as it ships in src/routes/index.tsx. Images stay in the repo. */
export const homePage = {
  hero: {
    rating: "4.8 stars",
    reviews: "2,100+ reviews",
    headline: "The business phone system that never misses a call",
    sub: "Smartytel gives your team a shared business phone number and one inbox for every call, SMS and WhatsApp thread — with local numbers across the US, Canada, the UK and every European country, and an AI agent answering after hours.",
    primaryCta: "Try for free",
    secondaryCta: "See how it works (1:00)",
    platforms: "Available on iOS, Android, macOS, Windows and Web",
  },
  logos: {
    heading: "Powering conversations for 40,000+ businesses",
    items: [
      "Northwind",
      "Kelso Realty",
      "Bright Dental",
      "Halden Legal",
      "Vera Health",
      "Junkaway",
    ].map((value) => ({ value })),
  },
  featureGroups: [
    {
      heading: "Easy collaboration",
      cards: [
        {
          title: "Internal threads",
          body: "Use threads to solve problems behind the scenes as a team",
        },
        {
          title: "Group calling",
          body: "Bring anyone else you need on your team into the conversation",
        },
        {
          title: "Warm transfer",
          body: "Ensure a smooth hand-off by sharing context while transferring calls",
        },
      ],
    },
    {
      heading: "Better team oversight",
      cards: [
        {
          title: "Team analytics",
          body: "Managers can see an in-depth overview of team activity",
        },
        {
          title: "Filter conversations",
          body: "Sort conversations to focus on what needs attention",
        },
        {
          title: "View call logs by priority",
          body: "See the call activity that matters most to you",
        },
      ],
    },
  ],
  showcase: {
    heading: "Everything a modern business phone system should do",
    items: [
      { title: "Share one number and stay aligned with your team", link: "Shared numbers" },
      { title: "Route incoming calls the right person instantly", link: "Call routing" },
      { title: "Never miss a lead. Let AI answer when your team can't", link: "Smarty AI agent" },
      { title: "Spot issues before they cost your business", link: "Analytics" },
      { title: "Sync calls and texts with your favorite tools", link: "Integrations" },
    ],
  },
  stories: {
    heading: "Business phone stories from teams like yours",
    sub: "See how teams stay connected with customers.",
    items: [
      {
        business: "Pink's Window Services",
        person: "Carter Smith",
        role: "Co-Founder",
        quote:
          "We're so confident in saying, 'Hey everybody, just get on Smartytel. Save yourself the time, save yourself the hassle.'",
        stat: "375+",
        statLabel: "hours saved weekly",
      },
      {
        business: "Bright Dental",
        person: "Dr. Priya Malhotra",
        role: "Practice Owner",
        quote:
          "Patients used to wait on hold for 10 minutes. Now our front desk answers every text in seconds.",
        stat: "98%",
        statLabel: "message response rate",
      },
      {
        business: "Kelso Realty",
        person: "Marcus Kelso",
        role: "Broker",
        quote: "One number for the whole team means no buyer ever gets sent to voicemail.",
        stat: "3x",
        statLabel: "more showings booked",
      },
      {
        business: "Northwind HVAC",
        person: "Elena Torres",
        role: "Operations Manager",
        quote:
          "Routing after-hours emergencies straight to the on-call tech saved us from losing a $40k contract.",
        stat: "24/7",
        statLabel: "emergency coverage",
      },
      {
        business: "Halden Legal",
        person: "Sam Halden",
        role: "Managing Partner",
        quote: "Clients can text us instead of playing phone tag. It changed how we close cases.",
        stat: "42%",
        statLabel: "faster intake replies",
      },
      {
        business: "Junkaway",
        person: "Riley Park",
        role: "Owner",
        quote:
          "Crews in the field finally have one inbox for calls, texts and photos. No more chasing threads.",
        stat: "200+",
        statLabel: "extra jobs scheduled monthly",
      },
    ],
  },
  builtFor: {
    heading: "Built for how your team actually works",
    items: [
      { label: "Home services" },
      { label: "Property management" },
      { label: "Law firms" },
      { label: "Small business" },
      { label: "Healthcare" },
      { label: "Startups" },
      { label: "Support teams" },
      { label: "Sales teams" },
    ],
  },
  plans: [
    {
      name: "Trial",
      price: "$0",
      unit: "/14 days",
      tagline: "Try everything with a demo number, no card needed.",
      perks: [
        "14-day free trial",
        "Demo phone number",
        "Calling & messaging basics",
        "Mobile & desktop apps",
      ].map((value) => ({ value })),
    },
    {
      name: "Startup",
      price: "$15",
      unit: "/user/mo",
      tagline: "For solo operators getting off a personal number.",
      perks: [
        "1 local number included",
        "Local & long-distance calls",
        "SMS & chat apps",
        "Contacts and call history",
      ].map((value) => ({ value })),
    },
    {
      name: "Business",
      price: "$25",
      unit: "/user/mo",
      tagline: "For teams that answer every call, together.",
      perks: [
        "Everything in Startup",
        "IVR phone menus",
        "Call recording & hunting",
        "Call forwarding",
        "AI assistance add-on",
      ].map((value) => ({ value })),
    },
    {
      name: "Scale",
      price: "$35",
      unit: "/user/mo",
      tagline: "For contact centers and multi-location brands.",
      perks: [
        "Everything in Business",
        "AI transcripts & summaries",
        "Custom telephony flows",
        "Advanced analytics",
        "Priority support",
      ].map((value) => ({ value })),
    },
  ],
  metaTitle: "Business Phone System & Shared Inbox | Smartytel",
  metaDescription:
    "Smartytel is the business phone system and shared team inbox for calls, SMS and WhatsApp — local numbers in the US, Canada, the UK and across Europe.",
};

import { FAQItem } from '@/components/PageFAQ'

export const pageFAQs: Record<string, { 
  faqs: FAQItem[], 
  title?: string, 
  description?: string,
  relatedLinks?: { href: string, text: string }[]
}> = {
  // Homepage FAQs
  home: {
    faqs: [
      {
        question: "What is InvestInPuglia and how can it help me invest in Italy?",
        answer: "InvestInPuglia is a specialized consultancy that helps international investors access EU grants (up to €2.5M) and navigate property investments in Puglia, Italy. We provide end-to-end support including property search, legal assistance, grant applications, and renovation management."
      },
      {
        question: "How much grant funding can I receive for my investment in Puglia?",
        answer: "Through the Mini PIA program, you can receive 45-55% non-refundable grants on eligible investments ranging from €50,000 to €5 million. The maximum grant amount is €2.5 million. Historic properties like Trulli can qualify for up to 55% funding."
      },
      {
        question: "Do I need to speak Italian to invest in Puglia?",
        answer: "No, you don't need to speak Italian. Our team provides full support in English and other languages. We handle all communications with local authorities, contractors, and government agencies on your behalf."
      },
      {
        question: "What types of properties qualify for EU grants in Puglia?",
        answer: "Eligible properties include hotels, B&Bs, agriturismos, restaurants, historic buildings (especially Trulli), and properties for tourism or manufacturing use. The property must be used for business purposes to qualify for grants."
      },
      {
        question: "How long does the entire investment process take?",
        answer: "The typical timeline is 18-24 months from initial consultation to operational business. This includes 3-6 months for preparation, 2-3 months for grant application review, and 12-18 months for property renovation and setup."
      }
    ],
    relatedLinks: [
      { href: "/mini-pia-guide", text: "Read our comprehensive Mini PIA Grant Guide" },
      { href: "/properties", text: "Browse available properties in Puglia" },
      { href: "/services", text: "Explore our full range of services" },
      { href: "/book-consultation", text: "Book a free consultation" }
    ]
  },

  // Services Page FAQs
  services: {
    title: "Services FAQ",
    description: "Common questions about our investment services and support",
    faqs: [
      {
        question: "What services does InvestInPuglia provide?",
        answer: "We offer comprehensive services including property search and due diligence, grant application preparation, company formation, legal and tax advisory, renovation project management, and operational support. Our services cover every aspect of your investment journey."
      },
      {
        question: "How much do your services cost?",
        answer: "Our services start from €1,500 for property search and range up to full project management at 5-8% of the grant amount. We offer transparent pricing with no hidden fees. Many clients recover our fees through the grants we help them secure."
      },
      {
        question: "Can you help me set up an Italian company?",
        answer: "Yes, we provide complete company formation services including SRL or SPA setup, tax registration, bank account opening, and ongoing accounting support. This typically takes 2-4 weeks and costs €3,000-5,000."
      },
      {
        question: "Do you provide ongoing support after the investment?",
        answer: "Absolutely. We offer operational support including property management, annual compliance, grant reporting requirements, and business development assistance for the mandatory 5-year operational period."
      },
      {
        question: "What is your success rate with grant applications?",
        answer: "We maintain a 95% success rate with grant applications because we thoroughly prepare each application and only proceed when we're confident of approval. Our team knows exactly what evaluators require."
      }
    ],
    relatedLinks: [
      { href: "/mini-pia-guide", text: "Learn about Mini PIA grants" },
      { href: "/investment-process", text: "Understand the investment process" },
      { href: "/about", text: "Learn about our team" },
      { href: "/sign-agreement", text: "Start your investment journey" }
    ]
  },

  // Properties Page FAQs
  properties: {
    title: "Property Investment FAQ",
    description: "Everything you need to know about buying property in Puglia",
    faqs: [
      {
        question: "What types of properties are available in Puglia?",
        answer: "Puglia offers diverse properties including traditional Trulli, historic masserias, coastal villas, urban palazzos, and development land. Prices range from €50,000 for renovation projects to €2M+ for luxury estates."
      },
      {
        question: "Can foreigners buy property in Italy?",
        answer: "Yes, EU citizens can buy property freely in Italy. Non-EU citizens can also purchase property, though some reciprocity agreements apply. We help navigate all legal requirements for international buyers."
      },
      {
        question: "What are the additional costs when buying property in Puglia?",
        answer: "Expect 10-15% additional costs including notary fees (1-2%), registration tax (2-9%), agency fees (3-4%), and legal fees (1-2%). For commercial properties qualifying for grants, many of these costs can be covered."
      },
      {
        question: "How do I know if a property qualifies for grants?",
        answer: "Properties must be used for business purposes (tourism, hospitality, manufacturing) and require renovation or improvement. Our team evaluates each property's grant potential during the initial consultation."
      },
      {
        question: "What is the average ROI on Puglia property investments?",
        answer: "Tourism properties in Puglia typically generate 15-25% annual ROI, with some achieving 30%+ when combined with EU grants. The region has seen 74% growth in foreign tourism demand over 4 years."
      }
    ],
    relatedLinks: [
      { href: "/locations", text: "Explore different areas of Puglia" },
      { href: "/renovation-expertise", text: "Learn about renovation services" },
      { href: "/tools/mini-pia-calculator", text: "Calculate your potential grant" },
      { href: "/portfolio", text: "See our successful projects" }
    ]
  },

  // Mini PIA Guide FAQs
  miniPiaGuide: {
    title: "Mini PIA Grant FAQ",
    description: "Detailed information about the Mini PIA grant program",
    faqs: [
      {
        question: "What is the Mini PIA grant program?",
        answer: "Mini PIA (Piccoli Investimenti Aziendali) is a regional grant program offering 45-55% non-refundable funding for business investments in Puglia. It's co-funded by the EU and designed to stimulate economic development in the region."
      },
      {
        question: "Who is eligible for Mini PIA grants?",
        answer: "Any company (including foreign-owned) registered in Italy with operational headquarters in Puglia can apply. You must create minimum 3 jobs and maintain operations for at least 5 years."
      },
      {
        question: "What costs are covered by the grant?",
        answer: "Eligible costs include property purchase, renovation, equipment, furniture, and professional services. At least 5% must be allocated to innovation or environmental improvements."
      },
      {
        question: "When can I apply for Mini PIA grants?",
        answer: "Application windows typically open 2-3 times per year and remain open for 60-90 days. We monitor announcements and prepare applications in advance to submit immediately when windows open."
      },
      {
        question: "What happens if my grant application is rejected?",
        answer: "With proper preparation, rejection is rare. If it occurs, we identify the issues, revise the application, and resubmit in the next window. Our 95% success rate comes from thorough preparation."
      }
    ],
    relatedLinks: [
      { href: "/tools/mini-pia-calculator", text: "Calculate your grant amount" },
      { href: "/services", text: "Get professional grant assistance" },
      { href: "/industries", text: "See eligible business sectors" },
      { href: "/consultation-success", text: "Success stories" }
    ]
  },

  // About Page FAQs
  about: {
    title: "About InvestInPuglia FAQ",
    description: "Learn more about our company and team",
    faqs: [
      {
        question: "Who is behind InvestInPuglia?",
        answer: "InvestInPuglia is led by Giuseppe Funaro, an investment consultant with 30+ years of experience who has secured over €50M in EU grants. Our team includes architects, engineers, lawyers, and grant specialists."
      },
      {
        question: "How long has InvestInPuglia been operating?",
        answer: "We've been helping international investors in Puglia for over 15 years, with our formal consultancy established in 2018. We've completed 200+ successful projects across the region."
      },
      {
        question: "Is InvestInPuglia affiliated with the government?",
        answer: "No, we are an independent private consultancy. While we work closely with regional authorities and understand government programs, we are not affiliated with or endorsed by any government entity."
      },
      {
        question: "What makes InvestInPuglia different from other consultancies?",
        answer: "Our unique combination of local expertise, proven track record (95% grant success rate), end-to-end service, and focus exclusively on Puglia makes us the region's leading investment consultancy."
      },
      {
        question: "Where is InvestInPuglia located?",
        answer: "Our main office is in Puglia, Italy, with team members throughout the region. We work with international clients remotely and can arrange in-person meetings in Puglia when needed."
      }
    ],
    relatedLinks: [
      { href: "/services", text: "Explore our services" },
      { href: "/portfolio", text: "View our portfolio" },
      { href: "/contact", text: "Contact our team" },
      { href: "/book-consultation", text: "Schedule a consultation" }
    ]
  },

  // Contact Page FAQs
  contact: {
    title: "Contact & Communication FAQ",
    description: "How to reach us and work with our team",
    faqs: [
      {
        question: "What's the best way to contact InvestInPuglia?",
        answer: "You can reach us via WhatsApp at +44 7862 140269 for instant responses from our AI assistant Trullo, email at info@investinpuglia.eu, or book a consultation directly through our website."
      },
      {
        question: "What languages do you support?",
        answer: "We provide services in English, Italian, German, French, and Spanish. Our AI assistant Trullo can communicate in over 10 languages for initial inquiries."
      },
      {
        question: "How quickly will I receive a response?",
        answer: "WhatsApp messages are answered instantly by Trullo AI. Emails are typically answered within 24 hours. Consultation requests are confirmed within 48 hours."
      },
      {
        question: "Do you offer in-person consultations?",
        answer: "Yes, we offer both video consultations and in-person meetings in Puglia. Property viewings and site visits can be arranged as part of our comprehensive service packages."
      },
      {
        question: "What information should I prepare before contacting you?",
        answer: "Having your investment budget, timeline, intended property use, and nationality ready helps us provide more specific guidance. However, we're happy to start with general inquiries."
      }
    ],
    relatedLinks: [
      { href: "/book-consultation", text: "Book a free consultation" },
      { href: "/services", text: "Learn about our services" },
      { href: "/mini-pia-guide", text: "Read the grant guide" },
      { href: "/sign-agreement", text: "Get started today" }
    ]
  },

  // Book Consultation FAQs
  bookConsultation: {
    title: "Consultation FAQ",
    description: "What to expect from your consultation",
    faqs: [
      {
        question: "What happens during the initial consultation?",
        answer: "During the 30-minute consultation, we discuss your investment goals, evaluate grant eligibility, review potential properties, explain the investment process, and provide initial cost estimates."
      },
      {
        question: "Is the consultation really free?",
        answer: "Yes, the initial consultation is completely free with no obligations. We believe in demonstrating our value before you commit to working with us."
      },
      {
        question: "What should I prepare for the consultation?",
        answer: "While not required, having information about your budget, timeline, intended property use, and any specific locations of interest helps us provide more targeted advice."
      },
      {
        question: "Can I book a consultation if I'm not ready to invest yet?",
        answer: "Absolutely. Many clients consult with us 6-12 months before investing. Early consultation helps you plan better and understand all requirements in advance."
      },
      {
        question: "What happens after the consultation?",
        answer: "After the consultation, you'll receive a summary email with discussed points, relevant resources, and a customized proposal if you wish to proceed with our services."
      }
    ],
    relatedLinks: [
      { href: "/services", text: "View our services" },
      { href: "/investment-process", text: "Understand the process" },
      { href: "/mini-pia-guide", text: "Learn about grants" },
      { href: "/properties", text: "Browse properties" }
    ]
  },

  // Tools Page FAQs
  tools: {
    title: "Investment Tools FAQ",
    description: "How to use our investment calculators and tools",
    faqs: [
      {
        question: "How accurate is the Mini PIA grant calculator?",
        answer: "Our calculator provides estimates based on current grant parameters and typical approval scenarios. Actual grants may vary by ±10% depending on specific project details and evaluation scores."
      },
      {
        question: "Can I save my calculator results?",
        answer: "Yes, you can download a PDF report of your calculations. For a detailed professional assessment, book a consultation and we'll provide a comprehensive analysis."
      },
      {
        question: "What's the difference between the calculator and simulator?",
        answer: "The calculator provides quick grant estimates, while the simulator offers detailed scenario planning including ROI projections, cash flow analysis, and sensitivity testing."
      },
      {
        question: "Are the tools free to use?",
        answer: "Yes, all our online tools are free to use. They're designed to help you understand investment potential before engaging our professional services."
      },
      {
        question: "How often are the tool parameters updated?",
        answer: "We update our tools monthly to reflect current grant rates, property prices, and market conditions. Major program changes are implemented within 48 hours."
      }
    ],
    relatedLinks: [
      { href: "/mini-pia-guide", text: "Understand grant details" },
      { href: "/properties", text: "Find eligible properties" },
      { href: "/book-consultation", text: "Get professional analysis" },
      { href: "/services", text: "Explore our services" }
    ]
  }
}
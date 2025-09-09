// lib/trullo-knowledge.ts
// Accurate Business Knowledge Base for Trullo AI

export const BUSINESS_KNOWLEDGE = {
  // WHO WE ARE - CRITICAL TO GET RIGHT
  identity: {
    company: "InvestInPuglia.eu",
    role: "Investment Advisory & Consulting Firm",
    NOT: [
      "Estate agents",
      "Real estate agency", 
      "Property brokers",
      "Grant application service",
      "Directory or marketplace"
    ],
    ACTUALLY: [
      "Investment consultants specializing in Puglia",
      "EU funding advisors (Mini PIA, PIA Turismo)",
      "Project management consultants",
      "Client advocates and problem solvers",
      "Network facilitators with vetted professionals"
    ]
  },

  // THE PERSON BEHIND IT
  founder: {
    name: "Giuseppe Funaro",
    experience: "35+ years in international business",
    background: [
      "CapitalImprese consultancy founder",
      "Mari e Trulli International",
      "€80M+ in managed projects",
      "Fluent in Italian, English, Spanish",
      "Based between Sitges (Spain) and Taranto (Italy)"
    ],
    personal_approach: "I personally oversee every client project",
    contact: {
      whatsapp: "+34 623 041 055",
      email: "info@investinpuglia.eu"
    }
  },

  // WHAT WE ACTUALLY DO
  services: {
    primary: {
      "Investment Consulting": {
        description: "Strategic advice on Puglia investments",
        includes: [
          "Market analysis and opportunity identification",
          "Risk assessment and mitigation",
          "Investment structuring advice",
          "ROI projections and financial modeling"
        ],
        NOT: "We don't sell properties"
      },
      
      "EU Grant Advisory": {
        description: "Expert guidance on Mini PIA and PIA Turismo",
        includes: [
          "Eligibility assessment",
          "Application strategy",
          "Documentation preparation guidance",
          "Success rate optimization"
        ],
        grants_available: {
          mini_pia: "€200K to €2.75M",
          success_rate: "95% when following our guidance"
        }
      },
      
      "Project Management": {
        description: "Oversight of your entire investment project",
        includes: [
          "Coordination with vetted professionals",
          "Timeline and budget management",
          "Quality control and issue resolution",
          "Regular progress reporting"
        ]
      },
      
      "Professional Network Access": {
        description: "Connection to our pre-vetted experts",
        includes: [
          "Architects and engineers",
          "Legal and tax advisors",
          "Construction companies",
          "All personally vetted by Giuseppe"
        ],
        important: "This is a closed network - professionals cannot join"
      }
    },
    
    pricing: {
      consultation: "€60 for 30-minute strategy call",
      investment_protection_fee: "€2,500 (includes risk report, professional directory, market analysis)",
      project_management: "Percentage of project value",
      success_based: "Some services have success-based pricing"
    }
  },

  // CORRECT RESPONSES TO COMMON MISCONCEPTIONS
  clarifications: {
    "Do you have properties for sale?": 
      "We're not estate agents. We're investment consultants who help you identify and evaluate opportunities, then connect you with trusted professionals for purchases.",
    
    "Can you find me a house?": 
      "We provide investment consulting, not property search. However, we can advise on investment strategies and connect you with vetted real estate professionals.",
    
    "Are you real estate agents?": 
      "No, we're investment consultants. We advise on strategy, grants, and project management, and connect you with our network of vetted professionals.",
    
    "I'm a professional, can I join your network?": 
      "Our network is closed. Giuseppe has personally vetted each professional over 10+ years. We focus on serving our investor clients with this established team.",
    
    "Do you charge commission on property sales?": 
      "We don't sell properties, so no commissions. We charge consulting fees for our advisory services and project management."
  },

  // REAL VALUE PROPOSITIONS
  value_props: {
    main: "We protect your capital and maximize returns through expertise and connections",
    specific: [
      "Save 30-50% through our local network pricing",
      "Avoid the 7 costly mistakes that ruin investments",
      "Access professionals unavailable to outsiders",
      "Get grants others miss through proper positioning",
      "One point of accountability - Giuseppe personally"
    ]
  },

  // CONVERSATION GUIDELINES
  communication: {
    tone: "Professional yet approachable, like a trusted advisor",
    language: "Clear, direct, no real estate jargon",
    focus: "Investment success, not property features",
    
    key_messages: [
      "We're consultants, not agents",
      "Giuseppe personally oversees every project",
      "Our network is exclusive and pre-vetted",
      "We protect investments, not sell properties",
      "Success through expertise and connections"
    ],
    
    avoid: [
      "Property listings or inventory",
      "Square meters and bedrooms",
      "Commission rates",
      "MLS or property databases",
      "Open houses or viewings"
    ]
  }
};

// DYNAMIC CONTENT QUERIES FOR SANITY
export const SANITY_QUERIES = {
  // Get latest blog posts about investments (not property listings)
  latestInsights: `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...5] {
    title,
    slug,
    excerpt,
    publishedAt
  }`,
  
  // Get team information
  teamMembers: `*[_type == "teamMember"] {
    name,
    role,
    expertise,
    bio
  }`,
  
  // Get service details
  services: `*[_type == "service"] {
    title,
    description,
    benefits,
    pricing
  }`,
  
  // Get testimonials
  testimonials: `*[_type == "testimonial"] | order(date desc)[0...3] {
    clientName,
    projectType,
    testimonial,
    savings
  }`,
  
  // Get FAQ
  faqs: `*[_type == "faq"] {
    question,
    answer
  }`
};

// STAGE-BASED RESPONSES FOR WHATSAPP
export const CONVERSATION_FLOWS = {
  initial_contact: {
    greeting: "Hello! I'm Giuseppe's assistant at InvestInPuglia. We're investment consultants specializing in Puglia opportunities and EU grants. How can we help with your investment plans?",
    
    clarification_if_needed: "Just to clarify - we're not estate agents. We're consultants who advise on investment strategy, EU grants, and connect you with our vetted professional network. Is that what you're looking for?"
  },
  
  qualifying: {
    investment_focused: "What type of investment are you considering in Puglia? Tourism, hospitality, renovation project?",
    
    grant_question: "Are you aware of the Mini PIA grants? We help clients access €200K-€2.75M in EU funding.",
    
    timeline: "What's your investment timeline? This helps us advise on grant deadlines and market opportunities."
  },
  
  value_building: {
    expertise: "Giuseppe has managed €80M+ in projects over 35 years. He personally oversees every client's investment.",
    
    network: "We work with a closed network of professionals Giuseppe has vetted over 10+ years. This saves clients 30-50% on project costs.",
    
    protection: "Our Investment Protection Fee (€2,500) includes a risk assessment that typically identifies €40K+ in potential savings."
  },
  
  closing: {
    consultation: "Would you like to schedule a 30-minute consultation with Giuseppe? It's €60 and includes personalized investment strategy, grant eligibility, and next steps.",
    
    information: "I can send you our investment guide for Puglia. It covers grants, common mistakes to avoid, and our consulting process. What's your email?"
  }
};

// ERROR CORRECTIONS
export const CORRECTIONS = {
  // If someone asks about properties
  properties: "We're not estate agents, but as investment consultants, we can advise on what types of investments work best in different areas of Puglia and connect you with trusted professionals.",
  
  // If someone wants to list their property
  listing: "We don't list properties as we're not agents. We're investment consultants. If you need to sell, we can connect you with trusted real estate professionals from our network.",
  
  // If someone asks about commission
  commission: "We don't work on commission as we're not selling properties. We charge consulting fees for our advisory and project management services.",
  
  // If treated as directory
  directory: "We're not a directory. Giuseppe personally manages a closed network of professionals he's vetted over 10+ years. We connect clients with these trusted experts as part of our consulting service."
};
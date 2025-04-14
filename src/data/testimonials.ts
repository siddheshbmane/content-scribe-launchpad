
import { faker } from "@faker-js/faker";

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

const industries = [
  "Marketing",
  "Tech",
  "Finance",
  "Healthcare",
  "Education",
  "Real Estate", 
  "Consulting",
  "Media",
  "Legal",
  "Non-profit",
  "E-commerce",
  "Manufacturing"
];

const jobTitles = {
  "Marketing": ["Marketing Manager", "CMO", "Brand Strategist", "Content Director", "Social Media Manager"],
  "Tech": ["CTO", "Software Engineer", "Product Manager", "IT Director", "Data Scientist"],
  "Finance": ["Financial Analyst", "CFO", "Investment Manager", "Accountant", "Financial Advisor"],
  "Healthcare": ["Medical Director", "Physician", "Healthcare Administrator", "Nurse Manager", "Research Director"],
  "Education": ["Professor", "Principal", "Academic Director", "Education Consultant", "Dean"],
  "Real Estate": ["Real Estate Agent", "Property Manager", "Real Estate Investor", "Broker", "Development Director"],
  "Consulting": ["Management Consultant", "Strategy Consultant", "Business Analyst", "Consulting Partner", "Advisory Director"],
  "Media": ["Media Director", "Editor", "Content Creator", "Journalist", "Producer"],
  "Legal": ["Attorney", "Legal Counsel", "Partner", "Legal Director", "Compliance Officer"],
  "Non-profit": ["Executive Director", "Program Manager", "Fundraising Director", "Outreach Coordinator", "Volunteer Manager"],
  "E-commerce": ["E-commerce Manager", "Digital Retail Director", "Online Store Manager", "E-commerce Analyst", "Marketplace Specialist"],
  "Manufacturing": ["Operations Manager", "Production Director", "Plant Manager", "Quality Control Manager", "Supply Chain Director"]
};

const generateTestimonialContent = () => {
  const contentTemplates = [
    "ContentScribe has completely transformed how I approach LinkedIn content creation. {{benefit}}. The AI-generated posts are surprisingly insightful and have helped me {{result}}. I can't imagine going back to my old workflow.",
    
    "As a busy {{profession}}, I never had time to maintain a consistent LinkedIn presence. ContentScribe changed everything. {{benefit}} and the calendar feature helps me {{result}}. Absolutely worth every penny!",
    
    "I was skeptical about AI content tools, but ContentScribe proved me wrong. {{benefit}} while still maintaining my authentic voice. I've seen {{result}} since I started using it {{timeframe}} ago.",
    
    "ContentScribe is a game-changer for my personal brand. The {{feature}} feature is incredibly powerful and has helped me {{benefit}}. My engagement has {{result}} and I'm getting more inbound opportunities than ever.",
    
    "After trying numerous content tools, ContentScribe stands out as the clear winner. {{benefit}} without sacrificing quality. I've been able to {{result}}, which has opened up new career opportunities.",
    
    "The team at ContentScribe has thought of everything. From {{feature}} to the intuitive interface, this tool has helped me {{benefit}}. I've received countless compliments on my LinkedIn content and have {{result}}.",
    
    "ContentScribe has become an essential part of my professional toolkit. As someone who {{challenge}}, I appreciate how it helps me {{benefit}}. Since using it, I've {{result}} and received positive feedback from my network.",
    
    "I can't say enough good things about ContentScribe. The {{feature}} feature alone is worth the subscription. It's helped me {{benefit}} and I've seen {{result}} in just {{timeframe}}.",
    
    "ContentScribe delivers exactly what it promises. I've been able to {{benefit}} while maintaining my authentic voice. The most impressive result has been {{result}}, which has helped me grow my professional network significantly."
  ];
  
  const benefits = [
    "It saves me hours every week",
    "The content suggestions are incredibly relevant to my industry",
    "I can now schedule an entire month of content in just 30 minutes",
    "The AI understands my professional voice perfectly",
    "It generates engaging posts that resonate with my audience",
    "The variety of content tones helps me keep my feed interesting",
    "I can create professional content even when I'm not feeling creative",
    "It helps me maintain consistency without the stress"
  ];
  
  const results = [
    "increase my engagement by over 200%",
    "build a more meaningful professional network",
    "position myself as a thought leader in my industry",
    "attract new career opportunities I wouldn't have found otherwise",
    "grow my following from a few hundred to over 5,000 connections",
    "consistently share valuable insights with my network",
    "develop a strong personal brand that stands out",
    "receive direct messages from potential clients every week"
  ];
  
  const features = [
    "content calendar",
    "tone adjustment",
    "AI post generation",
    "image creation",
    "topic suggestion",
    "engagement analytics",
    "customization options",
    "scheduling automation"
  ];
  
  const challenges = [
    "struggles with writer's block",
    "juggles multiple responsibilities",
    "never considered myself a strong writer",
    "found it hard to be consistent on social media",
    "was never sure what to post about",
    "lacked confidence in my content",
    "couldn't find time to maintain my professional presence"
  ];
  
  const timeframes = [
    "3 months",
    "6 weeks",
    "just a month",
    "60 days",
    "a quarter"
  ];
  
  const professions = [
    "marketing executive",
    "sales professional",
    "entrepreneur",
    "consultant",
    "team leader",
    "startup founder",
    "creative professional",
    "financial advisor"
  ];
  
  // Select a random template
  let template = faker.helpers.arrayElement(contentTemplates);
  
  // Replace placeholders with random elements
  template = template.replace("{{benefit}}", faker.helpers.arrayElement(benefits));
  template = template.replace("{{result}}", faker.helpers.arrayElement(results));
  
  // Replace additional placeholders if they exist in the selected template
  if (template.includes("{{feature}}")) {
    template = template.replace("{{feature}}", faker.helpers.arrayElement(features));
  }
  
  if (template.includes("{{challenge}}")) {
    template = template.replace("{{challenge}}", faker.helpers.arrayElement(challenges));
  }
  
  if (template.includes("{{timeframe}}")) {
    template = template.replace("{{timeframe}}", faker.helpers.arrayElement(timeframes));
  }
  
  if (template.includes("{{profession}}")) {
    template = template.replace("{{profession}}", faker.helpers.arrayElement(professions));
  }
  
  return template;
};

// Generate 100+ testimonials
export const testimonials: Testimonial[] = Array.from({ length: 130 }, () => {
  const industry = faker.helpers.arrayElement(industries);
  const title = faker.helpers.arrayElement(jobTitles[industry as keyof typeof jobTitles]);
  const name = faker.person.fullName();
  
  return {
    id: faker.string.uuid(),
    name,
    title,
    company: faker.company.name(),
    content: generateTestimonialContent(),
    rating: faker.helpers.rangeToNumber({ min: 4, max: 5 }),
    avatar: `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`
  };
});

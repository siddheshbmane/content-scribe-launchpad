
import { faker } from "@faker-js/faker";

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

// Function to generate a realistic testimonial
function generateTestimonial(): Testimonial {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  
  const positions = [
    "Marketing Director", "Content Manager", "Brand Strategist", "Social Media Specialist",
    "Communications Manager", "Digital Marketing Lead", "VP of Marketing", "Marketing Consultant",
    "LinkedIn Growth Specialist", "Content Creator", "Head of Content", "Influencer Marketing Lead",
    "Personal Branding Coach", "Growth Marketing Manager", "SEO Specialist", "Sales Director",
    "Chief Marketing Officer", "Entrepreneur", "Startup Founder", "Business Development Manager"
  ];
  
  const companies = [
    "TechGrowth", "InnovateCorp", "Digital Dynamics", "FutureBrands", "MarketWave",
    "Nexus Technologies", "Elevate Media", "PinnacleGroup", "StrategyLabs", "VisionaryTech",
    "GrowthForge", "ContentPeak", "LinkedIn Masters", "SocialSurge", "BrandBuilders",
    "PrecisionMarketing", "GlobalReach", "InsightfulMedia", "SmartContent", "LeadGenPros"
  ];
  
  // LinkedIn-specific positive testimonials with mentions of AI content generation
  const testimonialContents = [
    `ContentScribe has completely transformed how I approach LinkedIn. The AI-generated content is so natural and engaging that my engagement rates have increased by over 45% in just one month.`,
    
    `As a busy ${positions[Math.floor(Math.random() * positions.length)]}, I never had time to maintain a consistent LinkedIn presence. With ContentScribe, I now post 3 times a week with minimal effort, and my network is growing faster than ever.`,
    
    `The AI content generator understands my industry so well, it's like having a personal ghostwriter who's an expert in my field. This tool has been a game-changer for my personal brand.`,
    
    `I was skeptical about AI-generated content at first, but ContentScribe has made me a believer. The quality of posts it creates is exceptional, and I've received countless compliments on my "writing style."`,
    
    `ContentScribe doesn't just save me time - it makes me look better on LinkedIn. The content is more engaging and professional than what I was creating myself. Worth every penny!`,
    
    `My LinkedIn profile was practically dormant before I found ContentScribe. Now I'm posting consistently, engaging with my network, and have even landed two major speaking opportunities thanks to my increased visibility.`,
    
    `What impresses me most about ContentScribe is how it captures my voice. It doesn't feel like generic AI content - it feels like ME, just more eloquent and consistent.`,
    
    `As someone who struggles with writer's block, ContentScribe has been a lifesaver. It gives me perfect starting points that I can tweak, and the calendar feature ensures I never miss posting days.`,
    
    `I've tried other LinkedIn content tools, but nothing comes close to ContentScribe. The AI understands professional content better than any other solution I've used.`,
    
    `Our entire marketing team uses ContentScribe now, and it's brought consistency to our brand voice across all our employees' LinkedIn accounts. An essential tool for modern businesses.`
  ];
  
  return {
    id: faker.string.uuid(),
    name: `${firstName} ${lastName}`,
    position: positions[Math.floor(Math.random() * positions.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    content: testimonialContents[Math.floor(Math.random() * testimonialContents.length)],
    rating: 5, // All 5-star ratings as requested
    avatarUrl: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
  };
}

// Generate 100+ testimonials
const testimonials: Testimonial[] = Array.from({ length: 120 }, () => generateTestimonial());

export default testimonials;

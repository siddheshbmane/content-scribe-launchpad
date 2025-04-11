
import { faker } from '@faker-js/faker';

// Define the Testimonial type
export interface Testimonial {
  id: string;
  name: string;
  jobTitle: string;
  company: string;
  testimonial: string;
  avatarUrl: string;
  rating: number; // 1-5
  date: string;
}

// Create an array of 100+ testimonials with real-sounding content
export const generateTestimonials = (count: number = 100): Testimonial[] => {
  const testimonials: Testimonial[] = [];
  
  const testimonialTemplates = [
    "ContentScribe has transformed my LinkedIn presence. I've gained {{number}} new connections and seen engagement increase by {{percent}}% since I started using it. The AI-generated content is surprisingly personalized and feels authentic.",
    "As a busy {{jobTitle}}, I never had time to maintain a consistent LinkedIn presence. ContentScribe changed that completely. Now I schedule a month's worth of posts in under an hour. Game changer!",
    "The AI suggestions are spot-on for my industry. I was skeptical at first, but ContentScribe truly understands the {{industry}} space and helps me create content that resonates with my network.",
    "My team at {{company}} has been using ContentScribe for {{number}} months now, and we've seen a significant boost in our brand visibility on LinkedIn. The scheduling feature saves us hours every week.",
    "I've tried several content tools before, but none matched the quality and ease of ContentScribe. The combination of AI-generated content and simple scheduling is perfect for professionals who want to grow their personal brand.",
    "ContentScribe helped me position myself as a thought leader in my industry. The quality of the AI-generated content is impressive - my network often comments on how insightful my posts have become!",
    "Since using ContentScribe, I've received {{number}} job inquiries and speaking opportunities through LinkedIn. The platform helped me showcase my expertise in a way I couldn't before.",
    "The calendar feature is intuitive and the content suggestions are always relevant to trends in my industry. ContentScribe feels like having a personal marketing assistant focused on my LinkedIn growth.",
    "I was struggling to maintain consistency on LinkedIn until I found ContentScribe. Now I'm posting regularly and seeing real engagement. My profile views have increased by {{percent}}% in just two months.",
    "ContentScribe makes creating carousel posts so simple. The templates are professional, and the AI helps generate content that truly engages my audience. Worth every penny of my subscription.",
    "As someone who isn't naturally a content creator, ContentScribe has been invaluable. It helps me articulate my professional insights in a way that connects with my LinkedIn network.",
    "The ROI on ContentScribe has been incredible. For just $29/month, I've generated leads worth thousands of dollars through my improved LinkedIn presence. Couldn't recommend it more highly.",
    "I appreciate how ContentScribe helps me maintain my authentic voice while suggesting relevant content. It doesn't feel robotic - the AI truly understands my industry and tone.",
    "ContentScribe solved my biggest professional challenge: staying visible on LinkedIn despite my busy schedule. Now I'm consistently showing up in my connections' feeds with valuable content.",
    "I've received compliments from industry leaders on my LinkedIn content since using ContentScribe. The quality and consistency have helped me build credibility in my field."
  ];
  
  for (let i = 0; i < count; i++) {
    const template = faker.helpers.arrayElement(testimonialTemplates);
    const name = faker.person.fullName();
    const jobTitle = faker.person.jobTitle();
    const company = faker.company.name();
    const industry = faker.company.buzzNoun();
    const number = faker.number.int({ min: 3, max: 50 });
    const percent = faker.number.int({ min: 30, max: 300 });
    
    // Replace placeholders in the template
    let processedTestimonial = template
      .replace('{{jobTitle}}', jobTitle)
      .replace('{{company}}', company)
      .replace('{{industry}}', industry)
      .replace('{{number}}', number.toString())
      .replace('{{percent}}', percent.toString());
    
    testimonials.push({
      id: faker.string.uuid(),
      name,
      jobTitle,
      company,
      testimonial: processedTestimonial,
      avatarUrl: faker.image.avatar(),
      rating: faker.helpers.arrayElement([4, 5, 5, 5]), // Most reviews are positive
      date: faker.date.past({ years: 1 }).toISOString()
    });
  }
  
  return testimonials;
};

// Generate and export 100 testimonials
export const testimonials: Testimonial[] = generateTestimonials(120);

// Function to get a specific number of testimonials
export const getTestimonials = (count: number = 3): Testimonial[] => {
  return faker.helpers.arrayElements(testimonials, count);
};

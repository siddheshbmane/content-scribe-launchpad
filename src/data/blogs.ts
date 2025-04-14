
import { faker } from "@faker-js/faker";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  readingTimeMinutes: number;
  publishedDate: string;
}

// Categories for the blog posts
export const categories = [
  "LinkedIn Strategy",
  "Content Creation",
  "Personal Branding",
  "AI Tools",
  "Career Development",
  "Social Media",
  "Networking",
  "Thought Leadership"
];

// Tags for the blog posts
export const tags = [
  "ai-content",
  "linkedin",
  "personal-branding",
  "content-creation",
  "career-tips",
  "social-media",
  "networking",
  "professional-growth",
  "thought-leadership",
  "engagement",
  "storytelling",
  "content-strategy",
  "career-advice",
  "productivity",
  "communication",
  "professional-presence",
  "digital-marketing",
  "ai-tools",
  "writing-tips",
  "personal-development"
];

// Generate 100+ blog posts
export const blogPosts: BlogPost[] = Array.from({ length: 120 }, (_, index) => {
  const title = faker.helpers.arrayElement([
    `${faker.number.int({ min: 5, max: 10 })} AI Prompts to Boost Your LinkedIn Engagement`,
    `How to Use ${faker.company.buzzNoun()} in Your LinkedIn Strategy`,
    `The Ultimate Guide to ${faker.company.buzzAdjective()} LinkedIn Content`,
    `Why ${faker.company.buzzVerb()} Is Essential for Your Professional Brand`,
    `${faker.number.int({ min: 3, max: 7 })} Ways AI Can Transform Your LinkedIn Presence`,
    `From Zero to Hero: Building a ${faker.company.buzzAdjective()} LinkedIn Profile`,
    `The Psychology Behind Viral LinkedIn Posts: ${faker.company.buzzNoun()}`,
    `${faker.company.buzzAdjective()} Content Creation Strategies for LinkedIn in ${new Date().getFullYear()}`,
    `LinkedIn or ${faker.helpers.arrayElement(["Twitter", "Instagram", "TikTok", "Facebook"])}? Where Professionals Should Focus`,
    `How I Generated ${faker.number.int({ min: 100, max: 500 })}% More Engagement with AI Content Tools`,
  ]);
  
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
  
  const category = faker.helpers.arrayElement(categories);
  const numTags = faker.number.int({ min: 2, max: 5 });
  const selectedTags = faker.helpers.arrayElements(tags, numTags);
  
  const readingTime = faker.number.int({ min: 3, max: 12 });
  
  const authorName = faker.person.fullName();
  const authorTitle = faker.helpers.arrayElement([
    "LinkedIn Expert",
    "Content Strategist",
    "AI Specialist",
    "Career Coach",
    "Digital Marketer",
    "Social Media Manager",
    "Personal Branding Consultant",
    "Professional Development Advisor"
  ]);
  
  const publishedDate = faker.date.between({
    from: '2023-01-01T00:00:00.000Z',
    to: new Date()
  }).toISOString();
  
  const imageNumber = (index % 15) + 1; // Cycling through 15 images
  
  return {
    id: faker.string.uuid(),
    title,
    slug,
    excerpt: faker.lorem.paragraph(),
    content: Array.from({ length: faker.number.int({ min: 5, max: 10 }) }, () => 
      faker.lorem.paragraphs(faker.number.int({ min: 2, max: 5 }))
    ).join('\n\n'),
    imageUrl: `https://source.unsplash.com/random/800x500?linkedin,professional,${index}`,
    category,
    tags: selectedTags,
    author: {
      name: authorName,
      avatar: `https://i.pravatar.cc/150?u=${authorName.replace(/\s/g, '')}`,
      title: authorTitle
    },
    readingTimeMinutes: readingTime,
    publishedDate
  };
});

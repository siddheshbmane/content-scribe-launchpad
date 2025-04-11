
import { faker } from '@faker-js/faker';

// Define the Blog type
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: {
    name: string;
    avatarUrl: string;
    jobTitle: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
}

// Categories for blog posts
export const categories = [
  'LinkedIn Strategy',
  'Content Creation',
  'AI Tips',
  'Personal Branding',
  'Career Growth',
  'Engagement Strategy',
  'Industry Insights',
  'Tool Reviews'
];

// Tags for blog posts
export const tags = [
  'LinkedIn', 'AI', 'Content Marketing', 'Personal Brand', 'Career', 
  'Social Media', 'Professional Growth', 'Networking', 'Thought Leadership', 
  'Content Calendar', 'Engagement', 'Analytics', 'Algorithms', 'Prompts',
  'Templates', 'Best Practices', 'Growth Strategy', 'LinkedIn Algorithm'
];

// AI topic titles for LinkedIn content
const blogTitles = [
  "10 Proven LinkedIn Content Prompts That Drive Engagement",
  "How to Use AI to Create a Month's Worth of LinkedIn Content in Under an Hour",
  "The Psychology Behind High-Performing LinkedIn Posts",
  "LinkedIn Content Calendar: How to Plan Your Strategy for Maximum Impact",
  "Why Your LinkedIn Posts Aren't Getting Engagement (And How to Fix It)",
  "How to Write LinkedIn Posts That Actually Get Read",
  "7 Types of LinkedIn Content That Will Grow Your Personal Brand",
  "The Ultimate Guide to LinkedIn Carousel Posts That Convert",
  "AI-Generated Content vs. Human Content: What Works Better on LinkedIn?",
  "How to Generate Viral LinkedIn Content Ideas Using AI",
  "Building Thought Leadership on LinkedIn: A Step-by-Step Guide",
  "How to Repurpose One LinkedIn Post Into a Week of Content",
  "The Best Times to Post on LinkedIn in 2025 (Based on Real Data)",
  "How to Write LinkedIn Posts That Actually Generate Leads",
  "5 LinkedIn Content Templates for Busy Professionals",
  "LinkedIn Analytics: How to Measure What's Working and What's Not",
  "How to Use AI to Find Your Authentic Voice on LinkedIn",
  "The Complete Guide to Creating LinkedIn Polls That Engage Your Network",
  "How to Craft LinkedIn Stories That Showcase Your Expertise",
  "Creating a Content Strategy that Grows Your LinkedIn Following",
  "Writing LinkedIn Articles That Position You as an Expert",
  "How to Use AI to Generate Custom Images for Your LinkedIn Posts",
  "The Art of Storytelling in LinkedIn Posts: Techniques That Work",
  "5 Mistakes Most People Make with AI-Generated LinkedIn Content",
  "How to Maintain Consistency on LinkedIn Without Burning Out",
  "LinkedIn Engagement Hacks: What's Working in 2025",
  "How to Create a LinkedIn Content Strategy That Supports Your Career Goals",
  "The Ultimate Guide to Mastering GPT Prompts for LinkedIn Content",
  "From Zero to Influencer: Building Your LinkedIn Presence with AI Tools",
  "How to Create Engaging LinkedIn Videos Without Being on Camera",
  "The Perfect LinkedIn Post Formula: Structure for Maximum Engagement",
  "How to Establish Your Personal Brand Voice on LinkedIn",
  "Creating LinkedIn Content That Attracts Recruiters and Hiring Managers",
  "Advanced LinkedIn Analytics: What the Data Really Tells You About Your Content",
  "How to Create a Content Calendar That Drives Your LinkedIn Strategy",
  "Using AI to Generate Industry-Specific LinkedIn Content That Resonates",
  "The Science of Writing LinkedIn Headlines That Get Attention",
  "Creating LinkedIn Content That Generates Inbound Client Inquiries",
  "How to Use ContentScribe to Automate Your LinkedIn Presence",
  "Creating a LinkedIn Content Strategy That Supports Your Business Goals",
  "How to Measure ROI from Your LinkedIn Content Strategy",
  "Writing LinkedIn Posts That Show Your Personality and Expertise",
  "Ethical Considerations When Using AI for LinkedIn Content Creation",
  "How to Create Theme Days for Your LinkedIn Content Calendar",
  "LinkedIn Pods: Are They Worth It for Boosting Engagement?",
  "Creating Content That Stands Out in a Crowded LinkedIn Feed",
  "Turning LinkedIn Comments into New Content Ideas",
  "The Ultimate Guide to LinkedIn Hashtag Strategy",
  "How to Create Content for Different LinkedIn Audience Segments",
  "The Link Between LinkedIn Content and Career Advancement",
  "Batch Creating LinkedIn Content: The Ultimate Time-Saving Strategy",
  "7 Days of LinkedIn Content: A Weekly Framework for Busy Professionals",
  "How to Adapt Your LinkedIn Strategy Based on Performance Data",
  "Using Stories and Narratives to Make Your LinkedIn Content Memorable",
  "Writing LinkedIn Posts That Showcase Your Unique Perspective",
  "Balancing Promotional and Value-Add Content on LinkedIn",
  "The Ultimate Guide to LinkedIn Text Formatting and Emojis",
  "How to Create Engaging LinkedIn Content Without Bragging",
  "Converting Your LinkedIn Connections into Leads Through Strategic Content",
  "Creating a Distinctive Voice for Your LinkedIn Content"
];

// Generate paragraphs for a blog post
const generateBlogContent = (): string => {
  const paragraphCount = faker.number.int({ min: 8, max: 15 });
  let content = '';
  
  // Introduction
  content += `<p>${faker.lorem.paragraph({ min: 5, max: 8 })}</p>\n\n`;
  
  // Add a heading
  content += `<h2>Why LinkedIn Content Matters for Your Professional Brand</h2>\n\n`;
  
  // Add 2-3 paragraphs
  for (let i = 0; i < 3; i++) {
    content += `<p>${faker.lorem.paragraph({ min: 4, max: 7 })}</p>\n\n`;
  }
  
  // Add another heading
  content += `<h2>Leveraging AI for Better LinkedIn Content</h2>\n\n`;
  
  // Add 2-3 more paragraphs
  for (let i = 0; i < 3; i++) {
    content += `<p>${faker.lorem.paragraph({ min: 4, max: 7 })}</p>\n\n`;
  }
  
  // Add a list
  content += `<h3>Key Strategies to Improve Your LinkedIn Content</h3>\n\n`;
  content += `<ul>\n`;
  for (let i = 0; i < 5; i++) {
    content += `  <li><strong>${faker.lorem.sentence(3)}</strong>: ${faker.lorem.sentence(10)}</li>\n`;
  }
  content += `</ul>\n\n`;
  
  // Add a final heading
  content += `<h2>Getting Started with ContentScribe</h2>\n\n`;
  
  // Add conclusion paragraphs
  for (let i = 0; i < 2; i++) {
    content += `<p>${faker.lorem.paragraph({ min: 4, max: 6 })}</p>\n\n`;
  }
  
  // Call to action
  content += `<p><strong>Ready to transform your LinkedIn presence?</strong> Sign up for ContentScribe today and start creating engaging, professional content that grows your network and career opportunities.</p>`;
  
  return content;
};

// Create an array of 100+ blog posts
export const generateBlogPosts = (count: number = 100): BlogPost[] => {
  const blogPosts: BlogPost[] = [];
  
  // Use all predefined titles first
  const availableTitles = [...blogTitles];
  
  for (let i = 0; i < count; i++) {
    // If we've used all predefined titles, generate random ones
    let title: string;
    if (availableTitles.length > 0) {
      const titleIndex = faker.number.int({ min: 0, max: availableTitles.length - 1 });
      title = availableTitles.splice(titleIndex, 1)[0];
    } else {
      title = faker.lorem.sentence(7);
    }
    
    const category = faker.helpers.arrayElement(categories);
    const postTags = faker.helpers.arrayElements(tags, faker.number.int({ min: 2, max: 5 }));
    const slug = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
    const content = generateBlogContent();
    const readingTime = Math.ceil(content.split(' ').length / 200); // Approx 200 words per minute reading speed
    
    blogPosts.push({
      id: faker.string.uuid(),
      title,
      slug,
      excerpt: faker.lorem.paragraph(2),
      content,
      imageUrl: `https://source.unsplash.com/random/800x400/?linkedin,professional,social,network,${i}`,
      author: {
        name: faker.person.fullName(),
        avatarUrl: faker.image.avatar(),
        jobTitle: faker.person.jobTitle()
      },
      category,
      tags: postTags,
      publishedAt: faker.date.past({ years: 1 }).toISOString(),
      readingTimeMinutes: readingTime
    });
  }
  
  // Sort blogs by published date (newest first)
  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

// Generate and export 100 blog posts
export const blogPosts: BlogPost[] = generateBlogPosts(120);

// Function to get a specific number of blog posts
export const getBlogPosts = (count: number = 10): BlogPost[] => {
  return blogPosts.slice(0, count);
};

// Function to get a specific blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

// Function to get related blog posts
export const getRelatedBlogPosts = (currentPostId: string, count: number = 3): BlogPost[] => {
  const otherPosts = blogPosts.filter(post => post.id !== currentPostId);
  return faker.helpers.arrayElements(otherPosts, count);
};


import { faker } from "@faker-js/faker";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  publishedDate: string;
  readTime: number;
  category: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}

// Categories focused on LinkedIn and content creation
const categories = [
  "LinkedIn Strategy",
  "Content Creation",
  "Personal Branding",
  "AI Writing",
  "Social Media Growth",
  "Career Development",
  "Thought Leadership",
  "Digital Marketing",
  "Networking",
  "Professional Growth"
];

// Tags related to LinkedIn content creation and AI
const allTags = [
  "LinkedIn", "ContentCreation", "PersonalBranding", "AIWriting", "SocialMedia",
  "ThoughtLeadership", "ContentStrategy", "DigitalMarketing", "CareerGrowth",
  "Networking", "ContentCalendar", "EngagementStrategy", "ProfileOptimization",
  "LeadGeneration", "B2BMarketing", "ProfessionalDevelopment", "AIPrompts",
  "ContentAutomation", "PersonalizedContent", "DataDrivenContent"
];

// LinkedIn-specific blog post titles
const titles = [
  "10 AI Prompts That Will Transform Your LinkedIn Content",
  "How to Use AI to Create a Month's Worth of LinkedIn Content in 30 Minutes",
  "The Psychology Behind High-Performing LinkedIn Posts",
  "5 LinkedIn Content Formats That Generate More Leads",
  "How to Craft the Perfect LinkedIn Profile With AI Assistance",
  "Content Calendar Strategies: Planning Your LinkedIn Presence",
  "From Zero to Influencer: Building Authority on LinkedIn",
  "The Science of LinkedIn Algorithms: What Makes Content Go Viral",
  "Using AI to Analyze Your LinkedIn Performance Metrics",
  "How to Write LinkedIn Posts That Convert Connections to Clients",
  "Personal Branding on LinkedIn: Authenticity in the Age of AI",
  "Creating Thought Leadership Content Without Spending Hours Writing",
  "LinkedIn Storytelling: Crafting Narratives That Resonate",
  "Content Repurposing: Turning One Idea Into a Month of LinkedIn Posts",
  "AI-Assisted Research: Finding Trending Topics for Your LinkedIn Content",
  "The Art of Engagement: How to Spark Meaningful Conversations on LinkedIn",
  "LinkedIn Carousels: Design Tips for Higher Engagement",
  "Ethical Considerations When Using AI for Content Creation",
  "Building a Content Strategy That Aligns With Your Career Goals",
  "The Ultimate Guide to LinkedIn Polls: Boosting Engagement and Gathering Insights"
];

// Generate realistic article intros about LinkedIn content creation
function generateContent(title: string, category: string) {
  const intros = [
    `LinkedIn has become the premier platform for professionals looking to establish their personal brand and authority. In this comprehensive guide, we'll explore how AI-powered tools can dramatically enhance your LinkedIn presence through strategic content creation.\n\n`,
    
    `Creating engaging content consistently is one of the biggest challenges faced by professionals on LinkedIn. Fortunately, AI content generation tools have revolutionized how we approach this challenge.\n\n`,
    
    `Standing out on LinkedIn requires more than just occasional posting—it demands a strategic approach to content creation that resonates with your target audience while showcasing your expertise.\n\n`,
    
    `The intersection of artificial intelligence and content creation has opened up unprecedented opportunities for LinkedIn users looking to build their personal brand without spending hours crafting posts.\n\n`,
    
    `LinkedIn's algorithm favors consistent, engaging content that creates meaningful interactions. Leveraging AI tools can help you meet these demands while maintaining authenticity in your voice.\n\n`
  ];
  
  const bodyParagraphs = [
    `## Understanding LinkedIn's Algorithm\n\nLinkedIn's algorithm prioritizes content that generates engagement quickly after posting. This is why timing your posts and using AI to optimize your content can significantly impact your reach. The key factors influencing the algorithm include:\n\n- Initial engagement rate within the first hour\n- Quality of interactions (comments over likes)\n- Relevance to your professional network\n- Content freshness and originality\n\nBy using AI tools to analyze these factors, you can craft content that's specifically designed to perform well within these parameters.\n\n`,
    
    `## Crafting AI-Enhanced LinkedIn Posts\n\nThe best AI-generated content doesn't replace your voice—it enhances it. Here's a step-by-step approach to using AI effectively for LinkedIn:\n\n1. Start with your core message or insight\n2. Use AI to expand on your ideas and suggest different formats\n3. Edit the generated content to ensure it maintains your authentic voice\n4. Add personal anecdotes or experiences that AI can't replicate\n5. Optimize the final post with AI-suggested hashtags and calls to action\n\nThis balanced approach ensures your content remains authentic while benefiting from AI's efficiency.\n\n`,
    
    `## Content Calendar Strategy\n\nConsistency is key on LinkedIn, and AI can help you maintain a robust content calendar without burnout. Consider this weekly framework:\n\n- **Monday**: Industry insights or trends (AI-researched and summarized)\n- **Wednesday**: Personal story or case study (human-written core with AI enhancement)\n- **Friday**: Educational content or how-to post (AI-structured with your expertise)\n\nThis balanced approach ensures regular posting while maintaining quality and authenticity.\n\n`,
    
    `## Measuring Success and Iterating\n\nAI tools aren't just for content creation—they're invaluable for analyzing performance as well. Key metrics to track include:\n\n- Engagement rate (compared to your baseline)\n- Follower growth rate\n- Profile views and connection requests\n- Comment quality and depth\n- Lead generation and business opportunities\n\nBy feeding this data back into your AI tools, you can continuously refine your approach based on what resonates with your audience.\n\n`,
    
    `## Ethical Considerations\n\nAs AI becomes more integrated into content creation, ethical considerations become increasingly important. Best practices include:\n\n- Transparently disclose when AI has assisted with content creation\n- Never use AI to fabricate experiences or credentials\n- Ensure all facts and statistics are verified by human oversight\n- Maintain a balance between AI efficiency and human creativity\n\nBy adhering to these principles, you can leverage AI while maintaining trust with your audience.\n\n`
  ];
  
  const conclusions = [
    `## Looking Ahead\n\nAs AI content tools continue to evolve, the professionals who thrive on LinkedIn will be those who strategically combine technological efficiency with genuine human connection. The future of LinkedIn isn't about replacing human creativity but enhancing it through intelligent tools that free up time for more meaningful engagement.\n\n`,
    
    `## Final Thoughts\n\nAI-powered content creation isn't about removing the human element from LinkedIn—it's about amplifying your voice and extending your reach while maintaining authenticity. By thoughtfully integrating these tools into your LinkedIn strategy, you can build a more consistent, engaging presence that drives real business results.\n\n`,
    
    `## The Path Forward\n\nAs you implement these AI-enhanced strategies for your LinkedIn content, remember that the technology is meant to serve your goals, not define them. Start with clarity about what you want to achieve on the platform, then leverage AI tools to help you get there more efficiently while staying true to your professional voice.\n\n`
  ];
  
  return `${intros[Math.floor(Math.random() * intros.length)]}
${bodyParagraphs[Math.floor(Math.random() * bodyParagraphs.length)]}
${bodyParagraphs[Math.floor(Math.random() * bodyParagraphs.length)]}
${bodyParagraphs[Math.floor(Math.random() * bodyParagraphs.length)]}
${conclusions[Math.floor(Math.random() * conclusions.length)]}

*This article was crafted to help you maximize your LinkedIn presence using AI-powered content creation tools. For more insights, follow our blog or try ContentScribe today.*`;
}

// Function to generate a realistic blog post
function generateBlogPost(index: number): BlogPost {
  const title = titles[index % titles.length] + (index >= titles.length ? ` - Part ${Math.floor(index / titles.length) + 1}` : "");
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  // Generate 3-5 random tags including the category
  const numTags = faker.number.int({ min: 2, max: 4 });
  const tags = [category.replace(" ", "")];
  for (let i = 0; i < numTags; i++) {
    const tag = allTags[Math.floor(Math.random() * allTags.length)];
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
  
  const content = generateContent(title, category);
  const excerpt = content.substring(0, 150) + "...";
  
  // Generate a realistic publication date (within the last year)
  const publishedDate = faker.date.past({ years: 1 }).toISOString();
  
  // Estimate read time based on content length (roughly 200 words per minute)
  const wordCount = content.split(' ').length;
  const readTime = Math.max(3, Math.round(wordCount / 200));
  
  return {
    id: faker.string.uuid(),
    title,
    excerpt,
    content,
    author: {
      name: faker.person.fullName(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      title: faker.person.jobTitle()
    },
    publishedDate,
    readTime,
    category,
    tags,
    imageUrl: `https://source.unsplash.com/random/800x400?linkedin,content,${category.toLowerCase().replace(' ', ',')}`,
    slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')
  };
}

// Generate 100+ blog posts
const blogPosts: BlogPost[] = Array.from({ length: 120 }, (_, index) => generateBlogPost(index));

export default blogPosts;

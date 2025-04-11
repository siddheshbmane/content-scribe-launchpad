
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, Clock, Search, Tag, Filter } from "lucide-react";
import { blogPosts, categories, tags, BlogPost } from "@/data/blogs";
import { format } from "date-fns";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);
  
  // Apply filters when search query, category, or tags change
  useEffect(() => {
    let results = blogPosts;
    
    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) || 
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      results = results.filter(post => 
        selectedTags.some(tag => post.tags.includes(tag))
      );
    }
    
    setFilteredPosts(results);
  }, [searchQuery, selectedCategory, selectedTags]);
  
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) // Remove if already selected
        : [...prev, tag] // Add if not selected
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/">
                <div className="h-8 w-8 bg-linkedin-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold">CS</span>
                </div>
              </Link>
              <Link to="/">
                <span className="ml-2 font-semibold text-xl text-gray-900">ContentScribe</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button>Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-linkedin-primary to-linkedin-dark text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            ContentScribe Blog
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Expert advice on LinkedIn content, personal branding, and AI writing
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <div className="mb-6">
                  <h3 className="font-medium text-lg mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search articles..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-lg">Categories</h3>
                    {selectedCategory && (
                      <button 
                        onClick={() => setSelectedCategory(null)}
                        className="text-xs text-linkedin-primary hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <button
                          onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                          className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                            category === selectedCategory
                              ? "bg-linkedin-light text-linkedin-primary"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-lg">Popular Tags</h3>
                    {selectedTags.length > 0 && (
                      <button 
                        onClick={() => setSelectedTags([])}
                        className="text-xs text-linkedin-primary hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 15).map(tag => (
                      <Badge 
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {(searchQuery || selectedCategory || selectedTags.length > 0) && (
                  <Button 
                    variant="outline" 
                    onClick={resetFilters}
                    className="w-full"
                  >
                    <Filter className="h-4 w-4 mr-2" /> Reset All Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="w-full md:w-3/4">
              <Tabs defaultValue="latest" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="latest">Latest</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                  </TabsList>
                  
                  <div className="text-sm text-gray-500">
                    Showing {filteredPosts.length} articles
                  </div>
                </div>
                
                <TabsContent value="latest" className="mt-0">
                  {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPosts.map(post => (
                        <Card key={post.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                          <div className="h-48 overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <CardHeader className="pb-2">
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <Badge variant="secondary" className="mr-2">
                                {post.category}
                              </Badge>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{post.readingTimeMinutes} min read</span>
                              </div>
                            </div>
                            <Link to={`/blog/${post.slug}`} className="group">
                              <h3 className="font-bold text-lg group-hover:text-linkedin-primary transition-colors line-clamp-2">
                                {post.title}
                              </h3>
                            </Link>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-gray-600 text-sm line-clamp-3 mb-2">
                              {post.excerpt}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center text-xs text-gray-500 pt-0">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                            </div>
                            <Link to={`/blog/${post.slug}`} className="text-linkedin-primary font-medium hover:underline">
                              Read more
                            </Link>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-4">No articles found matching your criteria</p>
                      <Button variant="outline" onClick={resetFilters}>
                        Reset filters
                      </Button>
                    </div>
                  )}
                  
                  {filteredPosts.length > 0 && (
                    <div className="mt-12 flex justify-center">
                      <Button variant="outline" className="mr-2">
                        Previous
                      </Button>
                      <Button variant="outline">
                        Next
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="popular" className="mt-0">
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Showing the same content for demo purposes</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="featured" className="mt-0">
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Showing the same content for demo purposes</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 px-4 bg-linkedin-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get weekly insights on LinkedIn best practices, content creation tips, and updates on our latest features.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="sm:flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-linkedin-primary font-bold">CS</span>
                </div>
                <span className="ml-2 font-semibold text-xl">ContentScribe</span>
              </div>
              <p className="mt-4 text-gray-400 max-w-md">
                AI-powered content creation and scheduling for LinkedIn professionals.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                  <li><Link to="/testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link></li>
                  <li><Link to="/security" className="text-gray-400 hover:text-white transition-colors">Security</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 ContentScribe. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Blog;


import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar, 
  Image, 
  Sparkles, 
  Globe, 
  ChevronRight,
  Zap,
  PenTool,
  Clock,
  Layout,
  MessageSquare,
  Linkedin,
  BarChart2,
  CheckCircle
} from "lucide-react";

const Features = () => {
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
      <section className="bg-gradient-to-br from-linkedin-primary to-linkedin-dark text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Features That Power Your LinkedIn Content
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Discover how ContentScribe can transform your LinkedIn presence with AI-powered tools
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-linkedin-primary">
                Start for Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive LinkedIn Marketing Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create engaging content, schedule posts, and grow your professional presence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-linkedin-primary"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-linkedin-light mb-4">
                  <Sparkles className="h-6 w-6 text-linkedin-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Content Generation</h3>
                <p className="text-gray-600 mb-4">
                  Generate a month's worth of engaging LinkedIn content in minutes with advanced AI that understands your brand voice and industry.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Multiple tones and styles available</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Industry-specific content templates</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">One-click regeneration of ideas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-purple-500"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-purple-100 mb-4">
                  <Calendar className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Content Calendar</h3>
                <p className="text-gray-600 mb-4">
                  Plan your LinkedIn strategy with our intuitive drag-and-drop calendar. Schedule, reschedule, and maintain a consistent posting cadence.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Visual content calendar interface</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Drag-and-drop rescheduling</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Content categorization and filtering</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-blue-500"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-blue-100 mb-4">
                  <Image className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Carousel Generation</h3>
                <p className="text-gray-600 mb-4">
                  Create eye-catching carousel posts that drive engagement with our integrated AI image generator and template system.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">AI-powered image creation</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Professional carousel templates</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Custom branding and styling options</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-green-500"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-green-100 mb-4">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Scheduled Publishing</h3>
                <p className="text-gray-600 mb-4">
                  Schedule your content in advance and let ContentScribe publish it automatically, or get reminders to post manually.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Automated publishing capability</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Smart time slot suggestions</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">One-click copy for manual posting</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 5 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-amber-500"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-amber-100 mb-4">
                  <PenTool className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Content Customization</h3>
                <p className="text-gray-600 mb-4">
                  Personalize your content with easy editing tools. Adjust tone, style, and messaging to match your brand perfectly.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Tone and voice adjustment</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Rich text formatting options</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">AI-suggested improvements</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Feature 6 */}
            <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
              <div className="h-2 bg-rose-500"></div>
              <CardContent className="p-6">
                <div className="rounded-full w-12 h-12 flex items-center justify-center bg-rose-100 mb-4">
                  <Zap className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced AI Models</h3>
                <p className="text-gray-600 mb-4">
                  Select from various AI models for content generation, including GPT-3.5 and future models. Bring your own API key for maximum flexibility.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Multiple AI model options</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Bring your own API key capability</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Customizable generation parameters</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How ContentScribe Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A simple three-step process to transform your LinkedIn content strategy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-linkedin-light flex items-center justify-center mx-auto mb-4 relative">
                <span className="font-bold text-2xl text-linkedin-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect & Personalize</h3>
              <p className="text-gray-600">
                Sign up with your LinkedIn account or email. Tell us about your industry, goals, and preferred content style.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-linkedin-light flex items-center justify-center mx-auto mb-4 relative">
                <span className="font-bold text-2xl text-linkedin-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Generate & Schedule</h3>
              <p className="text-gray-600">
                Use our AI to create engaging content for your audience. Review, edit, and schedule it on your content calendar.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-linkedin-light flex items-center justify-center mx-auto mb-4 relative">
                <span className="font-bold text-2xl text-linkedin-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Publish & Grow</h3>
              <p className="text-gray-600">
                Publish directly to LinkedIn or use our one-click copy feature. Track engagement and iterate for better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Screenshots */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">See ContentScribe in Action</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visual examples of our powerful features
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1607968565043-35d4c7011285?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="Content Calendar Interface" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Calendar</h3>
              <p className="text-gray-600">
                Our intuitive calendar interface makes it easy to plan and schedule your content for optimal engagement.
              </p>
            </div>
            
            <div>
              <div className="rounded-lg overflow-hidden shadow-xl mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="AI Content Generation" 
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Content Generation</h3>
              <p className="text-gray-600">
                Powered by advanced AI models to create high-quality, engaging content tailored to your audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-linkedin-primary to-linkedin-dark text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your LinkedIn Presence?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who are growing their network and influence with ContentScribe.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-linkedin-primary">
                Start for Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
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

export default Features;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Calendar, Copy, Image as ImageIcon, ShieldCheck, ArrowRight, Linkedin, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-linkedin-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">CS</span>
            </div>
            <span className="ml-2 font-semibold text-xl">ContentScribe</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a>
          </nav>
          
          <div className="flex items-center space-x-2">
            {user ? (
              <Button onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                AI-Powered <span className="text-linkedin-primary">LinkedIn Content</span> That Gets Results
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Transform your LinkedIn presence with AI-generated posts, carousels, and a complete content calendar. Save time while building your professional brand.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="flex items-center">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Start Creating Free
                </Button>
                <Button size="lg" variant="outline" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  See Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-500">
                <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                No credit card required
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <Card className="shadow-lg border-0 overflow-hidden rounded-lg">
                <CardContent className="p-0">
                  <img 
                    src="https://placehold.co/800x600/EEE/31343C?text=ContentScribe+Demo" 
                    alt="ContentScribe Demo" 
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything You Need for LinkedIn Success</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create, schedule, and publish engaging LinkedIn content with just a few clicks
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Content Generation</h3>
              <p className="text-gray-600">
                Create professional LinkedIn posts in seconds with our specialized AI. Choose from different tones and templates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Calendar</h3>
              <p className="text-gray-600">
                Plan your LinkedIn strategy with a 30-day content calendar. Schedule, edit and reschedule posts with ease.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Image & Carousel Creation</h3>
              <p className="text-gray-600">
                Generate eye-catching images and professional carousel slides to boost engagement on your posts.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Copy className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">One-Click Publishing</h3>
              <p className="text-gray-600">
                Publish directly to LinkedIn or use our one-click copy feature to paste perfectly formatted content.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <Linkedin className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">LinkedIn Integration</h3>
              <p className="text-gray-600">
                Connect your LinkedIn account for seamless publishing and scheduling of your professional content.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="bg-linkedin-light h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Content Analytics</h3>
              <p className="text-gray-600">
                Track performance and optimize your LinkedIn strategy with detailed engagement metrics and insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works for your LinkedIn content needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <p className="text-gray-600 mb-4">Perfect for trying out the platform</p>
                <div className="text-3xl font-bold mb-6">$0 <span className="text-gray-500 text-lg font-normal">/month</span></div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>2 AI-generated posts per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Basic content templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Copy-paste publishing</span>
                  </li>
                  <li className="flex items-start text-gray-500">
                    <span className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0">×</span>
                    <span>Watermarked images</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <Button variant="outline" className="w-full">Get Started Free</Button>
              </div>
            </div>
            
            <div className="border rounded-lg shadow-lg border-linkedin-primary overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-linkedin-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-gray-600 mb-4">For serious content creators</p>
                <div className="text-3xl font-bold mb-6">$29 <span className="text-gray-500 text-lg font-normal">/month</span></div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>30 AI-generated posts per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Full content calendar access</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Image generation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>No watermarks</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <Button className="w-full">Subscribe Now</Button>
              </div>
            </div>
            
            <div className="border rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Pro Plus</h3>
                <p className="text-gray-600 mb-4">Maximum content power</p>
                <div className="text-3xl font-bold mb-6">$49 <span className="text-gray-500 text-lg font-normal">/month</span></div>
                
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unlimited AI-generated posts</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>All Pro features included</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Use your own OpenAI API key</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t bg-gray-50">
                <Button variant="outline" className="w-full">Upgrade to Pro Plus</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linkedin-primary text-white px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your LinkedIn Content?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals using ContentScribe to grow their LinkedIn presence
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-linkedin-primary hover:bg-gray-100">
            Start Creating Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-300 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-linkedin-primary font-bold text-sm">CS</span>
                </div>
                <span className="ml-2 font-semibold text-white">ContentScribe</span>
              </div>
              <p className="text-sm text-gray-400">
                AI-powered LinkedIn content creation and scheduling platform for professionals and businesses.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} ContentScribe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

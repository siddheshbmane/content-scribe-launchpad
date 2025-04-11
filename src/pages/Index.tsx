
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  CalendarDays,
  Sparkles,
  Laptop,
  LayoutGrid,
  CheckCircle2,
  Linkedin,
  Zap,
  ExternalLink,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sparkles className="h-5 w-5 text-white" />,
      title: "AI-Generated Content",
      description: "Create engaging LinkedIn posts in seconds using advanced AI."
    },
    {
      icon: <CalendarDays className="h-5 w-5 text-white" />,
      title: "Content Calendar",
      description: "Plan your LinkedIn content strategy with an AI-powered calendar."
    },
    {
      icon: <LayoutGrid className="h-5 w-5 text-white" />,
      title: "Carousel Generator",
      description: "Build captivating carousel posts with custom images and templates."
    },
    {
      icon: <Laptop className="h-5 w-5 text-white" />,
      title: "Mobile-First Design",
      description: "Manage your content on any device with our responsive interface."
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "2 AI posts per month",
        "Basic content templates",
        "LinkedIn-optimized formatting",
        "Watermarked images"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      features: [
        "30 AI posts per month",
        "Content calendar access",
        "Image carousel generator",
        "Scheduling tools"
      ],
      cta: "Choose Pro",
      highlighted: true
    },
    {
      name: "Pro Plus",
      price: "$49",
      period: "/month",
      features: [
        "Unlimited AI posts",
        "Use your own API keys",
        "Advanced analytics",
        "Priority support"
      ],
      cta: "Choose Pro Plus",
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-linkedin-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">LI</span>
            </div>
            <span className="font-semibold text-xl">ContentSphere</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <Button>
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link to="/register">
                  <Button>
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Transform Your LinkedIn
                <span className="text-linkedin-primary"> Presence</span> with AI
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Create, schedule, and publish professional content that engages your network and builds your personal brand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Start Creating
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    <Linkedin className="mr-2 h-5 w-5" />
                    Sign In with LinkedIn
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://source.unsplash.com/KdeqA3aTnBY/800x600" 
                  alt="LinkedIn Content Creation" 
                  className="w-full object-cover"
                />
                <div className="absolute inset-0 bg-linkedin-primary/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-gray-600 mt-2">Everything you need to succeed on LinkedIn</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="bg-linkedin-primary w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 mt-2">Three simple steps to enhance your LinkedIn presence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-linkedin-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-linkedin-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Choose a Content Type</h3>
              <p className="text-gray-600">Select from single posts, carousels, or complete content calendars</p>
            </div>
            
            <div className="text-center">
              <div className="bg-linkedin-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-linkedin-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Customize with AI</h3>
              <p className="text-gray-600">Input your topic and let AI generate professional content for your audience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-linkedin-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-linkedin-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Schedule & Publish</h3>
              <p className="text-gray-600">Share immediately or schedule for optimal engagement times</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/register">
              <Button size="lg">
                <Zap className="mr-2 h-5 w-5" />
                Start Creating Content
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Choose Your Plan</h2>
            <p className="text-gray-600 mt-2">Flexible options to meet your content needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`border ${
                  plan.highlighted ? 'border-linkedin-primary shadow-lg relative' : 'shadow-md'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-linkedin-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-gray-500">{plan.period}</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register">
                    <Button 
                      className="w-full" 
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-linkedin-primary font-bold text-sm">LI</span>
                </div>
                <span className="font-semibold text-xl">ContentSphere</span>
              </div>
              <p className="text-gray-400">
                Creating professional LinkedIn content made simple with AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Partners</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 ContentSphere. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

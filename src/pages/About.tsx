
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Users,
  Target,
  Award,
  Lightbulb,
  Globe
} from "lucide-react";

const About = () => {
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
            About ContentScribe
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            Created by professionals, for professionals
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                ContentScribe was born from a simple observation: professionals know they need to be active on LinkedIn, but creating consistent, high-quality content is challenging and time-consuming.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2023 by a team of marketing professionals and AI specialists, we set out to solve this problem by combining advanced AI with intuitive design to make professional content creation accessible to everyone.
              </p>
              <p className="text-lg text-gray-600">
                Our mission is to empower professionals to build their personal brand and expand their network through exceptional content, without spending hours crafting each post.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team working together" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-linkedin-light mb-6">
                <Target className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We're committed to creating the highest quality tools and resources. We continuously improve our technology to deliver exceptional results.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-linkedin-light mb-6">
                <Lightbulb className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We embrace cutting-edge technology and creative thinking to solve complex problems and create intuitive, powerful solutions.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-linkedin-light mb-6">
                <Users className="h-6 w-6 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empowerment</h3>
              <p className="text-gray-600">
                We believe everyone deserves access to professional-grade tools that help them build their career and brand, regardless of their content creation skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experts in AI, content marketing, and product development
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Alex Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Alex Johnson</h3>
              <p className="text-linkedin-primary mb-3">CEO & Co-Founder</p>
              <p className="text-gray-600">
                Former marketing executive with 15+ years of experience building brands and content strategies for Fortune 500 companies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80" 
                  alt="Sarah Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Sarah Chen</h3>
              <p className="text-linkedin-primary mb-3">CTO & Co-Founder</p>
              <p className="text-gray-600">
                AI researcher and engineer who has led technical teams at leading tech companies, specializing in natural language processing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-48 h-48 rounded-full overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Marcus Williams" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold mb-1">Marcus Williams</h3>
              <p className="text-linkedin-primary mb-3">Chief Product Officer</p>
              <p className="text-gray-600">
                Product design veteran who has shaped user experiences at multiple successful SaaS startups before joining ContentScribe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-linkedin-light">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-linkedin-primary mb-2">10,000+</p>
              <p className="text-xl font-medium">Active Users</p>
            </div>
            
            <div>
              <p className="text-4xl font-bold text-linkedin-primary mb-2">250,000+</p>
              <p className="text-xl font-medium">Posts Generated</p>
            </div>
            
            <div>
              <p className="text-4xl font-bold text-linkedin-primary mb-2">98%</p>
              <p className="text-xl font-medium">Customer Satisfaction</p>
            </div>
            
            <div>
              <p className="text-4xl font-bold text-linkedin-primary mb-2">50+</p>
              <p className="text-xl font-medium">Industries Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Team meeting" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-4">
                We envision a world where every professional can build a powerful personal brand through high-quality content, regardless of their writing skills or time constraints.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We're working toward a future where AI assistants work seamlessly alongside humans, amplifying their creativity and expertise rather than replacing them.
              </p>
              <p className="text-lg text-gray-600">
                By 2030, we aim to help over 1 million professionals transform their careers through strategic content creation and personal branding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-linkedin-primary to-linkedin-dark text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Experience how ContentScribe can transform your LinkedIn presence and professional growth.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-linkedin-primary">
                Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Features
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

export default About;

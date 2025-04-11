
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Heart, 
  Award, 
  Clock, 
  Coffee,
  GraduationCap
} from "lucide-react";

const Careers = () => {
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
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Help us shape the future of professional content creation
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white hover:bg-gray-100 text-linkedin-primary">
              Coming Soon
            </Button>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Join ContentScribe?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're building the future of AI-powered content creation in a collaborative, innovative environment
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-linkedin-light rounded-full flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Meaningful Work</h3>
              <p className="text-gray-600">
                Build products that empower professionals to grow their careers and personal brands through engaging content.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-linkedin-light rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation-First Culture</h3>
              <p className="text-gray-600">
                Work at the cutting edge of AI and content technology in an environment that values creativity and bold ideas.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-linkedin-light rounded-full flex items-center justify-center mb-6">
                <GraduationCap className="h-8 w-8 text-linkedin-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth & Learning</h3>
              <p className="text-gray-600">
                Continuous learning opportunities through mentorship, professional development budgets, and industry events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Benefits</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We take care of our team with comprehensive benefits and perks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Comprehensive Healthcare</h3>
              </div>
              <p className="text-gray-600">
                Medical, dental, and vision coverage for you and your dependents with low out-of-pocket costs.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold">Flexible Work</h3>
              </div>
              <p className="text-gray-600">
                Remote-first with flexible hours to help you maintain a healthy work-life balance.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Competitive Compensation</h3>
              </div>
              <p className="text-gray-600">
                Salary, equity, and performance bonuses that reward your contributions to our success.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Coffee className="h-5 w-5 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold">Wellness Programs</h3>
              </div>
              <p className="text-gray-600">
                Mental health support, fitness subsidies, and quarterly wellness days to recharge.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Parental Leave</h3>
              </div>
              <p className="text-gray-600">
                Generous paid parental leave for all parents, regardless of gender or family structure.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Continuous Learning</h3>
              </div>
              <p className="text-gray-600">
                Professional development budget, learning stipends, and time for conferences and education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gradient-to-r from-linkedin-light to-blue-100 rounded-2xl p-8 md:p-12">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
              <Briefcase className="h-10 w-10 text-linkedin-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">We're Building Our Team</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              We're not actively hiring right now, but we're always interested in connecting with talented individuals. Send us your resume and we'll be in touch when opportunities open up.
            </p>
            <Button size="lg" className="bg-linkedin-primary hover:bg-linkedin-primary/90 text-white">
              Join Our Talent Network
            </Button>
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

export default Careers;

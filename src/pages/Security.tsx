
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Lock, 
  Server, 
  Eye, 
  Key,
  UserCheck
} from "lucide-react";

const Security = () => {
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
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
            <Shield className="h-8 w-8 text-linkedin-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security at ContentScribe
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-3xl mx-auto">
            How we protect your data and maintain a secure platform
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Security Commitment</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At ContentScribe, security is not just a feature – it's foundational to everything we build. We implement industry best practices to ensure your data and content remain protected.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Encryption</h3>
              <p className="text-gray-600">
                We employ end-to-end encryption for all data in transit and at rest, ensuring that your content and personal information remain secure at all times.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Server className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Infrastructure</h3>
              <p className="text-gray-600">
                Our platform is built on secure cloud infrastructure with regular security assessments, penetration testing, and compliance with industry standards.
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-6">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Authentication</h3>
              <p className="text-gray-600">
                We implement strict authentication controls, including secure password requirements, multi-factor authentication options, and secure session management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Practices Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Security Practices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We implement comprehensive security measures across our entire platform
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold mb-3">Data Protection</h3>
                  <div className="w-12 h-12 rounded-full bg-linkedin-light flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-linkedin-primary" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Encryption at Rest and in Transit</p>
                        <p className="text-gray-600 text-sm">All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Data Isolation</p>
                        <p className="text-gray-600 text-sm">Customer data is logically isolated to prevent cross-contamination between accounts.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Regular Backups</p>
                        <p className="text-gray-600 text-sm">Automated backup systems with point-in-time recovery capabilities.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold mb-3">Access Controls</h3>
                  <div className="w-12 h-12 rounded-full bg-linkedin-light flex items-center justify-center mb-4">
                    <Key className="h-6 w-6 text-linkedin-primary" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Role-Based Access Control (RBAC)</p>
                        <p className="text-gray-600 text-sm">Strict implementation of role-based permissions for all internal systems.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Multi-Factor Authentication</p>
                        <p className="text-gray-600 text-sm">Support for MFA to add an additional layer of security for account access.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Least Privilege Principle</p>
                        <p className="text-gray-600 text-sm">Staff access rights are limited to only what's necessary for their specific role.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-bold mb-3">Monitoring & Compliance</h3>
                  <div className="w-12 h-12 rounded-full bg-linkedin-light flex items-center justify-center mb-4">
                    <Eye className="h-6 w-6 text-linkedin-primary" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">24/7 Security Monitoring</p>
                        <p className="text-gray-600 text-sm">Continuous monitoring systems to detect and alert on suspicious activities.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Regular Security Audits</p>
                        <p className="text-gray-600 text-sm">Third-party security assessments and penetration testing conducted regularly.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-4 mt-1">
                        <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">Compliance Standards</p>
                        <p className="text-gray-600 text-sm">Adherence to industry standards and compliance frameworks such as GDPR, CCPA, and ISO 27001.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Security Questions</h2>
          </div>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How is my data protected?</h3>
              <p className="text-gray-600">
                Your data is protected using industry-standard encryption both when stored and when transmitted. We employ AES-256 encryption for data at rest and TLS 1.3 encryption for data in transit. We also implement strict access controls and regular security audits to ensure your data remains secure.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Who can access my content?</h3>
              <p className="text-gray-600">
                Access to your content is restricted to authorized individuals within your account based on the permissions you set. ContentScribe staff do not access customer content except in specific situations such as providing technical support (with your permission) or when required by law.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">What happens to my data if I delete my account?</h3>
              <p className="text-gray-600">
                When you delete your account, all your personal data and content are permanently removed from our active systems within 30 days. Backups containing your data are also purged according to our data retention schedule, which is typically within 90 days.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">How does ContentScribe handle security incidents?</h3>
              <p className="text-gray-600">
                We have a comprehensive incident response plan that includes immediate containment, thorough investigation, and prompt notification to affected customers. Our security team is trained to respond quickly to potential security incidents to minimize any impact.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-2">Does ContentScribe share my data with third parties?</h3>
              <p className="text-gray-600">
                We do not sell your data to third parties. We only share your information with third-party service providers who help us deliver our services, and they are bound by strict confidentiality obligations. Any sharing of data is detailed in our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Report Vulnerability Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Report a Security Vulnerability</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We value the work of security researchers and the wider community who help us keep ContentScribe secure. If you've found a security vulnerability, please let us know.
          </p>
          <Button size="lg" className="bg-linkedin-primary hover:bg-linkedin-primary/90">
            Contact Security Team
          </Button>
          <p className="mt-4 text-gray-500">
            Email: security@contentscribe.com
          </p>
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

export default Security;

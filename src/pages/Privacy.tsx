
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
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
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Privacy Policy
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Last updated: April 11, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Introduction</h2>
          <p>
            ContentScribe ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
          </p>
          <p>
            By accessing or using ContentScribe, you consent to the data practices described in this privacy policy. If you do not agree with our policies and practices, your choice is not to use our website or services.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We collect information from you when you register on our site, place an order, subscribe to our service, respond to a survey, fill out a form, or otherwise communicate with us. The information we collect may include:
          </p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, profession, industry, and other demographic information.</li>
            <li><strong>Account Information:</strong> Your username, password, and profile information.</li>
            <li><strong>Payment Information:</strong> Credit card numbers and billing details.</li>
            <li><strong>Content Data:</strong> Information you provide when using our services, such as content preferences, generated content, and user settings.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website and services, including IP address, browser type, pages visited, and time spent on the site.</li>
            <li><strong>LinkedIn Profile Data:</strong> If you choose to connect your LinkedIn account, we may collect profile information from LinkedIn according to the permissions you grant.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect from you in the following ways:</p>
          <ul>
            <li>To personalize your experience and deliver the type of content and product offerings most relevant to you.</li>
            <li>To improve our website and services based on the feedback and information we receive from you.</li>
            <li>To process transactions and deliver the services you have requested.</li>
            <li>To send periodic emails regarding your account, updates, or other information pertaining to our services.</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>To analyze usage patterns and trends to enhance user experience.</li>
            <li>To comply with legal obligations and enforce our terms of service.</li>
          </ul>

          <h2>Protection of Your Information</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. We use industry-standard encryption to protect sensitive information transmitted online and secure databases to store your personal information.
          </p>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2>Use of Cookies</h2>
          <p>
            We use cookies to understand and save your preferences for future visits, compile aggregate data about site traffic and site interaction, and enhance your experience on our site. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.
          </p>

          <h2>Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except as described below:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.</li>
            <li><strong>Business Transfers:</strong> If we or our assets are acquired by another company, user information may be one of the transferred assets.</li>
          </ul>

          <h2>Third-Party Links</h2>
          <p>
            Our website may contain links to other sites. We are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.
          </p>

          <h2>Your Data Protection Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal information, which may include:
          </p>
          <ul>
            <li>The right to access the personal information we hold about you.</li>
            <li>The right to request correction of inaccurate personal information.</li>
            <li>The right to request deletion of your personal information.</li>
            <li>The right to object to processing of your personal information.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent where processing is based on consent.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@contentscribe.com.
          </p>

          <h2>Children's Online Privacy Protection</h2>
          <p>
            Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are under 16, do not use or provide any information on this website. If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            ContentScribe<br />
            Email: privacy@contentscribe.com<br />
            123 Tech Plaza, Suite 400<br />
            San Francisco, CA 94105, USA
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

export default Privacy;

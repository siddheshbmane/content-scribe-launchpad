
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = () => {
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
            Terms of Service
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
            Welcome to ContentScribe. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using ContentScribe's website or services, you agree to comply with and be bound by these Terms.
          </p>
          <p>
            If you do not agree to these Terms, please do not access or use our services. We reserve the right to change or modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page and updating the "Last updated" date.
          </p>

          <h2>Definitions</h2>
          <ul>
            <li><strong>Service:</strong> Refers to ContentScribe's website, applications, and content generation services.</li>
            <li><strong>User:</strong> Refers to individuals who access or use the Service.</li>
            <li><strong>Account:</strong> A registered profile created to access our Service.</li>
            <li><strong>Content:</strong> Refers to text, images, videos, or other materials generated, uploaded, or displayed through our Service.</li>
            <li><strong>Subscription:</strong> Refers to the recurring payment arrangement for accessing our Service.</li>
          </ul>

          <h2>Account Registration and Eligibility</h2>
          <p>
            To use certain features of the Service, you may be required to register for an Account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
          </p>
          <p>
            You must be at least 16 years old to create an Account and use our Service. By creating an Account, you represent and warrant that you meet this eligibility requirement.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your Account. You agree to notify us immediately of any unauthorized use of your Account.
          </p>

          <h2>Subscriptions and Payments</h2>
          <p>
            Some features of our Service require a subscription. By selecting a subscription plan, you agree to pay the specified subscription fees according to the billing terms presented at the time of purchase.
          </p>
          <p>
            Subscriptions automatically renew until canceled. You can cancel your subscription at any time through your account settings. If you cancel, you may continue to use your subscription until the end of your current billing period, but you will not receive a refund for any fees already paid.
          </p>
          <p>
            We reserve the right to change our subscription plans or adjust pricing at any time. Any price changes will be communicated to you in advance and will apply no earlier than 30 days following notification.
          </p>

          <h2>User Conduct</h2>
          <p>
            You agree not to use the Service to:
          </p>
          <ul>
            <li>Violate any applicable laws or regulations.</li>
            <li>Infringe on the intellectual property rights of others.</li>
            <li>Upload or transmit viruses, malware, or other types of malicious code.</li>
            <li>Engage in any activity that could disable, overburden, or impair the proper functioning of the Service.</li>
            <li>Collect or harvest any information from the Service without authorization.</li>
            <li>Generate content that is abusive, defamatory, hateful, or violates our content policies.</li>
            <li>Impersonate or misrepresent your affiliation with any person or entity.</li>
          </ul>
          <p>
            We reserve the right to terminate or suspend your account for violations of these Terms or for any other reason at our discretion.
          </p>

          <h2>Content and Intellectual Property</h2>
          <p>
            By using our Service to generate content, you understand that we do not claim ownership of the output content. However, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, distribute, and display the content for the purpose of providing and improving our Service.
          </p>
          <p>
            You are responsible for ensuring that any content you generate, upload, or share through our Service does not infringe on the intellectual property rights or other rights of any third party.
          </p>
          <p>
            The Service and its original content, features, and functionality are owned by ContentScribe and are protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h2>Disclaimer of Warranties</h2>
          <p>
            The Service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, ContentScribe and its officers, directors, employees, and agents shall not be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>The use or inability to use the Service;</li>
            <li>Unauthorized access to or alteration of your transmissions or data;</li>
            <li>Statements or conduct of any third party on the Service;</li>
            <li>Any other matter relating to the Service.</li>
          </ul>

          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless ContentScribe and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including, without limitation, reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your violation of any rights of another.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend your Account and access to the Service immediately, without prior notice or liability, for any reason, including, without limitation, if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your Account, you may simply discontinue using the Service or delete your Account through your account settings.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
          </p>
          <p>
            Any dispute arising from or relating to the subject matter of these Terms shall be exclusively submitted to the courts of San Francisco, California.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p>
            ContentScribe<br />
            Email: legal@contentscribe.com<br />
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

export default Terms;

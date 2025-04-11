
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  X, 
  ChevronRight,
  Linkedin,
  CreditCard,
  Sparkles,
  Image,
  Calendar,
  Zap
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  const plans = [
    {
      type: "free",
      name: "Free",
      description: "For individuals just getting started",
      price: {
        monthly: 0,
        annual: 0
      },
      features: [
        { name: "2 AI posts per month", included: true },
        { name: "Basic content templates", included: true },
        { name: "Watermark on images", included: true },
        { name: "Content calendar access", included: false },
        { name: "Image generation", included: false },
        { name: "LinkedIn publishing", included: false },
        { name: "Custom API key", included: false },
        { name: "Priority support", included: false }
      ],
      ctaText: "Get Started",
      popular: false
    },
    {
      type: "basic",
      name: "Basic",
      description: "For creators building their presence",
      price: {
        monthly: 10,
        annual: 8
      },
      features: [
        { name: "10 AI posts per month", included: true },
        { name: "All content templates", included: true },
        { name: "Watermark on images", included: true },
        { name: "Content calendar access", included: true },
        { name: "Basic image generation", included: false },
        { name: "LinkedIn publishing", included: false },
        { name: "Custom API key", included: false },
        { name: "Priority support", included: false }
      ],
      ctaText: "Start Basic Plan",
      popular: false
    },
    {
      type: "pro",
      name: "Pro",
      description: "For serious content professionals",
      price: {
        monthly: 29,
        annual: 24
      },
      features: [
        { name: "30 AI posts per month", included: true },
        { name: "All content templates", included: true },
        { name: "No watermarks", included: true },
        { name: "Content calendar access", included: true },
        { name: "Advanced image generation", included: true },
        { name: "LinkedIn publishing", included: true },
        { name: "Custom API key", included: false },
        { name: "Priority support", included: true }
      ],
      ctaText: "Start Pro Plan",
      popular: true
    },
    {
      type: "proPlus",
      name: "Pro Plus",
      description: "For power users and teams",
      price: {
        monthly: 49,
        annual: 39
      },
      features: [
        { name: "Unlimited AI posts", included: true },
        { name: "All content templates", included: true },
        { name: "No watermarks", included: true },
        { name: "Content calendar access", included: true },
        { name: "Advanced image generation", included: true },
        { name: "LinkedIn publishing", included: true },
        { name: "Custom API key", included: true },
        { name: "Priority support", included: true }
      ],
      ctaText: "Start Pro Plus Plan",
      popular: false
    }
  ];

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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Choose the plan that's right for your LinkedIn content strategy
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-8">
              <Tabs 
                defaultValue="monthly" 
                className="bg-gray-100 p-1 rounded-lg"
                onValueChange={(value) => setBillingCycle(value as "monthly" | "annual")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="monthly">Monthly Billing</TabsTrigger>
                  <TabsTrigger value="annual">Annual Billing <span className="ml-1.5 text-xs font-normal text-green-600">Save 20%</span></TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.type}
                className={`border rounded-xl overflow-hidden bg-white transition-all ${
                  plan.popular 
                    ? "shadow-xl border-linkedin-primary relative" 
                    : "shadow-md hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-linkedin-primary text-white py-1 px-3 rounded-bl-lg text-sm font-medium">
                    Popular
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">${plan.price[billingCycle]}</span>
                      <span className="text-gray-500 ml-2">
                        {plan.price[billingCycle] > 0 ? "/month" : ""}
                      </span>
                    </div>
                    {billingCycle === "annual" && plan.price.annual > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Billed ${plan.price.annual * 12}/year
                      </p>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-gray-400"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to="/register">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-linkedin-primary hover:bg-linkedin-primary/90" 
                          : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.ctaText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll get immediate access to the new features. When you downgrade, the change will take effect at the end of your current billing cycle.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How do the post limits work?</h3>
              <p className="text-gray-600">
                Post limits reset at the beginning of each billing cycle. Unused posts do not roll over to the next month. For annual plans, you get the monthly limit each month for 12 months.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For annual plans, we also offer invoicing options for enterprise customers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service, you can request a full refund within 14 days of your purchase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What does "Custom API key" mean?</h3>
              <p className="text-gray-600">
                With the Pro Plus plan, you can use your own OpenAI and Stable Diffusion API keys. This gives you more control over your usage and allows you to leverage any special pricing or features available with your API accounts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl">
            <div className="p-8 md:p-12 md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
                <p className="text-xl mb-6">
                  Need a custom solution for your team or agency? We offer tailored plans with dedicated support, team management, and advanced features.
                </p>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                  Contact Sales
                </Button>
              </div>
              <div className="md:w-1/3 md:pl-8">
                <div className="rounded-full bg-gray-800 p-6 w-24 h-24 flex items-center justify-center mx-auto md:mx-0">
                  <CreditCard className="h-12 w-12 text-linkedin-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-linkedin-light">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Elevate Your LinkedIn Content?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
            Start with our free plan today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-linkedin-primary hover:bg-linkedin-primary/90">
                Get Started Free <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline">
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

export default Pricing;


import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Shield, Lock, Server, CreditCard, EyeOff, AlertTriangle } from "lucide-react";

const Security = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Security</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We take security and privacy seriously at ContentScribe. Learn about our commitment to keeping your data safe.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-16 flex-shrink-0 flex justify-center">
              <Shield className="h-12 w-12 text-linkedin-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Data Protection</h2>
              <p className="text-gray-700 mb-4">
                ContentScribe implements industry-standard security measures to protect your data. All information is encrypted both in transit and at rest using AES-256 encryption, one of the strongest encryption algorithms available.
              </p>
              <p className="text-gray-700">
                Our infrastructure is hosted on secure cloud platforms with multiple layers of protection against unauthorized access, including firewalls, intrusion detection systems, and regular security audits.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-16 flex-shrink-0 flex justify-center">
              <Lock className="h-12 w-12 text-linkedin-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Authentication & Access</h2>
              <p className="text-gray-700 mb-4">
                We implement secure authentication mechanisms, including email verification and strong password requirements. For added security, we support OAuth login through LinkedIn with proper scope permissions.
              </p>
              <p className="text-gray-700">
                Our application follows the principle of least privilege, ensuring that users and systems only have access to the resources necessary to perform their functions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-16 flex-shrink-0 flex justify-center">
              <Server className="h-12 w-12 text-linkedin-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">API & Third-Party Integrations</h2>
              <p className="text-gray-700 mb-4">
                When you provide API keys for services like OpenAI, they are securely stored using encryption and are never accessible in plaintext after submission. We implement rate limiting and monitoring to prevent abuse.
              </p>
              <p className="text-gray-700">
                Our integrations with third-party services maintain the same high standards of security, and we regularly review their security practices to ensure compliance with our requirements.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-16 flex-shrink-0 flex justify-center">
              <CreditCard className="h-12 w-12 text-linkedin-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Payment Security</h2>
              <p className="text-gray-700 mb-4">
                ContentScribe uses trusted payment processors that comply with PCI DSS (Payment Card Industry Data Security Standard). We never store your complete credit card information on our servers.
              </p>
              <p className="text-gray-700">
                All payment transactions are encrypted and processed through secure connections to ensure your financial information remains protected.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-16 flex-shrink-0 flex justify-center">
              <EyeOff className="h-12 w-12 text-linkedin-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Privacy Commitment</h2>
              <p className="text-gray-700 mb-4">
                We are committed to protecting your privacy. We only collect the information necessary to provide our services and do not share your data with third parties except as required to deliver our services or as required by law.
              </p>
              <p className="text-gray-700">
                For more information about how we handle your data, please refer to our <Link to="/privacy" className="text-linkedin-primary hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-amber-800 mb-2">Report a Security Issue</h3>
            <p className="text-amber-700 mb-4">
              If you believe you've found a security vulnerability in ContentScribe, please report it to us immediately. We appreciate your help in keeping our platform secure.
            </p>
            <Button variant="outline" className="bg-white border-amber-300 text-amber-800 hover:bg-amber-100">
              Contact Security Team
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-center">
        <Link to="/">
          <Button variant="ghost">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Security;

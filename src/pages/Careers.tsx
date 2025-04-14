
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Careers = () => {
  const openRoles = [
    {
      title: "AI Content Specialist",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Lead Product Designer",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "New York, NY",
      type: "Full-time"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Join Our Team</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're building the future of LinkedIn content creation and looking for talented 
          individuals to help us shape this journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-linkedin-primary text-5xl font-bold mb-4">01</div>
            <h3 className="text-xl font-medium mb-2">Flexible Work</h3>
            <p className="text-gray-600">
              Work from anywhere in the world. We believe in results, not hours spent at a desk.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-linkedin-primary text-5xl font-bold mb-4">02</div>
            <h3 className="text-xl font-medium mb-2">Impactful Work</h3>
            <p className="text-gray-600">
              Join a team where your work directly impacts thousands of professionals daily.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-linkedin-primary text-5xl font-bold mb-4">03</div>
            <h3 className="text-xl font-medium mb-2">Growth Culture</h3>
            <p className="text-gray-600">
              Continuous learning and development opportunities to help you reach your potential.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Open Positions</h2>
        <div className="space-y-4">
          {openRoles.map((role, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{role.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-gray-600">Department: {role.department}</div>
                    <div className="text-sm text-gray-600">Location: {role.location}</div>
                    <div className="text-sm text-gray-600">Type: {role.type}</div>
                  </div>
                </div>
                <Button>Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a role that fits?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          We're always on the lookout for exceptional talent. Send us your resume and tell us 
          why you'd be a great addition to our team.
        </p>
        <Button size="lg">Send Open Application</Button>
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

export default Careers;

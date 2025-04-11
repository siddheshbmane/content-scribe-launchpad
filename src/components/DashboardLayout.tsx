
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Calendar, Settings, LogOut, Users, Menu, X, Layers } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  requiredPlan?: "pro" | "proPlus";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const { userPlan, plans, remainingPosts } = usePlan();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const navItems: NavItem[] = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5 mr-2" />,
      label: "Dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      to: "/calendar",
      icon: <Calendar className="h-5 w-5 mr-2" />,
      label: "Calendar",
      active: location.pathname === "/calendar",
      requiredPlan: "pro",
    },
    {
      to: "/carousels",
      icon: <Layers className="h-5 w-5 mr-2" />,
      label: "Carousels",
      active: location.pathname === "/carousels",
    },
    {
      to: "/settings",
      icon: <Settings className="h-5 w-5 mr-2" />,
      label: "Settings",
      active: location.pathname === "/settings",
    },
  ];

  if (isAdmin) {
    navItems.push({
      to: "/admin",
      icon: <Users className="h-5 w-5 mr-2" />,
      label: "Admin",
      active: location.pathname === "/admin",
    });
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-white"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "w-full md:w-64 bg-white border-r border-gray-200 flex flex-col",
        "fixed md:sticky top-0 h-full z-40 transition-all duration-300 ease-in-out",
        sidebarOpen ? "left-0" : "-left-full md:left-0",
        "overflow-y-auto"
      )}>
        {/* Logo */}
        <div className="px-6 py-4">
          <Link to="/dashboard" className="flex items-center">
            <div className="h-8 w-8 bg-linkedin-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">CS</span>
            </div>
            <span className="ml-2 font-semibold text-xl text-gray-900">ContentScribe</span>
          </Link>
        </div>
        
        <Separator />
        
        {/* User info */}
        <div className="px-6 py-4 flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <p className="font-medium text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">
              {userPlan ? plans[userPlan.planType].name : "Free"} Plan
            </p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              // Check if this route requires a specific plan
              const canAccess = !item.requiredPlan || 
                (userPlan && (userPlan.planType === item.requiredPlan || userPlan.planType === "proPlus"));
              
              return (
                <li key={item.to}>
                  <Link
                    to={canAccess ? item.to : "/settings"} 
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      item.active
                        ? "bg-linkedin-light text-linkedin-primary"
                        : "text-gray-600 hover:bg-gray-100",
                      !canAccess && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={(e) => !canAccess && e.preventDefault()}
                  >
                    {item.icon}
                    {item.label}
                    {!canAccess && (
                      <span className="ml-2 text-xs bg-gray-200 px-1.5 py-0.5 rounded">
                        Pro+
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        {/* Post limit indicator */}
        <div className="px-6 py-4">
          <Card className="p-3">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Posts Remaining This Month
            </p>
            <div className="bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-linkedin-primary h-2 rounded-full" 
                style={{ 
                  width: `${userPlan ? (remainingPosts / plans[userPlan.planType].postsPerMonth) * 100 : 0}%`,
                  maxWidth: '100%'
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {remainingPosts} of {userPlan ? plans[userPlan.planType].postsPerMonth : 0} posts left
            </p>
          </Card>
        </div>
        
        {/* Logout */}
        <div className="px-4 py-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center text-gray-600"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log Out
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className={cn(
        "flex-1 overflow-auto transition-all duration-300 ease-in-out",
        sidebarOpen && isMobile ? "ml-0 md:ml-64" : "ml-0"
      )}>
        <main className="max-w-7xl mx-auto px-4 py-6 pt-16 md:pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

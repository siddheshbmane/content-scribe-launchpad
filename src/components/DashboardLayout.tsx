
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon, 
  LogOut, 
  Menu, 
  Users, 
  X,
  LayoutGrid,
  BellDot,
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { usePlan } from "@/contexts/PlanContext";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onNavigate?: () => void;
  end?: boolean;
  badge?: React.ReactNode;
}

const NavItem = ({ to, icon, label, active, onNavigate, end, badge }: NavItemProps) => {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-foreground",
        active && "bg-blue-50 text-blue-700 font-medium hover:text-blue-700",
        !end && "mb-1"
      )}
    >
      {icon}
      <span>{label}</span>
      {badge}
    </Link>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const { remainingPosts } = usePlan();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      active: location.pathname === "/dashboard"
    },
    {
      to: "/calendar",
      icon: <CalendarIcon className="h-5 w-5" />,
      label: "Content Calendar",
      active: location.pathname === "/calendar"
    },
    {
      to: "/carousel-editor",
      icon: <LayoutGrid className="h-5 w-5" />,
      label: "Carousel Editor",
      active: location.pathname === "/carousel-editor"
    },
    {
      to: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
      label: "Settings",
      active: location.pathname === "/settings"
    }
  ];
  
  if (isAdmin) {
    navItems.push({
      to: "/admin",
      icon: <Users className="h-5 w-5" />,
      label: "Admin",
      active: location.pathname === "/admin",
      badge: <Badge className="ml-auto bg-red-500">New</Badge>
    });
  }
  
  const renderSidebar = () => (
    <div className="space-y-6 py-4">
      <div className="px-3 py-2">
        <Link to="/dashboard" className="flex items-center gap-2 mb-6" onClick={closeSidebar}>
          <div className="h-8 w-8 bg-linkedin-primary rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">LI</span>
          </div>
          <span className="font-semibold text-xl">ContentSphere</span>
        </Link>
        <div className="space-y-1">
          {navItems.map((item, index) => (
            <NavItem 
              key={item.to} 
              to={item.to} 
              icon={item.icon} 
              label={item.label} 
              active={item.active} 
              onNavigate={closeSidebar}
              end={index === navItems.length - 1}
              badge={item.badge}
            />
          ))}
        </div>
      </div>
      
      <div className="px-3">
        <Separator />
      </div>
      
      <div className="px-3">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <BellDot className="h-5 w-5 text-blue-500 mr-2" />
            <span className="font-semibold">Posts Remaining</span>
          </div>
          <div className="bg-white rounded-md p-3 text-center">
            <span className="text-2xl font-bold text-blue-700">{remainingPosts}</span>
            <p className="text-sm text-gray-600 mt-1">posts this month</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar */}
      {isMobile ? (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            {renderSidebar()}
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="hidden md:flex md:w-64 md:flex-col md:inset-y-0 border-r">
          {renderSidebar()}
        </aside>
      )}
      
      {/* Main content */}
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-10 bg-white border-b h-16 flex items-center px-4 md:px-6">
          <div className="ml-auto flex items-center gap-4">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative rounded-full h-10 w-10 p-0">
                    <Avatar>
                      <AvatarImage src={user.profileImage} />
                      <AvatarFallback>
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium line-clamp-1">{user.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;


import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { 
  BarChart3, 
  Plus, 
  Search, 
  Users, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal, 
  ArrowUpRight, 
  Settings, 
  Edit, 
  Lock 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

// Mock data
const mockUsers = [
  {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    plan: "pro",
    posts: 12,
    imageAccess: true,
    joinDate: "2025-01-15",
    lastActive: "2025-04-09",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "u2",
    name: "Jamie Smith",
    email: "jamie@example.com",
    plan: "free",
    posts: 2,
    imageAccess: false,
    joinDate: "2025-02-20",
    lastActive: "2025-04-08",
    avatar: "https://i.pravatar.cc/150?img=4"
  },
  {
    id: "u3",
    name: "Taylor Wilson",
    email: "taylor@example.com",
    plan: "proPlus",
    posts: 45,
    imageAccess: true,
    joinDate: "2025-01-05",
    lastActive: "2025-04-10",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: "u4",
    name: "Morgan Lee",
    email: "morgan@example.com",
    plan: "pro",
    posts: 18,
    imageAccess: true,
    joinDate: "2025-03-10",
    lastActive: "2025-04-07",
    avatar: "https://i.pravatar.cc/150?img=6"
  },
  {
    id: "u5",
    name: "Casey Brown",
    email: "casey@example.com",
    plan: "free",
    posts: 1,
    imageAccess: false,
    joinDate: "2025-03-25",
    lastActive: "2025-04-05",
    avatar: "https://i.pravatar.cc/150?img=7"
  }
];

const getPlanColor = (plan: string) => {
  switch (plan) {
    case "free":
      return "bg-gray-100 text-gray-800";
    case "pro":
      return "bg-blue-100 text-blue-800";
    case "proPlus":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPlanLabel = (plan: string) => {
  switch (plan) {
    case "free":
      return "Free";
    case "pro":
      return "Pro";
    case "proPlus":
      return "Pro Plus";
    default:
      return plan;
  }
};

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("all");

  const handleUpdatePlan = (userId: string, newPlan: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, plan: newPlan } : user
    ));
    
    toast({
      title: "Plan updated",
      description: `User's plan has been updated to ${getPlanLabel(newPlan)}.`,
    });
  };

  const handleToggleImageAccess = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, imageAccess: !user.imageAccess } : user
    ));
    
    const user = users.find(u => u.id === userId);
    const newStatus = user ? !user.imageAccess : false;
    
    toast({
      title: "Feature access updated",
      description: `Image generator access ${newStatus ? 'enabled' : 'disabled'} for user.`,
    });
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesPlan = planFilter === "all" || user.plan === planFilter;
    
    return matchesSearch && matchesPlan;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, plans, and feature access
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{users.length}</div>
                <Users className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                +3 in the last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pro Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {users.filter(u => u.plan === "pro" || u.plan === "proPlus").length}
                </div>
                <BarChart3 className="h-4 w-4 text-gray-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                60% of total users
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">
                  {users.reduce((sum, user) => sum + user.posts, 0)}
                </div>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                +28% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center space-x-2 w-full md:w-1/3">
                <Search className="h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-[180px] h-9">
                    <SelectValue placeholder="Filter by plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="proPlus">Pro Plus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Posts</TableHead>
                      <TableHead>Image Access</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getPlanColor(user.plan)}>
                            {getPlanLabel(user.plan)}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.posts}</TableCell>
                        <TableCell>
                          <Switch 
                            checked={user.imageAccess} 
                            onCheckedChange={() => handleToggleImageAccess(user.id)} 
                          />
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="flex items-center">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="flex items-center"
                                onClick={() => handleUpdatePlan(user.id, "free")}
                              >
                                <span className={`h-2 w-2 rounded-full mr-2 ${user.plan === "free" ? "bg-green-500" : "bg-transparent"}`}></span>
                                Set as Free
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center"
                                onClick={() => handleUpdatePlan(user.id, "pro")}
                              >
                                <span className={`h-2 w-2 rounded-full mr-2 ${user.plan === "pro" ? "bg-green-500" : "bg-transparent"}`}></span>
                                Set as Pro
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center"
                                onClick={() => handleUpdatePlan(user.id, "proPlus")}
                              >
                                <span className={`h-2 w-2 rounded-full mr-2 ${user.plan === "proPlus" ? "bg-green-500" : "bg-transparent"}`}></span>
                                Set as Pro Plus
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600 flex items-center">
                                <Lock className="h-4 w-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>
                  View platform usage and user engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    In the production version, detailed analytics would be displayed here, including user growth, post volume, and engagement metrics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">General Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-gray-500">
                        Allow new users to register for the platform
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="font-medium">LinkedIn OAuth</p>
                      <p className="text-sm text-gray-500">
                        Allow users to sign in with LinkedIn
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Default Plan Settings</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">New User Default Plan</label>
                      <Select defaultValue="free">
                        <SelectTrigger>
                          <SelectValue placeholder="Select default plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="pro">Pro (Trial)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Trial Period (Days)</label>
                      <Input type="number" defaultValue="7" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">API Settings</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default AI Model</label>
                      <Select defaultValue="gpt3.5">
                        <SelectTrigger>
                          <SelectValue placeholder="Select AI model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt3.5">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="gpt4">GPT-4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">API Rate Limit (Requests/Min)</label>
                      <Input type="number" defaultValue="60" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">OpenAI API Key (System Default)</label>
                    <Input type="password" placeholder="sk-..." />
                    <p className="text-xs text-gray-500">
                      This key is used when users don't provide their own API key.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Admin;

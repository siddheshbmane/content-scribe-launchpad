
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { usePlan } from "@/contexts/PlanContext";
import { Plus, Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal, Sparkles, Eye, Edit, Trash2, Copy } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "draft" | "scheduled" | "published";
}

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "5 Trends Reshaping the Tech Industry",
      content: "Content here...",
      date: "2025-04-12",
      status: "scheduled",
    },
    {
      id: "2",
      title: "My Journey to Becoming a Tech Leader",
      content: "Content here...",
      date: "2025-04-15",
      status: "draft",
    },
    {
      id: "3",
      title: "How to Build a Personal Brand on LinkedIn",
      content: "Content here...",
      date: "2025-04-20",
      status: "scheduled",
    },
    {
      id: "4",
      title: "The Future of Remote Work",
      content: "Content here...",
      date: "2025-04-05",
      status: "published",
    },
  ]);

  const { canAccessCalendar } = usePlan();
  const { toast } = useToast();

  if (!canAccessCalendar) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <CalendarIcon className="h-16 w-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Calendar Access Required</h2>
          <p className="text-gray-600 mb-6 text-center max-w-md">
            You need to upgrade to Pro or Pro Plus plan to access the content calendar.
          </p>
          <Button>Upgrade Now</Button>
        </div>
      </DashboardLayout>
    );
  }

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Calendar</h1>
          <p className="text-muted-foreground">
            Plan and schedule your LinkedIn content
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentMonth(new Date())}>
            Today
          </Button>
          <Button variant="outline" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>
    );
  };

  const renderMonthLabel = () => {
    return (
      <div className="text-xl font-semibold mb-6">
        {format(currentMonth, "MMMM yyyy")}
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-0">
        {daysOfWeek.map((day, i) => (
          <div
            key={i}
            className={cn(
              "py-2 text-center text-sm font-medium",
              (i === 0 || i === 6) && "text-gray-500"
            )}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Fill with empty cells to start on the correct day of the week
    const startDay = monthStart.getDay();
    const placeholder = Array(startDay).fill(null);
    
    const totalCells = [...placeholder, ...days];
    
    // Calculate rows needed
    const rows = Math.ceil(totalCells.length / 7);
    const totalCellCount = rows * 7;
    
    // Add trailing empty cells if needed
    while (totalCells.length < totalCellCount) {
      totalCells.push(null);
    }
    
    return (
      <div className="grid grid-cols-7 gap-0 border rounded-lg overflow-hidden bg-white">
        {totalCells.map((day, i) => {
          const formattedDate = day ? format(day, "yyyy-MM-dd") : "";
          const dayPosts = posts.filter(post => post.date === formattedDate);
          
          return (
            <div
              key={i}
              className={cn(
                "min-h-[120px] p-2 border-b border-r relative",
                day && !isSameMonth(day, currentMonth) && "bg-gray-50 text-gray-400",
                day && isToday(day) && "bg-blue-50"
              )}
              onClick={() => day && setSelectedDay(day)}
            >
              {day && (
                <>
                  <div className="flex justify-between">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm",
                        isToday(day) && "bg-linkedin-primary text-white"
                      )}
                    >
                      {format(day, "d")}
                    </span>
                    
                    {dayPosts.length > 0 && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-500">
                        <Plus className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {dayPosts.map(post => (
                      <div 
                        key={post.id}
                        className={cn(
                          "text-xs p-1 rounded truncate cursor-pointer hover:bg-gray-100 flex justify-between items-center",
                          post.status === "published" && "bg-green-50 border-l-2 border-green-500",
                          post.status === "scheduled" && "bg-blue-50 border-l-2 border-blue-500",
                          post.status === "draft" && "bg-gray-50 border-l-2 border-gray-500"
                        )}
                      >
                        <span className="truncate flex-1">{post.title}</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-4 w-4 opacity-50 hover:opacity-100">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="flex items-center">
                              <Eye className="h-4 w-4 mr-2" /> Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Copy className="h-4 w-4 mr-2" /> Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                    
                    {dayPosts.length === 0 && (
                      <div className="h-full min-h-[40px] flex items-center justify-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs text-gray-400 hover:text-gray-600"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderEvents = () => {
    if (!selectedDay) return null;
    
    const formattedDate = format(selectedDay, "yyyy-MM-dd");
    const dayPosts = posts.filter(post => post.date === formattedDate);
    
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              Posts for {format(selectedDay, "MMMM d, yyyy")}
            </h3>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Post
            </Button>
          </div>
          
          {dayPosts.length === 0 ? (
            <div className="text-center py-10">
              <CalendarIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No posts scheduled for this day</p>
              <Button variant="outline" className="mt-4">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Content
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {dayPosts.map(post => (
                <div 
                  key={post.id}
                  className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span 
                          className={cn(
                            "px-2 py-0.5 text-xs rounded-full",
                            post.status === "published" && "bg-green-100 text-green-800",
                            post.status === "scheduled" && "bg-blue-100 text-blue-800",
                            post.status === "draft" && "bg-gray-100 text-gray-800"
                          )}
                        >
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </div>
                      <h4 className="font-medium">{post.title}</h4>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {renderHeader()}
        {renderMonthLabel()}
        {renderDaysOfWeek()}
        {renderCells()}
        {renderEvents()}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;

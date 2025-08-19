import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Clock, AlertTriangle, CheckCircle2, Users, CalendarDays, Calendar as CalendarIcon, Download, RefreshCw, TrendingUp, Activity } from "lucide-react";
import Footer from "@/components/footer";
import { AnalyticsFilters } from '@/components/analytics-filters';

// Mock data
const pendingRequests = [
  { id: "REQ-1024", employee: "Aarav Shah", type: "Casual Leave", days: 2, submitted: "2025-08-16", priority: "High" },
  { id: "REQ-1025", employee: "Neha Verma", type: "Sick Leave", days: 1, submitted: "2025-08-17", priority: "Medium" },
  { id: "REQ-1026", employee: "Rahul Kumar", type: "Work From Home", days: 1, submitted: "2025-08-18", priority: "Low" },
];

const onLeaveToday = [
  { name: "Priya Singh", team: "Design", type: "CL" },
  { name: "Vikram Patel", team: "Backend", type: "SL" },
];

const approvalTrend = [
  { month: "Jan", rate: 78 },
  { month: "Feb", rate: 82 },
  { month: "Mar", rate: 80 },
  { month: "Apr", rate: 86 },
  { month: "May", rate: 88 },
  { month: "Jun", rate: 90 },
  { month: "Jul", rate: 89 },
  { month: "Aug", rate: 92 },
];

// Charts: Requests over time (line)
const requestsOverTime = [
  { week: "W1", pending: 8, approved: 22, rejected: 3 },
  { week: "W2", pending: 6, approved: 25, rejected: 2 },
  { week: "W3", pending: 10, approved: 19, rejected: 4 },
  { week: "W4", pending: 5, approved: 27, rejected: 1 },
];

// Charts: Leave type distribution (pie)
const leaveTypeDist = [
  { name: "Casual", value: 35, color: "hsl(var(--primary))" },
  { name: "Sick", value: 22, color: "#F97316" },
  { name: "Earned", value: 18, color: "#10B981" },
  { name: "WFH", value: 25, color: "#6366F1" },
];

// Charts: Team availability (area)
const teamAvailability = [
  { day: "Mon", available: 92, productivity: 88 },
  { day: "Tue", available: 90, productivity: 92 },
  { day: "Wed", available: 88, productivity: 85 },
  { day: "Thu", available: 91, productivity: 89 },
  { day: "Fri", available: 87, productivity: 83 },
  { day: "Sat", available: 85, productivity: 80 },
];

// Enhanced Analytics Data
const departmentMetrics = [
  { department: "Engineering", employees: 45, avgLeave: 8.2, satisfaction: 4.3, productivity: 92 },
  { department: "Design", employees: 12, avgLeave: 6.8, satisfaction: 4.5, productivity: 88 },
  { department: "Marketing", employees: 18, avgLeave: 7.5, satisfaction: 4.1, productivity: 85 },
  { department: "HR", employees: 8, avgLeave: 5.2, satisfaction: 4.4, productivity: 90 },
  { department: "Sales", employees: 22, avgLeave: 9.1, satisfaction: 3.9, productivity: 87 },
];

const monthlyTrends = [
  { month: "Jan", requests: 45, approvals: 38, rejections: 7, avgProcessTime: 2.1 },
  { month: "Feb", requests: 52, approvals: 44, rejections: 8, avgProcessTime: 1.8 },
  { month: "Mar", requests: 48, approvals: 41, rejections: 7, avgProcessTime: 2.3 },
  { month: "Apr", requests: 61, approvals: 55, rejections: 6, avgProcessTime: 1.9 },
  { month: "May", requests: 58, approvals: 52, rejections: 6, avgProcessTime: 2.0 },
  { month: "Jun", requests: 67, approvals: 62, rejections: 5, avgProcessTime: 1.7 },
  { month: "Jul", requests: 72, approvals: 66, rejections: 6, avgProcessTime: 1.6 },
  { month: "Aug", requests: 69, approvals: 64, rejections: 5, avgProcessTime: 1.5 },
];

const leavePatterns = [
  { pattern: "Monday Blues", frequency: 28, impact: "High" },
  { pattern: "Friday Extensions", frequency: 35, impact: "Medium" },
  { pattern: "Post-Holiday", frequency: 15, impact: "Low" },
  { pattern: "Seasonal Peaks", frequency: 42, impact: "High" },
];

const employeeEngagement = [
  { metric: "Response Time", current: 1.2, target: 1.5, trend: "improving" },
  { metric: "Satisfaction Score", current: 4.2, target: 4.0, trend: "stable" },
  { metric: "Policy Compliance", current: 94, target: 95, trend: "improving" },
  { metric: "Self-Service Usage", current: 78, target: 80, trend: "declining" },
];

const violations = [
  { id: "PV-210", employee: "Jaya Rao", policy: "Unplanned Leave > 3", date: "2025-08-12", severity: "Medium" },
  { id: "PV-212", employee: "Karan Gill", policy: "Overlapping Leaves", date: "2025-08-15", severity: "High" },
];

const priorityQueue = [
  { id: "REQ-1027", employee: "Ananya Gupta", reason: "Medical", ageHrs: 5, priority: "Critical" },
  { id: "REQ-1024", employee: "Aarav Shah", reason: "Travel", ageHrs: 22, priority: "High" },
  { id: "REQ-1025", employee: "Neha Verma", reason: "Fever", ageHrs: 15, priority: "Medium" },
];

const upcomingLeaves = [
  { name: "Rohan Mehta", date: "2025-08-20", team: "Frontend" },
  { name: "Sneha Iyer", date: "2025-08-21", team: "HR" },
  { name: "Pooja Das", date: "2025-08-23", team: "Data" },
];

const allHolidays = [
  { name: "Independence Day", date: "2025-08-15", type: "National Holiday" },
  { name: "Ganesh Chaturthi", date: "2025-08-29", type: "Festival" },
  { name: "Labor Day", date: "2025-09-01", type: "Public Holiday" },
  { name: "Gandhi Jayanti", date: "2025-10-02", type: "National Holiday" },
  { name: "Diwali", date: "2025-10-31", type: "Festival" },
  { name: "Christmas", date: "2025-12-25", type: "National Holiday" },
  { name: "New Year's Day", date: "2026-01-01", type: "National Holiday" },
  { name: "Republic Day", date: "2026-01-26", type: "National Holiday" },
  { name: "Holi", date: "2026-03-13", type: "Festival" },
  { name: "Good Friday", date: "2026-04-03", type: "National Holiday" },
];

const severityColor = (sev: string) =>
  sev === "High" ? "destructive" : sev === "Medium" ? "secondary" : "default";

const priorityBadge = (p: string) =>
  p === "Critical" ? "destructive" : p === "High" ? "default" : "secondary";

const Dashboard: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState(new Date());
  const [filters, setFilters] = React.useState({
    startDate: '',
    endDate: '',
    department: 'All',
    leaveType: 'All',
    priority: 'All',
    status: 'All',
    showTrends: true,
    showViolations: true,
    showEngagement: true,
  });

  const [filteredData, setFilteredData] = React.useState({
    monthlyTrends,
    departmentMetrics,
    leavePatterns,
    teamAvailability,
    leaveTypeDist,
  });

  const applyFilters = () => {
    // A real app would likely refetch data or use a more robust client-side filtering library.
    // This is a simplified example for demonstration purposes.
    const newDepartmentMetrics = filters.department === 'All' 
      ? departmentMetrics 
      : departmentMetrics.filter(d => d.department === filters.department);

    const newLeaveTypeDist = filters.leaveType === 'All'
      ? leaveTypeDist
      : leaveTypeDist.filter(l => l.name === filters.leaveType);

    // Date filtering is not implemented for this mock data.
    console.log('Applying filters:', filters);

    setFilteredData({
      monthlyTrends,
      teamAvailability,
      leavePatterns,
      departmentMetrics: newDepartmentMetrics,
      leaveTypeDist: newLeaveTypeDist,
    });
  };

  const resetFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      department: 'All',
      leaveType: 'All',
      priority: 'All',
      status: 'All',
      showTrends: true,
      showViolations: true,
      showEngagement: true,
    });
    setFilteredData({
      monthlyTrends,
      departmentMetrics,
      leavePatterns,
      teamAvailability,
      leaveTypeDist,
    });
  };

  const userFirstName = localStorage.getItem('userFirstName') || 'User';
  const userRole = localStorage.getItem('userRole') || 'User';
  const capitalizedRole = userRole.charAt(0).toUpperCase() + userRole.slice(1);

  // Real-time data refresh
  const refreshAnalytics = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  // Auto-refresh every 5 minutes
  React.useEffect(() => {
    const interval = setInterval(() => {
      refreshAnalytics();
    }, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, []);

  // Export analytics data
  const exportAnalytics = () => {
    const analyticsData = {
      timestamp: new Date().toISOString(),
      departmentMetrics,
      monthlyTrends,
      leavePatterns,
      employeeEngagement,
      teamAvailability,
      leaveTypeDist
    };
    
    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Generate months for calendar view (2 previous + current + 3 next = 6 months)
  const generateMonths = () => {
    const months = [];
    const currentDate = new Date();
    
    for (let i = -2; i <= 3; i++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 1);
      months.push({
        date: monthDate,
        name: monthDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        isCurrentMonth: i === 0
      });
    }
    return months;
  };

  const months = generateMonths();

  // Filter holidays to show only upcoming ones from current date
  const getUpcomingHolidays = () => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of day
    
    return allHolidays
      .filter(holiday => new Date(holiday.date) >= currentDate)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 6); // Show next 6 upcoming holidays
  };

  const upcomingHolidays = getUpcomingHolidays();

  // Calculate average weekly team availability
  const calculateAverageAvailability = () => {
    const total = teamAvailability.reduce((sum, day) => sum + day.available, 0);
    return Math.round(total / teamAvailability.length);
  };

  const averageAvailability = calculateAverageAvailability();

  // Function to check if a date is a holiday
  const isHoliday = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return allHolidays.some(holiday => holiday.date === dateString);
  };

  // Function to check if a date is a Sunday
  const isSunday = (date: Date) => {
    return date.getDay() === 0;
  };

  // Function to get holiday info for a date
  const getHolidayInfo = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    return allHolidays.find(holiday => holiday.date === dateString);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-form-background to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_hsl(var(--primary))_1px,_transparent_0)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold gradient-text">{capitalizedRole} {userFirstName}'s Dashboard</h1>
        </div>

        {/* Main Content with Tabs */}
        <Card>
          <CardContent className="p-4">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="requests">Requests</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                      <Clock className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{pendingRequests.length}</div>
                      <p className="text-xs text-muted-foreground">+2 from last week</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
                      <Users className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{onLeaveToday.length}</div>
                      <p className="text-xs text-muted-foreground">-1 since yesterday</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                      <CheckCircle2 className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">92%</div>
                      <p className="text-xs text-muted-foreground">+1.2% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Policy Violations</CardTitle>
                      <AlertTriangle className="h-4 w-4 text-violet-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{violations.length}</div>
                      <p className="text-xs text-muted-foreground">No change</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <div>
                        <CardTitle>Team Availability</CardTitle>
                        <CardDescription>Weekly team availability percentage.</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: '#8B5CF6' }}>{averageAvailability}%</div>
                        <div className="text-xs text-muted-foreground">Weekly Average</div>
                      </div>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <ChartContainer config={{ available: { label: "Available", color: "#8B5CF6" } }} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={teamAvailability} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                            <defs>
                              <linearGradient id="avail" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.35}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                            <YAxis domain={[80, 100]} unit="%" tick={{ fontSize: 12 }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="available" stroke="#8B5CF6" fillOpacity={1} fill="url(#avail)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Priority Queue</CardTitle>
                      <CardDescription>Urgent requests needing attention.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {priorityQueue.map((q) => (
                          <div key={q.id} className="flex items-start justify-between">
                            <div>
                              <div className="font-medium">{q.employee}</div>
                              <div className="text-sm text-muted-foreground">{q.reason} • waiting {q.ageHrs}h</div>
                            </div>
                            <Badge variant={priorityBadge(q.priority) as any}>{q.priority}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsFilters 
                  filters={filters} 
                  setFilters={setFilters} 
                  onApply={applyFilters}
                  onReset={resetFilters}
                  onExport={exportAnalytics}
                  onRefresh={refreshAnalytics}
                  isRefreshing={isRefreshing}
                />
                {/* Analytics Header with Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={refreshAnalytics}
                      disabled={isRefreshing}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      {isRefreshing ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={exportAnalytics}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                  </div>
                </div>

                {/* Analytics Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">
                        {monthlyTrends.reduce((sum, month) => sum + month.requests, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">This year</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round((monthlyTrends.reduce((sum, month) => sum + month.approvals, 0) / 
                          monthlyTrends.reduce((sum, month) => sum + month.requests, 0)) * 100)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Overall success rate</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg Process Time</CardTitle>
                      <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-600">
                        {(monthlyTrends.reduce((sum, month) => sum + month.avgProcessTime, 0) / monthlyTrends.length).toFixed(1)} days
                      </div>
                      <p className="text-xs text-muted-foreground">Monthly average</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
                      <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">
                        {departmentMetrics.reduce((sum, dept) => sum + dept.employees, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">Across all departments</p>
                    </CardContent>
                  </Card>
                </div>
                {/* Real-time Status Indicator */}
                <Card className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5 text-green-500" />
                          <span className="font-medium">Real-time Analytics</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">Live</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">System Status</div>
                        <div className="text-xs text-green-600">All systems operational</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>


                {/* Enhanced Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Request Analytics</CardTitle>
                      <CardDescription>Comprehensive monthly trends with processing metrics.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer config={{ 
                        requests: { label: "Total Requests", color: "#8B5CF6" }, 
                        approvals: { label: "Approvals", color: "#22C55E" }, 
                        rejections: { label: "Rejections", color: "#EF4444" },
                        avgProcessTime: { label: "Avg Process Time (days)", color: "#F59E0B" }
                      }} className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={filteredData.monthlyTrends} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="requests" fill="#8B5CF6" radius={[2,2,0,0]} />
                            <Bar yAxisId="left" dataKey="approvals" fill="#22C55E" radius={[2,2,0,0]} />
                            <Bar yAxisId="left" dataKey="rejections" fill="#EF4444" radius={[2,2,0,0]} />
                            <Line yAxisId="right" type="monotone" dataKey="avgProcessTime" stroke="#F59E0B" strokeWidth={3} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>


                  <Card>
                    <CardHeader>
                      <CardTitle>Leave Type Distribution</CardTitle>
                      <CardDescription>Breakdown of leave types across all requests.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer config={{}} className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Pie data={filteredData.leaveTypeDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                              {filteredData.leaveTypeDist.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Department Satisfaction</CardTitle>
                      <CardDescription>Employee satisfaction scores by department.</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ChartContainer config={{ 
                        satisfaction: { label: "Satisfaction Score", color: "#3B82F6" }
                      }} className="h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={filteredData.departmentMetrics} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="department" />
                            <YAxis domain={[3.5, 5]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="satisfaction" fill="#3B82F6" radius={[2,2,0,0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                  <Card>
                    <CardHeader>
                      <CardTitle>Leave Patterns</CardTitle>
                      <CardDescription>Identified leave request patterns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {leavePatterns.map((pattern) => (
                          <div key={pattern.pattern} className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-sm">{pattern.pattern}</div>
                              <div className="text-xs text-muted-foreground">{pattern.frequency}% frequency</div>
                            </div>
                            <Badge variant={pattern.impact === "High" ? "destructive" : pattern.impact === "Medium" ? "default" : "secondary"}>
                              {pattern.impact}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Data Insights Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold">Data Insights & Recommendations</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Insights</CardTitle>
                        <CardDescription>Actionable insights from your data.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-l-blue-500">
                            <div className="flex items-start gap-3">
                              <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                              <div>
                                <div className="font-medium text-blue-900">Processing Time Improvement</div>
                                <div className="text-sm text-blue-700 mt-1">
                                  Average processing time decreased by 0.3 days this month. Consider standardizing approval workflows.
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                              <div>
                                <div className="font-medium text-green-900">High Approval Rate</div>
                                <div className="text-sm text-green-700 mt-1">
                                  92% approval rate indicates good policy alignment. Review rejected requests for improvement opportunities.
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-l-orange-500">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                              <div>
                                <div className="font-medium text-orange-900">Department Performance</div>
                                <div className="text-sm text-orange-700 mt-1">
                                  Sales department shows lower satisfaction (3.9/5). Consider targeted engagement initiatives.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recommendations</CardTitle>
                        <CardDescription>Suggested actions based on analytics.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            <div>
                              <div className="font-medium text-sm">Optimize Approval Workflow</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Implement automated routing for common leave types to reduce processing time.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <div>
                              <div className="font-medium text-sm">Enhance Self-Service</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Current usage at 78%. Consider UI improvements and training to reach 80% target.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                            <div>
                              <div className="font-medium text-sm">Address Policy Violations</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                2 active violations need immediate attention. Review policies for clarity.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <div className="font-medium text-sm">Seasonal Planning</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                High leave frequency on Mondays (28%) suggests need for better weekend planning.
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Requests Tab */}
              <TabsContent value="requests" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                    <CardDescription>All leave requests awaiting action.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Employee</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Days</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Priority</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingRequests.map((r) => (
                          <TableRow key={r.id}>
                            <TableCell className="font-medium">{r.id}</TableCell>
                            <TableCell>{r.employee}</TableCell>
                            <TableCell>{r.type}</TableCell>
                            <TableCell>{r.days}</TableCell>
                            <TableCell>{r.submitted}</TableCell>
                            <TableCell>
                              <Badge variant={priorityBadge(r.priority) as any}>{r.priority}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Policy Violations</CardTitle>
                    <CardDescription>Recent leave requests that violate company policy.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Employee</TableHead>
                          <TableHead>Policy</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Severity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {violations.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell className="font-medium">{v.id}</TableCell>
                            <TableCell>{v.employee}</TableCell>
                            <TableCell>{v.policy}</TableCell>
                            <TableCell>{v.date}</TableCell>
                            <TableCell>
                              <Badge variant={severityColor(v.severity) as any}>{v.severity}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Calendar Tab */}
              <TabsContent value="calendar" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader className="text-center">
                      <CardTitle>Calendar Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[calc(100%-80px)]">
                      <div className="grid grid-cols-3 gap-2 h-full">
                        {months.map((month, index) => (
                          <div key={month.name} className="space-y-1 flex flex-col">
                            <div className="flex-1 relative">
                              <Calendar 
                                mode="single" 
                                selected={month.isCurrentMonth ? date : undefined}
                                onSelect={month.isCurrentMonth ? setDate : undefined}
                                month={month.date}
                                className="w-full border rounded-md p-1 h-full"
                                modifiers={{
                                  holiday: (date) => isHoliday(date),
                                  sunday: (date) => isSunday(date)
                                }}
                                modifiersClassNames={{
                                  holiday: "bg-red-100 text-red-700 font-semibold hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300",
                                  sunday: "bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                                }}
                                classNames={{
                                  months: "flex flex-col h-full",
                                  month: "space-y-2 h-full flex flex-col",
                                  caption: "flex justify-center pt-1 relative items-center mb-2",
                                  caption_label: "text-sm font-medium",
                                  nav: "hidden",
                                  table: "w-full border-collapse flex-1",
                                  head_row: "flex mb-2 justify-center",
                                  head_cell: "text-muted-foreground rounded-md w-7 font-normal text-xs flex items-center justify-center text-center",
                                  row: "flex w-full mb-1 justify-center",
                                  cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex items-center justify-center",
                                  day: "h-7 w-7 p-0 font-normal aria-selected:opacity-100 text-sm flex items-center justify-center hover:bg-accent/50 transition-colors rounded-md",
                                  day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                                  day_today: "bg-accent text-accent-foreground font-semibold",
                                  day_outside: "text-muted-foreground opacity-40",
                                  day_disabled: "text-muted-foreground opacity-40",
                                  day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                                  day_hidden: "invisible",
                                }}
                              />
                              {month.isCurrentMonth && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                  <Badge variant="default" className="text-sm px-3 py-1 font-medium">Current</Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>On Leave Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {onLeaveToday.map((e) => (
                          <div key={e.name} className="flex items-center gap-3 text-sm">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{e.name.split(" ").map((n)=>n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{e.name}</div>
                              <div className="text-muted-foreground">{e.team} • <Badge variant="outline" className="px-1.5 py-0">{e.type}</Badge></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Leaves</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingLeaves.map((u) => (
                          <div key={u.name+u.date} className="flex items-center justify-between text-sm">
                            <span>{u.name} • {u.team}</span>
                            <Badge variant="outline">{u.date}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Holidays</CardTitle>
                      <CardDescription>Company holidays and observances</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingHolidays.map((holiday) => (
                          <div key={holiday.name} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <CalendarIcon size={14} className="text-primary" />
                              <div>
                                <div className="font-medium">{holiday.name}</div>
                                <div className="text-muted-foreground text-xs">{holiday.type}</div>
                              </div>
                            </div>
                            <Badge variant="secondary">{holiday.date}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;

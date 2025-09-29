import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  FileText,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Globe,
  Edit3,
  BarChart3,
  Hash,
  Zap,
  Settings
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export default function UserBlogAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  const blogStats = [
    {
      title: 'Active Automation',
      value: '847',
      change: '+8.7%',
      icon: Zap,
      color: 'bg-blue-500'
    },
    {
      title: 'Daily Blog Posts',
      value: '47',
      change: '+12.3%',
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      title: 'Keywords Tracked',
      value: '2,450',
      change: '+18.2%',
      icon: Hash,
      color: 'bg-purple-500'
    },
    {
      title: 'Avg Posts/User',
      value: '3.2',
      change: '+5.1%',
      icon: BarChart3,
      color: 'bg-orange-500'
    }
  ];

  const userBlogData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/avatars/john-doe.png',
      automationEnabled: true,
      dailyBlogs: 3,
      monthlyBlogs: 47,
      keywordsTracked: 25,
      lastPostDate: '2024-12-06',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      avatar: '/avatars/sarah-smith.png',
      automationEnabled: false,
      dailyBlogs: 0,
      monthlyBlogs: 12,
      keywordsTracked: 8,
      lastPostDate: '2024-12-05',
      status: 'Inactive'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      avatar: '/avatars/mike-wilson.png',
      automationEnabled: true,
      dailyBlogs: 5,
      monthlyBlogs: 89,
      keywordsTracked: 45,
      lastPostDate: '2024-12-06',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      avatar: '/avatars/emily-chen.png',
      automationEnabled: true,
      dailyBlogs: 2,
      monthlyBlogs: 34,
      keywordsTracked: 18,
      lastPostDate: '2024-12-06',
      status: 'Active'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.rodriguez@example.com',
      avatar: '/avatars/david-rodriguez.png',
      automationEnabled: false,
      dailyBlogs: 0,
      monthlyBlogs: 0,
      keywordsTracked: 0,
      lastPostDate: 'Never',
      status: 'Inactive'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Published</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'Scheduled':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Scheduled</Badge>;
      case 'Pending Review':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getIndexingBadge = (status: string) => {
    switch (status) {
      case 'Submitted and indexed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Indexed</Badge>;
      case 'URL is unknown to Google':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Unknown to Google</Badge>;
      case 'Crawled - currently not indexed':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Crawled</Badge>;
      case 'Not indexed':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Not Indexed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredUsers = userBlogData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const toggleAutomation = (userId: number, currentStatus: boolean) => {
    console.log(`Toggling automation for user ${userId} to ${!currentStatus}`);
    // In a real app, this would make an API call
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="admin-title text-foreground">User Blog Administration</h1>
        <p className="admin-subtitle text-muted-foreground">
          Manage user blogging automation, daily limits, and keyword tracking
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogStats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value text-foreground">{stat.value}</div>
              <p className={`text-xs mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="user-automation" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="user-automation">User Automation</TabsTrigger>
          <TabsTrigger value="active-users">Active Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="user-automation" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-card border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="admin-label text-foreground">Search Users</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-2 w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Blog Automation Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">User Blog Automation</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredUsers.length} users found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Daily Blogs</TableHead>
                    <TableHead>Monthly Stats</TableHead>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Last Post</TableHead>
                    <TableHead>Automation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="admin-body-text text-foreground font-medium">{user.name}</div>
                            <div className="admin-stats-label text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="admin-body-text text-foreground font-medium">{user.dailyBlogs}</span>
                          <span className="admin-stats-label text-muted-foreground text-xs">/day</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-body-text text-foreground">{user.monthlyBlogs} articles</div>
                          <div className="admin-stats-label text-muted-foreground text-xs">this month</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="admin-body-text text-foreground">{user.keywordsTracked}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{user.lastPostDate}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={user.automationEnabled} 
                            onCheckedChange={() => toggleAutomation(user.id, user.automationEnabled)}
                          />
                          <span className="admin-stats-label text-muted-foreground text-xs">
                            {user.automationEnabled ? 'On' : 'Off'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-users">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Active Automation Users</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Users with active blog automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userBlogData.filter(u => u.automationEnabled).map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-card-hover border border-card-border/30">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{user.name}</div>
                        <div className="admin-stats-label text-muted-foreground text-sm">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="admin-stats-value text-foreground text-sm">{user.dailyBlogs}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">Daily</div>
                      </div>
                      <div className="text-center">
                        <div className="admin-stats-value text-foreground text-sm">{user.keywordsTracked}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">Keywords</div>
                      </div>
                      <div className="text-center">
                        <div className="admin-stats-value text-foreground text-sm">{user.monthlyBlogs}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">Monthly</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Content Performance</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Top performing articles this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userBlogData.sort((a, b) => b.monthlyBlogs - a.monthlyBlogs).slice(0, 5).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="admin-body-text text-foreground font-medium">{user.name}</div>
                          <div className="admin-stats-label text-muted-foreground text-xs">{user.email}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="admin-stats-value text-foreground text-sm">{user.monthlyBlogs}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">articles/month</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Automation Overview</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  User automation and blogging activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Users with automation enabled</span>
                    <span className="admin-stats-value text-green-600 text-sm">{userBlogData.filter(u => u.automationEnabled).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Average daily posts</span>
                    <span className="admin-stats-value text-blue-600 text-sm">{(userBlogData.reduce((acc, u) => acc + u.dailyBlogs, 0) / userBlogData.length).toFixed(1)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Total keywords tracked</span>
                    <span className="admin-stats-value text-purple-600 text-sm">{userBlogData.reduce((acc, u) => acc + u.keywordsTracked, 0)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
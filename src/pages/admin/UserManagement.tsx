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
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Calendar,
  Crown,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const userStats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.3%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '2,234',
      change: '+8.7%',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Premium Users',
      value: '1,234',
      change: '+15.2%',
      icon: Crown,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Approval',
      value: '23',
      change: '-2.1%',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Premium',
      status: 'Active',
      joinDate: '2024-01-15',
      lastActive: '2 hours ago',
      articlesCount: 47,
      avatar: '/avatars/john-doe.png'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      role: 'Free',
      status: 'Active',
      joinDate: '2024-02-20',
      lastActive: '5 minutes ago',
      articlesCount: 12,
      avatar: '/avatars/sarah-smith.png'
    },
    {
      id: 3,
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      role: 'Premium',
      status: 'Suspended',
      joinDate: '2024-03-10',
      lastActive: '3 days ago',
      articlesCount: 89,
      avatar: '/avatars/mike-wilson.png'
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@example.com',
      role: 'Admin',
      status: 'Active',
      joinDate: '2023-12-05',
      lastActive: '1 hour ago',
      articlesCount: 156,
      avatar: '/avatars/emily-chen.png'
    },
    {
      id: 5,
      name: 'David Rodriguez',
      email: 'david.rodriguez@example.com',
      role: 'Free',
      status: 'Pending',
      joinDate: '2024-12-01',
      lastActive: 'Never',
      articlesCount: 0,
      avatar: '/avatars/david-rodriguez.png'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspended</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Admin</Badge>;
      case 'Premium':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Premium</Badge>;
      case 'Free':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Free</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role.toLowerCase() === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="admin-title text-foreground">User Management</h1>
        <p className="admin-subtitle text-muted-foreground">
          Manage user accounts, permissions, and subscriptions
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat, index) => (
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

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="users">All Users</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="suspended">Suspended</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
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
                  <Label className="admin-label text-foreground">Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="mt-2 w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="admin-button">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Users</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredUsers.length} users found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Articles</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
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
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(user.status)}
                      </TableCell>
                      <TableCell>
                        <span className="admin-body-text text-foreground">{user.articlesCount}</span>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{user.joinDate}</span>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{user.lastActive}</span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Pending Users</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Users awaiting approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">No pending users at the moment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suspended">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Suspended Users</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Users with suspended accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">No suspended users</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Zap, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Activity,
  Settings 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BackgroundDataForm } from '@/components/forms/BackgroundDataForm';

export default function Dashboard() {
  const { user, hasPermission } = useAuth();

  const stats = [
    {
      name: 'Total Users',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
      visible: hasPermission(['operator', 'super_admin']),
    },
    {
      name: 'Articles Generated',
      value: '45,678',
      change: '+8%',
      changeType: 'positive' as const,
      icon: FileText,
      visible: true,
    },
    {
      name: 'Tokens Used',
      value: '2.3M',
      change: '+15%',
      changeType: 'positive' as const,
      icon: Zap,
      visible: true,
    },
    {
      name: 'Success Rate',
      value: '98.5%',
      change: '+0.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      visible: true,
    },
  ];

  const recentTasks = [
    {
      id: '1',
      type: 'Article Generation',
      product: 'AI Writing Tool Review',
      status: 'completed',
      time: '2 min ago',
      articles: 15,
    },
    {
      id: '2',
      type: 'Prompt Debug',
      product: 'SEO Optimization',
      status: 'in_progress',
      time: '5 min ago',
      articles: 1,
    },
    {
      id: '3',
      type: 'Blog Push',
      product: 'Tech Industry News',
      status: 'failed',
      time: '10 min ago',
      articles: 8,
    },
    {
      id: '4',
      type: 'Article Generation',
      product: 'Marketing Software',
      status: 'completed',
      time: '15 min ago',
      articles: 23,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="outline" className="text-success border-success">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="text-warning border-warning">In Progress</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your AI content generation platform
        </p>
      </div>

      {/* Navigation Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="background-data">Background Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.filter(stat => stat.visible).map((stat) => (
              <Card key={stat.name} className="border-card-border hover:shadow-md transition-all duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className={`${stat.changeType === 'positive' ? 'text-success' : 'text-destructive'} mr-1`}>
                      {stat.change}
                    </span>
                    from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2 border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest tasks and operations in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-background-alt rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(task.status)}
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {task.type}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {task.product} • {task.articles} articles
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(task.status)}
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {hasPermission(['operator', 'super_admin']) && (
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Articles
                  </Button>
                )}
                {hasPermission(['prompt_manager', 'super_admin']) && (
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Debug Prompts
                  </Button>
                )}
                {hasPermission(['operator', 'super_admin']) && (
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Manage Users
                  </Button>
                )}
                {hasPermission('super_admin') && (
                  <Button className="w-full justify-start" variant="outline">
                    <Zap className="w-4 h-4 mr-2" />
                    System Settings
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* System Health */}
          <Card className="border-card-border">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                System Health
              </CardTitle>
              <CardDescription>
                Current system status and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-background-alt rounded-lg border border-border">
                  <div className="text-2xl font-bold text-success">99.9%</div>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center p-4 bg-background-alt rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary">120ms</div>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center p-4 bg-background-alt rounded-lg border border-border">
                  <div className="text-2xl font-bold text-accent">15</div>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                </div>
                <div className="text-center p-4 bg-background-alt rounded-lg border border-border">
                  <div className="text-2xl font-bold text-warning">2.1GB</div>
                  <p className="text-sm text-muted-foreground">Memory Usage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="background-data" className="space-y-6">
          <BackgroundDataForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
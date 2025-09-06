import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Coins,
  TrendingUp,
  FileText,
  Bot,
  Crown,
  Calendar
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Token Balance',
      value: user?.tokenBalance?.toLocaleString() || '0',
      icon: Coins,
      description: 'Available tokens',
      trend: '+2.1%',
      color: 'text-primary'
    },
    {
      title: 'Articles Generated',
      value: '47',
      icon: FileText,
      description: 'This month',
      trend: '+12.3%',
      color: 'text-green-600'
    },
    {
      title: 'Automation Active',
      value: '3',
      icon: Bot,
      description: 'Running campaigns',
      trend: '+5.2%',
      color: 'text-purple-600'
    },
    {
      title: 'Keywords Tracked',
      value: '156',
      icon: TrendingUp,
      description: 'Total keywords',
      trend: '+8.1%',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Welcome Section */}
      <div className="max-w-4xl">
        <h1 className="admin-title text-foreground">Welcome back, {user?.name}</h1>
        <p className="admin-subtitle mt-2 text-muted-foreground">
          Here's an overview of your content automation and performance metrics.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-card-border bg-gradient-card shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl">
        <CardHeader className="border-b border-card-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="admin-card-title text-foreground">Premium Plan</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Your current subscription plan
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <p className="admin-label text-foreground">Monthly Token Usage</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="admin-body-text text-foreground">2,340 / 10,000</span>
                  <span className="admin-body-text text-muted-foreground">23%</span>
                </div>
                <Progress value={23} className="h-2 bg-muted" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="admin-label text-foreground">Next Billing</p>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="admin-body-text text-foreground">January 15, 2025</span>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <Button variant="outline" size="sm" className="admin-button border-border hover:bg-accent">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="admin-card-description font-medium text-foreground">
                {stat.title}
              </CardTitle>
              <div className={`w-8 h-8 rounded-lg bg-card-hover flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="admin-stats-value text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="admin-stats-label text-green-600">
                  {stat.trend}
                </span>
                <span className="admin-stats-label text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl">
        <CardHeader className="border-b border-card-border/50">
          <CardTitle className="admin-card-title text-foreground">Recent Activity</CardTitle>
          <CardDescription className="admin-card-description text-muted-foreground">
            Your latest content generation and automation updates
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              {
                type: 'Article Generated',
                title: '10 Best SEO Strategies for 2025',
                time: '2 hours ago',
                status: 'completed'
              },
              {
                type: 'Automation Started',
                title: 'Tech Industry Blog Campaign',
                time: '1 day ago',
                status: 'active'
              },
              {
                type: 'Keywords Updated',
                title: 'Added 23 new target keywords',
                time: '2 days ago',
                status: 'completed'
              },
              {
                type: 'Article Published',
                title: 'Guide to Content Marketing ROI',
                time: '3 days ago',
                status: 'published'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card-hover border border-card-border/30 hover:bg-accent/50 transition-colors duration-200">
                <div>
                  <p className="admin-body-text font-medium text-foreground">{activity.title}</p>
                  <p className="admin-stats-label text-muted-foreground">{activity.type} • {activity.time}</p>
                </div>
                <Badge 
                  variant={activity.status === 'active' ? 'default' : 'outline'}
                  className={activity.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' : 'border-border'}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
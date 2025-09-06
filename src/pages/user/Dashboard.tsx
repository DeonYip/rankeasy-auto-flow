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
      trend: '+2.1%'
    },
    {
      title: 'Articles Generated',
      value: '47',
      icon: FileText,
      description: 'This month',
      trend: '+12.3%'
    },
    {
      title: 'Automation Active',
      value: '3',
      icon: Bot,
      description: 'Running campaigns',
      trend: '+5.2%'
    },
    {
      title: 'Keywords Tracked',
      value: '156',
      icon: TrendingUp,
      description: 'Total keywords',
      trend: '+8.1%'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="admin-title">Welcome back, {user?.name}</h1>
        <p className="admin-subtitle mt-2">
          Here's an overview of your content automation and performance metrics.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-primary" />
              <div>
                <CardTitle className="admin-card-title">Premium Plan</CardTitle>
                <CardDescription className="admin-card-description">
                  Your current subscription plan
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="admin-label mb-2">Monthly Token Usage</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="admin-body-text">2,340 / 10,000</span>
                  <span className="admin-body-text text-muted-foreground">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </div>
            <div>
              <p className="admin-label mb-2">Next Billing</p>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="admin-body-text">January 15, 2025</span>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <Button variant="outline" size="sm" className="admin-button">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">{stat.value}</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="admin-stats-label text-green-600">
                  {stat.trend}
                </span>
                <span className="admin-stats-label">
                  {stat.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="admin-card-title">Recent Activity</CardTitle>
          <CardDescription className="admin-card-description">
            Your latest content generation and automation updates
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div>
                  <p className="admin-body-text font-medium">{activity.title}</p>
                  <p className="admin-stats-label">{activity.type} • {activity.time}</p>
                </div>
                <Badge 
                  variant={activity.status === 'active' ? 'default' : 'secondary'}
                  className={activity.status === 'active' ? 'bg-primary/10 text-primary' : ''}
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
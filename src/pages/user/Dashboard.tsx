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
      title: 'Ranked Keywords',
      value: '156',
      icon: TrendingUp,
      description: 'Total keywords',
      trend: '+8.1%',
      color: 'text-orange-600'
    }
  ];

  const indexingData = [
    {
      label: 'Submitted and indexed',
      percentage: 67,
      count: 287,
      color: 'bg-blue-500'
    },
    {
      label: 'URL is unknown to Google',
      percentage: 28,
      count: 121,
      color: 'bg-cyan-500'
    },
    {
      label: 'Crawled - currently not indexed',
      percentage: 2,
      count: 9,
      color: 'bg-pink-500'
    },
    {
      label: 'Discovered - currently not indexed',
      percentage: 2,
      count: 7,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-8 p-8">
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

      {/* Indexed on Google */}
      <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl">
        <CardHeader className="border-b border-card-border/50">
          <CardTitle className="admin-card-title text-foreground">Indexed on Google</CardTitle>
          <CardDescription className="admin-card-description text-muted-foreground">
            Google indexing status overview
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {indexingData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className={`w-4 h-4 rounded-sm ${item.color}`}></div>
                  <span className="admin-body-text text-foreground">{item.label}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-muted rounded-full h-2 relative">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="admin-stats-label text-muted-foreground min-w-[3rem] text-right">
                    {item.percentage}%
                  </span>
                  <span className="admin-stats-value text-foreground min-w-[3rem] text-right">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Article Generation */}
      <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300 max-w-4xl">
        <CardHeader className="border-b border-card-border/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="admin-card-title text-foreground">Recent Article Generation</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Your latest generated articles and their details
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="admin-stats-value text-foreground">47</div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="admin-stats-label text-green-600">+12.3%</span>
                <span className="admin-stats-label text-muted-foreground">This month</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {[
              {
                id: 'art_2025_001',
                title: '10 Best SEO Strategies for 2025',
                keywords: ['SEO', 'digital marketing', '2025 trends', 'search optimization'],
                createdTime: '2024-12-06 14:30',
                url: 'https://yourblog.com/articles/10-best-seo-strategies-2025',
                status: 'Published'
              },
              {
                id: 'art_2025_002', 
                title: 'Ultimate Guide to Content Marketing ROI',
                keywords: ['content marketing', 'ROI', 'business growth', 'analytics'],
                createdTime: '2024-12-05 09:15',
                url: 'https://yourblog.com/articles/content-marketing-roi-guide',
                status: 'Published'
              },
              {
                id: 'art_2025_003',
                title: 'AI-Powered Marketing Automation Trends',
                keywords: ['AI marketing', 'automation', 'technology trends', 'business efficiency'],
                createdTime: '2024-12-04 16:45',
                url: '',
                status: 'Drafted'
              },
              {
                id: 'art_2025_004',
                title: 'Social Media Strategy for B2B Companies',
                keywords: ['B2B marketing', 'social media', 'LinkedIn strategy', 'lead generation'],
                createdTime: '2024-12-03 11:20',
                url: '',
                status: 'Scheduled'
              }
            ].map((article, index) => (
              <div key={index} className="p-4 rounded-lg bg-card-hover border border-card-border/30 hover:bg-accent/50 transition-colors duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="admin-body-text font-medium text-foreground mb-1">{article.title}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="admin-stats-label text-muted-foreground">ID: </span>
                        <span className="admin-stats-label text-foreground">{article.id}</span>
                      </div>
                      <div>
                        <span className="admin-stats-label text-muted-foreground">创建时间: </span>
                        <span className="admin-stats-label text-foreground">{article.createdTime}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="admin-stats-label text-muted-foreground">Keywords: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {article.keywords.map((keyword, kidx) => (
                          <Badge key={kidx} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {article.url && (
                      <div className="mt-2">
                        <span className="admin-stats-label text-muted-foreground">URL: </span>
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="admin-stats-label text-primary hover:underline"
                        >
                          {article.url}
                        </a>
                      </div>
                    )}
                  </div>
                  <Badge 
                    variant={article.status === 'Published' ? 'default' : 'outline'}
                    className={
                      article.status === 'Published' 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : article.status === 'Scheduled'
                        ? 'bg-blue-100 text-blue-800 border-blue-200'
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }
                  >
                    {article.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
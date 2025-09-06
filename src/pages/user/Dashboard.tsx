import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/ui/stats-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  Coins,
  TrendingUp,
  FileText,
  Bot,
  Crown,
  Calendar,
  PenTool,
  Layers,
  Bookmark,
  Zap
} from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('1M');

  const keywordDistribution = [
    { label: 'Top 3', count: 28, color: 'bg-orange-500' },
    { label: '4-10', count: 145, color: 'bg-blue-500' },
    { label: '11-20', count: 312, color: 'bg-cyan-500' },
    { label: '21-50', count: 485, color: 'bg-teal-500' },
    { label: '51-100', count: 256, color: 'bg-emerald-500' },
    { label: 'SERP Features', count: 44, color: 'bg-green-600' }
  ];

  const countryDistribution = [
    { country: 'Worldwide', keywords: 1270, percentage: 100, flag: '🌍' },
    { country: 'United States', keywords: 487, percentage: 38.3, flag: '🇺🇸' },
    { country: 'United Kingdom', keywords: 203, percentage: 16.0, flag: '🇬🇧' },
    { country: 'Canada', keywords: 178, percentage: 14.0, flag: '🇨🇦' },
    { country: 'Australia', keywords: 152, percentage: 12.0, flag: '🇦🇺' },
    { country: 'Germany', keywords: 139, percentage: 10.9, flag: '🇩🇪' }
  ];

  const chartData = [
    { month: 'Jan', keywords: 850 },
    { month: 'Feb', keywords: 920 },
    { month: 'Mar', keywords: 1050 },
    { month: 'Apr', keywords: 1180 },
    { month: 'May', keywords: 1220 },
    { month: 'Jun', keywords: 1270 }
  ];

  const chartConfig = {
    keywords: {
      label: "Keywords",
      color: "hsl(var(--primary))",
    },
  };

  const distributionChartData = keywordDistribution.map(item => ({
    position: item.label,
    count: item.count,
    fill: item.color.replace('bg-', '').replace('-500', '').replace('-600', '')
  }));

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
    <div className="space-y-6 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="page-title">
          Welcome {user?.name || 'User'}!
        </h1>
        <p className="description-text">
          Here's an overview of your content generation activity
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          variant="stats"
          title="Words Available"
          value="452"
          description="1548/2000 free words generated"
          actionLabel="See History"
          actionHref="/history"
          icon={<PenTool className="h-5 w-5 text-primary" />}
        />
        
        <StatsCard
          variant="stats"
          title="Drafts Available" 
          value="3"
          description="7/10 free drafts created"
          actionLabel="See All"
          actionHref="/drafts"
          icon={<Layers className="h-5 w-5 text-primary" />}
        />
        
        <StatsCard
          variant="stats"
          title="Documents Available"
          value="6"
          description="4/10 free documents created"
          actionLabel="See All"
          actionHref="/documents"
          icon={<FileText className="h-5 w-5 text-primary" />}
        />
        
        <StatsCard
          variant="stats"
          title="Tools Available"
          value="12"
          description="4/16 free tools used to generate content"
          actionLabel="All Tools"
          actionHref="/tools"
          icon={<Zap className="h-5 w-5 text-primary" />}
        />
      </div>

      {/* Current Plan */}
      <Card className="border-card-border bg-gradient-card shadow-card hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b border-card-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Crown className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="card-label">Premium Plan</div>
                <div className="description-text">
                  Your current subscription plan
                </div>
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
              <p className="form-label">Monthly Token Usage</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="table-cell">2,340 / 10,000</span>
                  <span className="description-text">23%</span>
                </div>
                <Progress value={23} className="h-2 bg-muted" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="form-label">Next Billing</p>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="table-cell">January 15, 2025</span>
              </div>
            </div>
            <div className="flex items-end justify-end">
              <Button variant="outline" size="sm" className="button-text border-border hover:bg-accent">
                Upgrade Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organic Keywords */}
      <Card className="bg-card border-card-border shadow-card hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b border-card-border/50">
          <CardTitle className="section-header">Organic Keywords</CardTitle>
          <CardDescription className="description-text">
            Keyword ranking distribution and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Distribution by Country */}
            <div className="space-y-4 h-96 flex flex-col">
              <h3 className="admin-card-title text-foreground text-lg">Distribution by Country</h3>
              <div className="space-y-3 flex-1 overflow-y-auto">
                {countryDistribution.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{item.flag}</span>
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{item.country}</div>
                        <div className="admin-stats-label text-muted-foreground">{item.keywords} keywords</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="admin-stats-value text-foreground">{item.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Organic Keywords Graph */}
            <div className="space-y-4 h-96 flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="admin-card-title text-foreground text-lg">Organic Keywords</h3>
                <div className="flex items-center space-x-2">
                  {['1M', '6M', '1Y', 'All'].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className="text-xs px-3 py-1"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <ChartContainer config={chartConfig}>
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="keywords" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ChartContainer>
              </div>
              <div className="flex items-center justify-between p-4 bg-card-hover rounded-lg">
                <span className="admin-body-text text-foreground">Total Organic Keywords</span>
                <span className="admin-stats-value text-foreground">1,270</span>
              </div>
            </div>
          </div>

          {/* Keyword Distribution */}
          <div className="mt-8 space-y-4">
            <h3 className="admin-card-title text-foreground text-lg">Keyword Ranking Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {keywordDistribution.map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-full h-2 ${item.color} rounded-full mb-2`}></div>
                  <div className="admin-stats-value text-foreground text-sm">{item.count}</div>
                  <div className="admin-stats-label text-muted-foreground text-xs">{item.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-card-hover rounded-lg">
              <div className="flex items-center justify-between">
                <span className="admin-stats-label text-muted-foreground">Month over month growth</span>
                <span className="admin-stats-label text-green-600">+8.1%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indexed on Google */}
      <Card className="bg-card border-card-border shadow-card hover:shadow-md transition-all duration-300">
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
      <Card className="bg-card border-card-border shadow-card hover:shadow-md transition-all duration-300">
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
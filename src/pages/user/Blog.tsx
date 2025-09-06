import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  FileText,
  ExternalLink,
  Settings,
  Plug,
  Info,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';

export default function BlogPage() {
  // Mock data for demonstration
  const connectionStatus = 'connected'; // 'connected' | 'disconnected' | 'pending'
  
  const recentArticles = [
    {
      id: 'article_001',
      title: '10 Essential SEO Strategies for 2025',
      url: 'allcancer.com/seo-strategies-2025',
      status: 'published',
      publishedDate: '2024-01-15',
      indexing: true,
      lastCrawl: '3 days ago',
      googleStatus: 'Submitted and indexed',
      keywords: ['SEO', 'digital marketing', 'content strategy']
    },
    {
      id: 'article_002',
      title: 'Complete Guide to Content Marketing ROI',
      url: 'allcancer.com/content-marketing-roi',
      status: 'draft',
      publishedDate: null,
      indexing: false,
      lastCrawl: '5 days ago',
      googleStatus: 'URL is unknown to Google',
      keywords: ['content marketing', 'ROI', 'analytics']
    },
    {
      id: 'article_003',
      title: 'Social Media Automation Best Practices',
      url: 'allcancer.com/social-media-automation',
      status: 'scheduled',
      publishedDate: '2024-01-20',
      indexing: true,
      lastCrawl: '1 day ago',
      googleStatus: 'Submitted and indexed',
      keywords: ['social media', 'automation', 'marketing']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="h-4 w-4" />;
      case 'draft': return <FileText className="h-4 w-4" />;
      case 'scheduled': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Blog Management</h1>
        <p className="admin-subtitle mt-2">
          Manage your automated blog content through our integrated blogging platform.
        </p>
      </div>

      {/* Integration Status */}
      <div className="space-y-6">
        {/* Connection Status Overview */}
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50/50 to-white shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-25 border-b border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center shadow-sm">
                  <Plug className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="admin-card-title flex items-center space-x-2">
                    <span>DropinBlog Integration</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                      Connected
                    </Badge>
                  </CardTitle>
                  <CardDescription className="admin-card-description text-green-700">
                    Connected and ready for automated publishing
                  </CardDescription>
                </div>
              </div>
              <Button variant="outline" size="sm" className="admin-button border-green-200 text-green-700 hover:bg-green-50">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Detailed Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Connection Details */}
          <Card className="lg:col-span-2 bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-card-border">
              <CardTitle className="admin-card-title text-sm">Connection Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <p className="admin-label text-blue-800">Blog URL</p>
                  </div>
                  <a 
                    href="https://yourblog.dropinblog.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="admin-body-text text-blue-700 hover:underline font-medium text-sm"
                  >
                    yourblog.dropinblog.com
                  </a>
                </div>

                <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <ExternalLink className="h-4 w-4 text-purple-600" />
                    <p className="admin-label text-purple-800">Sitemap URL</p>
                  </div>
                  <span className="admin-body-text text-purple-700 font-mono text-xs">
                    api.dropinblog.com/v2/blog/[blog_id]/rendered/sitemap
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="flex items-center space-x-2 mb-3">
                  <Info className="h-4 w-4 text-gray-600" />
                  <p className="admin-label text-gray-800">Quick Actions</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-700 hover:bg-gray-100">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Dashboard
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs h-8 border-gray-300 text-gray-700 hover:bg-gray-100">
                    <Settings className="h-3 w-3 mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Status */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="border-b border-green-100">
              <CardTitle className="admin-card-title text-sm text-green-800">Live Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Connection Status */}
                <div className="flex items-center justify-between p-3 bg-green-100/50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-green-800 font-medium text-sm">Connected</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                    Active
                  </Badge>
                </div>
                
                {/* Sync Status */}
                <div className="flex items-center justify-between p-3 bg-green-100/50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-green-800 font-medium text-sm">Synced</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
                
                {/* Last Sync */}
                <div className="flex items-center justify-between p-3 bg-green-100/50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="text-green-800 font-medium text-sm">Last Sync</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium">2 min ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blog Statistics */}
      {connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Articles */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-blue-100">
              <CardTitle className="admin-card-description font-medium text-blue-800">
                Total Articles
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="admin-stats-value text-blue-900">60</div>
              <p className="admin-stats-label text-blue-600">+15 this month</p>
            </CardContent>
          </Card>

          {/* Published */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-green-100">
              <CardTitle className="admin-card-description font-medium text-green-800">
                Published
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="admin-stats-value text-green-900">47</div>
              <p className="admin-stats-label text-green-600">+12 this month</p>
            </CardContent>
          </Card>

          {/* Scheduled */}
          <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-purple-100">
              <CardTitle className="admin-card-description font-medium text-purple-800">
                Scheduled
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="admin-stats-value text-purple-900">5</div>
              <p className="admin-stats-label text-purple-600">+2 this month</p>
            </CardContent>
          </Card>

          {/* Draft */}
          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-yellow-100">
              <CardTitle className="admin-card-description font-medium text-yellow-800">
                Draft
              </CardTitle>
              <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Eye className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="admin-stats-value text-yellow-900">8</div>
              <p className="admin-stats-label text-yellow-600">+1 this month</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Articles */}
      {connectionStatus === 'connected' && (
        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="admin-card-title">Recent Articles</CardTitle>
                <CardDescription className="admin-card-description">
                  Latest content from your automated blog system
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" className="admin-button">
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Blog Dashboard
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentArticles.map((article, index) => (
                <div key={article.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200 border border-card-border">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    {/* Index and Title */}
                    <div className="lg:col-span-1 flex items-center">
                      <span className="text-sm font-medium text-muted-foreground bg-muted rounded px-2 py-1">
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="lg:col-span-4">
                      <div className="space-y-1">
                        <h3 className="admin-body-text font-medium leading-tight">{article.title}</h3>
                        <p className="text-xs text-muted-foreground">ID: {article.id}</p>
                        <p className="text-xs text-primary hover:underline cursor-pointer">{article.url}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="lg:col-span-2">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(article.status)} flex items-center space-x-1 w-fit`}
                      >
                        {getStatusIcon(article.status)}
                        <span className="capitalize">{article.status}</span>
                      </Badge>
                    </div>

                    {/* Indexing */}
                    <div className="lg:col-span-1 flex justify-center">
                      {article.indexing ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <span className="text-yellow-600 font-bold">?</span>
                      )}
                    </div>

                    {/* Last Crawl */}
                    <div className="lg:col-span-2">
                      <p className="text-xs text-muted-foreground">Last Crawl: {article.lastCrawl}</p>
                    </div>

                    {/* Google Status & Action */}
                    <div className="lg:col-span-2">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1">
                          {article.googleStatus === 'Submitted and indexed' ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <span className="h-3 w-3 rounded-full bg-gray-400"></span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Google: {article.googleStatus}
                          </span>
                        </div>
                        {article.googleStatus === 'URL is unknown to Google' && (
                          <Button variant="outline" size="sm" className="text-xs h-6 px-2">
                            Submit Instant Indexing
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mt-3 pt-3 border-t border-card-border">
                    <div className="flex flex-wrap gap-1">
                      {article.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="admin-body-text">
          <strong>About DropinBlog Integration:</strong> We've partnered with DropinBlog to provide a comprehensive blogging infrastructure. 
          All content generated through your automation settings will be managed through their platform, giving you full control over 
          publishing, editing, and analytics. This integration allows seamless content management while maintaining your brand identity.
        </AlertDescription>
      </Alert>
    </div>
  );
}
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
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-card-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                connectionStatus === 'connected' 
                  ? 'bg-green-100 border border-green-200' 
                  : 'bg-orange-100 border border-orange-200'
              }`}>
                <Plug className={`h-6 w-6 ${
                  connectionStatus === 'connected' ? 'text-green-600' : 'text-orange-600'
                }`} />
              </div>
              <div>
                <CardTitle className="admin-card-title flex items-center space-x-2">
                  <span>DropinBlog Integration</span>
                </CardTitle>
                <CardDescription className="admin-card-description">
                  {connectionStatus === 'connected' 
                    ? 'Connected and ready for automated publishing'
                    : 'Blog platform integration required'
                  }
                </CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" className="admin-button">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {connectionStatus === 'connected' ? (
            <div className="space-y-6">
              {/* Connection Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/30 border border-card-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <p className="admin-label">Blog URL</p>
                    </div>
                    <a 
                      href="https://yourblog.dropinblog.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="admin-body-text text-primary hover:underline font-medium"
                    >
                      yourblog.dropinblog.com
                    </a>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-card-border">
                    <div className="flex items-center space-x-2 mb-2">
                      <ExternalLink className="h-4 w-4 text-primary" />
                      <p className="admin-label">Sitemap URL</p>
                    </div>
                    <span className="admin-body-text text-muted-foreground font-mono text-sm">
                      api.dropinblog.com/v2/blog/[blog_id]/rendered/sitemap
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-lg bg-green-50 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="admin-label text-green-800 text-base font-semibold">Integration Status</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {/* Connection Status */}
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-green-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-green-800 font-medium">Connected</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className="border-green-300 text-green-700 bg-green-100 font-medium"
                        >
                          Active
                        </Badge>
                      </div>
                      
                      {/* Sync Status */}
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-green-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-green-800 font-medium">Fully Synced</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">Live</span>
                      </div>
                      
                      {/* Last Sync */}
                      <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-green-100">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-green-600" />
                          <span className="text-green-800 font-medium">Last Sync</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">2 minutes ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-4 w-4 text-blue-600" />
                      <p className="admin-label text-blue-800">Quick Actions</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Dashboard
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs h-8">
                        <Settings className="h-3 w-3 mr-1" />
                        Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Plug className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="admin-section-title mb-2">Connect Your Blog</h3>
              <p className="admin-card-description mb-6 max-w-md mx-auto">
                Connect your DropinBlog account to enable automated content publishing and management. 
                Get started in just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="admin-button">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Connect DropinBlog
                </Button>
                <Button variant="outline" className="admin-button">
                  <Info className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blog Statistics */}
      {connectionStatus === 'connected' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Total Articles
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">60</div>
              <p className="admin-stats-label text-green-600">+15 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Published
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">47</div>
              <p className="admin-stats-label text-green-600">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Scheduled
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">5</div>
              <p className="admin-stats-label text-green-600">+2 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Draft
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">8</div>
              <p className="admin-stats-label text-green-600">+1 this month</p>
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
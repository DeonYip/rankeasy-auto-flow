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
      id: 1,
      title: '10 Essential SEO Strategies for 2025',
      status: 'published',
      publishedDate: '2024-01-15',
      views: 1247,
      keywords: ['SEO', 'digital marketing', 'content strategy']
    },
    {
      id: 2,
      title: 'Complete Guide to Content Marketing ROI',
      status: 'draft',
      publishedDate: null,
      views: 0,
      keywords: ['content marketing', 'ROI', 'analytics']
    },
    {
      id: 3,
      title: 'Social Media Automation Best Practices',
      status: 'scheduled',
      publishedDate: '2024-01-20',
      views: 0,
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Blog Management</h1>
        <p className="admin-subtitle mt-2">
          Manage your automated blog content through our integrated blogging platform.
        </p>
      </div>

      {/* Integration Status */}
      <Card className={`bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300 ${connectionStatus === 'connected' ? 'border-green-200 bg-green-50/50' : 'border-orange-200 bg-orange-50/50'}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                connectionStatus === 'connected' ? 'bg-green-100' : 'bg-orange-100'
              }`}>
                <Plug className={`h-5 w-5 ${
                  connectionStatus === 'connected' ? 'text-green-600' : 'text-orange-600'
                }`} />
              </div>
              <div>
                <CardTitle className="admin-card-title">DropinBlog Integration</CardTitle>
                <CardDescription className="admin-card-description">
                  {connectionStatus === 'connected' 
                    ? 'Connected and ready for automated publishing'
                    : 'Blog platform integration required'
                  }
                </CardDescription>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={`${
                connectionStatus === 'connected' 
                  ? 'border-green-200 text-green-700 bg-green-50' 
                  : 'border-orange-200 text-orange-700 bg-orange-50'
              }`}
            >
              {connectionStatus === 'connected' ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {connectionStatus === 'connected' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="admin-label mb-2">Blog URL</p>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href="https://yourblog.dropinblog.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="admin-body-text text-primary hover:underline"
                  >
                    yourblog.dropinblog.com
                  </a>
                </div>
              </div>
              <div>
                <p className="admin-label mb-2">Integration Status</p>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="admin-body-text">Fully Synced</span>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <Button variant="outline" size="sm" className="admin-button">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Plug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="admin-section-title mb-2">Connect Your Blog</h3>
              <p className="admin-card-description mb-6 max-w-md mx-auto">
                Connect your DropinBlog account to enable automated content publishing and management.
              </p>
              <Button className="admin-button">
                <ExternalLink className="h-4 w-4 mr-2" />
                Connect DropinBlog
              </Button>
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
                Published Articles
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">47</div>
              <p className="admin-stats-label text-green-600">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Total Views
              </CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">24.5K</div>
              <p className="admin-stats-label text-green-600">+18.2% this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Draft Articles
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">8</div>
              <p className="admin-stats-label">Pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="admin-card-description font-medium">
                Scheduled
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="admin-stats-value">5</div>
              <p className="admin-stats-label">Next 7 days</p>
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
          <CardContent>
            <div className="space-y-4">
              {recentArticles.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors duration-200 border border-card-border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="admin-body-text font-medium">{article.title}</h3>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(article.status)} flex items-center space-x-1`}
                      >
                        {getStatusIcon(article.status)}
                        <span className="capitalize">{article.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="admin-stats-label">
                        {article.status === 'published' 
                          ? `Published ${article.publishedDate}` 
                          : article.status === 'scheduled' 
                          ? `Scheduled for ${article.publishedDate}`
                          : 'Draft'
                        }
                      </span>
                      {article.views > 0 && (
                        <span className="admin-stats-label flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views.toLocaleString()} views</span>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {article.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-4">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
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
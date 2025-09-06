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
  Edit3
} from 'lucide-react';

export default function UserBlogAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');

  const blogStats = [
    {
      title: 'Total Articles',
      value: '15,629',
      change: '+8.7%',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Published Today',
      value: '47',
      change: '+12.3%',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Total Views',
      value: '2.4M',
      change: '+18.2%',
      icon: Eye,
      color: 'bg-purple-500'
    },
    {
      title: 'Pending Review',
      value: '23',
      change: '-5.1%',
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  const articles = [
    {
      id: 'art_2025_001',
      title: '10 Best SEO Strategies for 2025',
      author: 'John Doe',
      authorEmail: 'john.doe@example.com',
      status: 'Published',
      publishDate: '2024-12-06',
      views: 2847,
      url: 'https://example.com/articles/seo-strategies-2025',
      indexingStatus: 'Submitted and indexed',
      lastCrawl: '2 days ago',
      avatar: '/avatars/john-doe.png'
    },
    {
      id: 'art_2025_002',
      title: 'Ultimate Guide to Content Marketing ROI',
      author: 'Sarah Smith',
      authorEmail: 'sarah.smith@example.com',
      status: 'Published',
      publishDate: '2024-12-05',
      views: 1923,
      url: 'https://example.com/articles/content-marketing-roi',
      indexingStatus: 'URL is unknown to Google',
      lastCrawl: '5 days ago',
      avatar: '/avatars/sarah-smith.png'
    },
    {
      id: 'art_2025_003',
      title: 'AI-Powered Marketing Automation Trends',
      author: 'Mike Wilson',
      authorEmail: 'mike.wilson@example.com',
      status: 'Draft',
      publishDate: null,
      views: 0,
      url: null,
      indexingStatus: 'Not indexed',
      lastCrawl: 'Never',
      avatar: '/avatars/mike-wilson.png'
    },
    {
      id: 'art_2025_004',
      title: 'Social Media Strategy for B2B Companies',
      author: 'Emily Chen',
      authorEmail: 'emily.chen@example.com',
      status: 'Scheduled',
      publishDate: '2024-12-08',
      views: 0,
      url: null,
      indexingStatus: 'Not indexed',
      lastCrawl: 'Never',
      avatar: '/avatars/emily-chen.png'
    },
    {
      id: 'art_2025_005',
      title: 'Email Marketing Best Practices 2025',
      author: 'David Rodriguez',
      authorEmail: 'david.rodriguez@example.com',
      status: 'Pending Review',
      publishDate: null,
      views: 0,
      url: null,
      indexingStatus: 'Not indexed',
      lastCrawl: 'Never',
      avatar: '/avatars/david-rodriguez.png'
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

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || article.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesUser = selectedUser === 'all' || article.authorEmail === selectedUser;
    
    return matchesSearch && matchesStatus && matchesUser;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="admin-title text-foreground">User Blog Administration</h1>
        <p className="admin-subtitle text-muted-foreground">
          Manage user-generated content, articles, and blog posts
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

      <Tabs defaultValue="all-articles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="all-articles">All Articles</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-articles" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-card border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="admin-label text-foreground">Search Articles</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by title or author..."
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
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="pending-review">Pending Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Author</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="mt-2 w-[200px]">
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Authors</SelectItem>
                      <SelectItem value="john.doe@example.com">John Doe</SelectItem>
                      <SelectItem value="sarah.smith@example.com">Sarah Smith</SelectItem>
                      <SelectItem value="mike.wilson@example.com">Mike Wilson</SelectItem>
                      <SelectItem value="emily.chen@example.com">Emily Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Articles Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Articles</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredArticles.length} articles found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Indexing</TableHead>
                    <TableHead>Last Crawl</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-body-text text-foreground font-medium">{article.title}</div>
                          <div className="admin-stats-label text-muted-foreground">ID: {article.id}</div>
                          {article.url && (
                            <div className="admin-stats-label text-primary text-xs">
                              <Globe className="h-3 w-3 inline mr-1" />
                              {article.url}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={article.avatar} alt={article.author} />
                            <AvatarFallback>{article.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="admin-body-text text-foreground text-sm">{article.author}</div>
                            <div className="admin-stats-label text-muted-foreground text-xs">{article.authorEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(article.status)}
                        {article.publishDate && (
                          <div className="admin-stats-label text-muted-foreground text-xs mt-1">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {article.publishDate}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="admin-body-text text-foreground">{article.views.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getIndexingBadge(article.indexingStatus)}
                        {article.indexingStatus === 'URL is unknown to Google' && (
                          <Button size="sm" variant="outline" className="mt-2 text-xs h-6">
                            Submit Indexing
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{article.lastCrawl}</span>
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

        <TabsContent value="published">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Published Articles</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                All published and live articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {articles.filter(a => a.status === 'Published').length} published articles
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Pending Review</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Articles awaiting moderation approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {articles.filter(a => a.status === 'Pending Review').length} articles pending review
                </p>
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
                  {articles.filter(a => a.status === 'Published').slice(0, 3).map((article, index) => (
                    <div key={article.id} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{article.title}</div>
                        <div className="admin-stats-label text-muted-foreground">{article.author}</div>
                      </div>
                      <div className="text-right">
                        <div className="admin-stats-value text-foreground text-sm">{article.views.toLocaleString()}</div>
                        <div className="admin-stats-label text-muted-foreground">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Indexing Overview</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Google indexing status distribution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Submitted and indexed</span>
                    <span className="admin-stats-value text-green-600 text-sm">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Unknown to Google</span>
                    <span className="admin-stats-value text-red-600 text-sm">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="admin-body-text text-foreground">Not indexed</span>
                    <span className="admin-stats-value text-gray-600 text-sm">5%</span>
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
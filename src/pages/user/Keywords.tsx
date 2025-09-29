import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  Upload,
  Download,
  Trash2,
  Plus,
  Hash,
  FileText,
  AlertCircle,
  Check,
  Play,
  Pause,
  Eye,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Calendar,
  Target
} from 'lucide-react';

export default function KeywordsPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  
  // Mock data for keywords with blog analytics
  const [keywordData, setKeywordData] = useState([
    { 
      keyword: 'content marketing strategy', 
      blogCount: 12, 
      ranking: 3, 
      trend: 'up', 
      isActive: true,
      lastBlog: '2024-01-15',
      blogs: [
        'Advanced Content Marketing Strategies for 2024',
        'Building Your Content Marketing Funnel',
        'Content Marketing ROI Measurement Guide'
      ]
    },
    { 
      keyword: 'SEO optimization techniques', 
      blogCount: 8, 
      ranking: 7, 
      trend: 'up', 
      isActive: true,
      lastBlog: '2024-01-14',
      blogs: [
        'Technical SEO Best Practices',
        'On-Page SEO Optimization Guide'
      ]
    },
    { 
      keyword: 'digital marketing trends', 
      blogCount: 15, 
      ranking: 2, 
      trend: 'stable', 
      isActive: false,
      lastBlog: '2024-01-10',
      blogs: [
        '2024 Digital Marketing Trends',
        'Emerging Marketing Technologies',
        'Future of Digital Advertising'
      ]
    },
    { 
      keyword: 'social media automation', 
      blogCount: 6, 
      ranking: 12, 
      trend: 'down', 
      isActive: true,
      lastBlog: '2024-01-12',
      blogs: [
        'Social Media Automation Tools',
        'Best Practices for Social Automation'
      ]
    },
    { 
      keyword: 'email marketing campaigns', 
      blogCount: 10, 
      ranking: 5, 
      trend: 'up', 
      isActive: true,
      lastBlog: '2024-01-13',
      blogs: [
        'Email Marketing Campaign Strategy',
        'Personalization in Email Marketing',
        'Email Automation Workflows'
      ]
    }
  ]);

  const [textInput, setTextInput] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<any>(null);

  // Pagination calculations
  const totalPages = Math.ceil(keywordData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = keywordData.slice(startIndex, endIndex);

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const newKeywords = textInput
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0)
      .filter(keyword => !keywordData.some(item => item.keyword === keyword));
    
    const newKeywordData = newKeywords.map(keyword => ({
      keyword,
      blogCount: 0,
      ranking: Math.floor(Math.random() * 20) + 1,
      trend: 'stable' as const,
      isActive: true,
      lastBlog: '',
      blogs: []
    }));
    
    setKeywordData(prev => [...prev, ...newKeywordData]);
    setTextInput('');
  };

  const toggleKeywordStatus = (index: number) => {
    setKeywordData(prev => prev.map((item, i) => 
      i === index ? { ...item, isActive: !item.isActive } : item
    ));
  };

  const removeKeyword = (index: number) => {
    setKeywordData(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllKeywords = () => {
    setKeywordData([]);
  };

  const exportKeywords = () => {
    const csvContent = keywordData.map(item => 
      `${item.keyword},${item.blogCount},${item.ranking},${item.isActive ? 'Active' : 'Paused'}`
    ).join('\n');
    const csvHeader = 'Keyword,Blog Count,Ranking,Status\n';
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog-keywords.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Keyword Management</h1>
        <p className="admin-subtitle mt-2">
          Manage your article keywords for content generation and SEO optimization.
        </p>
      </div>

      {/* Consolidated Analytics */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="admin-card-title flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span>Keyword Analytics Overview</span>
            </CardTitle>
            <CardDescription className="admin-card-description">
              Complete analytics and performance metrics for your keyword strategy
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="admin-stats-value">{keywordData.length}</div>
                <p className="admin-stats-label">Total Keywords</p>
              </div>
              <div className="text-center">
                <div className="admin-stats-value">{keywordData.filter(k => k.isActive).length}</div>
                <p className="admin-stats-label">Active Keywords</p>
              </div>
              <div className="text-center">
                <div className="admin-stats-value">{keywordData.reduce((sum, k) => sum + k.blogCount, 0)}</div>
                <p className="admin-stats-label">Total Blogs Generated</p>
              </div>
              <div className="text-center">
                <div className="admin-stats-value">1,270</div>
                <p className="admin-stats-label">Ranked Keywords</p>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between">
                <span className="admin-stats-label">Avg. Ranking:</span>
                <span className="admin-body-text font-semibold">
                  #{Math.round(keywordData.reduce((sum, k) => sum + k.ranking, 0) / (keywordData.length || 1))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="admin-stats-label">Top Performer:</span>
                <span className="admin-body-text font-semibold">
                  {keywordData.sort((a, b) => a.ranking - b.ranking)[0]?.keyword.slice(0, 20) || 'None'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="admin-stats-label">Most Active:</span>
                <span className="admin-body-text font-semibold">
                  {keywordData.sort((a, b) => b.blogCount - a.blogCount)[0]?.keyword.slice(0, 20) || 'None'}
                </span>
              </div>
            </div>
            
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="admin-body-text">
                <strong>How keywords work:</strong> These keywords automatically integrate into your content generation process. 
                Each article focuses on relevant keywords based on your automation configuration and performance metrics.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Add Keywords Method */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        {/* Text Input Method */}
        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="admin-card-title flex items-center space-x-2">
              <Plus className="h-5 w-5 text-primary" />
              <span>Add Keywords (Text Input)</span>
            </CardTitle>
            <CardDescription className="admin-card-description">
              Enter keywords separated by commas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="keywords-text" className="admin-label">
                Keywords
              </Label>
              <Textarea
                id="keywords-text"
                placeholder="content marketing, SEO optimization, digital strategy, social media"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="admin-body-text min-h-[120px]"
              />
              <p className="admin-stats-label">
                Separate multiple keywords with commas
              </p>
            </div>
            <Button 
              onClick={handleTextSubmit}
              disabled={!textInput.trim()}
              className="admin-button w-full"
            >
              Add Keywords
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Keywords */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="admin-card-title">Blog Keywords</CardTitle>
              <CardDescription className="admin-card-description">
                Manage your active blog keyword analytics and automation
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={exportKeywords}
                  disabled={keywordData.length === 0}
                  className="admin-button w-full sm:w-auto"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearAllKeywords}
                  disabled={keywordData.length === 0}
                  className="admin-button text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {keywordData.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="admin-body-text">
                No keywords added yet. Use the methods above to add your first keywords for content generation.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Label className="admin-label">Show:</Label>
                  <select 
                    value={itemsPerPage} 
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="admin-body-text border rounded px-2 py-1"
                  >
                    <option value={50}>50 per page</option>
                    <option value={100}>100 per page</option>
                    <option value={250}>250 per page</option>
                    <option value={500}>500 per page</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="admin-body-text">
                    Page {currentPage} of {totalPages} ({keywordData.length} total)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="admin-label">Keyword</TableHead>
                    <TableHead className="admin-label text-center">Blog Count</TableHead>
                    <TableHead className="admin-label text-center">Ranking</TableHead>
                    <TableHead className="admin-label text-center">Trend</TableHead>
                    <TableHead className="admin-label text-center">Last Blog</TableHead>
                    <TableHead className="admin-label text-center">Status</TableHead>
                    <TableHead className="admin-label text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((item, index) => {
                    const originalIndex = startIndex + index;
                    return (
                    <TableRow key={originalIndex} className="hover:bg-muted/50">
                      <TableCell className="font-medium admin-body-text">
                        {item.keyword}
                      </TableCell>
                      <TableCell className="text-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-primary/10"
                              onClick={() => setSelectedKeyword(item)}
                            >
                              <span className="text-primary font-semibold">{item.blogCount}</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center space-x-2">
                                <FileText className="h-5 w-5" />
                                <span>Blogs for "{item.keyword}"</span>
                              </DialogTitle>
                              <DialogDescription>
                                {item.blogCount} blog posts generated for this keyword
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                              {item.blogs.length > 0 ? (
                                item.blogs.map((blog, blogIndex) => (
                                  <div key={blogIndex} className="p-3 border rounded-lg hover:bg-muted/50">
                                    <p className="admin-body-text font-medium">{blog}</p>
                                    <p className="admin-stats-label mt-1">Published on {item.lastBlog}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="admin-body-text text-muted-foreground">No blogs generated yet.</p>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="admin-body-text font-semibold">#{item.ranking}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {getTrendIcon(item.trend)}
                      </TableCell>
                      <TableCell className="text-center admin-stats-label">
                        {item.lastBlog || 'Never'}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <Switch
                            checked={item.isActive}
                            onCheckedChange={() => toggleKeywordStatus(originalIndex)}
                          />
                          <span className="admin-stats-label">
                            {item.isActive ? 'Active' : 'Paused'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeKeyword(originalIndex)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MessageSquare,
  Plus,
  Edit3,
  Trash2,
  Copy,
  Search,
  Tag,
  Calendar,
  CheckCircle,
  AlertTriangle,
  MoreHorizontal
} from 'lucide-react';

export default function PromptManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const promptStats = [
    {
      title: 'Total Prompts',
      value: '147',
      change: '+8 this month',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Prompts',
      value: '134',
      change: '+5 this month',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Categories',
      value: '12',
      change: '+2 this month',
      icon: Tag,
      color: 'bg-purple-500'
    },
    {
      title: 'Usage Today',
      value: '2,847',
      change: '+12.3%',
      icon: MessageSquare,
      color: 'bg-orange-500'
    }
  ];

  const prompts = [
    {
      id: 'prompt_001',
      name: 'SEO Article Writer',
      description: 'Generates comprehensive SEO-optimized articles',
      category: 'Content Creation',
      status: 'Active',
      usageCount: 2847,
      lastUsed: '2 hours ago',
      createdDate: '2024-01-15',
      prompt: 'Write a comprehensive SEO-optimized article about [TOPIC]. Include proper headings, meta description, and focus on user intent...',
      variables: ['TOPIC', 'KEYWORD', 'WORD_COUNT']
    },
    {
      id: 'prompt_002',
      name: 'Product Description Generator',
      description: 'Creates compelling product descriptions for e-commerce',
      category: 'E-commerce',
      status: 'Active',
      usageCount: 1923,
      lastUsed: '1 hour ago',
      createdDate: '2024-02-20',
      prompt: 'Create a compelling product description for [PRODUCT_NAME]. Highlight key features, benefits, and include a call-to-action...',
      variables: ['PRODUCT_NAME', 'FEATURES', 'PRICE']
    },
    {
      id: 'prompt_003',
      name: 'Social Media Post Creator',
      description: 'Generates engaging social media content',
      category: 'Social Media',
      status: 'Active',
      usageCount: 1456,
      lastUsed: '3 hours ago',
      createdDate: '2024-03-10',
      prompt: 'Create an engaging social media post for [PLATFORM] about [TOPIC]. Include relevant hashtags and call-to-action...',
      variables: ['PLATFORM', 'TOPIC', 'TONE']
    },
    {
      id: 'prompt_004',
      name: 'Email Marketing Template',
      description: 'Creates persuasive email marketing campaigns',
      category: 'Email Marketing',
      status: 'Draft',
      usageCount: 0,
      lastUsed: 'Never',
      createdDate: '2024-12-01',
      prompt: 'Create a persuasive email marketing campaign for [CAMPAIGN_TYPE]. Include subject line, body content, and CTA...',
      variables: ['CAMPAIGN_TYPE', 'AUDIENCE', 'OFFER']
    },
    {
      id: 'prompt_005',
      name: 'Blog Post Outline',
      description: 'Generates structured blog post outlines',
      category: 'Content Creation',
      status: 'Active',
      usageCount: 987,
      lastUsed: '5 hours ago',
      createdDate: '2024-04-15',
      prompt: 'Create a detailed blog post outline for [TOPIC]. Include introduction, main sections, key points, and conclusion...',
      variables: ['TOPIC', 'AUDIENCE', 'WORD_COUNT']
    }
  ];

  const categories = ['Content Creation', 'E-commerce', 'Social Media', 'Email Marketing', 'SEO', 'Analytics'];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'Archived':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || prompt.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="admin-title text-foreground">Prompt Management</h1>
          <p className="admin-subtitle text-muted-foreground">
            Manage AI prompts, templates, and automation workflows
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="admin-button">
              <Plus className="h-4 w-4 mr-2" />
              Create Prompt
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prompt</DialogTitle>
              <DialogDescription>
                Create a new AI prompt template for content generation
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prompt-name">Prompt Name</Label>
                  <Input id="prompt-name" placeholder="Enter prompt name" />
                </div>
                <div>
                  <Label htmlFor="prompt-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="prompt-description">Description</Label>
                <Input id="prompt-description" placeholder="Enter prompt description" />
              </div>
              <div>
                <Label htmlFor="prompt-content">Prompt Content</Label>
                <Textarea 
                  id="prompt-content" 
                  placeholder="Enter your prompt template..." 
                  rows={8}
                />
              </div>
              <div>
                <Label htmlFor="prompt-variables">Variables (comma-separated)</Label>
                <Input id="prompt-variables" placeholder="e.g., TOPIC, KEYWORD, WORD_COUNT" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Create Prompt
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {promptStats.map((stat, index) => (
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
              <p className="text-xs text-green-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="all-prompts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="all-prompts">All Prompts</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-prompts" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-card border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="admin-label text-foreground">Search Prompts</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="mt-2 w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-2 w-[150px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompts Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Prompts</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredPrompts.length} prompts found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrompts.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-body-text text-foreground font-medium">{prompt.name}</div>
                          <div className="admin-stats-label text-muted-foreground">{prompt.description}</div>
                          <div className="admin-stats-label text-muted-foreground text-xs">ID: {prompt.id}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {prompt.variables.map((variable, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {variable}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {prompt.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(prompt.status)}
                      </TableCell>
                      <TableCell>
                        <span className="admin-body-text text-foreground">{prompt.usageCount.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{prompt.lastUsed}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Active Prompts</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Currently active and available prompts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {prompts.filter(p => p.status === 'Active').length} active prompts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => {
              const categoryPrompts = prompts.filter(p => p.category === category);
              const totalUsage = categoryPrompts.reduce((sum, p) => sum + p.usageCount, 0);
              
              return (
                <Card key={index} className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="admin-card-title text-foreground">{category}</CardTitle>
                    <CardDescription className="admin-card-description text-muted-foreground">
                      {categoryPrompts.length} prompts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="admin-body-text text-muted-foreground">Total Usage</span>
                        <span className="admin-stats-value text-foreground text-sm">{totalUsage.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="admin-body-text text-muted-foreground">Active Prompts</span>
                        <span className="admin-stats-value text-foreground text-sm">
                          {categoryPrompts.filter(p => p.status === 'Active').length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Most Used Prompts</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Top performing prompts by usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prompts.sort((a, b) => b.usageCount - a.usageCount).slice(0, 5).map((prompt, index) => (
                    <div key={prompt.id} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{prompt.name}</div>
                        <div className="admin-stats-label text-muted-foreground">{prompt.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="admin-stats-value text-foreground text-sm">{prompt.usageCount.toLocaleString()}</div>
                        <div className="admin-stats-label text-muted-foreground">uses</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Category Performance</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Usage breakdown by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.slice(0, 4).map((category, index) => {
                    const categoryUsage = prompts
                      .filter(p => p.category === category)
                      .reduce((sum, p) => sum + p.usageCount, 0);
                    
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="admin-body-text text-foreground">{category}</span>
                        <span className="admin-stats-value text-foreground text-sm">{categoryUsage.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
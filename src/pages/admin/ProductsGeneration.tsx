import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
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
  Package,
  Plus,
  Play,
  Pause,
  Search,
  Filter,
  Edit3,
  Trash2,
  MoreHorizontal,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function ProductsGeneration() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const productStats = [
    {
      title: 'Total Products',
      value: '847',
      change: '+23 this month',
      icon: Package,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Campaigns',
      value: '34',
      change: '12 running',
      icon: Play,
      color: 'bg-green-500'
    },
    {
      title: 'Revenue Generated',
      value: '$24.7K',
      change: '+18.2%',
      icon: DollarSign,
      color: 'bg-purple-500'
    },
    {
      title: 'Conversion Rate',
      value: '3.4%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  const products = [
    {
      id: 'prod_001',
      name: 'AI Content Generator Pro',
      category: 'Software',
      description: 'Advanced AI-powered content generation tool for marketers',
      status: 'Active',
      price: '$99/month',
      sales: 247,
      revenue: '$24,453',
      conversionRate: 3.4,
      lastUpdated: '2024-12-06',
      generationTemplate: 'Premium SaaS Product',
      targetAudience: 'Digital Marketers, Content Creators',
      features: ['AI Writing', 'SEO Optimization', 'Multi-language', 'API Access']
    },
    {
      id: 'prod_002',
      name: 'SEO Analyzer Dashboard',
      category: 'Analytics',
      description: 'Comprehensive SEO analysis and reporting platform',
      status: 'Active',
      price: '$49/month',
      sales: 156,
      revenue: '$7,644',
      conversionRate: 2.8,
      lastUpdated: '2024-12-05',
      generationTemplate: 'Analytics Tool',
      targetAudience: 'SEO Specialists, Website Owners',
      features: ['Keyword Tracking', 'Competitor Analysis', 'Reporting', 'Alerts']
    },
    {
      id: 'prod_003',
      name: 'Social Media Automation Suite',
      category: 'Marketing',
      description: 'Complete social media management and automation platform',
      status: 'Draft',
      price: '$79/month',
      sales: 0,
      revenue: '$0',
      conversionRate: 0,
      lastUpdated: '2024-12-01',
      generationTemplate: 'Marketing Platform',
      targetAudience: 'Social Media Managers, Small Businesses',
      features: ['Auto-posting', 'Analytics', 'Content Calendar', 'Multi-platform']
    },
    {
      id: 'prod_004',
      name: 'Email Marketing Builder',
      category: 'Marketing',
      description: 'Drag-and-drop email campaign builder with AI assistance',
      status: 'Paused',
      price: '$39/month',
      sales: 89,
      revenue: '$3,471',
      conversionRate: 2.1,
      lastUpdated: '2024-11-28',
      generationTemplate: 'Email Tool',
      targetAudience: 'Email Marketers, E-commerce',
      features: ['Drag & Drop Builder', 'AI Templates', 'A/B Testing', 'Analytics']
    },
    {
      id: 'prod_005',
      name: 'Website Performance Monitor',
      category: 'Analytics',
      description: 'Real-time website performance monitoring and optimization',
      status: 'Active',
      price: '$29/month',
      sales: 312,
      revenue: '$9,048',
      conversionRate: 4.2,
      lastUpdated: '2024-12-04',
      generationTemplate: 'Monitoring Tool',
      targetAudience: 'Web Developers, Website Owners',
      features: ['Real-time Monitoring', 'Performance Alerts', 'Optimization Tips', 'Reports']
    }
  ];

  const generationTemplates = [
    'Premium SaaS Product',
    'Analytics Tool',
    'Marketing Platform',
    'E-commerce Solution',
    'Email Tool',
    'Monitoring Tool',
    'Content Management',
    'Automation Platform'
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'Draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      case 'Paused':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Paused</Badge>;
      case 'Archived':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || product.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="admin-title text-foreground">Products & Generation</h1>
          <p className="admin-subtitle text-muted-foreground">
            Manage AI-generated products, campaigns, and content strategies
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="admin-button">
              <Plus className="h-4 w-4 mr-2" />
              Generate Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Generate New Product</DialogTitle>
              <DialogDescription>
                Use AI to generate a new product concept and marketing strategy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea 
                  id="product-description" 
                  placeholder="Describe your product concept..." 
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="generation-template">Generation Template</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {generationTemplates.map(template => (
                      <SelectItem key={template} value={template}>{template}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="target-audience">Target Audience</Label>
                <Input id="target-audience" placeholder="e.g., Digital Marketers, Small Businesses" />
              </div>
              <div>
                <Label htmlFor="pricing-model">Pricing Model</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pricing model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="subscription">Monthly Subscription</SelectItem>
                    <SelectItem value="one-time">One-time Purchase</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Generate Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productStats.map((stat, index) => (
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

      <Tabs defaultValue="all-products" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[700px]">
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-card border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="admin-label text-foreground">Search Products</Label>
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
                    <SelectTrigger className="mt-2 w-[150px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-2 w-[130px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Products</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredProducts.length} products found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-body-text text-foreground font-medium">{product.name}</div>
                          <div className="admin-stats-label text-muted-foreground text-sm">{product.description}</div>
                          <div className="admin-stats-label text-muted-foreground text-xs">
                            ID: {product.id} • {product.price}
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {product.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {product.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{product.features.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {product.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(product.status)}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="admin-stats-value text-foreground text-sm">{product.sales}</span>
                            <span className="admin-stats-label text-muted-foreground">sales</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="admin-stats-value text-foreground text-sm">{product.conversionRate}%</span>
                            <span className="admin-stats-label text-muted-foreground">conv.</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-value text-foreground text-sm">{product.revenue}</span>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{product.lastUpdated}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
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
              <CardTitle className="admin-card-title text-foreground">Active Products</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Currently live and generating revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {products.filter(p => p.status === 'Active').length} active products
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Draft Products</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Products in development or pending launch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {products.filter(p => p.status === 'Draft').length} products in draft
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generationTemplates.map((template, index) => (
              <Card key={index} className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="admin-card-title text-foreground">{template}</CardTitle>
                  <CardDescription className="admin-card-description text-muted-foreground">
                    AI generation template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="admin-body-text text-muted-foreground">Usage Count</span>
                      <span className="admin-stats-value text-foreground text-sm">{Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="admin-body-text text-muted-foreground">Success Rate</span>
                      <span className="admin-stats-value text-foreground text-sm">{(Math.random() * 20 + 80).toFixed(1)}%</span>
                    </div>
                    <Button size="sm" className="w-full mt-4">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Top Performing Products</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Highest revenue generators this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .filter(p => p.status === 'Active')
                    .sort((a, b) => parseFloat(b.revenue.replace(/[$,]/g, '')) - parseFloat(a.revenue.replace(/[$,]/g, '')))
                    .slice(0, 4)
                    .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{product.name}</div>
                        <div className="admin-stats-label text-muted-foreground">{product.sales} sales • {product.conversionRate}% conv.</div>
                      </div>
                      <div className="text-right">
                        <div className="admin-stats-value text-foreground text-sm">{product.revenue}</div>
                        <div className="admin-stats-label text-muted-foreground">revenue</div>
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
                  Revenue breakdown by product category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Software', 'Analytics', 'Marketing'].map((category, index) => {
                    const categoryProducts = products.filter(p => p.category === category && p.status === 'Active');
                    const totalRevenue = categoryProducts.reduce((sum, p) => sum + parseFloat(p.revenue.replace(/[$,]/g, '')), 0);
                    const totalSales = categoryProducts.reduce((sum, p) => sum + p.sales, 0);
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="admin-body-text text-foreground">{category}</span>
                          <span className="admin-stats-value text-foreground text-sm">${totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="admin-stats-label text-muted-foreground">{categoryProducts.length} products</span>
                          <span className="admin-stats-label text-muted-foreground">{totalSales} sales</span>
                        </div>
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
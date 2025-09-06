import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Settings,
  Package,
  Save,
  AlertCircle
} from 'lucide-react';

export default function AutomationPage() {
  const [formData, setFormData] = useState({
    // Brand & Company Information
    company_name: '',
    company_slogan: '',
    industry: '',
    website_url: '',
    website_description: '',
    knowledge_base: '',
    override: '',
    
    // Article Automation Setup
    core_keyword: '',
    target_audience: '',
    target_market: '',
    language: 'English',
    word_counts: '8000',
    tone_of_voice: '',
    blog_frequency: '1',
    status: 'draft',
    
    // Product Type
    product_name: '',
    product_type: 'product',
    product_url: '',
    product_detail_level: 'medium',
    product_specific: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving automation configuration:', formData);
    // Implementation for saving configuration
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Automation Configuration</h1>
        <p className="admin-subtitle mt-2">
          Configure your automation settings across branding, articles, and products.
        </p>
      </div>

      {/* Automation Section with Sub-tabs */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Automation</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Configure your automation settings across branding, articles, and products
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="branding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger value="branding" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Building2 className="h-4 w-4" />
                <span>Branding</span>
              </TabsTrigger>
              <TabsTrigger value="article" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="h-4 w-4" />
                <span>Article</span>
              </TabsTrigger>
              <TabsTrigger value="product" className="flex items-center space-x-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Package className="h-4 w-4" />
                <span>Product</span>
              </TabsTrigger>
            </TabsList>

            {/* Branding Sub-tab */}
            <TabsContent value="branding" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_name" className="admin-label">
                      Company Name <Badge variant="outline" className="ml-2">{`{{company_name}}`}</Badge>
                    </Label>
                    <Input
                      id="company_name"
                      placeholder="Enter your company/brand name"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Main entity name to be featured in content</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company_slogan" className="admin-label">
                      Company Slogan <Badge variant="outline" className="ml-2">{`{{company_slogan}}`}</Badge>
                    </Label>
                    <Input
                      id="company_slogan"
                      placeholder="Your brand's core message"
                      value={formData.company_slogan}
                      onChange={(e) => handleInputChange('company_slogan', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Brand core proposition/tagline</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="admin-label">
                      Industry <Badge variant="outline" className="ml-2">{`{{industry}}`}</Badge>
                    </Label>
                    <Input
                      id="industry"
                      placeholder="e.g., Technology, Healthcare, Finance"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Industry sector for content relevance</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website_url" className="admin-label">
                      Website URL <Badge variant="outline" className="ml-2">{`{{website_url}}`}</Badge>
                    </Label>
                    <Input
                      id="website_url"
                      placeholder="https://yourwebsite.com"
                      value={formData.website_url}
                      onChange={(e) => handleInputChange('website_url', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Official website link for content integration</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website_description" className="admin-label">
                    Website Description <Badge variant="outline" className="ml-2">{`{{website_description}}`}</Badge>
                  </Label>
                  <Textarea
                    id="website_description"
                    placeholder="Brief description of your website's core content and purpose"
                    value={formData.website_description}
                    onChange={(e) => handleInputChange('website_description', e.target.value)}
                    className="admin-body-text"
                    rows={3}
                  />
                  <p className="admin-stats-label">Brief description of website's core content</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="knowledge_base" className="admin-label">
                    Knowledge Base <Badge variant="outline" className="ml-2">{`{{knowledge_base}}`}</Badge>
                  </Label>
                  <Textarea
                    id="knowledge_base"
                    placeholder="Authoritative sources, databases, or reference materials for content"
                    value={formData.knowledge_base}
                    onChange={(e) => handleInputChange('knowledge_base', e.target.value)}
                    className="admin-body-text"
                    rows={3}
                  />
                  <p className="admin-stats-label">Authoritative data sources for content reference</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="override" className="admin-label flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Override Instructions <Badge variant="outline" className="ml-2">{`{{override}}`}</Badge></span>
                  </Label>
                  <Textarea
                    id="override"
                    placeholder="Highest priority requirements that override other instructions when conflicts arise"
                    value={formData.override}
                    onChange={(e) => handleInputChange('override', e.target.value)}
                    className="admin-body-text"
                    rows={3}
                  />
                  <p className="admin-stats-label text-orange-600">
                    Highest priority instructions - takes precedence over conflicting directives
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Article Sub-tab */}
            <TabsContent value="article" className="space-y-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="core_keyword" className="admin-label">
                      Core Keyword <Badge variant="outline" className="ml-2">{`{{core_keyword}}`}</Badge>
                    </Label>
                    <Input
                      id="core_keyword"
                      placeholder="Main keyword for the entire project"
                      value={formData.core_keyword}
                      onChange={(e) => handleInputChange('core_keyword', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Primary keyword that runs through the entire project</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target_audience" className="admin-label">
                      Target Audience <Badge variant="outline" className="ml-2">{`{{target_audience}}`}</Badge>
                    </Label>
                    <Input
                      id="target_audience"
                      placeholder="e.g., Small business owners, Marketing professionals"
                      value={formData.target_audience}
                      onChange={(e) => handleInputChange('target_audience', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Demographic characteristics of intended readers</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="target_market" className="admin-label">
                      Target Market <Badge variant="outline" className="ml-2">{`{{target_market}}`}</Badge>
                    </Label>
                    <Input
                      id="target_market"
                      placeholder="e.g., North America, APAC, Europe"
                      value={formData.target_market}
                      onChange={(e) => handleInputChange('target_market', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Geographic regions and market scope</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="admin-label">
                      Language <Badge variant="outline" className="ml-2">{`{{language}}`}</Badge>
                    </Label>
                    <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select content language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Chinese">Chinese (中文)</SelectItem>
                        <SelectItem value="Spanish">Spanish (Español)</SelectItem>
                        <SelectItem value="French">French (Français)</SelectItem>
                        <SelectItem value="German">German (Deutsch)</SelectItem>
                        <SelectItem value="Japanese">Japanese (日本語)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Article content language (supports multiple languages)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="word_counts" className="admin-label">
                      Target Word Count <Badge variant="outline" className="ml-2">{`{{word_counts}}`}</Badge>
                    </Label>
                    <Select value={formData.word_counts} onValueChange={(value) => handleInputChange('word_counts', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select word count range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5000">5,000 words</SelectItem>
                        <SelectItem value="8000">8,000 words</SelectItem>
                        <SelectItem value="10000">10,000 words</SelectItem>
                        <SelectItem value="12000">12,000 words</SelectItem>
                        <SelectItem value="15000">15,000 words</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Target article length (5,000-15,000 words)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tone_of_voice" className="admin-label">
                      Tone of Voice <Badge variant="outline" className="ml-2">{`{{tone_of_voice}}`}</Badge>
                    </Label>
                    <Select value={formData.tone_of_voice} onValueChange={(value) => handleInputChange('tone_of_voice', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select content tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="authoritative">Authoritative</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Writing style and expression tone</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blog_frequency" className="admin-label">
                      Publishing Frequency <Badge variant="outline" className="ml-2">{`{{blog_frequency}}`}</Badge>
                    </Label>
                    <Select value={formData.blog_frequency} onValueChange={(value) => handleInputChange('blog_frequency', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Daily (1 article/day)</SelectItem>
                        <SelectItem value="3">3 times per week</SelectItem>
                        <SelectItem value="2">Twice per week</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Content update frequency schedule</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status" className="admin-label">
                      Article Status <Badge variant="outline" className="ml-2">{`{{status}}`}</Badge>
                    </Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Save as Draft</SelectItem>
                        <SelectItem value="auto-publish">Auto-Publish</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Article publication status setting</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Product Sub-tab */}
            <TabsContent value="product" className="space-y-6">
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <p className="text-orange-800 text-sm">
                    <strong>Optional Configuration:</strong> Configure product details for enhanced content recommendations and integrations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="product_name" className="admin-label">
                      Product Name <Badge variant="outline" className="ml-2">{`{{product_name}}`}</Badge>
                    </Label>
                    <Input
                      id="product_name"
                      placeholder="e.g., SaaS Platform, Mobile App, Service"
                      value={formData.product_name}
                      onChange={(e) => handleInputChange('product_name', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Primary product or service offering</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product_type" className="admin-label">
                      Product Type <Badge variant="outline" className="ml-2">{`{{product_type}}`}</Badge>
                    </Label>
                    <Select value={formData.product_type} onValueChange={(value) => handleInputChange('product_type', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Physical Product</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="software">Software/SaaS</SelectItem>
                        <SelectItem value="app">Mobile Application</SelectItem>
                        <SelectItem value="platform">Digital Platform</SelectItem>
                        <SelectItem value="course">Educational Course</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Category classification for targeted content</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product_url" className="admin-label">
                      Product URL <Badge variant="outline" className="ml-2">{`{{product_url}}`}</Badge>
                    </Label>
                    <Input
                      id="product_url"
                      placeholder="https://yourproduct.com"
                      value={formData.product_url}
                      onChange={(e) => handleInputChange('product_url', e.target.value)}
                      className="admin-body-text"
                    />
                    <p className="admin-stats-label">Direct link to product page for integration</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product_detail_level" className="admin-label">
                      Detail Level <Badge variant="outline" className="ml-2">{`{{product_detail_level}}`}</Badge>
                    </Label>
                    <Select value={formData.product_detail_level} onValueChange={(value) => handleInputChange('product_detail_level', value)}>
                      <SelectTrigger className="admin-body-text">
                        <SelectValue placeholder="Select detail level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">Minimal - Brief mentions</SelectItem>
                        <SelectItem value="medium">Medium - Balanced integration</SelectItem>
                        <SelectItem value="detailed">Detailed - Comprehensive coverage</SelectItem>
                        <SelectItem value="extensive">Extensive - Deep integration</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="admin-stats-label">Product integration depth in content</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="product_specific" className="admin-label flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Product-Specific Requirements <Badge variant="outline" className="ml-2">{`{{product_specific}}`}</Badge></span>
                  </Label>
                  <Textarea
                    id="product_specific"
                    placeholder="Specific requirements for product introduction, such as hook link settings, etc."
                    value={formData.product_specific}
                    onChange={(e) => handleInputChange('product_specific', e.target.value)}
                    className="admin-body-text"
                    rows={4}
                  />
                  <p className="admin-stats-label">
                    Highest priority product introduction requirements (e.g., hook link configurations)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="admin-button">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave} className="admin-button flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Configuration</span>
        </Button>
      </div>
    </div>
  );
}
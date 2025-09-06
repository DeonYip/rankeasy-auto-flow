import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  Save,
  AlertCircle
} from 'lucide-react';

export default function ProductPage() {
  const [formData, setFormData] = useState({
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
    console.log('Saving product configuration:', formData);
    // Implementation for saving configuration
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Product Configuration</h1>
        <p className="admin-subtitle mt-2">
          Configure your product details for enhanced content recommendations and integrations.
        </p>
      </div>

      {/* Product Configuration */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Package className="h-5 w-5 text-primary" />
            <span>Product Type Configuration</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Configure product details for enhanced content recommendations and integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
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
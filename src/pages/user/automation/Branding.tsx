import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Save,
  AlertCircle
} from 'lucide-react';

export default function BrandingPage() {
  const [formData, setFormData] = useState({
    company_name: '',
    company_slogan: '',
    industry: '',
    website_url: '',
    website_description: '',
    knowledge_base: '',
    override: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving branding configuration:', formData);
    // Implementation for saving configuration
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Branding Configuration</h1>
        <p className="admin-subtitle mt-2">
          Configure your brand information and company details for content integration.
        </p>
      </div>

      {/* Branding Configuration */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Brand & Company Information</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Company and brand details for content integration, making sure all the padding are the same.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
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
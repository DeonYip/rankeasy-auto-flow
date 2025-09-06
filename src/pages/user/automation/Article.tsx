import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Settings,
  Save
} from 'lucide-react';

export default function ArticlePage() {
  const [formData, setFormData] = useState({
    core_keyword: '',
    target_audience: '',
    target_market: '',
    language: 'English',
    word_counts: '8000',
    tone_of_voice: '',
    blog_frequency: '1',
    status: 'draft',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving article configuration:', formData);
    // Implementation for saving configuration
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Article Configuration</h1>
        <p className="admin-subtitle mt-2">
          Configure your article automation parameters for content generation.
        </p>
      </div>

      {/* Article Configuration */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Article Automation Setup</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Runtime configuration parameters for content generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
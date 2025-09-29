import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Settings,
  Save,
  Play,
  StopCircle
} from 'lucide-react';

export default function ArticlePage() {
  const [formData, setFormData] = useState({
    core_keyword: '',
    target_audience: '',
    target_market: '',
    language: 'English',
    word_counts: '5000',
    tone_of_voice: 'Formal',
    blog_frequency: '10',
    status: 'Save as Draft',
  });

  const [isAutomationRunning, setIsAutomationRunning] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.core_keyword.trim()) {
      newErrors.core_keyword = 'Core Keyword is required';
    }
    if (!formData.target_audience.trim()) {
      newErrors.target_audience = 'Target Audience is required';
    }
    if (!formData.target_market.trim()) {
      newErrors.target_market = 'Target Market is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving article configuration:', formData);
      // Implementation for saving configuration
    }
  };

  const handleResetDefaults = () => {
    setFormData({
      core_keyword: '',
      target_audience: '',
      target_market: '',
      language: 'English',
      word_counts: '5000',
      tone_of_voice: 'Formal',
      blog_frequency: '10',
      status: 'Save as Draft',
    });
    setErrors({});
  };

  const handleRunAutomation = () => {
    if (validateForm()) {
      setIsAutomationRunning(true);
      console.log('Starting automation with config:', formData);
      // Implementation for starting automation
    }
  };

  const handleStopAutomation = () => {
    setIsAutomationRunning(false);
    console.log('Stopping automation');
    // Implementation for stopping automation
  };

  // Language options (top 100 languages)
  const languages = [
    'English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Italian', 'Portuguese', 'Russian',
    'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech', 'Hungarian',
    'Romanian', 'Bulgarian', 'Croatian', 'Serbian', 'Slovak', 'Slovenian', 'Estonian', 'Latvian', 'Lithuanian', 'Greek',
    'Turkish', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian', 'Malay', 'Filipino', 'Bengali', 'Urdu', 'Persian',
    'Ukrainian', 'Belarusian', 'Georgian', 'Armenian', 'Azerbaijani', 'Kazakh', 'Uzbek', 'Tajik', 'Kyrgyz', 'Mongolian'
  ];

  // Tone of voice options (20 options)
  const toneOptions = [
    'Formal', 'Casual', 'Professional', 'Conversational', 'Authoritative', 'Friendly', 'Inspirational', 'Educational',
    'Persuasive', 'Informative', 'Encouraging', 'Confident', 'Empathetic', 'Enthusiastic', 'Thoughtful', 'Direct',
    'Humorous', 'Serious', 'Optimistic', 'Analytical'
  ];

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Article Configuration</h1>
        <p className="admin-subtitle mt-2">
          Configure your article automation parameters for content generation.
        </p>
      </div>

      {/* Article Content Setup */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Article Content Setup</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Configure content parameters for content generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="core_keyword" className="admin-label">
                Core Keyword <Badge variant="outline" className="ml-2">{`{{core_keyword}}`}</Badge>
              </Label>
              <Input
                id="core_keyword"
                placeholder="e.g., digital marketing"
                value={formData.core_keyword}
                onChange={(e) => handleInputChange('core_keyword', e.target.value)}
                className={`admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50 ${errors.core_keyword ? 'border-red-500' : ''}`}
              />
              {errors.core_keyword && <p className="text-red-500 text-sm">{errors.core_keyword}</p>}
              <p className="admin-stats-label">Primary keyword that runs through the entire project</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_audience" className="admin-label">
                Target Audience <Badge variant="outline" className="ml-2">{`{{target_audience}}`}</Badge>
              </Label>
              <Input
                id="target_audience"
                placeholder="e.g., small business owners, marketing professionals"
                value={formData.target_audience}
                onChange={(e) => handleInputChange('target_audience', e.target.value)}
                className={`admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50 ${errors.target_audience ? 'border-red-500' : ''}`}
              />
              {errors.target_audience && <p className="text-red-500 text-sm">{errors.target_audience}</p>}
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
                className={`admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50 ${errors.target_market ? 'border-red-500' : ''}`}
              />
              {errors.target_market && <p className="text-red-500 text-sm">{errors.target_market}</p>}
              <p className="admin-stats-label">Geographic regions and market scope</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language" className="admin-label">
                Language <Badge variant="outline" className="ml-2">{`{{language}}`}</Badge>
              </Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger className="admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50">
                  <SelectValue placeholder="Select content language" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="admin-stats-label">Article content language (supports multiple languages)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="word_counts" className="admin-label">
                Target Word Count <Badge variant="outline" className="ml-2">{`{{word_counts}}`}</Badge>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="word_counts"
                  type="number"
                  placeholder="5000"
                  value={formData.word_counts}
                  onChange={(e) => handleInputChange('word_counts', e.target.value)}
                  className="admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50"
                  min="1000"
                  max="50000"
                />
                <span className="admin-body-text text-muted-foreground">words</span>
              </div>
              <p className="admin-stats-label">Target article length (default: 5,000 words)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone_of_voice" className="admin-label">
                Tone of Voice <Badge variant="outline" className="ml-2">{`{{tone_of_voice}}`}</Badge>
              </Label>
              <Select value={formData.tone_of_voice} onValueChange={(value) => handleInputChange('tone_of_voice', value)}>
                <SelectTrigger className="admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50">
                  <SelectValue placeholder="Select content tone" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {toneOptions.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="admin-stats-label">Writing style and expression tone</p>
            </div>
          </div>
          
          {/* Save and Reset Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-card-border">
            <Button variant="outline" onClick={handleResetDefaults} className="admin-button transition-all duration-200 hover:shadow-md">
              Reset to Defaults
            </Button>
            <Button onClick={handleSave} className="admin-button flex items-center space-x-2 transition-all duration-200 hover:shadow-md hover:scale-105">
              <Save className="h-4 w-4" />
              <span>Save Configuration</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Article Automation Setup */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <CardTitle className="admin-card-title flex items-center space-x-2">
            <Settings className="h-5 w-5 text-primary" />
            <span>Article Automation Setup</span>
          </CardTitle>
          <CardDescription className="admin-card-description">
            Configure automation parameters for blog generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="blog_frequency" className="admin-label">
                Publishing Frequency <Badge variant="outline" className="ml-2">{`{{blog_frequency}}`}</Badge>
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="blog_frequency"
                  type="number"
                  placeholder="10"
                  value={formData.blog_frequency}
                  onChange={(e) => handleInputChange('blog_frequency', e.target.value)}
                  className="admin-body-text w-20 transition-all duration-200 hover:shadow-sm hover:border-primary/50"
                  min="1"
                  max="100"
                />
                <span className="admin-body-text text-muted-foreground">Blogs/Day</span>
              </div>
              <p className="admin-stats-label">Content update frequency schedule</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="admin-label">
                Blog Status <Badge variant="outline" className="ml-2">{`{{status}}`}</Badge>
              </Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger className="admin-body-text transition-all duration-200 hover:shadow-sm hover:border-primary/50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Save as Draft">Save as Draft</SelectItem>
                  <SelectItem value="Publish">Publish</SelectItem>
                </SelectContent>
              </Select>
              <p className="admin-stats-label">Article publication status setting</p>
            </div>

            <div className="space-y-4">
              <Label className="admin-label">
                Automation Control
              </Label>
              <div className="flex space-x-4">
                <Button 
                  onClick={handleRunAutomation}
                  disabled={isAutomationRunning}
                  className="admin-button flex items-center space-x-2 transition-all duration-200 hover:shadow-md hover:scale-105 bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-4 w-4" />
                  <span>Run Automation</span>
                </Button>
                <Button 
                  onClick={handleStopAutomation}
                  disabled={!isAutomationRunning}
                  variant="outline"
                  className="admin-button flex items-center space-x-2 transition-all duration-200 hover:shadow-md hover:scale-105 text-red-600 border-red-600 hover:bg-red-50"
                >
                  <StopCircle className="h-4 w-4" />
                  <span>Stop</span>
                </Button>
              </div>
              <p className="admin-stats-label">
                {isAutomationRunning ? 'Automation is currently running' : 'Start or stop the blog automation process'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
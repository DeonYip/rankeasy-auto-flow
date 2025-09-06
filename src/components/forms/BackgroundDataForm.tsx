import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Save, FileText, Building, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BackgroundData {
  // 基礎資訊
  coreKeyword: string;
  keyword: string;
  industry: string;
  targetAudience: string;
  targetMarket: string;
  language: string;
  toneOfVoice: string;
  wordCounts: string;
  
  // 品牌與產品資訊
  companyName: string;
  companyTagline: string;
  websiteUrl: string;
  websiteDescription: string;
  productName: string;
  productType: string;
  productUrl: string;
  productSpecific: string;
}

export function BackgroundDataForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<BackgroundData>({
    coreKeyword: '',
    keyword: '',
    industry: '',
    targetAudience: '',
    targetMarket: '',
    language: 'English',
    toneOfVoice: '',
    wordCounts: '8000',
    companyName: '',
    companyTagline: '',
    websiteUrl: '',
    websiteDescription: '',
    productName: '',
    productType: 'Service',
    productUrl: '',
    productSpecific: ''
  });

  const handleInputChange = (field: keyof BackgroundData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for demo purposes
      localStorage.setItem('backgroundData', JSON.stringify(formData));
      
      toast({
        title: "Background Data Saved",
        description: "Your article generation parameters have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save background data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Load data from localStorage on component mount
  React.useEffect(() => {
    const saved = localStorage.getItem('backgroundData');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="admin-section-title text-foreground">Background Data Configuration</h2>
        <p className="admin-subtitle">
          Configure the background parameters for article generation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 基礎資訊 */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="admin-card-title flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Basic Information
            </CardTitle>
            <CardDescription className="admin-card-description">
              Core parameters for content generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coreKeyword">Core Keyword *</Label>
                <Input
                  id="coreKeyword"
                  placeholder="e.g., Cancer"
                  value={formData.coreKeyword}
                  onChange={(e) => handleInputChange('coreKeyword', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keyword">Article Keyword *</Label>
                <Input
                  id="keyword"
                  placeholder="e.g., Lung Cancer"
                  value={formData.keyword}
                  onChange={(e) => handleInputChange('keyword', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry *</Label>
              <Input
                id="industry"
                placeholder="e.g., Cancer Medication"
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetAudience">Target Audience *</Label>
              <Input
                id="targetAudience"
                placeholder="e.g., Advanced Cancer Patients"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetMarket">Target Market *</Label>
                <Input
                  id="targetMarket"
                  placeholder="e.g., Hong Kong"
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toneOfVoice">Tone of Voice *</Label>
              <Textarea
                id="toneOfVoice"
                placeholder="e.g., Empathetic and Compassionate, Informative and Clear, Hopeful and Inspirational"
                value={formData.toneOfVoice}
                onChange={(e) => handleInputChange('toneOfVoice', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="wordCounts">Target Word Count *</Label>
              <Input
                id="wordCounts"
                type="number"
                placeholder="8000"
                value={formData.wordCounts}
                onChange={(e) => handleInputChange('wordCounts', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 品牌與產品資訊 */}
        <Card className="border-card-border">
          <CardHeader>
            <CardTitle className="admin-card-title flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Brand & Company Information
            </CardTitle>
            <CardDescription className="admin-card-description">
              Company and brand details for content integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="e.g., AllCancer"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyTagline">Company Tagline</Label>
              <Input
                id="companyTagline"
                placeholder="e.g., Innovative 4D Cancer Metabolic Therapy"
                value={formData.companyTagline}
                onChange={(e) => handleInputChange('companyTagline', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL *</Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://allcancer.com"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productType">Product Type *</Label>
                <Select value={formData.productType} onValueChange={(value) => handleInputChange('productType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="websiteDescription">Website Description</Label>
              <Textarea
                id="websiteDescription"
                placeholder="e.g., Innovative 4D Cancer Metabolic Therapy"
                value={formData.websiteDescription}
                onChange={(e) => handleInputChange('websiteDescription', e.target.value)}
                rows={2}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h4 className="admin-label flex items-center text-foreground">
                <Package className="w-4 h-4 mr-2" />
                Product/Service Details
              </h4>

              <div className="space-y-2">
                <Label htmlFor="productName">Product/Service Name *</Label>
                <Textarea
                  id="productName"
                  placeholder="e.g., 4D Cancer Metabolic Therapy: Metabolic Reprogramming; Dual Immune Modulation; Smart Nano-Targeting; Tumor Microenvironment Remodeling"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productUrl">Product URL</Label>
                <Input
                  id="productUrl"
                  placeholder="https://allcancer.com/treatment-cancer/"
                  value={formData.productUrl}
                  onChange={(e) => handleInputChange('productUrl', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productSpecific">Product Specific Requirements</Label>
                <Textarea
                  id="productSpecific"
                  placeholder="Specific requirements for product integration in articles..."
                  value={formData.productSpecific}
                  onChange={(e) => handleInputChange('productSpecific', e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={isLoading}
          className="min-w-[120px]"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Configuration'}
        </Button>
      </div>
    </div>
  );
}
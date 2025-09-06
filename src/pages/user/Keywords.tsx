import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Upload,
  Download,
  Trash2,
  Plus,
  Hash,
  FileText,
  AlertCircle,
  Check
} from 'lucide-react';

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<string[]>([
    'content marketing strategy',
    'SEO optimization techniques',
    'digital marketing trends',
    'social media automation',
    'email marketing campaigns'
  ]);
  const [textInput, setTextInput] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const newKeywords = textInput
      .split(',')
      .map(keyword => keyword.trim())
      .filter(keyword => keyword.length > 0)
      .filter(keyword => !keywords.includes(keyword));
    
    setKeywords(prev => [...prev, ...newKeywords]);
    setTextInput('');
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const csvKeywords = text
        .split(/[,\n]/)
        .map(keyword => keyword.trim().replace(/['"]/g, ''))
        .filter(keyword => keyword.length > 0)
        .filter(keyword => !keywords.includes(keyword));
      
      setKeywords(prev => [...prev, ...csvKeywords]);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === 'text/csv' || file.name.endsWith('.csv'));
    
    if (csvFile) {
      handleFileUpload(csvFile);
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setKeywords(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const clearAllKeywords = () => {
    setKeywords([]);
  };

  const exportKeywords = () => {
    const csvContent = keywords.join(',\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keywords.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="admin-title">Keyword Management</h1>
        <p className="admin-subtitle mt-2">
          Manage your article keywords for content generation and SEO optimization.
        </p>
      </div>

      {/* Keyword Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="admin-card-description font-medium">
              Total Keywords
            </CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="admin-stats-value">{keywords.length}</div>
            <p className="admin-stats-label">Active keywords</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="admin-card-description font-medium">
              Articles Generated
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="admin-stats-value">47</div>
            <p className="admin-stats-label">Using these keywords</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="admin-card-description font-medium">
              Ranked Organic Keywords
            </CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="admin-stats-value">1,270</div>
            <p className="admin-stats-label">Currently ranking</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Keywords Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* CSV Upload Method */}
        <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
            <CardTitle className="admin-card-title flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <span>Upload CSV File</span>
            </CardTitle>
            <CardDescription className="admin-card-description">
              Upload a CSV file containing your keywords
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
            >
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
              <p className="admin-body-text mb-2">
                Drag and drop your CSV file here, or
              </p>
              <Button 
                variant="outline" 
                className="admin-button"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = '.csv';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) handleFileUpload(file);
                  };
                  input.click();
                }}
              >
                Browse Files
              </Button>
              <p className="admin-stats-label mt-2">
                Supports CSV files with comma-separated keywords
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Keywords */}
      <Card className="bg-gradient-card shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="border-b border-card-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="admin-card-title">Current Keywords</CardTitle>
              <CardDescription className="admin-card-description">
                Manage your active keyword list
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportKeywords}
                disabled={keywords.length === 0}
                className="admin-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearAllKeywords}
                disabled={keywords.length === 0}
                className="admin-button text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {keywords.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="admin-body-text">
                No keywords added yet. Use the methods above to add your first keywords for content generation.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 text-sm admin-body-text flex items-center space-x-2"
                  >
                    <span>{keyword}</span>
                    <button
                      onClick={() => removeKeyword(index)}
                      className="ml-2 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <Separator />
              
              <div className="text-center">
                <p className="admin-stats-label">
                  {keywords.length} keyword{keywords.length !== 1 ? 's' : ''} configured for content generation
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Information */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="admin-body-text">
          <strong>How keywords are used:</strong> These keywords will be automatically integrated into your content generation process. 
          Each article will focus on relevant keywords from this list based on your automation configuration and content requirements.
        </AlertDescription>
      </Alert>
    </div>
  );
}
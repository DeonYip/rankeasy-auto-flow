import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Copy,
  CheckCircle,
  Calendar,
  ArrowLeft,
  Play,
  Pause,
  AlertTriangle,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

// Mock data for prompt versions
const promptVersions = [
  {
    id: 'v1.0',
    version: 'v1.0',
    isActive: true,
    lastUpdated: '2024-12-25',
    blogsCreated: 47,
    description: 'Initial blog writing prompt version'
  },
  {
    id: 'v1.1',
    version: 'v1.1',
    isActive: false,
    lastUpdated: '2024-12-20',
    blogsCreated: 32,
    description: 'Enhanced SEO optimization and meta structure'
  },
  {
    id: 'v1.2',
    version: 'v1.2',
    isActive: false,
    lastUpdated: '2024-12-15',
    blogsCreated: 25,
    description: 'Improved content flow and readability'
  },
  {
    id: 'v0.9',
    version: 'v0.9',
    isActive: false,
    lastUpdated: '2024-12-10',
    blogsCreated: 18,
    description: 'Beta version with basic functionality'
  }
];

// Mock prompt data for a specific version
const getPromptData = (version: string) => ({
  userIntention: `Create comprehensive, SEO-optimized blog posts that provide valuable insights and drive organic traffic. Focus on user search intent and deliver actionable content that establishes authority in the subject matter.

Target audience: Business professionals, entrepreneurs, and industry experts seeking practical knowledge and insights.

Goals:
- Increase organic search visibility
- Establish thought leadership
- Drive qualified traffic to the website
- Encourage social sharing and engagement`,

  writingContent: `Write a comprehensive, engaging blog post about [TOPIC] that follows these guidelines:

**Structure Requirements:**
- Start with a compelling hook in the introduction
- Use clear, descriptive H2 and H3 headings
- Include 5-7 main sections with 150-200 words each
- Add bullet points and numbered lists for easy scanning
- Conclude with actionable takeaways

**Content Guidelines:**
- Write in a conversational yet professional tone
- Include relevant statistics, examples, and case studies
- Use transition sentences between sections
- Incorporate the target keyword [KEYWORD] naturally
- Add internal linking opportunities where relevant

**SEO Requirements:**
- Target word count: [WORD_COUNT] words
- Include keyword variations and LSI keywords
- Optimize for featured snippets with clear answers
- Use semantic keywords related to the main topic`,

  aiRemoval: `Instructions for removing AI-like patterns and ensuring human-like content:

**Avoid AI Patterns:**
- Remove phrases like "In conclusion," "It's important to note," "Furthermore"
- Eliminate repetitive sentence structures
- Avoid overly formal or robotic language
- Remove generic statements without specificity

**Humanization Techniques:**
- Add personal insights and opinions
- Include real-world examples and anecdotes
- Use conversational connectors like "Here's the thing" or "What's interesting is"
- Vary sentence length and structure naturally
- Include rhetorical questions to engage readers

**Content Enhancement:**
- Add specific numbers, percentages, and data points
- Include industry-specific terminology naturally
- Create unique analogies and comparisons
- Add controversial or thought-provoking statements (when appropriate)`,

  metaStructure: `Meta title and description optimization guidelines:

**Meta Title (50-60 characters):**
- Include primary keyword [KEYWORD] near the beginning
- Create compelling, click-worthy titles
- Use power words like "Ultimate," "Complete," "Essential"
- Ensure it accurately reflects the content
- Format: [Number] [Adjective] [Keyword] [Benefit/Action]

**Meta Description (150-160 characters):**
- Include primary keyword and 1-2 secondary keywords
- Create a compelling summary that encourages clicks
- Include a clear value proposition
- End with a call-to-action when appropriate
- Use active voice and action-oriented language

**URL Structure:**
- Use primary keyword in URL slug
- Keep it concise and readable
- Use hyphens to separate words
- Avoid unnecessary words like "a," "the," "and"

**Schema Markup:**
- Implement Article schema
- Include author, publication date, and organization
- Add FAQ schema for Q&A sections
- Consider HowTo schema for step-by-step content`,

  images: `Image optimization and selection guidelines:

**Image Selection:**
- Choose high-quality, relevant images that support the content
- Use original images when possible, or high-quality stock photos
- Ensure images match the article's tone and brand style
- Include at least 1 hero image and 3-5 supporting images

**Technical Requirements:**
- Optimal size: 1200x630 pixels for featured images
- File format: WebP for smaller file sizes, JPG/PNG as fallback
- Compress images to under 100KB when possible
- Use descriptive, keyword-rich file names

**Alt Text Optimization:**
- Write descriptive alt text including target keywords naturally
- Keep alt text between 100-125 characters
- Describe what the image shows, not just keywords
- Include location or brand name when relevant

**Image Placement:**
- Place hero image after the introduction
- Break up long text sections with relevant images
- Use images to illustrate complex concepts
- Consider infographics for data-heavy content

**Captions and Attribution:**
- Add engaging captions that encourage further reading
- Include proper attribution for licensed images
- Use captions to provide additional context or insights
- Keep captions concise but informative`
});

export default function PromptManagement() {
  const { version } = useParams();
  const navigate = useNavigate();
  const [activeVersion, setActiveVersion] = useState('v1.0');
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const [cloneVersion, setCloneVersion] = useState('');
  const [sortField, setSortField] = useState<'version' | 'lastUpdated'>('version');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // If version parameter exists, show the detail page
  if (version) {
    return <PromptVersionDetail version={version} />;
  }

  const handleToggleStatus = (versionId: string) => {
    setActiveVersion(versionId);
    // In real implementation, this would update the backend
  };

  const handleSort = (field: 'version' | 'lastUpdated') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortedVersions = () => {
    return [...promptVersions].sort((a, b) => {
      let aVal, bVal;
      
      if (sortField === 'version') {
        // Parse version numbers for proper sorting (v1.0, v1.1, v1.2, etc.)
        aVal = parseFloat(a.version.replace('v', ''));
        bVal = parseFloat(b.version.replace('v', ''));
      } else {
        aVal = new Date(a.lastUpdated).getTime();
        bVal = new Date(b.lastUpdated).getTime();
      }
      
      if (sortDirection === 'asc') {
        return aVal - bVal;
      } else {
        return bVal - aVal;
      }
    });
  };

  const getSortIcon = (field: 'version' | 'lastUpdated') => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-primary" />
      : <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const handleClone = (versionId: string) => {
    setCloneVersion(versionId);
    setIsCloneDialogOpen(true);
  };

  const handleEdit = (versionId: string) => {
    navigate(`/admin/prompts/${versionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="admin-title text-foreground">Blog Writing Prompt Versions</h1>
          <p className="admin-subtitle text-muted-foreground">
            Manage different versions of your blog writing prompts. Only one version can be active at a time.
          </p>
        </div>
        <Button className="admin-button" onClick={() => setIsCloneDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Version
        </Button>
      </div>

      {/* Active Prompt Status */}
      <Card className="bg-gradient-card border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="admin-card-title text-foreground flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            Currently Active: {promptVersions.find(p => p.isActive)?.version}
          </CardTitle>
          <CardDescription className="admin-card-description text-muted-foreground">
            This version is currently being used for all blog generation
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Prompt Versions List */}
      <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="admin-card-title text-foreground">Prompt Version History</CardTitle>
          <CardDescription className="admin-card-description text-muted-foreground">
            All versions of your blog writing prompts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                    onClick={() => handleSort('version')}
                  >
                    Version
                    {getSortIcon('version')}
                  </Button>
                </TableHead>
                <TableHead className="w-[160px]">
                  <Button
                    variant="ghost"
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                    onClick={() => handleSort('lastUpdated')}
                  >
                    Last Updated
                    {getSortIcon('lastUpdated')}
                  </Button>
                </TableHead>
                <TableHead className="w-[140px]">Blogs Created</TableHead>
                <TableHead className="flex-1">Description</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedVersions().map((prompt, index) => (
                <TableRow 
                  key={prompt.id} 
                  className={`cursor-pointer hover:bg-muted/50 transition-colors border-b ${
                    index % 2 === 1 ? 'bg-muted/20' : 'bg-background'
                  }`}
                  onClick={() => navigate(`/admin/prompts/${prompt.version}`)}
                >
                  <TableCell className="border-r border-border/50">
                    <div className="font-medium text-foreground">{prompt.version}</div>
                  </TableCell>
                  <TableCell className="border-r border-border/50">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {prompt.lastUpdated}
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-border/50">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{prompt.blogsCreated}</span>
                    </div>
                  </TableCell>
                  <TableCell className="border-r border-border/50">
                    <span className="text-muted-foreground">{prompt.description}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={prompt.isActive ? "default" : "outline"}
                        size="sm"
                        className={`min-w-[80px] ${
                          prompt.isActive 
                            ? 'bg-green-600 hover:bg-green-700 text-white' 
                            : 'hover:bg-green-50 hover:text-green-700 hover:border-green-300'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStatus(prompt.id);
                        }}
                      >
                        {prompt.isActive ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Activate
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(prompt.version);
                        }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClone(prompt.id);
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Clone Dialog */}
      <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clone Prompt Version</DialogTitle>
            <DialogDescription>
              Create a new version based on an existing prompt
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-version">New Version Number</Label>
              <Input id="new-version" placeholder="e.g., v1.3" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Brief description of changes" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCloneDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsCloneDialogOpen(false)}>
              Create Version
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Component for individual prompt version detail page
function PromptVersionDetail({ version }: { version: string }) {
  const navigate = useNavigate();
  const promptData = getPromptData(version);
  const [activeTab, setActiveTab] = useState('user-intention');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(promptData);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [showVersionSelector, setShowVersionSelector] = useState(false);
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [history, setHistory] = useState<Array<{timestamp: Date, action: string}>>([]);

  // Mock version metadata
  const versionMeta = {
    createdAt: '2024-12-25 14:30',
    creator: 'Admin - Zhang San',
    status: version === 'v1.0' ? 'Active' : 'Draft',
    isReferenced: version === 'v1.0'
  };

  const handleSave = () => {
    setLastSaved(new Date());
    setHistory(prev => [...prev, { timestamp: new Date(), action: 'Saved changes' }].slice(-5));
    setIsEditing(false);
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHistory(prev => [...prev, { timestamp: new Date(), action: `Modified ${field}` }].slice(-5));
  };

  const getCharacterCount = (text: string) => {
    return text.length;
  };

  const getStatusBadge = (status: string) => {
    const badgeClass = status === 'Active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : status === 'Draft' 
      ? 'bg-gray-100 text-gray-800 border-gray-200'
      : 'bg-red-100 text-red-800 border-red-200';
    
    return <Badge className={badgeClass}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
          Dashboard
        </Button>
        <span>/</span>
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/prompts')}>
          Prompt Management
        </Button>
        <span>/</span>
        <span>Blog Writing Prompt</span>
        <span>/</span>
        <span className="text-foreground font-medium">{version}</span>
      </nav>

      {/* Version Dependency Alert */}
      {versionMeta.isReferenced && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-yellow-800">
                This version is referenced by the "Daily Auto-Publishing" task. Modifications may affect publishing results.
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Version Information Bar */}
      <Card className="bg-gradient-card border-card-border shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">Version {version}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {versionMeta.createdAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Creator: {versionMeta.creator}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>Status:</span>
                  {getStatusBadge(versionMeta.status)}
                </div>
              </div>
            </div>
            
            {/* Core Operation Button Group */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setShowVersionSelector(true)}>
                Switch Version
              </Button>
              <Button onClick={handleSave}>
                Save Current Version
              </Button>
              <Button variant="outline">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate as New
              </Button>
              <Button variant="outline" onClick={() => setShowCompareDialog(true)}>
                Compare Versions
              </Button>
              {versionMeta.status !== 'Active' && (
                <Button variant="destructive" size="sm">
                  Delete Version
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Last Saved Info & History */}
      <Card className="bg-card border-card-border shadow-sm">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="text-muted-foreground">
              Last saved: {lastSaved.toLocaleString()}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">Recent changes:</span>
              <div className="flex space-x-2">
                {history.slice(-3).map((item, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item.action}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="user-intention">User Intention</TabsTrigger>
          <TabsTrigger value="writing-content">Writing Content</TabsTrigger>
          <TabsTrigger value="ai-removal">AI Removal</TabsTrigger>
          <TabsTrigger value="meta-structure">Meta Structure</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="user-intention" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>User Intention and Outline</CardTitle>
              <CardDescription>
                Define the core user needs the AI must understand (e.g., "Write a technical blog about AI programming") and the logical framework of the content (e.g., "Introduction - Core Features - Case Studies - Conclusion").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={formData.userIntention}
                  onChange={(e) => handleFieldChange('userIntention', e.target.value)}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter user intention and outline instructions..."
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Characters: {getCharacterCount(formData.userIntention)} / 4000
                    {getCharacterCount(formData.userIntention) > 3200 && 
                      <span className="text-yellow-600 ml-2">⚠ Exceeds 80% of recommended length</span>
                    }
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Undo (Ctrl+Z)
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      Redo (Ctrl+Y)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="writing-content" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Writing Content</CardTitle>
              <CardDescription>
                Define detailed requirements for AI-generated content (style, professionalism, length, key focus areas, etc.). Stores content generation rules (e.g., "Formal style with accurate technical terminology; avoid colloquial language; length restricted to 800-1000 words").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={formData.writingContent}
                  onChange={(e) => handleFieldChange('writingContent', e.target.value)}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter writing content instructions..."
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Characters: {getCharacterCount(formData.writingContent)} / 4000
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Undo (Ctrl+Z)
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      Redo (Ctrl+Y)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-removal" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>AI Removal</CardTitle>
              <CardDescription>
                Define rules for eliminating AI-generated traces (e.g., avoiding templated expressions, adding human-like details). Stores AI-removal instructions (e.g., "Remove all templated conjunctions like 'in summary' or 'firstly'; add 1-2 sentences explaining practical use cases after code examples").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={formData.aiRemoval}
                  onChange={(e) => handleFieldChange('aiRemoval', e.target.value)}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter AI removal instructions..."
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Characters: {getCharacterCount(formData.aiRemoval)} / 4000
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Undo (Ctrl+Z)
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      Redo (Ctrl+Y)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta-structure" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Meta Structure</CardTitle>
              <CardDescription>
                Define the format of blog metadata (title, abstract, keywords, categories, etc.). Stores metadata generation rules (e.g., "Title must include the keywords 'AI programming' and 'automation'; abstract limited to 100 words, including core features; 3-5 keywords automatically extracted").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={formData.metaStructure}
                  onChange={(e) => handleFieldChange('metaStructure', e.target.value)}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter meta structure instructions..."
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Characters: {getCharacterCount(formData.metaStructure)} / 4000
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Undo (Ctrl+Z)
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      Redo (Ctrl+Y)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Define rules for AI-generated/matched images (theme, style, quantity, placement, etc.). Stores image instructions (e.g., "Generate 2 images: 1 screenshot of the Dashboard interface (minimalist style), 1 step-by-step diagram of the Prompt editing process; images must include alt text describing content").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={formData.images}
                  onChange={(e) => handleFieldChange('images', e.target.value)}
                  rows={15}
                  className="min-h-[400px] font-mono text-sm"
                  placeholder="Enter image instructions..."
                />
                <div className="flex items-center justify-between text-sm">
                  <div className="text-muted-foreground">
                    Characters: {getCharacterCount(formData.images)} / 4000
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" disabled>
                      Undo (Ctrl+Z)
                    </Button>
                    <Button variant="ghost" size="sm" disabled>
                      Redo (Ctrl+Y)
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Function */}
      <Card className="bg-card border-card-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground">Preview Function</h3>
              <p className="text-sm text-muted-foreground">
                Generate a simulated effect of the current version's prompt to evaluate effectiveness
              </p>
            </div>
            <Button onClick={() => setShowPreview(true)}>
              Generate Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Prompt Preview - Version {version}</DialogTitle>
            <DialogDescription>
              Sample content generated using current prompt configuration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Generated Content Sample:</h4>
              <p className="text-sm text-muted-foreground">
                "The Ultimate Guide to AI Programming Automation: 5 Essential Techniques Every Developer Should Master"
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                Meta: Title optimized for SEO | 800-1000 words | Professional tone | 3 code examples included
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
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
  Pause
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

  // If version parameter exists, show the detail page
  if (version) {
    return <PromptVersionDetail version={version} />;
  }

  const handleActivate = (versionId: string) => {
    setActiveVersion(versionId);
    // In real implementation, this would update the backend
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
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Blogs Created</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promptVersions.map((prompt) => (
                <TableRow 
                  key={prompt.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/admin/prompts/${prompt.version}`)}
                >
                  <TableCell>
                    <div className="font-medium text-foreground">{prompt.version}</div>
                  </TableCell>
                  <TableCell>
                    {prompt.isActive ? (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        <Play className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        <Pause className="h-3 w-3 mr-1" />
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {prompt.lastUpdated}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{prompt.blogsCreated}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{prompt.description}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {!prompt.isActive && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActivate(prompt.id);
                          }}
                        >
                          Activate
                        </Button>
                      )}
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

  const handleSave = () => {
    // In real implementation, this would save to backend
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/admin/prompts')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Versions
          </Button>
          <div>
            <h1 className="admin-title text-foreground">Prompt Version {version}</h1>
            <p className="admin-subtitle text-muted-foreground">
              Edit and configure your blog writing prompt
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Prompt
            </Button>
          )}
        </div>
      </div>

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
                Define the purpose, goals, and target audience for your blog content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.userIntention}
                onChange={(e) => setFormData(prev => ({ ...prev, userIntention: e.target.value }))}
                disabled={!isEditing}
                rows={15}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter user intention and outline instructions..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="writing-content" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Writing Content</CardTitle>
              <CardDescription>
                Main content generation instructions and guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.writingContent}
                onChange={(e) => setFormData(prev => ({ ...prev, writingContent: e.target.value }))}
                disabled={!isEditing}
                rows={15}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter writing content instructions..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-removal" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>AI Removal</CardTitle>
              <CardDescription>
                Instructions for making content sound more human and less AI-generated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.aiRemoval}
                onChange={(e) => setFormData(prev => ({ ...prev, aiRemoval: e.target.value }))}
                disabled={!isEditing}
                rows={15}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter AI removal instructions..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta-structure" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Meta Structure</CardTitle>
              <CardDescription>
                SEO meta tags, titles, descriptions, and structural guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.metaStructure}
                onChange={(e) => setFormData(prev => ({ ...prev, metaStructure: e.target.value }))}
                disabled={!isEditing}
                rows={15}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter meta structure instructions..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle>Images</CardTitle>
              <CardDescription>
                Image selection, optimization, and placement guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.images}
                onChange={(e) => setFormData(prev => ({ ...prev, images: e.target.value }))}
                disabled={!isEditing}
                rows={15}
                className="min-h-[400px] font-mono text-sm"
                placeholder="Enter image instructions..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
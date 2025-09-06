import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Bug,
  Play,
  Pause,
  Square,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Code,
  Terminal,
  Activity
} from 'lucide-react';

export default function DebugTasks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const taskStats = [
    {
      title: 'Total Tasks',
      value: '1,247',
      change: '+23 today',
      icon: Bug,
      color: 'bg-blue-500'
    },
    {
      title: 'Running',
      value: '34',
      change: '12 active',
      icon: Play,
      color: 'bg-green-500'
    },
    {
      title: 'Failed',
      value: '8',
      change: '3 new',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      title: 'Success Rate',
      value: '97.2%',
      change: '+0.3%',
      icon: CheckCircle,
      color: 'bg-emerald-500'
    }
  ];

  const tasks = [
    {
      id: 'task_001',
      name: 'Article Generation Pipeline',
      type: 'Content Generation',
      status: 'Running',
      progress: 67,
      startTime: '2024-12-06 14:30:00',
      duration: '2h 15m',
      user: 'john.doe@example.com',
      logs: [
        '[14:30:01] Starting article generation for keyword: "AI marketing trends"',
        '[14:32:15] Research phase completed',
        '[14:35:42] Outline generation in progress...',
        '[14:38:20] Content writing phase started'
      ],
      errors: []
    },
    {
      id: 'task_002',
      name: 'SEO Analysis Batch',
      type: 'SEO Analysis',
      status: 'Completed',
      progress: 100,
      startTime: '2024-12-06 13:15:00',
      duration: '45m',
      user: 'sarah.smith@example.com',
      logs: [
        '[13:15:01] Batch SEO analysis started for 25 articles',
        '[13:18:30] Keyword analysis completed',
        '[13:45:12] Meta description optimization finished',
        '[13:59:45] Analysis completed successfully'
      ],
      errors: []
    },
    {
      id: 'task_003',
      name: 'Image Processing Queue',
      type: 'Image Processing',
      status: 'Failed',
      progress: 45,
      startTime: '2024-12-06 12:00:00',
      duration: '1h 23m',
      user: 'mike.wilson@example.com',
      logs: [
        '[12:00:01] Image processing started for 15 images',
        '[12:15:30] Resizing completed for 8 images',
        '[12:45:12] Optimization phase started',
        '[13:23:45] ERROR: Out of memory exception'
      ],
      errors: [
        'OutOfMemoryException: Cannot allocate memory for image processing',
        'Failed to process images: img_045.jpg, img_046.jpg, img_047.jpg'
      ]
    },
    {
      id: 'task_004',
      name: 'Database Cleanup',
      type: 'Maintenance',
      status: 'Queued',
      progress: 0,
      startTime: null,
      duration: null,
      user: 'System',
      logs: [],
      errors: []
    },
    {
      id: 'task_005',
      name: 'Content Translation',
      type: 'Translation',
      status: 'Running',
      progress: 23,
      startTime: '2024-12-06 15:45:00',
      duration: '32m',
      user: 'emily.chen@example.com',
      logs: [
        '[15:45:01] Translation task started for 10 articles',
        '[15:52:30] Language detection completed',
        '[16:08:15] Translating article 3 of 10...'
      ],
      errors: []
    }
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: 67, status: 'normal' },
    { label: 'Memory Usage', value: 82, status: 'warning' },
    { label: 'Queue Size', value: 34, status: 'normal' },
    { label: 'Worker Threads', value: 12, status: 'normal' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Running':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Running</Badge>;
      case 'Completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      case 'Queued':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Queued</Badge>;
      case 'Paused':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Running':
        return <Play className="h-4 w-4 text-blue-600" />;
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'Queued':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Paused':
        return <Pause className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || task.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || task.type.toLowerCase().replace(' ', '-') === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="admin-title text-foreground">Debug Tasks</h1>
          <p className="admin-subtitle text-muted-foreground">
            Monitor and debug system tasks, processes, and workflows
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Terminal className="h-4 w-4 mr-2" />
            System Logs
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {taskStats.map((stat, index) => (
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
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Metrics */}
      <Card className="bg-card border-card-border shadow-sm">
        <CardHeader>
          <CardTitle className="admin-card-title text-foreground">System Metrics</CardTitle>
          <CardDescription className="admin-card-description text-muted-foreground">
            Real-time system performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="admin-body-text text-foreground">{metric.label}</span>
                  <span className="admin-stats-value text-foreground text-sm">{metric.value}%</span>
                </div>
                <Progress 
                  value={metric.value} 
                  className={`h-2 ${metric.status === 'warning' ? 'bg-yellow-100' : 'bg-muted'}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all-tasks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-[700px]">
          <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
          <TabsTrigger value="system-logs">System Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="all-tasks" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-card border-card-border shadow-sm">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search" className="admin-label text-foreground">Search Tasks</Label>
                  <div className="relative mt-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by task name or type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Status</Label>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="mt-2 w-[150px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="queued">Queued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="admin-label text-foreground">Type</Label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="mt-2 w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="content-generation">Content Generation</SelectItem>
                      <SelectItem value="seo-analysis">SEO Analysis</SelectItem>
                      <SelectItem value="image-processing">Image Processing</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="translation">Translation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Table */}
          <Card className="bg-card border-card-border shadow-sm hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Tasks</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                {filteredTasks.length} tasks found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="admin-body-text text-foreground font-medium">{task.name}</div>
                          <div className="admin-stats-label text-muted-foreground text-xs">ID: {task.id}</div>
                          {task.startTime && (
                            <div className="admin-stats-label text-muted-foreground text-xs">
                              Started: {task.startTime}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {task.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          {getStatusBadge(task.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={task.progress} className="h-2 bg-muted w-24" />
                          <span className="admin-stats-label text-muted-foreground text-xs">{task.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">
                          {task.duration || 'N/A'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="admin-stats-label text-muted-foreground">{task.user}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Code className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>Task Details: {task.name}</DialogTitle>
                                <DialogDescription>
                                  Detailed logs and error information for task {task.id}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 overflow-y-auto">
                                <div>
                                  <h4 className="admin-card-title text-foreground mb-2">Logs</h4>
                                  <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1 max-h-60 overflow-y-auto">
                                    {task.logs.map((log, index) => (
                                      <div key={index} className="text-muted-foreground">{log}</div>
                                    ))}
                                  </div>
                                </div>
                                {task.errors.length > 0 && (
                                  <div>
                                    <h4 className="admin-card-title text-foreground mb-2">Errors</h4>
                                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg space-y-1">
                                      {task.errors.map((error, index) => (
                                        <div key={index} className="text-red-800 text-sm font-mono">{error}</div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
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

        <TabsContent value="running">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Running Tasks</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Currently executing tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Play className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {tasks.filter(t => t.status === 'Running').length} tasks currently running
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="failed">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Failed Tasks</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Tasks that encountered errors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p className="admin-body-text text-muted-foreground">
                  {tasks.filter(t => t.status === 'Failed').length} failed tasks requiring attention
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system-logs">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">System Logs</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Real-time system activity logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm space-y-1 h-96 overflow-y-auto">
                <div className="text-muted-foreground">[16:30:01] System startup completed</div>
                <div className="text-muted-foreground">[16:30:15] Worker threads initialized (12 workers)</div>
                <div className="text-muted-foreground">[16:31:20] Database connection established</div>
                <div className="text-blue-600">[16:32:45] New task queued: Article Generation Pipeline</div>
                <div className="text-green-600">[16:35:12] Task completed: SEO Analysis Batch</div>
                <div className="text-red-600">[16:38:30] ERROR: Image Processing Queue failed - OutOfMemoryException</div>
                <div className="text-muted-foreground">[16:40:15] Garbage collection triggered</div>
                <div className="text-blue-600">[16:42:00] New task queued: Content Translation</div>
                <div className="text-muted-foreground">[16:45:30] Memory usage: 82% (warning threshold reached)</div>
                <div className="text-muted-foreground">[16:47:15] Auto-scaling triggered: spawning 2 additional workers</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Task Performance</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Average execution times by task type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Content Generation', avgTime: '2h 15m', count: 47 },
                    { type: 'SEO Analysis', avgTime: '45m', count: 23 },
                    { type: 'Image Processing', avgTime: '1h 30m', count: 15 },
                    { type: 'Translation', avgTime: '1h 12m', count: 8 }
                  ].map((perf, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{perf.type}</div>
                        <div className="admin-stats-label text-muted-foreground">{perf.count} tasks completed</div>
                      </div>
                      <div className="text-right">
                        <div className="admin-stats-value text-foreground text-sm">{perf.avgTime}</div>
                        <div className="admin-stats-label text-muted-foreground">avg time</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Resource Usage</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Current system resource utilization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="admin-body-text text-foreground">CPU Cores</span>
                      <span className="admin-stats-value text-foreground text-sm">8/12 active</span>
                    </div>
                    <Progress value={67} className="h-2 bg-muted" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="admin-body-text text-foreground">Memory</span>
                      <span className="admin-stats-value text-foreground text-sm">13.2 GB / 16 GB</span>
                    </div>
                    <Progress value={82} className="h-2 bg-muted" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="admin-body-text text-foreground">Disk I/O</span>
                      <span className="admin-stats-value text-foreground text-sm">245 MB/s</span>
                    </div>
                    <Progress value={35} className="h-2 bg-muted" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
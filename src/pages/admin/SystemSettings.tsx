import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Settings,
  Database,
  Shield,
  Mail,
  Globe,
  Server,
  Key,
  Bell,
  Users,
  FileText,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Info,
  Save
} from 'lucide-react';

export default function SystemSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const systemStatus = [
    {
      title: 'System Health',
      value: '99.9%',
      status: 'excellent',
      icon: Server,
      color: 'bg-green-500'
    },
    {
      title: 'Storage Used',
      value: '67%',
      status: 'good',
      icon: Database,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Users',
      value: '2,847',
      status: 'good',
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      title: 'API Calls Today',
      value: '45.2K',
      status: 'normal',
      icon: Globe,
      color: 'bg-orange-500'
    }
  ];

  const backupHistory = [
    {
      id: 'backup_001',
      type: 'Full Backup',
      date: '2024-12-06 02:00:00',
      size: '2.4 GB',
      status: 'Completed',
      duration: '45 minutes'
    },
    {
      id: 'backup_002',
      type: 'Incremental',
      date: '2024-12-05 02:00:00',
      size: '156 MB',
      status: 'Completed',
      duration: '8 minutes'
    },
    {
      id: 'backup_003',
      type: 'Full Backup',
      date: '2024-12-04 02:00:00',
      size: '2.3 GB',
      status: 'Completed',
      duration: '42 minutes'
    }
  ];

  const apiKeys = [
    {
      id: 'key_001',
      name: 'OpenAI API Key',
      service: 'OpenAI',
      status: 'Active',
      lastUsed: '2 hours ago',
      usage: '2,847 calls today'
    },
    {
      id: 'key_002',
      name: 'Google Search API',
      service: 'Google',
      status: 'Active',
      lastUsed: '15 minutes ago',
      usage: '1,234 calls today'
    },
    {
      id: 'key_003',
      name: 'Stripe API Key',
      service: 'Stripe',
      status: 'Active',
      lastUsed: '1 hour ago',
      usage: '45 transactions today'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Completed':
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'Warning':
      case 'good':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>;
      case 'Error':
      case 'Failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="admin-title text-foreground">System Settings</h1>
        <p className="admin-subtitle text-muted-foreground">
          Configure system preferences, security, and maintenance options
        </p>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStatus.map((stat, index) => (
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
              <div className="mt-1">
                {getStatusBadge(stat.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">General Settings</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Basic system configuration and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="site-name" className="admin-label text-foreground">Site Name</Label>
                    <Input id="site-name" defaultValue="RankEasy.ai" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="site-url" className="admin-label text-foreground">Site URL</Label>
                    <Input id="site-url" defaultValue="https://rankeasy.ai" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="admin-email" className="admin-label text-foreground">Admin Email</Label>
                    <Input id="admin-email" defaultValue="admin@rankeasy.ai" className="mt-2" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="timezone" className="admin-label text-foreground">Timezone</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="gmt">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language" className="admin-label text-foreground">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="max-users" className="admin-label text-foreground">Max Concurrent Users</Label>
                    <Input id="max-users" defaultValue="1000" type="number" className="mt-2" />
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                <Label htmlFor="site-description" className="admin-label text-foreground">Site Description</Label>
                <Textarea 
                  id="site-description" 
                  defaultValue="AI-powered SEO and content generation platform"
                  className="mt-2"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button className="admin-button">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Security Settings</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Configure security policies and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Two-Factor Authentication</div>
                    <div className="admin-stats-label text-muted-foreground">Require 2FA for all admin accounts</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Password Complexity</div>
                    <div className="admin-stats-label text-muted-foreground">Enforce strong password requirements</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Session Timeout</div>
                    <div className="admin-stats-label text-muted-foreground">Auto-logout after inactivity</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="session-duration" className="admin-label text-foreground">Session Duration (minutes)</Label>
                  <Input id="session-duration" defaultValue="60" type="number" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="max-login-attempts" className="admin-label text-foreground">Max Login Attempts</Label>
                  <Input id="max-login-attempts" defaultValue="5" type="number" className="mt-2" />
                </div>
              </div>
              <div>
                <Label htmlFor="allowed-domains" className="admin-label text-foreground">Allowed Email Domains</Label>
                <Textarea 
                  id="allowed-domains" 
                  placeholder="@company.com, @trusted-domain.com"
                  className="mt-2"
                  rows={3}
                />
              </div>
              <div className="flex justify-end">
                <Button className="admin-button">
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-6">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="admin-card-title text-foreground">API Keys</CardTitle>
                  <CardDescription className="admin-card-description text-muted-foreground">
                    Manage external service API keys and integrations
                  </CardDescription>
                </div>
                <Button className="admin-button">
                  <Key className="h-4 w-4 mr-2" />
                  Add API Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((key, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card-hover border border-card-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Key className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{key.name}</div>
                        <div className="admin-stats-label text-muted-foreground">{key.service} • {key.usage}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">Last used: {key.lastUsed}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(key.status)}
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Backup Settings</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Configure automatic backup schedules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Automatic Backups</div>
                    <div className="admin-stats-label text-muted-foreground">Daily automated backup at 2:00 AM</div>
                  </div>
                  <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
                </div>
                <div>
                  <Label htmlFor="backup-frequency" className="admin-label text-foreground">Backup Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="retention-days" className="admin-label text-foreground">Retention Period (days)</Label>
                  <Input id="retention-days" defaultValue="30" type="number" className="mt-2" />
                </div>
                <div className="space-y-2">
                  <Button className="w-full admin-button">
                    <Download className="h-4 w-4 mr-2" />
                    Create Manual Backup
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-card-border shadow-sm">
              <CardHeader>
                <CardTitle className="admin-card-title text-foreground">Backup History</CardTitle>
                <CardDescription className="admin-card-description text-muted-foreground">
                  Recent backup operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {backupHistory.map((backup, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card-hover border border-card-border/30">
                      <div>
                        <div className="admin-body-text text-foreground font-medium">{backup.type}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">{backup.date}</div>
                        <div className="admin-stats-label text-muted-foreground text-xs">{backup.size} • {backup.duration}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(backup.status)}
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Notification Settings</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                Configure system alerts and notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Email Notifications</div>
                    <div className="admin-stats-label text-muted-foreground">Send email alerts for system events</div>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">User Registration Alerts</div>
                    <div className="admin-stats-label text-muted-foreground">Notify when new users register</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">System Error Alerts</div>
                    <div className="admin-stats-label text-muted-foreground">Immediate notification for critical errors</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="admin-body-text text-foreground font-medium">Daily Reports</div>
                    <div className="admin-stats-label text-muted-foreground">Daily summary reports via email</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="notification-email" className="admin-label text-foreground">Notification Email</Label>
                  <Input id="notification-email" defaultValue="admin@rankeasy.ai" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="alert-threshold" className="admin-label text-foreground">Error Alert Threshold</Label>
                  <Select defaultValue="critical">
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select threshold" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="warning">Warning & Above</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="admin-button">
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-card border-card-border shadow-sm">
            <CardHeader>
              <CardTitle className="admin-card-title text-foreground">Maintenance Mode</CardTitle>
              <CardDescription className="admin-card-description text-muted-foreground">
                System maintenance and debugging options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-body-text text-foreground font-medium">Maintenance Mode</div>
                      <div className="admin-stats-label text-muted-foreground">Enable maintenance mode for system updates</div>
                    </div>
                    <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="admin-body-text text-foreground font-medium">Debug Mode</div>
                      <div className="admin-stats-label text-muted-foreground">Enable detailed error logging</div>
                    </div>
                    <Switch checked={debugMode} onCheckedChange={setDebugMode} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="maintenance-message" className="admin-label text-foreground">Maintenance Message</Label>
                    <Textarea 
                      id="maintenance-message" 
                      defaultValue="System maintenance in progress. Please check back later."
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="admin-card-title text-foreground">System Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <Database className="h-6 w-6" />
                    <span>Clear Cache</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span>Export Logs</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="h-6 w-6" />
                    <span>Clear Old Data</span>
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="admin-body-text text-yellow-800 font-medium">Maintenance Mode Warning</div>
                  <div className="admin-stats-label text-yellow-700">
                    Enabling maintenance mode will prevent users from accessing the application. 
                    Only administrators will be able to access the system.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
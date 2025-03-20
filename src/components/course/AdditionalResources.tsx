import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { renderResourceIcon } from '@/utils/courseUtils';
import { Plus, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'file' | 'quiz' | 'activity';
  url: string;
}

const AdditionalResources: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([
    { id: '1', title: 'Supplementary Reading', type: 'pdf', url: 'https://example.com/reading.pdf' },
    { id: '2', title: 'Video Tutorial', type: 'video', url: 'https://example.com/tutorial.mp4' },
    { id: '3', title: 'External Documentation', type: 'link', url: 'https://example.com/docs' },
  ]);
  
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    type: 'pdf' as const,
    url: ''
  });

  const handleAddResource = () => {
    setIsAddingResource(true);
  };

  const handleCancelAdd = () => {
    setIsAddingResource(false);
    setNewResource({ title: '', type: 'pdf', url: '' });
  };

  const handleSaveResource = () => {
    if (!newResource.title || !newResource.url) {
      toast.error('Please fill out all required fields');
      return;
    }

    const resourceId = uuidv4();
    const updatedResources = [
      ...resources,
      {
        id: resourceId,
        title: newResource.title,
        type: newResource.type,
        url: newResource.url
      }
    ];
    
    setResources(updatedResources);
    setIsAddingResource(false);
    setNewResource({ title: '', type: 'pdf', url: '' });
    toast.success('Resource added successfully');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Additional Resources</CardTitle>
          <CardDescription>
            Other materials to supplement the course content
          </CardDescription>
        </div>
        <Button onClick={handleAddResource} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Resource
        </Button>
      </CardHeader>
      <CardContent>
        {resources && resources.length > 0 ? (
          <div className="space-y-4">
            {resources.map(resource => (
              <div key={resource.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  {renderResourceIcon(resource.type)}
                  <span>{resource.title}</span>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    View Resource
                  </a>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground py-4 text-center">
            No additional resources available for this course yet.
          </p>
        )}
        
        {isAddingResource && (
          <div className="border rounded-md p-4 space-y-4 mt-4">
            <h3 className="font-medium">Add New Resource</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="resource-title" className="text-sm font-medium">
                  Resource Title
                </label>
                <Input
                  id="resource-title"
                  placeholder="Enter resource title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label htmlFor="resource-type" className="text-sm font-medium">
                  Resource Type
                </label>
                <Select 
                  value={newResource.type} 
                  onValueChange={(value: 'pdf' | 'video' | 'link' | 'file' | 'quiz' | 'activity') => setNewResource({...newResource, type: value})}
                >
                  <SelectTrigger id="resource-type" className="mt-1">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="resource-url" className="text-sm font-medium">
                  Resource URL
                </label>
                <Input
                  id="resource-url"
                  placeholder="https://example.com/resource"
                  value={newResource.url}
                  onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancelAdd}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
                <Button 
                  size="sm"
                  onClick={handleSaveResource}
                >
                  <Save className="h-4 w-4 mr-1" /> Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdditionalResources;

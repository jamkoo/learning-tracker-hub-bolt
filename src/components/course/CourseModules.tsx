import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Save, X, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Course, updateCourse, ModuleContent } from '@/utils/data';
import { renderResourceIcon, contentTypeLabels } from '@/utils/courseUtils';
import { Textarea } from '@/components/ui/textarea';
import { getCookie } from '@/lib/utils';

interface CourseModulesProps {
  course: Course;
  setCourse: React.Dispatch<React.SetStateAction<Course | undefined>>;
  employeeId: string | null; // Add employeeId prop
}

const CourseModules: React.FC<CourseModulesProps> = ({ course, setCourse, employeeId }) => {
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [newModule, setNewModule] = useState({
    title: '',
    duration: '',
  });
  const [newContent, setNewContent] = useState<Partial<ModuleContent>>({
    title: '',
    type: 'video',
    duration: '',
    resourceUrl: '',
    description: ''
  });
  const [moduleCompletion, setModuleCompletion] = useState<{ [moduleId: string]: boolean }>({}); // Track module completion

  useEffect(() => {
    if (employeeId) {
      console.log(`Employee ID in CourseModules: ${employeeId}`);
      // Here we would eventually load employee-specific progress for this course
    }
    // Initialize module completion status from cookie or default
    const initialCompletion = course.modules.reduce((acc, module) => {
      acc[module.id] = false; // Default to not completed
      return acc;
    }, {});
    setModuleCompletion(initialCompletion);

  }, [employeeId, course.modules]);


  const handleAddModule = () => {
    setIsAddingModule(true);
  };

  const handleCancelAdd = () => {
    setIsAddingModule(false);
    setNewModule({ title: '', duration: '' });
  };

  const handleSaveModule = async () => {
    if (!newModule.title || !newModule.duration) {
      toast.error('Please fill out all required fields');
      return;
    }

    const moduleId = uuidv4();
    const updatedCourse = {
      ...course,
      modules: [
        ...course.modules,
        {
          id: moduleId,
          title: newModule.title,
          duration: newModule.duration,
          completed: false,
          content: []
        }
      ]
    };

    try {
      await updateCourse(updatedCourse);
      setCourse(updatedCourse);
      setIsAddingModule(false);
      setNewModule({ title: '', duration: '' });
      toast.success('Module added successfully');
    } catch (error) {
      toast.error('Failed to add module');
      console.error(error);
    }
  };

  const handleAddContent = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setIsAddingContent(true);
  };

  const handleCancelAddContent = () => {
    setIsAddingContent(false);
    setNewContent({
      title: '',
      type: 'video',
      duration: '',
      resourceUrl: '',
      description: ''
    });
    setSelectedModuleId(null);
  };

  const handleSaveContent = async () => {
    if (!selectedModuleId || !newContent.title || !newContent.type) {
      toast.error('Please fill out all required fields');
      return;
    }

    const contentId = uuidv4();
    const updatedModules = course.modules.map(module => {
      if (module.id === selectedModuleId) {
        return {
          ...module,
          content: [
            ...(module.content || []),
            {
              id: contentId,
              title: newContent.title,
              type: newContent.type,
              duration: newContent.duration,
              resourceUrl: newContent.resourceUrl,
              description: newContent.description
            } as ModuleContent
          ]
        };
      }
      return module;
    });

    const updatedCourse = {
      ...course,
      modules: updatedModules
    };

    try {
      await updateCourse(updatedCourse);
      setCourse(updatedCourse);
      setIsAddingContent(false);
      setNewContent({
        title: '',
        type: 'video',
        duration: '',
        resourceUrl: '',
        description: ''
      });
      setSelectedModuleId(null);
      toast.success('Content added successfully');
    } catch (error) {
      toast.error('Failed to add content');
      console.error(error);
    }
  };

  const handleModuleCompleteToggle = (moduleId: string) => {
    setModuleCompletion(prevCompletion => {
      const updatedCompletion = {
        ...prevCompletion,
        [moduleId]: !prevCompletion[moduleId]
      };
      console.log('Module Completion Updated:', updatedCompletion); // Log updated completion
      return updatedCompletion;
    });
  };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Course Content</CardTitle>
          <CardDescription>
            {course.modules.length} modules • {course.duration} total
          </CardDescription>
        </div>
        <Button onClick={handleAddModule} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Module
        </Button>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-4">
          {course.modules.map((module, index) => (
            <AccordionItem key={module.id} value={module.id} className="border rounded-md px-4">
              <div className="flex items-start py-2">
                <div className="mr-4 mt-0.5">
                  {moduleCompletion[module.id] ? ( // Use moduleCompletion state
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <AccordionTrigger className="py-0 hover:no-underline">
                    <div className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center">
                        <h3 className="font-medium">
                          {index + 1}. {module.title}
                        </h3>
                        {module.resourceType && (
                          <span className="ml-2">
                            {renderResourceIcon(module.resourceType)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {module.duration}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {module.content && module.content.length > 0 ? (
                      <div className="mt-2 ml-2 space-y-2">
                        {module.content.map((content, contentIndex) => (
                          <div key={content.id} className="flex items-center p-2 border rounded-md">
                            <span className="mr-2">
                              {renderResourceIcon(content.type)}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{content.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {contentTypeLabels[content.type]}{content.duration ? ` • ${content.duration}` : ''}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2 ml-2">
                        No content added to this module yet.
                      </p>
                    )}

                    <Button
                      onClick={() => handleAddContent(module.id)}
                      variant="outline"
                      size="sm"
                      className="mt-3 ml-2"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Content
                    </Button>

                    {/* ADD MODULE CONTENT FORM HERE */}
                    {isAddingContent && selectedModuleId === module.id && (
                      <div className="border rounded-md p-4 space-y-4 mt-4">
                        <h3 className="font-medium">Add Module Content</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="content-title" className="text-sm font-medium">
                              Content Title
                            </label>
                            <Input
                              id="content-title"
                              placeholder="Enter content title"
                              value={newContent.title}
                              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="content-type" className="text-sm font-medium">
                              Content Type
                            </label>
                            <Select
                              value={newContent.type}
                              onValueChange={(value) => setNewContent({ ...newContent, type: value as any })}
                            >
                              <SelectTrigger id="content-type" className="mt-1">
                                <SelectValue placeholder="Select content type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="video">Video</SelectItem>
                                <SelectItem value="reading">Reading</SelectItem>
                                <SelectItem value="quiz">Quiz</SelectItem>
                                <SelectItem value="activity">Activity</SelectItem>
                                <SelectItem value="scenario">Scenario</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <label htmlFor="content-duration" className="text-sm font-medium">
                              Duration (Optional)
                            </label>
                            <Input
                              id="content-duration"
                              placeholder="e.g. 10 min"
                              value={newContent.duration || ''}
                              onChange={(e) => setNewContent({ ...newContent, duration: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="content-url" className="text-sm font-medium">
                              Resource URL (Optional)
                            </label>
                            <Input
                              id="content-url"
                              placeholder="https://example.com/resource"
                              value={newContent.resourceUrl || ''}
                              onChange={(e) => setNewContent({ ...newContent, resourceUrl: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <label htmlFor="content-description" className="text-sm font-medium">
                              Description (Optional)
                            </label>
                            <Textarea
                              id="content-description"
                              placeholder="Enter a description"
                              value={newContent.description || ''}
                              onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                              className="mt-1"
                            />
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCancelAddContent}
                            >
                              <X className="h-4 w-4 mr-1" /> Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={handleSaveContent}
                            >
                              <Save className="h-4 w-4 mr-1" /> Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </div>
                <Button
                  onClick={() => handleModuleCompleteToggle(module.id)}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  {moduleCompletion[module.id] ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
              </div>
            </AccordionItem>
          ))}
        </Accordion>

        {isAddingModule && (
          <div className="border rounded-md p-4 space-y-4 mt-4">
            <h3 className="font-medium">Add New Module</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="module-title" className="text-sm font-medium">
                  Module Title
                </label>
                <Input
                  id="module-title"
                  placeholder="Enter module title"
                  value={newModule.title}
                  onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="module-duration" className="text-sm font-medium">
                  Duration
                </label>
                <Input
                  id="module-duration"
                  placeholder="e.g. 30 min"
                  value={newModule.duration}
                  onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
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
                  onClick={handleSaveModule}
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

export default CourseModules;

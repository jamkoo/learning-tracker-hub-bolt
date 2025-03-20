import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addCourse, updateCourse, Course } from '@/utils/data';
import { UploadCloud, X } from 'lucide-react';

// Define the form schema
const courseFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  duration: z.string().min(1, { message: 'Duration is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  imageUrl: z.string().url({ message: 'Please enter a valid URL' }),
  resourceType: z.enum(['pdf', 'video', 'link', 'file', 'none']).optional(),
  resourceUrl: z.string().optional(),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

interface CourseFormProps {
  existingCourse?: Course;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ 
  existingCourse, 
  onSuccess,
  onCancel 
}) => {
  const { toast } = useToast();
  const isEditing = !!existingCourse;
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');

  // Define categories list
  const categories = [
    'Design',
    'Management',
    'Data Science',
    'Soft Skills',
    'IT',
    'Marketing',
    'Engineering',
    'Other'
  ];

  // Initialize form with existing course data or defaults
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: existingCourse ? {
      title: existingCourse.title,
      description: existingCourse.description,
      duration: existingCourse.duration,
      category: existingCourse.category,
      level: existingCourse.level,
      imageUrl: existingCourse.imageUrl,
      resourceType: existingCourse.resourceType,
      resourceUrl: existingCourse.resourceUrl,
    } : {
      title: '',
      description: '',
      duration: '',
      category: '',
      level: 'Beginner',
      imageUrl: '',
      resourceType: 'none',
      resourceUrl: '',
    },
  });

  const resourceType = form.watch('resourceType');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setFileUpload(file);
      setFileName(file.name);
      form.setValue('resourceType', 'file');
      // Store the file name in resourceUrl for now
      form.setValue('resourceUrl', file.name);
    }
  };

  const removeFile = () => {
    setFileUpload(null);
    setFileName('');
    form.setValue('resourceType', 'none');
    form.setValue('resourceUrl', '');
  };

  const handleResourceTypeChange = (value: string) => {
    form.setValue('resourceType', value as 'pdf' | 'video' | 'link' | 'file' | 'none');
    if (value !== 'file') {
      // If switching from file to another type, clear the file upload
      setFileUpload(null);
      setFileName('');
    }
    if (value === 'none') {
      form.setValue('resourceUrl', '');
    }
  };

  const onSubmit = async (values: CourseFormValues) => {
    try {
      let fileData = '';
      
      // If we have a file upload, convert it to base64
      if (fileUpload && values.resourceType === 'file') {
        fileData = await convertFileToBase64(fileUpload);
      }

      if (isEditing && existingCourse) {
        // Update existing course
        await updateCourse({
          ...existingCourse,
          ...values,
          resourceUrl: values.resourceType === 'file' && fileData ? fileData : values.resourceUrl,
        });
        toast({
          title: "Course updated",
          description: "Your course has been updated successfully",
        });
      } else {
        // Add new course
        await addCourse({
          id: `c${Date.now()}`, // Generate simple ID
          title: values.title,
          description: values.description,
          duration: values.duration,
          category: values.category,
          level: values.level,
          imageUrl: values.imageUrl,
          modules: [], // Start with empty modules
          resourceType: values.resourceType !== 'none' ? values.resourceType : undefined,
          resourceUrl: values.resourceType === 'file' && fileData 
            ? fileData 
            : (values.resourceType !== 'none' ? values.resourceUrl : undefined),
          fileName: values.resourceType === 'file' ? fileName : undefined,
        });
        toast({
          title: "Course created",
          description: "Your course has been created successfully",
        });
      }
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Reset form if adding new course
      if (!isEditing) {
        form.reset();
        setFileUpload(null);
        setFileName('');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: "Error",
        description: "There was an error saving the course",
        variant: "destructive",
      });
    }
  };

  // Convert file to base64 for storage
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the course" 
                  {...field} 
                  className="min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 3 hours" {...field} />
                </FormControl>
                <FormDescription>
                  Total course duration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="resourceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resource Type (Optional)</FormLabel>
                <Select 
                  onValueChange={handleResourceTypeChange} 
                  defaultValue={field.value || 'none'}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a resource type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                    <SelectItem value="file">Upload File</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {resourceType === 'file' ? (
            <FormItem>
              <FormLabel>Upload Material</FormLabel>
              <FormControl>
                <div className="mt-1 flex items-center">
                  {!fileUpload ? (
                    <label className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent hover:text-accent-foreground">
                      <UploadCloud className="mr-2 h-4 w-4" />
                      <span>Upload file</span>
                      <input
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.mp4,.mp3,.zip"
                      />
                    </label>
                  ) : (
                    <div className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <span className="truncate max-w-[200px]">{fileName}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove file</span>
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Upload course materials (PDF, DOC, PPT, etc.)
              </FormDescription>
              <FormMessage />
            </FormItem>
          ) : resourceType !== 'none' ? (
            <FormField
              control={form.control}
              name="resourceUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/resource" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
        </div>
        
        <div className="flex justify-end gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {isEditing ? 'Update Course' : 'Create Course'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;

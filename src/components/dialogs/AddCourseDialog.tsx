import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CourseForm from '@/components/forms/CourseForm';
import { Course } from '@/utils/data';

interface AddCourseDialogProps {
  existingCourse?: Course;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function AddCourseDialog({ 
  existingCourse,
  title = "Add New Course",
  description = "Complete the form below to create a new course.",
  trigger,
  onSuccess,
}: AddCourseDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleSuccess = () => {
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{existingCourse ? 'Edit Course' : title}</DialogTitle>
          <DialogDescription>
            {existingCourse 
              ? 'Update the course details below.'
              : description
            }
          </DialogDescription>
        </DialogHeader>
        <CourseForm 
          existingCourse={existingCourse} 
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

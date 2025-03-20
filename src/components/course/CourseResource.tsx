import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Course } from '@/utils/data';
import { renderResourceIcon } from '@/utils/courseUtils';
import { FileText, File, LinkIcon } from 'lucide-react';

interface CourseResourceProps {
  course: Course;
}

const CourseResource: React.FC<CourseResourceProps> = ({ course }) => {
  if (!course.resourceType || course.resourceType === 'none' || !course.resourceUrl) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {renderResourceIcon(course.resourceType)}
          Main Course Resource
        </CardTitle>
        <CardDescription>
          Access the primary learning material for this course
        </CardDescription>
      </CardHeader>
      <CardContent>
        {course.resourceType === 'pdf' && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-md mb-4 w-full max-w-lg">
              <FileText className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-center font-medium">{course.title}.pdf</p>
            </div>
            <Button asChild>
              <a href={course.resourceUrl} target="_blank" rel="noopener noreferrer">
                Open PDF
              </a>
            </Button>
          </div>
        )}
        
        {course.resourceType === 'video' && (
          <div className="aspect-video bg-gray-100 rounded-md max-w-3xl mx-auto">
            <video
              src={course.resourceUrl}
              controls
              className="w-full h-full rounded-md"
            />
          </div>
        )}
        
        {course.resourceType === 'link' && (
          <Button asChild variant="outline" className="w-full max-w-md mx-auto">
            <a 
              href={course.resourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Open External Resource
            </a>
          </Button>
        )}

        {course.resourceType === 'file' && (
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-4 rounded-md mb-4 w-full max-w-lg">
              <File className="h-16 w-16 text-orange-500 mx-auto mb-4" />
              <p className="text-center font-medium">{course.fileName || 'Uploaded Document'}</p>
            </div>
            <Button asChild>
              <a 
                href={course.resourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                download={course.fileName}
              >
                Download Document
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseResource;

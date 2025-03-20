import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/utils/data';
import { renderResourceIcon, levelColorMap } from '@/utils/courseUtils';

interface CourseCardProps {
  course: Course;
  progress?: number;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  progress, 
  className 
}) => {
  return (
    <Link to={`/courses/${course.id}`}>
      <Card 
        className={cn(
          "overflow-hidden h-full transition-all duration-300 ease-apple card-hover",
          className
        )}
      >
        <div className="relative h-40 w-full overflow-hidden">
          <img 
            src={course.imageUrl} 
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-apple hover:scale-105"
          />
          {progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-accent animate-progress-fill"
                style={{ 
                  width: `${progress}%`,
                  '--progress-width': `${progress}%`
                } as React.CSSProperties}
              ></div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <Badge variant="outline" className={cn("font-medium text-xs", levelColorMap[course.level])}>
              {course.level}
            </Badge>
            {progress !== undefined && (
              <Badge variant="secondary" className="font-medium text-xs">
                {progress}% Complete
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 mr-1" />
              {course.modules.length} Modules
              {course.resourceType && (
                <div className="ml-2" title={`${course.resourceType} resource available`}>
                  {renderResourceIcon(course.resourceType)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

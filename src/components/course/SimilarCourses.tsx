import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Course } from '@/utils/data';
import { cn } from '@/lib/utils';
import { levelColorMap } from '@/utils/courseUtils';

interface SimilarCoursesProps {
  currentCourseId: string;
  similarCourses: Course[];
}

const SimilarCourses: React.FC<SimilarCoursesProps> = ({ 
  currentCourseId, 
  similarCourses
}) => {
  // Filter courses that are similar but not the current one
  const filteredCourses = similarCourses
    .filter(c => c.id !== currentCourseId)
    .slice(0, 3);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Similar Courses</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`}>
            <Card className="h-full card-hover overflow-hidden">
              <div className="aspect-video bg-muted">
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <Badge variant="outline" className={cn("font-medium text-xs", levelColorMap[course.level])}>
                  {course.level}
                </Badge>
                <h3 className="font-semibold mt-2">{course.title}</h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {course.modules.length} Modules
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarCourses;

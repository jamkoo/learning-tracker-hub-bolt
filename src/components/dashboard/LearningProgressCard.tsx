import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Course, Employee } from '@/utils/data';

interface LearningProgressCardProps {
  courses: Course[];
  employees: Employee[];
}

const LearningProgressCard: React.FC<LearningProgressCardProps> = ({ courses, employees }) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>
              Company-wide learning overview
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/courses" className="gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.slice(0, 5).map((course) => {
            // Calculate how many employees are taking this course
            const employeeCount = employees.filter(emp =>
              emp.progress.some(p => p.courseId === course.id)
            ).length;

            // Calculate average progress for this course
            const totalProgress = employees.reduce((sum, emp) => {
              const courseProgress = emp.progress.find(p => p.courseId === course.id);
              return courseProgress ? sum + courseProgress.progress : sum;
            }, 0);

            const avgProgress = employeeCount > 0 ? totalProgress / employeeCount : 0;

            return (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {employeeCount} employees enrolled
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {Math.round(avgProgress)}%
                  </div>
                </div>
                <ProgressBar value={avgProgress} size="sm" color="accent" showValue={false} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgressCard;

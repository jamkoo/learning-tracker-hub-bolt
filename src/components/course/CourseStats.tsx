import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Course } from '@/utils/data';

interface CourseStatsProps {
  course: Course;
  enrolledEmployees: any[]; // Type this more specifically if possible
  completedCount: number;
  actionButtons?: React.ReactNode; // Optional prop for action buttons
}

const CourseStats: React.FC<CourseStatsProps> = ({
  course,
  enrolledEmployees,
  completedCount,
  actionButtons // Destructure actionButtons prop
}) => {
  const progress = (completedCount / enrolledEmployees.length) * 100 || 0;

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{course.title} Stats</h3>
          {actionButtons && <div>{actionButtons}</div>} {/* Render action buttons if provided */}
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Category</p>
          <Badge variant="secondary">{course.category}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Level</p>
          <Badge variant="secondary">{course.level}</Badge>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Enrolled Employees</p>
          <p className="font-medium">{enrolledEmployees.length}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Course Progress</p>
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground mt-1">{progress.toFixed(2)}% Completed</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseStats;

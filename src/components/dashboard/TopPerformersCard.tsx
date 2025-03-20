import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Employee } from '@/utils/data';

interface TopPerformersCardProps {
  topPerformers: Employee[];
}

const TopPerformersCard: React.FC<TopPerformersCardProps> = ({ topPerformers }) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>
              Employees with highest completion rates
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/employees" className="gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers.map((employee) => {
            const completedCourses = employee.progress.filter(p => p.progress === 100).length;
            const totalCourses = employee.progress.length;
            const completionRate = (completedCourses / totalCourses) * 100;

            return (
              <div key={employee.id} className="flex items-center space-x-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={employee.imageUrl}
                    alt={employee.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{employee.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {completedCourses} of {totalCourses} courses completed
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {Math.round(completionRate)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformersCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ProgressBar } from './ProgressBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Employee, calculateOverallProgress } from '@/utils/data';

interface EmployeeCardProps {
  employee: Employee;
  className?: string;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee,
  className
}) => {
  const overallProgress = calculateOverallProgress(employee.id);

  return (
    <Link to={`/employees/${employee.id}`}>
      <Card className={cn("h-full card-hover", className)}>
        <CardContent className="p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-4 border-2 border-white shadow-sm">
              <AvatarImage src={employee.imageUrl} alt={employee.name} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-base">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mb-4 mt-1">
            <span className="inline-flex items-center">
              <BookOpen className="h-3.5 w-3.5 mr-1" />
              {employee.progress.length} Courses
            </span>
            <span className="ml-4 text-xs text-muted-foreground">{employee.department}</span>
          </div>
          
          <div className="mt-auto">
            <ProgressBar value={overallProgress} size="sm" color="accent" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

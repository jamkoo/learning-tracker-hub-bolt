import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Employee } from '@/utils/data';

interface EnrolledEmployeesProps {
  enrolledEmployees: Employee[];
  courseId: string;
}

const EnrolledEmployees: React.FC<EnrolledEmployeesProps> = ({
  enrolledEmployees,
  courseId
}) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Enrolled Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
          {enrolledEmployees.length > 0 ? (
            enrolledEmployees.map(employee => {
              const progress = employee.progress.find(p => p.courseId === courseId)?.progress || 0;
              const directAccessUrl = `/direct-access/${courseId}/${employee.id}`; // Updated URL format
              return (
                <div key={employee.id} className="hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={employee.imageUrl} alt={employee.name} />
                        <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{employee.name}</p>
                        <p className="text-xs text-muted-foreground">{employee.position}</p>
                      </div>
                    </div>
                    <Progress value={progress} className="w-16 h-2" />
                  </div>
                  <div className="mt-1">
                    <code className="text-xs text-blue-500">{directAccessUrl}</code> {/* Display URL */}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No employees enrolled yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrolledEmployees;

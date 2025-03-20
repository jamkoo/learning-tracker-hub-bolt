import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { EmployeeCard } from '@/components/ui/EmployeeCard';
import { Employee } from '@/utils/data';

interface RecentEmployeesSectionProps {
  employees: Employee[];
}

const RecentEmployeesSection: React.FC<RecentEmployeesSectionProps> = ({ employees }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Recent Employees</h2>
        <Button variant="outline" asChild>
          <Link to="/employees" className="gap-2">
            View all employees
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {employees.slice(0, 3).map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default RecentEmployeesSection;

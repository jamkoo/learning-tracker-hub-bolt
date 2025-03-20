import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CourseCard } from '@/components/ui/CourseCard';
import { EmployeeCard } from '@/components/ui/EmployeeCard';
import { cn } from '@/lib/utils';
import { courses, employees } from '@/utils/data';
import {
  BarChart, Users, BookOpen, Check, ArrowRight, ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DashboardStatsCards from '@/components/dashboard/DashboardStatsCards';
import LearningProgressCard from '@/components/dashboard/LearningProgressCard';
import TopPerformersCard from '@/components/dashboard/TopPerformersCard';
import PopularCoursesSection from '@/components/dashboard/PopularCoursesSection';
import RecentEmployeesSection from '@/components/dashboard/RecentEmployeesSection'; // Import RecentEmployeesSection

const Dashboard: React.FC = () => {
  // Get popular courses (first 3)
  const popularCourses = courses.slice(0, 3);

  // Get employees with highest progress (first 3)
  const topPerformers = [...employees]
    .sort((a, b) => {
      const aProgress = a.progress.reduce((sum, p) => sum + p.progress, 0) / a.progress.length;
      const bProgress = b.progress.reduce((sum, p) => sum + p.progress, 0) / b.progress.length;
      return bProgress - aProgress;
    })
    .slice(0, 3);

  // Calculate overall company statistics
  const totalCompletedCourses = employees.reduce((sum, employee) => {
    return sum + employee.progress.filter(p => p.progress === 100).length;
  }, 0);

  const averageCompletionRate = employees.reduce((sum, employee) => {
    const employeeAvg = employee.progress.reduce((s, p) => s + p.progress, 0) /
      (employee.progress.length || 1);
    return sum + employeeAvg;
  }, 0) / employees.length;


  return (
    <div className="pb-8 animate-slide-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to your learning management overview.
        </p>
      </div>

      <DashboardStatsCards
        averageCompletionRate={averageCompletionRate}
        totalCompletedCourses={totalCompletedCourses}
      />
      <div className="grid gap-6 md:grid-cols-7 mb-8">
      <LearningProgressCard courses={courses} employees={employees} />

      <TopPerformersCard topPerformers={topPerformers} />
      </div>
      <PopularCoursesSection popularCourses={popularCourses} />

      <RecentEmployeesSection employees={employees} /> {/* Render RecentEmployeesSection */}

    </div>
  );
};

export default Dashboard;

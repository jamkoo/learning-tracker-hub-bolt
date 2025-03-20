import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { employees, courses } from '@/utils/data';
import {
  BarChart, Users, BookOpen, Check, ArrowUpRight,
} from 'lucide-react';

interface StatCard {
  title: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  change: string;
  iconColor: string;
  bgColor: string;
}

interface DashboardStatsCardsProps {
  averageCompletionRate: number;
  totalCompletedCourses: number;
}


const DashboardStatsCards: React.FC<DashboardStatsCardsProps> = ({ averageCompletionRate, totalCompletedCourses }) => {
  const statsCards: StatCard[] = [
    {
      title: "Total Employees",
      value: employees.length.toString(),
      icon: Users,
      change: "+2",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Courses",
      value: courses.length.toString(),
      icon: BookOpen,
      change: "+1",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Completed Courses",
      value: totalCompletedCourses.toString(),
      icon: Check,
      change: "+5",
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Avg. Completion",
      value: `${Math.round(averageCompletionRate)}%`,
      icon: BarChart,
      change: "+3%",
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {statsCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-md", stat.bgColor)}>
                <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
              <div className="flex items-center text-xs font-medium text-green-600">
                <span>{stat.change}</span>
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
              <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStatsCards;

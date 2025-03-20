import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CourseCard } from '@/components/ui/CourseCard';
import { Course } from '@/lib/types';

interface PopularCoursesSectionProps {
  popularCourses: Course[];
}

const PopularCoursesSection: React.FC<PopularCoursesSectionProps> = ({ popularCourses }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Popular Courses</h2>
        <Button variant="outline" asChild>
          <Link to="/courses" className="gap-2">
            View all courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popularCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default PopularCoursesSection;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCourseById, employees, courses } from '@/utils/data';
import CourseHeader from '@/components/course/CourseHeader';
import CourseStats from '@/components/course/CourseStats';
import CourseResource from '@/components/course/CourseResource';
import CourseModules from '@/components/course/CourseModules';
import AdditionalResources from '@/components/course/AdditionalResources';
import CompletionRate from '@/components/course/CompletionRate';
import EnrolledEmployees from '@/components/course/EnrolledEmployees';
import SimilarCourses from '@/components/course/SimilarCourses';
import { Button } from '@/components/ui/button';
import { getCookie } from '@/lib/utils';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState(getCourseById(id || ''));
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [showDirectAccessUrls, setShowDirectAccessUrls] = useState(false); // State to control URL display

  useEffect(() => {
    const empIdFromCookie = getCookie('employeeId');
    if (empIdFromCookie) {
      setEmployeeId(empIdFromCookie);
      // Optionally fetch and use employee-specific progress from cookie or server here
      console.log(`Employee ID from cookie: ${empIdFromCookie}`);
    }
  }, []);


  if (!course) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Course not found</h2>
        <p className="text-muted-foreground mt-2">The course you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link to="/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  const enrolledEmployees = employees.filter(employee =>
    employee.progress.some(p => p.courseId === course.id)
  );

  const completedCount = enrolledEmployees.filter(e =>
    e.progress.find(p => p.courseId === course.id)?.progress === 100
  ).length;

  const totalProgress = enrolledEmployees.reduce((sum, emp) => {
    const progress = emp.progress.find(p => p.courseId === course.id)?.progress || 0;
    return sum + progress;
  }, 0);

  const averageProgress = enrolledEmployees.length > 0
    ? totalProgress / enrolledEmployees.length
    : 0;

  const handleAssignEmployeesClick = () => {
    setShowDirectAccessUrls(true); // Show URLs when button is clicked
  };


  return (
    <div className="animate-slide-in pb-8">
      <CourseHeader course={course} />

      <CourseStats
        course={course}
        enrolledEmployees={enrolledEmployees}
        completedCount={completedCount}
        // Removed actionButtons prop here
      />

      <CourseResource course={course} />

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="modules">
            <TabsList className="mb-4">
              <TabsTrigger value="modules">Course Content</TabsTrigger>
              <TabsTrigger value="resources">Additional Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <CourseModules course={course} setCourse={setCourse} employeeId={employeeId} />
            </TabsContent>
            <TabsContent value="resources">
              <AdditionalResources />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <CompletionRate
            averageProgress={averageProgress}
            completedCount={completedCount}
            totalEnrolled={enrolledEmployees.length}
          />

          <EnrolledEmployees
            enrolledEmployees={enrolledEmployees}
            courseId={course.id}
            showDirectAccessUrls={showDirectAccessUrls} // Pass prop to control URL display
          />
        </div>
      </div>

      <SimilarCourses
        currentCourseId={course.id}
        similarCourses={courses.filter(c =>
          c.category === course.category || c.level === course.level
        )}
      />
    </div>
  );
};

export default CourseDetail;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, CalendarDays, ChevronRight, 
  BookOpen, Award, BadgeCheck, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Separator } from '@/components/ui/separator';
import { 
  getEmployeeById, getEmployeeCourses, calculateOverallProgress,
  getCourseById
} from '@/utils/data';

const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = getEmployeeById(id || '');
  
  if (!employee) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold">Employee not found</h2>
        <p className="text-muted-foreground mt-2">The employee you're looking for doesn't exist.</p>
        <Button asChild className="mt-4">
          <Link to="/employees">Back to Employees</Link>
        </Button>
      </div>
    );
  }
  
  const employeeCourses = getEmployeeCourses(employee.id);
  const overallProgress = calculateOverallProgress(employee.id);
  const completedCourses = employee.progress.filter(p => p.progress === 100).length;
  
  // Sort courses by last accessed (most recent first)
  const sortedCourses = [...employee.progress]
    .sort((a, b) => new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime())
    .map(progress => {
      const course = getCourseById(progress.courseId);
      return {
        ...course!,
        progress: progress.progress,
        lastAccessed: progress.lastAccessed
      };
    });
  
  // Calculate statistics
  const inProgressCourses = employee.progress.filter(p => p.progress > 0 && p.progress < 100).length;
  const notStartedCourses = employee.progress.filter(p => p.progress === 0).length;

  return (
    <div className="animate-slide-in pb-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/employees" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to employees
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="relative h-24 w-24 md:h-28 md:w-28 rounded-full bg-gray-100 overflow-hidden border-4 border-white shadow-md">
            <img 
              src={employee.imageUrl} 
              alt={employee.name}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="font-normal">
                    {employee.position}
                  </Badge>
                  <Badge variant="outline" className="font-normal">
                    {employee.department}
                  </Badge>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline">Edit Profile</Button>
                <Button>Assign Course</Button>
              </div>
            </div>
            
            <div className="mt-4">
              <ProgressBar 
                value={overallProgress} 
                size="md" 
                color="accent"
              />
              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{employee.progress.length} Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{completedCourses} Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Joined April 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-purple-50">
                <BadgeCheck className="h-5 w-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">{completedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-blue-50">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold">{inProgressCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-amber-50">
                <BookOpen className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Not Started</p>
                <p className="text-2xl font-bold">{notStartedCourses}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
        <Card>
          <CardHeader>
            <CardTitle>Course Overview</CardTitle>
            <CardDescription>
              Track progress across all assigned courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedCourses.map(course => (
                <div key={course.id}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <Link to={`/courses/${course.id}`} className="font-medium hover:underline">
                          {course.title}
                        </Link>
                        <div className="text-sm font-medium">
                          {course.progress}%
                        </div>
                      </div>
                      <ProgressBar 
                        value={course.progress} 
                        size="sm" 
                        color={course.progress === 100 ? "success" : "accent"}
                        showValue={false}
                      />
                      <div className="flex items-center justify-between mt-1.5">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5 mr-1" />
                          Last accessed on {new Date(course.lastAccessed).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {course.duration} • {course.modules.length} modules
                        </div>
                      </div>
                    </div>
                  </div>
                  <Separator className="mt-4" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Current Learning</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {sortedCourses
              .filter(course => course.progress > 0 && course.progress < 100)
              .slice(0, 4)
              .map(course => (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card className="h-full card-hover overflow-hidden">
                    <div className="relative h-28 w-full overflow-hidden">
                      <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                        <div 
                          className="h-full bg-accent"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-base mb-1 line-clamp-1">{course.title}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {course.duration}
                        </div>
                        <div>
                          {course.progress}% Complete
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full justify-between mt-1 text-xs">
                        <span>Continue Learning</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold">Learning in Progress</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Complete more courses to earn badges
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                        <Award className="h-6 w-6 text-gray-400" />
                      </div>
                      <span className="text-xs text-muted-foreground">Coming soon</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;

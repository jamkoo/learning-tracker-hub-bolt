export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  modules: Module[];
  resourceType?: 'pdf' | 'video' | 'link' | 'file' | 'none';
  resourceUrl?: string;
  fileName?: string;
}

export interface Module {
  id: string;
  title: string;
  duration: string;
  completed?: boolean;
  startedAt?: string;
  completedAt?: string;
  resourceType?: 'pdf' | 'video' | 'link' | 'file' | 'none';
  resourceUrl?: string;
  fileName?: string;
  content?: ModuleContent[];
}

export interface ModuleContent {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz' | 'activity' | 'scenario';
  duration?: string;
  resourceUrl?: string;
  fileName?: string;
  description?: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  imageUrl: string;
  accessLink?: string;
  email?: string; // Added email property
  progress: {
    courseId: string;
    progress: number;
    lastAccessed: string;
    modules?: {
      moduleId: string;
      status: 'not_started' | 'in_progress' | 'completed';
      startedAt?: string;
      completedAt?: string;
      timeSpent?: number;
    }[];
  }[];
}

// Get courses from localStorage or fallback to default data
const getStoredCourses = (): Course[] => {
  const storedCourses = localStorage.getItem('courses');
  if (storedCourses) {
    return JSON.parse(storedCourses);
  }
  return defaultCourses;
};

// Default courses data
const defaultCourses: Course[] = [
  {
    id: "c1",
    title: "Introduction to Design Thinking",
    description: "Learn the fundamental principles of design thinking and how to apply them to solve complex problems.",
    duration: "3 hours",
    category: "Design",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    resourceType: "pdf",
    resourceUrl: "https://example.com/design-thinking-guide.pdf",
    modules: [
      {
        id: "m1",
        title: "Design Thinking Overview",
        duration: "45 min",
        resourceType: "video",
        resourceUrl: "https://example.com/design-thinking-intro.mp4",
        content: [
          {
            id: "c1",
            title: "Introduction to Design Thinking",
            type: "video",
            duration: "15 min",
            resourceUrl: "https://example.com/intro-video.mp4"
          },
          {
            id: "c2",
            title: "Design Thinking Framework",
            type: "reading",
            resourceUrl: "https://example.com/framework.pdf"
          },
          {
            id: "c3",
            title: "Check Your Understanding",
            type: "quiz",
            description: "5 questions to test your knowledge"
          }
        ]
      },
      {
        id: "m2",
        title: "User Research Methods",
        duration: "60 min",
        resourceType: "pdf",
        resourceUrl: "https://example.com/user-research-guide.pdf"
      },
      {
        id: "m3",
        title: "Ideation Techniques",
        duration: "45 min",
        resourceType: "link",
        resourceUrl: "https://example.com/ideation-workshop"
      },
      { id: "m4", title: "Prototyping Basics", duration: "30 min" }
    ]
  },
  {
    id: "c2",
    title: "Project Management Essentials",
    description: "A comprehensive guide to the fundamentals of project management, from planning to execution.",
    duration: "4 hours",
    category: "Management",
    level: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    resourceType: "link",
    resourceUrl: "https://example.com/project-management-course",
    modules: [
      {
        id: "m1",
        title: "Project Lifecycle",
        duration: "60 min",
        resourceType: "video",
        resourceUrl: "https://example.com/project-lifecycle.mp4"
      },
      { id: "m2", title: "Resource Allocation", duration: "45 min" },
      {
        id: "m3",
        title: "Risk Management",
        duration: "60 min",
        resourceType: "pdf",
        resourceUrl: "https://example.com/risk-management.pdf"
      },
      { id: "m4", title: "Stakeholder Communication", duration: "45 min" },
      {
        id: "m5",
        title: "Project Closure",
        duration: "30 min",
        resourceType: "link",
        resourceUrl: "https://example.com/project-closure-checklist"
      }
    ]
  },
  {
    id: "c3",
    title: "Data Analysis with Python",
    description: "Learn how to collect, process, and analyze data using Python and its powerful data science libraries.",
    duration: "6 hours",
    category: "Data Science",
    level: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    resourceType: "video",
    resourceUrl: "https://example.com/python-data-analysis-course.mp4",
    modules: [
      {
        id: "m1",
        title: "Python Basics for Data Science",
        duration: "60 min",
        resourceType: "video",
        resourceUrl: "https://example.com/python-basics.mp4"
      },
      {
        id: "m2",
        title: "Data Manipulation with Pandas",
        duration: "90 min",
        resourceType: "pdf",
        resourceUrl: "https://example.com/pandas-tutorial.ipynb"
      },
      {
        id: "m3",
        title: "Data Visualization with Matplotlib",
        duration: "60 min",
        resourceType: "link",
        resourceUrl: "https://example.com/matplotlib-tutorial"
      },
      { id: "m4", title: "Statistical Analysis", duration: "90 min" },
      {
        id: "m5",
        title: "Machine Learning Introduction",
        duration: "60 min",
        resourceType: "pdf",
        resourceUrl: "https://example.com/ml-intro.pdf"
      }
    ]
  },
  {
    id: "c4",
    title: "Effective Communication Skills",
    description: "Develop essential communication skills for professional success in any workplace environment.",
    duration: "2.5 hours",
    category: "Soft Skills",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    modules: [
      { id: "m1", title: "Active Listening", duration: "30 min" },
      { id: "m2", title: "Clear and Concise Messaging", duration: "45 min" },
      { id: "m3", title: "Non-verbal Communication", duration: "30 min" },
      { id: "m4", title: "Presentation Skills", duration: "45 min" }
    ]
  },
  {
    id: "c5",
    title: "Leadership and Team Management",
    description: "Learn effective leadership strategies and team management techniques for driving organizational success.",
    duration: "5 hours",
    category: "Management",
    level: "Intermediate",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    modules: [
      { id: "m1", title: "Leadership Styles", duration: "60 min" },
      { id: "m2", title: "Team Building", duration: "45 min" },
      { id: "m3", title: "Conflict Resolution", duration: "60 min" },
      { id: "m4", title: "Performance Management", duration: "60 min" },
      { id: "m5", title: "Motivation Techniques", duration: "45 min" },
      { id: "m6", title: "Decision Making", duration: "30 min" }
    ]
  },
  {
    id: "c6",
    title: "Cybersecurity Fundamentals",
    description: "An introduction to key cybersecurity concepts, threats, and best practices for organizational security.",
    duration: "4 hours",
    category: "IT",
    level: "Beginner",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    modules: [
      { id: "m1", title: "Introduction to Cybersecurity", duration: "45 min" },
      { id: "m2", title: "Common Security Threats", duration: "60 min" },
      { id: "m3", title: "Security Best Practices", duration: "45 min" },
      { id: "m4", title: "Password Security", duration: "30 min" },
      { id: "m5", title: "Social Engineering", duration: "60 min" }
    ]
  },
];

// Initialize courses
export let courses: Course[] = getStoredCourses();

// Store courses to localStorage
const storeCourses = (courses: Course[]) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

// Update local storage whenever courses are modified
const updateStorage = () => {
  storeCourses(courses);
};

// Add a new course
export const addCourse = (course: Course): Promise<Course> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      courses = [...courses, course];
      updateStorage();
      resolve(course);
    }, 300); // simulate network delay
  });
};

// Update an existing course
export const updateCourse = (updatedCourse: Course): Promise<Course> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = courses.findIndex(c => c.id === updatedCourse.id);
      if (index === -1) {
        reject(new Error(`Course with ID ${updatedCourse.id} not found`));
        return;
      }

      courses = [
        ...courses.slice(0, index),
        updatedCourse,
        ...courses.slice(index + 1)
      ];

      updateStorage();
      resolve(updatedCourse);
    }, 300);
  });
};

// Delete a course
export const deleteCourse = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = courses.findIndex(c => c.id === id);
      if (index === -1) {
        reject(new Error(`Course with ID ${id} not found`));
        return;
      }

      courses = [
        ...courses.slice(0, index),
        ...courses.slice(index + 1)
      ];

      updateStorage();
      resolve();
    }, 300);
  });
};

export const employees: Employee[] = [
  {
    id: "e1",
    name: "Alex Johnson",
    position: "Product Manager",
    department: "Product",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "alex.johnson@example.com", // Added email
    progress: [
      { courseId: "c1", progress: 100, lastAccessed: "2023-09-15" },
      { courseId: "c2", progress: 75, lastAccessed: "2023-09-18" },
      { courseId: "c5", progress: 30, lastAccessed: "2023-09-20" }
    ]
  },
  {
    id: "e2",
    name: "Sarah Chen",
    position: "UX Designer",
    department: "Design",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "sarah.chen@example.com", // Added email
    progress: [
      { courseId: "c1", progress: 100, lastAccessed: "2023-09-10" },
      { courseId: "c4", progress: 60, lastAccessed: "2023-09-19" }
    ]
  },
  {
    id: "e3",
    name: "Marcus Williams",
    position: "Software Engineer",
    department: "Engineering",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    email: "marcus.williams@example.com", // Added email
    progress: [
      { courseId: "c3", progress: 90, lastAccessed: "2023-09-17" },
      { courseId: "c6", progress: 40, lastAccessed: "2023-09-21" }
    ]
  },
  {
    id: "e4",
    name: "Emily Rodriguez",
    position: "Marketing Specialist",
    department: "Marketing",
    imageUrl: "https://randomuser.me/api/portraits/women/17.jpg",
    email: "emily.rodriguez@example.com", // Added email
    progress: [
      { courseId: "c4", progress: 100, lastAccessed: "2023-09-12" },
      { courseId: "c5", progress: 50, lastAccessed: "2023-09-16" }
    ]
  },
  {
    id: "e5",
    name: "David Kim",
    position: "Data Analyst",
    department: "Analytics",
    imageUrl: "https://randomuser.me/api/portraits/men/70.jpg",
    email: "david.kim@example.com", // Added email
    progress: [
      { courseId: "c3", progress: 80, lastAccessed: "2023-09-14" }
    ]
  },
  {
    id: "e6",
    name: "Lisa Thompson",
    position: "HR Manager",
    department: "Human Resources",
    imageUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    email: "lisa.thompson@example.com", // Added email
    progress: [
      { courseId: "c4", progress: 100, lastAccessed: "2023-09-11" },
      { courseId: "c5", progress: 85, lastAccessed: "2023-09-15" }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(employee => employee.id === id);
};

export const calculateOverallProgress = (employeeId: string): number => {
  const employee = getEmployeeById(employeeId);
  if (!employee || employee.progress.length === 0) return 0;

  const totalProgress = employee.progress.reduce((sum, course) => sum + course.progress, 0);
  return Math.round(totalProgress / employee.progress.length);
};

export const getEmployeeCourses = (employeeId: string): (Course & { progress: number })[] => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return [];

  return employee.progress.map(progress => {
    const course = getCourseById(progress.courseId);
    return {
      ...course!,
      progress: progress.progress
    };
  });
};

export const generateEmployeeAccessLink = (employeeId: string): string => {
  return `/access/${employeeId}`; // More explicit URL construction
};

export const getEmployeeByAccessToken = (token: string): Employee | undefined => {
  const employeeId = token.split('/').pop();
  return employees.find(employee => employee.id === employeeId);
};

export const calculateTimeSpent = (employeeId: string, courseId: string): number => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return 0;

  const courseProgress = employee.progress.find(p => p.courseId === courseId);
  if (!courseProgress || !courseProgress.modules) return 0;

  return courseProgress.modules.reduce((total, module) => {
    return total + (module.timeSpent || 0);
  }, 0);
};

export const calculateAverageTimeSpent = (courseId: string): number => {
  const enrolledEmployees = employees.filter(emp =>
    emp.progress.some(p => p.courseId === courseId)
  );

  if (enrolledEmployees.length === 0) return 0;

  const totalTime = enrolledEmployees.reduce((total, emp) => {
    return total + calculateTimeSpent(emp.id, courseId);
  }, 0);

  return Math.round(totalTime / enrolledEmployees.length);
};

export const updateCourseProgress = (
  employeeId: string,
  courseId: string,
  moduleId: string,
  status: 'not_started' | 'in_progress' | 'completed',
  timeSpent?: number
): void => {
  const employee = getEmployeeById(employeeId);
  if (!employee) return;

  let courseProgress = employee.progress.find(p => p.courseId === courseId);

  if (!courseProgress) {
    courseProgress = {
      courseId,
      progress: 0,
      lastAccessed: new Date().toISOString(),
      modules: []
    };
    employee.progress.push(courseProgress);
  }

  // Update last accessed timestamp
  courseProgress.lastAccessed = new Date().toISOString();

  // Ensure modules array exists
  if (!courseProgress.modules) {
    courseProgress.modules = [];
  }

  // Find or create module progress
  let moduleProgress = courseProgress.modules.find(m => m.moduleId === moduleId);

  if (!moduleProgress) {
    moduleProgress = {
      moduleId,
      status: 'not_started'
    };
    courseProgress.modules.push(moduleProgress);
  }

  // Update module status and timestamps
  if (status === 'in_progress' && moduleProgress.status === 'not_started') {
    moduleProgress.startedAt = new Date().toISOString();
  } else if (status === 'completed' && moduleProgress.status !== 'completed') {
    moduleProgress.completedAt = new Date().toISOString();
  }

  moduleProgress.status = status;

  // Update time spent if provided
  if (timeSpent !== undefined) {
    moduleProgress.timeSpent = (moduleProgress.timeSpent || 0) + timeSpent;
  }

  // Recalculate overall course progress
  const course = getCourseById(courseId);
  if (course) {
    const totalModules = course.modules.length;
    const completedModules = courseProgress.modules.filter(m => m.status === 'completed').length;
    courseProgress.progress = Math.round((completedModules / totalModules) * 100);
  }
};

import React, { useState, useEffect } from 'react';
import { CourseCard } from '@/components/ui/CourseCard';
import { courses } from '@/utils/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { AddCourseDialog } from '@/components/dialogs/AddCourseDialog';
import { useToast } from '@/components/ui/use-toast';

const Courses: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [localCourses, setLocalCourses] = useState(courses);
  
  // Refresh local courses state when courses array changes
  useEffect(() => {
    setLocalCourses([...courses]);
  }, [courses]);
  
  // Extract unique categories
  const categories = ['all', ...new Set(localCourses.map(course => course.category))];
  
  // Extract unique levels
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];
  
  // Filter courses based on search query and filters
  const filteredCourses = localCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Handle course added or updated
  const handleCourseChange = () => {
    setLocalCourses([...courses]);
    toast({
      title: "Courses updated",
      description: "The course list has been refreshed",
    });
  };

  return (
    <div className="animate-slide-in pb-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage your learning content.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level} value={level}>
                  {level === 'all' ? 'All Levels' : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <AddCourseDialog onSuccess={handleCourseChange} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium">No courses match your search criteria</h3>
          <p className="text-muted-foreground mt-1">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default Courses;

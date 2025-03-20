import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Course, Employee, getEmployeeById } from '@/utils/data'; // Import getEmployeeById
import { cn } from '@/lib/utils';
import { renderResourceIcon, levelColorMap } from '@/utils/courseUtils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Select } from '@/components/ui/select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { employees } from '@/utils/data';
import { Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Input } from '@/components/ui/input';

interface CourseHeaderProps {
  course: Course;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ course }) => {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | undefined>(undefined);
  const [directAccessUrl, setDirectAccessUrl] = useState<string>('');
  const { toast } = useToast()
  const [email, setEmail] = useState<string>('');


  const generateDirectAccessUrl = (employeeId: string, courseId: string) => {
    return `${window.location.origin}/direct-access/${courseId}/${employeeId}`; // Updated URL format
  };

  const handleEmployeeSelect = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    const url = generateDirectAccessUrl(employeeId, course.id);
    setDirectAccessUrl(url);

    // Prefill email if employee data is available
    const selectedEmployee = getEmployeeById(employeeId);
    if (selectedEmployee && selectedEmployee.email) {
      setEmail(selectedEmployee.email);
    } else {
      setEmail(''); // Clear email if no email in data or employee not found
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(directAccessUrl);
    toast({
      title: "URL copied to clipboard!",
      description: "You can now share the direct access URL with the selected employee.",
    })
  };

  const handleSendEmail = () => {
    if (!selectedEmployeeId || !email) {
      toast({
        variant: "destructive",
        title: "Error sending email.",
        description: "Please select an employee and enter an email address.",
      });
      return;
    }

    // In a real application, you would send the email here.
    // For this example, we'll just log the email details to the console.
    console.log(`
      Email to: ${email}
      Subject: Direct Access URL for Course: ${course.title}
      Body: Here is your direct access URL for the course: ${course.title}: ${directAccessUrl}
    `);

    toast({
      title: "Email sent!",
      description: `Direct access URL sent to: ${email} (Simulated)`,
    });
    setEmail(''); // Clear email input after sending (simulated)
  };


  return (
    <div className="mb-6">
      <Button variant="ghost" size="sm" asChild className="mb-4">
        <Link to="/courses" className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to courses
        </Link>
      </Button>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={cn("font-medium", levelColorMap[course.level])}>
              {course.level}
            </Badge>
            <Badge variant="secondary">
              {course.category}
            </Badge>
            {course.resourceType && course.resourceType !== 'none' && (
              <Badge variant="outline" className="flex items-center gap-1">
                {renderResourceIcon(course.resourceType)}
                {course.resourceType.charAt(0).toUpperCase() + course.resourceType.slice(1)} Resource
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            {course.description}
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Assign to Employees</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Course to Employees</DialogTitle>
              <DialogDescription>
                Select an employee to generate a direct access URL for this course. The employee's email will be pre-filled if available, otherwise, you can enter it manually. You can then send the URL via email or copy it.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="employee">Employee</Label>
                <Select onValueChange={handleEmployeeSelect}>
                  <SelectTrigger id="employee">
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.id}>{employee.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {directAccessUrl && (
                <div className="grid gap-2">
                  <Label htmlFor="direct-url">Direct Access URL</Label>
                  <div className="flex items-center space-x-2">
                    <Textarea
                      id="direct-url"
                      value={directAccessUrl}
                      readOnly
                      className="resize-none"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleCopyUrl}
                    >
                      <Copy className="h-4 w-4 mr-2" /> Copy URL
                    </Button>
                  </div>
                </div>
              )}
               {directAccessUrl && (
                <div className="grid gap-2">
                  <Label htmlFor="email">Employee Email</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="employee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={handleSendEmail}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CourseHeader;

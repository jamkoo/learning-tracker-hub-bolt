import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { setCookie } from '@/lib/utils';
import { getCourseById, getEmployeeById } from '@/utils/data';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DirectAccess: React.FC = () => {
  const { courseId, employeeId } = useParams<{ courseId: string, employeeId: string }>(); // Extract from path params
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !employeeId) {
      setError("Invalid access link.");
      setLoading(false);
      return;
    }

    const course = getCourseById(courseId);
    const employee = getEmployeeById(employeeId);

    if (!course || !employee) {
      setError("Course or employee not found.");
      setLoading(false);
      return;
    }

    setCookie('employeeId', employeeId, 7);
    setCookie('courseId', courseId, 7);

    console.log(`Direct access: Employee ID: ${employeeId}, Course ID: ${courseId}`);
    navigate(`/courses/${courseId}`); // Navigate to course detail page
  }, [courseId, employeeId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error} Please check the access link or contact support.
            <div className="mt-4">
              <Button asChild variant="secondary">
                <Link to="/">Go to Homepage</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return null; // Should not reach here if loading is false and no error, navigation happens in useEffect
};

export default DirectAccess;

import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface CompletionRateProps {
  averageProgress: number;
  completedCount: number;
  totalEnrolled: number;
}

const CompletionRate: React.FC<CompletionRateProps> = ({ 
  averageProgress, 
  completedCount, 
  totalEnrolled 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Completion Rate</CardTitle>
        <CardDescription>
          Average progress across enrolled employees
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative flex items-center justify-center h-32 w-32 mb-4">
            <svg className="h-full w-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
              />
              <circle
                className="text-accent stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={Math.PI * 80}
                strokeDashoffset={Math.PI * 80 * (1 - averageProgress / 100)}
                fill="transparent"
                r="40"
                cx="50"
                cy="50"
                transform="rotate(-90 50 50)"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold">{Math.round(averageProgress)}%</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {completedCount} of {totalEnrolled} employees completed
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletionRate;

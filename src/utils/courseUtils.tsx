import React from 'react';
import { FileText, Video, Link as LinkIcon, File, BookOpen, HelpCircle, CheckSquare, Pen } from 'lucide-react';

export const renderResourceIcon = (type?: string) => {
  switch (type) {
    case 'pdf':
      return <FileText className="h-4 w-4 text-red-500" />;
    case 'video':
      return <Video className="h-4 w-4 text-blue-500" />;
    case 'link':
      return <LinkIcon className="h-4 w-4 text-green-500" />;
    case 'file':
      return <File className="h-4 w-4 text-orange-500" />;
    case 'quiz':
      return <HelpCircle className="h-4 w-4 text-purple-500" />;
    case 'activity':
      return <Pen className="h-4 w-4 text-indigo-500" />;
    case 'scenario':
      return <CheckSquare className="h-4 w-4 text-yellow-500" />;
    case 'reading':
      return <BookOpen className="h-4 w-4 text-teal-500" />;
    default:
      return <BookOpen className="h-4 w-4 text-gray-500" />;
  }
};

export const levelColorMap: Record<string, string> = {
  'Beginner': 'bg-green-100 text-green-700',
  'Intermediate': 'bg-blue-100 text-blue-700',
  'Advanced': 'bg-purple-100 text-purple-700'
};

export const contentTypeLabels: Record<string, string> = {
  'video': 'Video',
  'reading': 'Reading',
  'quiz': 'Quiz',
  'activity': 'Activity',
  'scenario': 'Scenario'
};

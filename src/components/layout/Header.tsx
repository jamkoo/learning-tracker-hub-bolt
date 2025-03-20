import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [searchFocused, setSearchFocused] = useState(false);
  
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="flex flex-1 justify-between px-4 items-center">
        <div className="flex flex-1 items-center">
          {children}
          
          <div className={cn(
            "max-w-lg w-full lg:max-w-xs relative transition-all duration-300 ease-apple rounded-md",
            searchFocused ? "w-96" : "w-64"
          )}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 py-2 border-none shadow-sm bg-gray-50 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-primary/20 focus-visible:bg-white"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>
        
        <div className="ml-4 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative rounded-full h-8 w-8 focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1 glass">
              <DropdownMenuLabel>Admin account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Documentation</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

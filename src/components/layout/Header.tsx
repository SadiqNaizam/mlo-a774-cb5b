import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GitFork, Search, PlusCircle, UserCircle, BookCopy, Settings, LogOut, ChevronsUpDown } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
    }`;

  const handleLogout = () => {
    console.log('User logout action');
    // Actual logout logic would go here
  };

  const handleNewRepository = () => {
    console.log('Create new repository action');
    // Navigate to new repo page or open modal
  };

  const handleNewOrganization = () => {
    console.log('Create new organization action');
    // Navigate to new org page or open modal
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <GitFork className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">GitPlatform</span>
        </Link>

        <div className="flex-1 md:flex-initial md:w-64 lg:w-96">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search repositories, users..."
              className="pl-8 w-full"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <NavLink to="/pull-request" className={navLinkClasses}>
            Pull Requests
          </NavLink>
          <NavLink to="/issues" className={navLinkClasses}> {/* Placeholder route */}
            Issues
          </NavLink>
          <NavLink to="/explore" className={navLinkClasses}> {/* Placeholder route */}
            Explore
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <PlusCircle className="h-5 w-5" />
                <span className="sr-only">New</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={handleNewRepository}>
                New repository
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleNewOrganization}>
                New organization
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="@user" />
                  <AvatarFallback>
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/user-profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 {/* Assuming user's repos are visible on their profile or dashboard */}
                <Link to="/user-profile">
                  <BookCopy className="mr-2 h-4 w-4" />
                  <span>Repositories</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                 {/* Assuming settings are part of user profile */}
                <Link to="/user-profile"> 
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           {/* Mobile Menu Trigger - simplified, real menu would use Sheet */}
           <Button variant="ghost" size="icon" className="md:hidden">
            <ChevronsUpDown className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
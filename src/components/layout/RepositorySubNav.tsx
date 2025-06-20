import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Code, GitPullRequest, AlertCircle, Settings2, PlayCircle } from 'lucide-react'; // Using AlertCircle for Issues

interface RepositorySubNavProps {
  repositoryName?: string; // Optional: could be used to display repo name
  owner?: string;          // Optional: could be used to display owner
}

const RepositorySubNav: React.FC<RepositorySubNavProps> = ({ repositoryName, owner }) => {
  console.log('RepositorySubNav loaded');
  const location = useLocation();

  const navLinkClasses = (path: string) =>
    `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted hover:text-primary ${
      location.pathname === path ? 'bg-muted text-primary font-semibold' : 'text-muted-foreground'
    }`;
  
  // These links assume the current repository context is implicitly handled by the target pages.
  const navItems = [
    { name: 'Code', href: '/repository-home', icon: Code },
    { name: 'Issues', href: '/issues', icon: AlertCircle }, // Placeholder route for a future specific page
    { name: 'Pull Requests', href: '/pull-request', icon: GitPullRequest },
    { name: 'Actions', href: '/actions', icon: PlayCircle }, // Placeholder route
    { name: 'Settings', href: '/repository-settings', icon: Settings2 }, // Placeholder route for repo settings
  ];

  return (
    <div className="border-b bg-background">
      <div className="container py-2">
        {repositoryName && owner && (
          <div className="mb-2">
            <h1 className="text-xl font-semibold text-foreground">
              <Link to={`/${owner}`} className="hover:underline">{owner}</Link> / <Link to="/repository-home" className="hover:underline">{repositoryName}</Link>
            </h1>
          </div>
        )}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={navLinkClasses(item.href)}
              end={item.href === '/repository-home'} // `end` prop for more precise active matching on base paths
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default RepositorySubNav;
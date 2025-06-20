import React from 'react';
import { Link } from 'react-router-dom';
import { GitFork } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t text-muted-foreground">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between text-sm">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <GitFork className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">GitPlatform</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 md:mb-0">
          {/* These are placeholder routes, implement pages as needed */}
          <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/help" className="hover:text-primary transition-colors">Help/Contact</Link>
        </nav>
        <div>
          <p className="text-center">
            &copy; {currentYear} GitPlatform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
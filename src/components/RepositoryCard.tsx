import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Star, GitFork } from 'lucide-react';

interface RepositoryCardProps {
  slug: string; // e.g., "owner/repo-name", used for linking and identification
  name: string;
  description: string;
  language?: string;
  stars: number;
  forks: number;
  lastUpdated: string; // e.g., "Updated 2 days ago"
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  slug,
  name,
  description,
  language,
  stars,
  forks,
  lastUpdated,
}) => {
  console.log(`RepositoryCard loaded for: ${slug}`);

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200 ease-in-out flex flex-col">
      <CardHeader className="p-4 md:p-5 pb-3 flex-grow"> {/* Adjusted padding */}
        <CardTitle className="text-lg md:text-xl font-semibold mb-1">
          <Link
            to="/repository-home" // Matches route in App.tsx
            state={{ repositorySlug: slug }} // Pass slug to the RepositoryHomePage
            className="text-blue-600 hover:text-blue-700 hover:underline"
          >
            {name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 h-[2.5em]"> {/* Ensure consistent height for description */}
          {description || "No description provided."}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="p-4 md:p-5 pt-3 border-t text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2">
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1">
            {language && (
              <div className="flex items-center" title={`Primary language: ${language}`}>
                <span className="h-3 w-3 rounded-full bg-sky-500 mr-1.5 inline-block flex-shrink-0" />
                <span>{language}</span>
              </div>
            )}
            <div className="flex items-center" title={`${stars.toLocaleString()} stars`}>
              <Star className="mr-1 h-4 w-4 text-yellow-500 flex-shrink-0" />
              <span>{stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center" title={`${forks.toLocaleString()} forks`}>
              <GitFork className="mr-1 h-4 w-4 text-slate-600 flex-shrink-0" />
              <span>{forks.toLocaleString()}</span>
            </div>
          </div>
          <div className="mt-1 sm:mt-0 text-right sm:text-left">
            <span>{lastUpdated}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RepositoryCard;
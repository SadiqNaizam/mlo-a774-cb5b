import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LucideProps } from 'lucide-react'; // For typing the icon prop

interface ActivityFeedItemProps {
  activityIcon: React.ComponentType<LucideProps>; // Icon component e.g., GitCommit from lucide-react
  actor: {
    name: string;
    avatarUrl: string; // URL for the avatar image
    profileUrl: string; // Path for react-router Link, e.g., "/user-profile/johndoe" or "/user-profile?id=123"
  };
  action: string; // e.g., "pushed to", "opened", "commented on"
  target: {
    name: string; // e.g., "main branch", "Pull Request #123", "Issue #456"
    url: string;    // Path for react-router Link, e.g., "/repository-home/project-x" or "/repository-home/project-x/pulls/123"
  };
  context?: { // Optional, for phrases like "in Repository Y"
    textBeforeLink: string; // e.g., "in"
    name: string;           // e.g., "Repository Y"
    url: string;            // Path for react-router Link, e.g., "/repository-home/project-y"
  };
  timestamp: string; // Pre-formatted timestamp, e.g., "2 hours ago" or "on June 10, 2024"
  details?: string;   // Optional additional details, like a commit message snippet or comment text
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  activityIcon: IconComponent,
  actor,
  action,
  target,
  context,
  timestamp,
  details,
}) => {
  console.log('ActivityFeedItem loaded for actor:', actor.name, 'action:', action);

  return (
    <div className="flex items-start space-x-3 sm:space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
      <IconComponent 
        className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-[6px] sm:mt-1 flex-shrink-0" 
        aria-hidden="true" 
      />
      
      <Link to={actor.profileUrl} className="flex-shrink-0">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
          <AvatarImage src={actor.avatarUrl} alt={`${actor.name}'s avatar`} />
          <AvatarFallback>{actor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex-1 min-w-0"> {/* min-w-0 is important for flex children to shrink and wrap properly */}
        <p className="text-sm text-gray-800 dark:text-gray-200 break-words">
          <Link to={actor.profileUrl} className="font-semibold text-gray-900 dark:text-white hover:underline">
            {actor.name}
          </Link>
          {' '}
          {action}
          {' '}
          <Link to={target.url} className="font-semibold text-gray-900 dark:text-white hover:underline">
            {target.name}
          </Link>
          {context && (
            <>
              {' '}
              {context.textBeforeLink}
              {' '}
              <Link to={context.url} className="font-semibold text-gray-900 dark:text-white hover:underline">
                {context.name}
              </Link>
            </>
          )}
        </p>
        
        {details && (
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 break-words">
            {details}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default ActivityFeedItem;
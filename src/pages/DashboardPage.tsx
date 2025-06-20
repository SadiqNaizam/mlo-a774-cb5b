import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import ActivityFeedItem from '@/components/ActivityFeedItem';
import RepositoryCard from '@/components/RepositoryCard';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';

// Lucide Icons
import { GitCommit, GitPullRequest, MessageSquare, PlusCircle } from 'lucide-react';

// Placeholder Data
const userRepositories = [
  {
    slug: "current-user/webapp-boilerplate",
    name: "WebApp-Boilerplate",
    description: "A full-featured boilerplate for modern web applications, including auth, DB, and more.",
    language: "TypeScript",
    stars: 152,
    forks: 33,
    lastUpdated: "Updated 2 hours ago",
  },
  {
    slug: "current-user/data-processing-api",
    name: "Data-Processing-API",
    description: "Backend API for asynchronous data processing and real-time analytics.",
    language: "Python",
    stars: 278,
    forks: 57,
    lastUpdated: "Updated 5 hours ago",
  },
  {
    slug: "current-user/mobile-ui-kit",
    name: "MobileUI-Kit",
    description: "A comprehensive collection of UI components for our new cross-platform mobile application.",
    language: "JavaScript",
    stars: 85,
    forks: 15,
    lastUpdated: "Updated 1 day ago",
  },
];

const userActivityFeed = [
  {
    id: 'activity1',
    activityIcon: GitCommit,
    actor: { name: "Alice Wonderland", avatarUrl: "https://i.pravatar.cc/100?u=alice", profileUrl: "/user-profile" },
    action: "pushed 3 new commits to",
    target: { name: "main branch", url: "/repository-home" }, // Assuming slug 'current-user/webapp-boilerplate' for context
    context: { textBeforeLink: "in", name: "WebApp-Boilerplate", url: "/repository-home" }, // State for slug needs to be passed if linking directly to repo
    timestamp: "30 minutes ago",
    details: "feat: Implement new dashboard widget system and update charts.",
  },
  {
    id: 'activity2',
    activityIcon: GitPullRequest,
    actor: { name: "Bob The Builder", avatarUrl: "https://i.pravatar.cc/100?u=bob", profileUrl: "/user-profile" },
    action: "opened pull request",
    target: { name: "#42: Critical Login Bug Fix", url: "/pull-request" }, // Assuming specific PR URL
    context: { textBeforeLink: "in", name: "Data-Processing-API", url: "/repository-home" }, // State for slug needs to be passed
    timestamp: "1 hour ago",
    details: "This PR addresses the critical login vulnerability reported in issue #38."
  },
  {
    id: 'activity3',
    activityIcon: MessageSquare,
    actor: { name: "Charlie Brown", avatarUrl: "https://i.pravatar.cc/100?u=charlie", profileUrl: "/user-profile" },
    action: "commented on",
    target: { name: "Pull Request #42", url: "/pull-request" }, // Assuming specific PR URL
    context: { textBeforeLink: "in", name: "Data-Processing-API", url: "/repository-home" }, // State for slug needs to be passed
    timestamp: "45 minutes ago",
    details: "LGTM! Just one minor suggestion regarding the error handling.",
  },
];

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  // Note: For links within ActivityFeedItem that go to a specific repository context (e.g., /repository-home for 'WebApp-Boilerplate'),
  // the ActivityFeedItem or the Link component would need to be enhanced to pass the repositorySlug in the 'state' object,
  // similar to how RepositoryCard does it, if /repository-home page expects it for specific repo views.
  // For this example, direct links are used assuming generic or specific-enough URLs from App.tsx.

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome & Quick Actions Section */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Welcome back, Developer!
            </h1>
            <Button 
              size="lg" 
              onClick={() => console.log('Create New Repository button clicked from DashboardPage')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Repository
            </Button>
          </div>
        </section>

        {/* Main Content Grid: Activity Feed & Repositories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Activity Feed Section (takes more space on large screens) */}
          <section className="lg:col-span-8">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              Recent Activity
            </h2>
            {userActivityFeed.length > 0 ? (
              <div className="space-y-1">
                {userActivityFeed.map((activity) => (
                  <ActivityFeedItem
                    key={activity.id}
                    activityIcon={activity.activityIcon}
                    actor={activity.actor}
                    action={activity.action}
                    target={activity.target}
                    context={activity.context}
                    timestamp={activity.timestamp}
                    details={activity.details}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No recent activity to display.</p>
            )}
          </section>

          {/* Repositories Section (sidebar-like on large screens) */}
          <section className="lg:col-span-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              My Repositories
            </h2>
            {userRepositories.length > 0 ? (
              <div className="space-y-4">
                {userRepositories.map((repo) => (
                  <RepositoryCard
                    key={repo.slug}
                    slug={repo.slug}
                    name={repo.name}
                    description={repo.description}
                    language={repo.language}
                    stars={repo.stars}
                    forks={repo.forks}
                    lastUpdated={repo.lastUpdated}
                  />
                ))}
                 <Button 
                    variant="outline" 
                    className="w-full mt-6" 
                    onClick={() => console.log("View all repositories clicked")}
                  >
                  View all repositories
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">You don't have any repositories yet.</p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
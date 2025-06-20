import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RepositoryCard from '@/components/RepositoryCard';
import ActivityFeedItem from '@/components/ActivityFeedItem';

// shadcn/ui Components
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lucide Icons
import { GitCommit, Star, GitFork, BookOpen, Users, MapPin, Briefcase, Link2 } from 'lucide-react';

// Placeholder Data
const userData = {
  name: "Alice Wonderland",
  username: "alicew",
  avatarUrl: "https://i.pravatar.cc/200?u=alicewonderland", // Placeholder avatar
  bio: "Full-stack developer exploring the wonders of code. TypeScript enthusiast & open source contributor. Currently building tools for collaborative software development.",
  followers: 1234,
  following: 56,
  location: "Cyberland",
  company: "Wonderland Solutions Inc.",
  website: "https://alicew.dev",
  email: "alice@example.com",
};

const repositories = [
  { id: "repo1", slug: "alicew/project-rabbit-hole", name: "project-rabbit-hole", description: "A deep dive into modern JavaScript frameworks and state management.", language: "TypeScript", stars: 150, forks: 30, lastUpdated: "Updated 2 days ago" },
  { id: "repo2", slug: "alicew/tea-party-scheduler", name: "tea-party-scheduler", description: "CLI tool to organize your tea parties with Hatter and Hare, built with Python.", language: "Python", stars: 90, forks: 12, lastUpdated: "Updated 5 days ago" },
  { id: "repo3", slug: "alicew/wonderland-ui", name: "wonderland-ui", description: "A whimsical React component library.", language: "React", stars: 210, forks: 25, lastUpdated: "Updated 1 week ago" },
];

const starredRepositories = [
  { id: "star1", slug: "otheruser/awesome-library", name: "awesome-library", description: "A utility library that does awesome things for web development.", language: "JavaScript", stars: 2500, forks: 400, lastUpdated: "Updated 1 day ago" },
  { id: "star2", slug: "framework/next-gen-framework", name: "next-gen-framework", description: "The future of web application development.", language: "Rust", stars: 5600, forks: 320, lastUpdated: "Updated 3 hours ago" },
];

const activities = [
  {
    id: "act1",
    activityIcon: GitCommit,
    actor: { name: userData.name, avatarUrl: userData.avatarUrl, profileUrl: "/user-profile" }, // Link to self
    action: "pushed new commits to",
    target: { name: "main branch", url: "/repository-home"}, // State for slug is not supported by ActivityFeedItem, general link.
    context: { textBeforeLink: "in", name: "project-rabbit-hole", url: "/repository-home"},
    timestamp: "3 hours ago",
    details: "feat: Add responsive design to user dashboard"
  },
  {
    id: "act2",
    activityIcon: Star,
    actor: { name: userData.name, avatarUrl: userData.avatarUrl, profileUrl: "/user-profile" },
    action: "starred",
    target: { name: "framework/next-gen-framework", url: "/repository-home"},
    timestamp: "1 day ago",
  },
  {
    id: "act3",
    activityIcon: GitFork,
    actor: { name: userData.name, avatarUrl: userData.avatarUrl, profileUrl: "/user-profile" },
    action: "forked",
    target: { name: "cool-org/design-patterns", url: "/repository-home"},
    timestamp: "2 days ago",
  },
  {
    id: "act4",
    activityIcon: BookOpen,
    actor: { name: userData.name, avatarUrl: userData.avatarUrl, profileUrl: "/user-profile" },
    action: "created repository",
    target: { name: "alicew/wonderland-ui", url: "/repository-home"},
    timestamp: "1 week ago",
  },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Profile Header Section */}
          <section className="mb-10 md:mb-12">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6 md:gap-8">
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-lg">
                <AvatarImage src={userData.avatarUrl} alt={userData.name} />
                <AvatarFallback className="text-4xl">{userData.name.substring(0, 1)}{userData.username.substring(0,1)}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{userData.name}</h1>
                <p className="text-xl text-muted-foreground">@{userData.username}</p>
                <p className="mt-3 text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto md:mx-0">{userData.bio}</p>
                
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground items-center">
                  {userData.company && (
                    <span className="flex items-center"><Briefcase className="w-4 h-4 mr-1.5" /> {userData.company}</span>
                  )}
                  {userData.location && (
                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1.5" /> {userData.location}</span>
                  )}
                  {userData.website && (
                    <a href={userData.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary dark:hover:text-sky-400">
                      <Link2 className="w-4 h-4 mr-1.5" /> {userData.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-muted-foreground items-center">
                  <span className="flex items-center"><Users className="w-4 h-4 mr-1.5" /> <strong>{userData.followers.toLocaleString()}</strong> followers</span>
                  <span>·</span>
                  <span><strong>{userData.following.toLocaleString()}</strong> following</span>
                </div>

                <div className="mt-6 flex justify-center md:justify-start gap-2">
                  <Button variant="outline">Follow</Button> {/* Placeholder */}
                  <Button variant="ghost">Sponsor</Button> {/* Placeholder */}
                </div>
              </div>
            </div>
          </section>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:w-auto md:inline-flex mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="repositories">Repositories ({repositories.length})</TabsTrigger>
              <TabsTrigger value="stars">Stars ({starredRepositories.length})</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Popular Repositories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {repositories.slice(0, 2).map(repo => ( // Show a couple of popular repos
                     <RepositoryCard key={repo.id} {...repo} />
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-muted-foreground p-4">
                      [Contribution Heatmap Placeholder - A visual representation of commit activity over the past year would go here.]
                    </div>
                  </CardContent>
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="repositories">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Public Repositories</h2>
                {repositories.length > 0 ? (
                  <div className="space-y-4">
                    {repositories.map(repo => (
                      <RepositoryCard key={repo.id} {...repo} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">This user has no public repositories.</p>
                )}
              </section>
            </TabsContent>

            <TabsContent value="stars">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Starred Repositories</h2>
                {starredRepositories.length > 0 ? (
                  <div className="space-y-4">
                    {starredRepositories.map(repo => (
                      <RepositoryCard key={repo.id} {...repo} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">This user has not starred any repositories yet.</p>
                )}
              </section>
            </TabsContent>

            <TabsContent value="activity">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Recent Activity</h2>
                {activities.length > 0 ? (
                  <div className="space-y-1">
                    {activities.map(activity => (
                      <ActivityFeedItem key={activity.id} {...activity} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No recent activity to display.</p>
                )}
              </section>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;
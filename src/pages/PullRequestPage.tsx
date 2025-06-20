import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RepositorySubNav from '@/components/layout/RepositorySubNav';
import DiffViewer from '@/components/DiffViewer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  GitPullRequest, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  GitCommit, 
  FileDiff, 
  User, 
  AlertTriangle, 
  Info, 
  GitMerge 
} from 'lucide-react';

const PullRequestPage = () => {
  console.log('PullRequestPage loaded');
  const [newComment, setNewComment] = useState("");

  // Placeholder data
  const prData = {
    id: "pr123",
    number: 1234,
    title: "Feature: Enhance user profile page with activity feed",
    author: { name: "coder-alice", avatarUrl: "https://i.pravatar.cc/150?u=coder-alice", profileUrl: "/user-profile" },
    status: "Open", // "Merged", "Closed"
    branch: "feature/profile-activity",
    baseBranch: "main",
    description: `### Overview
This pull request introduces an activity feed to the user profile page, allowing users to see recent contributions and interactions.

### Key Changes
- Added \`ActivityFeed\` component.
- Integrated activity data fetching for profiles.
- Updated profile page layout to include the new feed.
- Added unit tests for the new component and data service.

### Screenshots
*(Imagine a screenshot here)*

### Related Issues
- Closes #45
- Addresses #48
`,
    comments: [
      { id: "c1", author: { name: "reviewer-bob", avatarUrl: "https://i.pravatar.cc/150?u=reviewer-bob", profileUrl: "/user-profile" }, text: "This looks like a great addition! Could you clarify how pagination will work for the activity feed if there are many items?", timestamp: "3 hours ago" },
      { id: "c2", author: { name: "coder-alice", avatarUrl: "https://i.pravatar.cc/150?u=coder-alice", profileUrl: "/user-profile" }, text: "Thanks, Bob! For V1, we're showing the latest 20 items. Pagination is planned for a follow-up PR to keep this one focused. I've added a note to the backlog.", timestamp: "1 hour ago" },
    ],
    commits: [
      { sha: "a1b2c3d", message: "feat: Add ActivityFeed component structure", author: "coder-alice", date: "Yesterday" },
      { sha: "e4f5g6h", message: "feat: Implement data fetching for activity", author: "coder-alice", date: "Today" },
      { sha: "i7j8k9l", message: "test: Add unit tests for ActivityFeed", author: "coder-alice", date: "Just now" },
    ],
    filesChanged: [
      { name: "src/components/ActivityFeed.tsx", additions: 120, deletions: 0, status: "added" },
      { name: "src/pages/UserProfilePage.tsx", additions: 45, deletions: 5, status: "modified" },
      { name: "src/services/activityService.ts", additions: 30, deletions: 2, status: "modified" },
    ],
    statusChecks: [
      { name: "Build & Deploy", status: "success", description: "Build passed, deployment to preview successful" },
      { name: "Unit Tests", status: "success", description: "128/128 tests passed" },
      { name: "Linter Checks", status: "success", description: "No linting issues found" },
      { name: "CodeQL Analysis", status: "pending", description: "Analysis in progress..." },
    ],
  };

  const oldCodeExample = `// src/pages/UserProfilePage.tsx (old)
import React from 'react';

const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
      {/* Old profile content */}
    </div>
  );
};
export default UserProfilePage;`;

  const newCodeExample = `// src/pages/UserProfilePage.tsx (new)
import React from 'react';
import ActivityFeed from '@/components/ActivityFeed'; // New import

const UserProfilePage = () => {
  return (
    <div>
      <h1>User Profile</h1>
      {/* Existing profile content */}
      <section className="mt-8">
        <h2>Recent Activity</h2>
        <ActivityFeed userId="currentUserId" /> {/* New component usage */}
      </section>
    </div>
  );
};
export default UserProfilePage;`;

  const handlePostComment = () => {
    if (newComment.trim()) {
      console.log("Posting comment:", newComment);
      // In a real app, this would involve an API call and state update.
      // For this example, we'll just clear the textarea.
      setNewComment("");
      alert("Comment submitted (placeholder action)!");
    }
  };

  const handleMergePR = () => {
    console.log("Attempting to merge PR:", prData.title);
    alert(`Merging PR #${prData.number} (placeholder action)!`);
    // In a real app, this would trigger merge logic, update PR status, etc.
  };

  const getStatusBadgeClasses = (status: string) => {
    if (status === "Open") return "bg-green-600 hover:bg-green-700 text-white";
    if (status === "Merged") return "bg-purple-600 hover:bg-purple-700 text-white";
    if (status === "Closed") return "bg-red-600 hover:bg-red-700 text-white";
    return "bg-gray-500 hover:bg-gray-600 text-white";
  };

  const getCheckIcon = (status: string) => {
    if (status === "success") return <CheckCircle2 className="mr-2 h-4 w-4 text-green-500 flex-shrink-0" />;
    if (status === "failure") return <XCircle className="mr-2 h-4 w-4 text-red-500 flex-shrink-0" />;
    if (status === "pending") return <Info className="mr-2 h-4 w-4 text-yellow-500 animate-pulse flex-shrink-0" />;
    if (status === "warning") return <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 flex-shrink-0" />;
    return <Info className="mr-2 h-4 w-4 text-gray-500 flex-shrink-0" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />
      <RepositorySubNav repositoryName="example-repo" owner="git-org" />

      <ScrollArea className="flex-1">
        <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8">
          {/* PR Header */}
          <section className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-50 break-words">
                {prData.title} <span className="text-gray-400 dark:text-gray-500">#{prData.number}</span>
              </h1>
              <Badge
                className={`capitalize text-sm px-3 py-1 ${getStatusBadgeClasses(prData.status)}`}
              >
                <GitPullRequest className="mr-1.5 h-4 w-4" />
                {prData.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link to={prData.author.profileUrl} className="font-semibold hover:underline text-blue-600 dark:text-blue-400">
                {prData.author.name}
              </Link> wants to merge {prData.commits.length} commit{prData.commits.length > 1 ? 's' : ''} into <Badge variant="outline" className="mx-1 text-xs">{prData.baseBranch}</Badge>
              from <Badge variant="outline" className="mx-1 text-xs">{prData.branch}</Badge>.
            </p>
          </section>

          {/* Tab-like Navigation (Simplified) */}
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
              {/* For active tab, add: border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300 */}
              <a href="#conversation" className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-300">
                <MessageSquare className="inline mr-1.5 h-4 w-4" /> Conversation
              </a>
              <a href="#commits" className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600">
                <GitCommit className="inline mr-1.5 h-4 w-4" /> Commits ({prData.commits.length})
              </a>
              <a href="#files-changed" className="whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600">
                <FileDiff className="inline mr-1.5 h-4 w-4" /> Files Changed ({prData.filesChanged.length})
              </a>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              {/* PR Description in a Comment-like Card */}
              <Card id="description" className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                <CardHeader className="border-b dark:border-gray-700/60 p-4">
                  <div className="flex items-center space-x-3">
                    <Link to={prData.author.profileUrl}>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={prData.author.avatarUrl} alt={prData.author.name} />
                        <AvatarFallback>{prData.author.name.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div>
                      <p className="text-sm">
                        <Link to={prData.author.profileUrl} className="font-semibold hover:underline text-gray-900 dark:text-gray-100">
                          {prData.author.name}
                        </Link>
                        <span className="text-gray-500 dark:text-gray-400"> commented</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Opened this pull request 3 days ago</p> {/* Placeholder */}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 prose prose-sm dark:prose-invert max-w-none">
                  {/* Using 'pre' for basic markdown-like display. Replace with MarkdownRenderer if available and needed. */}
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{prData.description}</pre>
                </CardContent>
              </Card>

              {/* Conversation/Comments Section */}
              <section id="conversation" className="space-y-4">
                {prData.comments.map((comment) => (
                  <Card key={comment.id} className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                    <CardHeader className="border-b dark:border-gray-700/60 p-4">
                       <div className="flex items-center space-x-3">
                        <Link to={comment.author.profileUrl}>
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                            <AvatarFallback>{comment.author.name.substring(0,2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <p className="text-sm">
                            <Link to={comment.author.profileUrl} className="font-semibold hover:underline text-gray-900 dark:text-gray-100">
                              {comment.author.name}
                            </Link>
                            <span className="text-gray-500 dark:text-gray-400"> commented {comment.timestamp}</span>
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 text-sm text-gray-800 dark:text-gray-200">
                      <p className="leading-relaxed">{comment.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </section>

              {/* Add Comment Section */}
              <Card className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                <CardHeader className="p-4">
                  <CardTitle className="text-md font-semibold">Leave a comment</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Textarea
                    placeholder="Write your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[120px] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  />
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-end">
                  <Button onClick={handlePostComment} disabled={!newComment.trim()}>Comment</Button>
                </CardFooter>
              </Card>

              {/* Commits Section */}
              <Card id="commits" className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                <CardHeader className="p-4">
                  <CardTitle className="text-md font-semibold flex items-center"><GitCommit className="mr-2 h-5 w-5"/>Commits</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-3">
                    {prData.commits.map(commit => (
                      <li key={commit.sha} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{commit.message}</p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <User className="mr-1 h-3 w-3" />
                            {commit.author} committed on {commit.date}
                          </div>
                        </div>
                        <Badge variant="outline" className="font-mono text-xs tracking-tighter">{commit.sha.substring(0,7)}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Files Changed Section - DiffViewer */}
              <section id="files-changed">
                 <DiffViewer oldCode={oldCodeExample} newCode={newCodeExample} />
              </section>
            </div>

            {/* Right Sidebar */}
            <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
              <Card className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                <CardHeader className="p-4">
                  <CardTitle className="text-md font-semibold">Merge Pull Request</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-3">
                  {prData.statusChecks.every(check => check.status === "success") && prData.status === "Open" ? (
                    <div className="flex items-start p-3 rounded-md bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700/50">
                      <CheckCircle2 className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">All checks have passed. Ready to merge!</p>
                    </div>
                  ) : prData.status === "Open" ? (
                     <div className="flex items-start p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700/50">
                      <AlertTriangle className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">Some checks are pending or have failed.</p>
                    </div>
                  ) : (
                    <div className="flex items-start p-3 rounded-md bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border dark:border-gray-600">
                      <Info className="mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                      <p className="text-sm font-medium">This pull request is {prData.status.toLowerCase()}.</p>
                    </div>
                  )}
                  <Button
                    size="lg"
                    className={`w-full text-white ${
                        prData.status === "Open" && prData.statusChecks.every(check => check.status === "success")
                        ? "bg-green-600 hover:bg-green-700"
                        : prData.status === "Open" 
                          ? "bg-orange-500 hover:bg-orange-600" // Suggest caution if checks not all green
                          : "bg-gray-400 cursor-not-allowed"
                    }`}
                    onClick={handleMergePR}
                    disabled={prData.status !== "Open"}
                  >
                    <GitMerge className="mr-2 h-5 w-5"/> Merge Pull Request
                  </Button>
                </CardContent>
                 <CardFooter className="p-4 pt-2 text-xs text-gray-500 dark:text-gray-400 border-t dark:border-gray-700/60">
                  You can also merge branches locally using the command line.
                </CardFooter>
              </Card>

              <Card className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                <CardHeader className="p-4">
                  <CardTitle className="text-md font-semibold">Status Checks</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2.5">
                    {prData.statusChecks.map(check => (
                      <li key={check.name} className="flex items-center text-sm">
                        {getCheckIcon(check.status)}
                        <span className={`font-medium text-gray-800 dark:text-gray-200`}>{check.name}</span>
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 text-right truncate" title={check.description}>{check.description}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                 <CardHeader className="p-4"><CardTitle className="text-md font-semibold">Labels</CardTitle></CardHeader>
                 <CardContent className="p-4 pt-0 flex flex-wrap gap-2">
                    <Badge variant="secondary">bug</Badge>
                    <Badge variant="secondary">enhancement</Badge>
                    <Badge variant="outline">documentation</Badge>
                 </CardContent>
              </Card>
               <Card className="shadow-sm dark:bg-gray-800/50 dark:border-gray-700/60">
                 <CardHeader className="p-4"><CardTitle className="text-md font-semibold">Assignees</CardTitle></CardHeader>
                 <CardContent className="p-4 pt-0 space-y-2">
                    <Link to="/user-profile" state={{ username: "assignee_one" }} className="flex items-center space-x-2 group">
                       <Avatar className="h-7 w-7">
                            <AvatarImage src="https://i.pravatar.cc/150?u=assignee_one" alt="assignee_one" />
                            <AvatarFallback>A1</AvatarFallback>
                       </Avatar>
                       <span className="text-sm group-hover:underline text-gray-800 dark:text-gray-200">assignee_one</span>
                    </Link>
                     <p className="text-xs text-gray-500 dark:text-gray-400">No one assigned yet.</p> {/* Example if no one assigned */}
                 </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </ScrollArea>
      <Footer />
    </div>
  );
};

export default PullRequestPage;
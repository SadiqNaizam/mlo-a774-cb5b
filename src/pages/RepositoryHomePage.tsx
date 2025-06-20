import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RepositorySubNav from '@/components/layout/RepositorySubNav';
import FileTreeBrowser, { FileSystemItem } from '@/components/FileTreeBrowser';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// Shadcn/UI Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Lucide Icons
import { GitCommit, GitBranch, Tag, Users, Star, GitFork as GitForkIcon, Copy, Download, AlertTriangle } from 'lucide-react';

// Sample Data
const sampleReadmeContent = `
# Sample Repository: My Awesome Project

This is a sample README for demonstrating the **MarkdownRenderer** component.
It supports various Markdown features including:

- Headings
- Lists (unordered and ordered)
- Code blocks (with syntax highlighting for common languages)
- Links
- Images (if URLs are provided)
- Blockquotes
- Tables

## Features
- Feature A: Built with React and TypeScript.
- Feature B: Styled with Tailwind CSS.
- Feature C: Utilizes shadcn/ui components.

## Installation
To get started with this project, clone the repository and install dependencies:
\`\`\`bash
git clone https://gitplatform.com/git-user/example-repo.git
cd example-repo
npm install
\`\`\`

## Usage
Run the development server:
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change. Ensure to follow the existing code style and add tests for any new features.

## License
This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
`;

const sampleFileTree: FileSystemItem[] = [
  { id: 'folder-src', name: 'src', type: 'folder', children: [
    { id: 'folder-components', name: 'components', type: 'folder', children: [
      { id: 'file-button', name: 'Button.tsx', type: 'file' },
      { id: 'file-card', name: 'Card.tsx', type: 'file' },
    ]},
    { id: 'folder-pages', name: 'pages', type: 'folder', children: [
      { id: 'file-homepage', name: 'HomePage.tsx', type: 'file' },
    ]},
    { id: 'file-app', name: 'App.tsx', type: 'file' },
    { id: 'file-index', name: 'index.ts', type: 'file' },
  ]},
  { id: 'folder-public', name: 'public', type: 'folder', children: [
    { id: 'file-html', name: 'index.html', type: 'file' },
    { id: 'file-svg', name: 'vite.svg', type: 'file' },
  ]},
  { id: 'file-gitignore', name: '.gitignore', type: 'file' },
  { id: 'file-readme', name: 'README.md', type: 'file' },
  { id: 'file-packagejson', name: 'package.json', type: 'file' },
  { id: 'folder-empty', name: 'empty_folder', type: 'folder', children: []},
];

const RepositoryHomePage = () => {
  console.log('RepositoryHomePage loaded');
  const location = useLocation();
  
  const [repositoryName, setRepositoryName] = useState('example-repo');
  const [owner, setOwner] = useState('git-user');
  const [cloneUrl, setCloneUrl] = useState(`https://gitplatform.com/${owner}/${repositoryName}.git`);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.repositorySlug) {
      const slug = location.state.repositorySlug as string;
      const parts = slug.split('/');
      if (parts.length === 2 && parts[0] && parts[1]) {
        setOwner(parts[0]);
        setRepositoryName(parts[1]);
        setCloneUrl(`https://gitplatform.com/${parts[0]}/${parts[1]}.git`);
        setError(null);
      } else {
        const errMsg = `Invalid repository slug format: "${slug}". Expected "owner/repo-name".`;
        console.warn('RepositoryHomePage:', errMsg);
        setError(errMsg);
        // Fallback to defaults if slug is invalid
        setOwner('unknown-owner');
        setRepositoryName('unknown-repo');
        setCloneUrl(`https://gitplatform.com/unknown-owner/unknown-repo.git`);
      }
    } else {
        console.log("RepositoryHomePage: No repositorySlug found in location state. Using default values.");
        // Default values are already set by useState, no specific error for this case.
    }
  }, [location.state]);

  const handleFork = () => {
    console.log(`Forking repository: ${owner}/${repositoryName}`);
    // In a real app, this would trigger an API call.
    // For now, show a toast or alert. Using alert as Sonner setup is not part of this page.
    alert(`Repository ${owner}/${repositoryName} forked! (This is a placeholder action)`);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Clone URL copied to clipboard!'); // Placeholder, use Sonner toast in real app
    }).catch(err => {
      console.error('Failed to copy clone URL: ', err);
      alert('Failed to copy URL.');
    });
  };

  const repoStats = [
    { label: "Commits", value: "1,234", icon: GitCommit },
    { label: "Branches", value: "10", icon: GitBranch },
    { label: "Releases", value: "v1.2.0", icon: Tag },
    { label: "Contributors", value: "42", icon: Users },
    { label: "Stars", value: "567", icon: Star },
    { label: "Forks", value: "89", icon: GitForkIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <RepositorySubNav repositoryName={repositoryName} owner={owner} />

      <main className="flex-grow container mx-auto px-4 py-6">
        {error && (
          <Card className="mb-6 border-red-500 bg-red-50 dark:bg-red-900/30">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400 flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Error Loading Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 dark:text-red-300">{error}</p>
              <p className="mt-2 text-sm text-muted-foreground">Please check the repository URL or try navigating again. If the issue persists, the repository might not exist or you may not have access.</p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar: File Tree + Clone/Download */}
          <aside className="lg:col-span-3 space-y-6">
            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Code</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <FileTreeBrowser data={sampleFileTree} height="h-80" className="border-0" />
              </CardContent>
              <CardHeader className="pt-2 pb-2 border-t dark:border-gray-700">
                 <div className="relative w-full">
                    <Input 
                        type="text" 
                        readOnly 
                        value={cloneUrl} 
                        className="pr-10 text-sm bg-muted dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                        aria-label="Repository clone URL"
                    />
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        onClick={() => copyToClipboard(cloneUrl)}
                        title="Copy clone URL"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                 </div>
              </CardHeader>
              <CardContent className="pt-2">
                <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download ZIP
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content: README + Stats */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                    Last commit: <span className="font-medium">abc1234</span> by <Link to="/user-profile" state={{ username: 'contributor-user'}} className="text-blue-600 dark:text-blue-400 hover:underline">contributor-user</Link> 2 hours ago
                </div>
                <Button onClick={handleFork} variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <GitForkIcon className="mr-2 h-4 w-4" /> Fork ({repoStats.find(s => s.label === "Forks")?.value || 'N/A'})
                </Button>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">README.md</CardTitle>
              </CardHeader>
              <CardContent>
                <MarkdownRenderer markdownText={sampleReadmeContent} />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Repository Stats</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {repoStats.map(stat => (
                  <div key={stat.label} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                    <stat.icon className="h-5 w-5 mr-3 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{stat.value}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RepositoryHomePage;
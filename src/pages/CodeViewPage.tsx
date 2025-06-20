import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import RepositorySubNav from '@/components/layout/RepositorySubNav';
import Footer from '@/components/layout/Footer';

// Custom UI Components
import CodeViewer from '@/components/CodeViewer';

// Shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Lucide Icons
import { GitBranch, Tag, History, Download, FileText, Folder } from 'lucide-react';

// Placeholder data
const mockRepository = {
  owner: "dev-user",
  name: "my-cool-project",
};

const mockFilePath = "src/features/authentication/AuthForm.tsx";

const mockBranches = [
  { id: "main", name: "main", type: "branch" as "branch" | "tag" },
  { id: "develop", name: "develop", type: "branch" as "branch" | "tag" },
  { id: "feature/new-ui", name: "feature/new-ui", type: "branch" as "branch" | "tag" },
];

const mockTags = [
  { id: "v1.0.0", name: "v1.0.0", type: "tag" as "branch" | "tag" },
  { id: "v1.1.0-beta", name: "v1.1.0-beta", type: "tag" as "branch" | "tag" },
];

const mockFileContent = `import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AuthFormProps {
  onSubmit: (data: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
};

export default AuthForm;
`;

const CodeViewPage = () => {
  console.log('CodeViewPage loaded');
  const location = useLocation(); // Could be used to get actual path/branch from URL params in a real app
  
  // For demonstration, we use mock data. In a real app, this would come from URL, API, or state.
  const [currentBranchOrTag, setCurrentBranchOrTag] = useState<string>(mockBranches[0].id);
  const filePathParts = mockFilePath.split('/').filter(part => part !== '');
  const currentFileName = filePathParts[filePathParts.length - 1];
  const isDirectoryView = false; // For simplicity, always show file view. A real app would determine this.

  const handleBranchOrTagChange = (value: string) => {
    setCurrentBranchOrTag(value);
    console.log('Selected branch/tag:', value);
    // In a real app, this would trigger fetching new file/directory content
  };

  const handleBlame = () => {
    console.log('Blame view requested for:', currentFileName);
    // Navigate to blame view or update UI
  };

  const handleRaw = () => {
    console.log('Raw view requested for:', currentFileName);
    // Open raw file content in new tab or similar
  };

  const handleDownload = () => {
    console.log('Download requested for:', currentFileName);
    // Trigger file download
  };
  
  const handleHistory = () => {
    console.log('History requested for:', currentFileName);
    // Navigate to commit history page for this file
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <RepositorySubNav repositoryName={mockRepository.name} owner={mockRepository.owner} />

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* Top control bar: Breadcrumbs, Branch/Tag selector, Action Buttons */}
        <section className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/repository-home" state={{ repositorySlug: `${mockRepository.owner}/${mockRepository.name}` }}>
                      {mockRepository.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {filePathParts.slice(0, -1).map((part, index) => {
                  const pathSoFar = filePathParts.slice(0, index + 1).join('/');
                  return (
                    <React.Fragment key={index}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                           {/* In a real app, this link would go to /code-view?path={pathSoFar}&branch={currentBranchOrTag} */}
                          <Link to={`/code-view`}>{part}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {isDirectoryView ? <Folder className="h-4 w-4 inline-block mr-1" /> : <FileText className="h-4 w-4 inline-block mr-1" />}
                    {currentFileName}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-2 flex-wrap">
              <Select value={currentBranchOrTag} onValueChange={handleBranchOrTagChange}>
                <SelectTrigger className="w-auto min-w-[180px]">
                  <div className="flex items-center">
                    {mockBranches.find(b => b.id === currentBranchOrTag)?.type === 'branch' ? 
                      <GitBranch className="h-4 w-4 mr-2 text-muted-foreground" /> : 
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />}
                    <SelectValue placeholder="Select branch/tag" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Branches</SelectLabel>
                    {mockBranches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        <GitBranch className="h-4 w-4 mr-2 inline-block" /> {branch.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {mockTags.map(tag => (
                      <SelectItem key={tag.id} value={tag.id}>
                        <Tag className="h-4 w-4 mr-2 inline-block" /> {tag.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              {!isDirectoryView && (
                <>
                  <Button variant="outline" size="sm" onClick={handleHistory}>
                    <History className="mr-2 h-4 w-4" /> History
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Code Viewer or Directory Listing */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {isDirectoryView ? (
            <div className="p-8 text-center text-muted-foreground">
              <Folder className="h-16 w-16 mx-auto mb-4" />
              <p className="text-lg">Directory View for: {currentFileName}</p>
              <p>File listing would go here.</p>
              {/* Here you might use FileTreeBrowser component if it was part of layout_info and requirements */}
            </div>
          ) : (
            <CodeViewer
              fileName={currentFileName}
              fileContent={mockFileContent}
              language="tsx" // Determine dynamically based on file extension in a real app
              showLineNumbers={true}
              onBlameClick={handleBlame}
              onRawClick={handleRaw}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CodeViewPage;
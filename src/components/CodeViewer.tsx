import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GitCommit, FileText, Settings2 } from 'lucide-react'; // Settings2 for view options

interface CodeViewerProps {
  fileName?: string;
  fileContent: string;
  language?: string; // e.g., 'javascript', 'python', 'tsx'
  showLineNumbers?: boolean;
  onBlameClick?: () => void;
  onRawClick?: () => void;
}

const CodeViewer: React.FC<CodeViewerProps> = ({
  fileName,
  fileContent,
  language,
  showLineNumbers = true,
  onBlameClick,
  onRawClick,
}) => {
  console.log(`CodeViewer loaded for ${fileName || 'a file'}. Language: ${language}`);

  const lines = fileContent.split('\n');

  const handleBlame = () => {
    if (onBlameClick) {
      onBlameClick();
    } else {
      console.log('Blame view clicked for:', fileName);
      // Placeholder for blame functionality
    }
  };

  const handleRaw = () => {
    if (onRawClick) {
      onRawClick();
    } else {
      console.log('Raw view clicked for:', fileName);
      // Placeholder for raw view functionality
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      {fileName || onBlameClick || onRawClick ? (
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          {fileName && <CardTitle className="text-lg font-medium">{fileName}</CardTitle>}
          <div className="flex items-center gap-2">
            {onBlameClick && (
              <Button variant="outline" size="sm" onClick={handleBlame}>
                <GitCommit className="mr-2 h-4 w-4" />
                Blame
              </Button>
            )}
            {onRawClick && (
              <Button variant="outline" size="sm" onClick={handleRaw}>
                <FileText className="mr-2 h-4 w-4" />
                Raw
              </Button>
            )}
            {/* Future: Could add a settings dropdown here for line wrap, themes etc. */}
            {/* <Button variant="ghost" size="icon"><Settings2 className="h-4 w-4" /></Button> */}
          </div>
        </CardHeader>
      ) : null}

      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="flex font-mono text-sm p-4">
            {showLineNumbers && (
              <div className="text-right select-none pr-4 text-muted-foreground">
                {lines.map((_, index) => (
                  <div key={`line-num-${index}`}>{index + 1}</div>
                ))}
              </div>
            )}
            <pre className="flex-grow whitespace-pre overflow-x-auto">
              <code className={language ? `language-${language}` : ''}>
                {lines.map((line, index) => (
                  <div key={`line-content-${index}`}>{line}</div>
                ))}
              </code>
            </pre>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CodeViewer;
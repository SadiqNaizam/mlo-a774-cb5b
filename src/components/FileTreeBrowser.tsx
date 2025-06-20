import React, { useState } from 'react';
import { Folder, FileText, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

// Define the structure for a file system item
export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileSystemItem[];
  // Potentially other metadata like lastModified, size, etc.
}

interface FileTreeItemProps {
  item: FileSystemItem;
  level: number;
  // Optional: Callback for when a file is selected
  // onFileSelect?: (file: FileSystemItem) => void;
  // Optional: Callback for when a folder is toggled
  // onFolderToggle?: (folder: FileSystemItem, isOpen: boolean) => void;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ item, level /*, onFileSelect, onFolderToggle */ }) => {
  const [isOpen, setIsOpen] = useState(false);

  const indentStyle = { paddingLeft: `${level * 1.25 + 0.5}rem` }; // 0.5rem base, plus 1.25rem per level

  const handleToggle = () => {
    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    // if (item.type === 'folder' && onFolderToggle) {
    //   onFolderToggle(item, newOpenState);
    // }
  };

  if (item.type === 'folder') {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full group">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-start h-9 pr-2 group-hover:bg-muted/50"
            style={indentStyle}
            onClick={handleToggle}
            aria-label={`Toggle folder ${item.name}`}
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 mr-2 shrink-0 text-gray-500 transition-transform duration-200",
                isOpen && "rotate-90"
              )}
            />
            <Folder className="h-4 w-4 mr-2 text-sky-600 dark:text-sky-500 shrink-0" />
            <span className="truncate text-sm font-medium">{item.name}</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {isOpen && item.children && item.children.length > 0 && (
            <div className="py-1"> {/* Add some vertical spacing for children group */}
              {item.children.map((child) => (
                <FileTreeItem
                  key={child.id}
                  item={child}
                  level={level + 1}
                  // onFileSelect={onFileSelect}
                  // onFolderToggle={onFolderToggle}
                />
              ))}
            </div>
          )}
           {isOpen && item.children && item.children.length === 0 && (
             <div style={{ paddingLeft: `${(level + 1) * 1.25 + 0.5 + 1.5}rem` }} className="text-xs text-muted-foreground italic py-1">
              (empty)
            </div>
           )}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  // File type
  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-start h-9 pr-2 hover:bg-muted/50"
      style={indentStyle}
      // onClick={() => onFileSelect?.(item)}
      aria-label={`Select file ${item.name}`}
    >
      <span className="w-4 mr-2 shrink-0" /> {/* Spacer for alignment with folder's chevron */}
      <FileText className="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400 shrink-0" />
      <span className="truncate text-sm">{item.name}</span>
    </Button>
  );
};

export interface FileTreeBrowserProps {
  /** The hierarchical data structure of files and folders to display. */
  data: FileSystemItem[];
  /** Optional class name to apply to the root ScrollArea container. */
  className?: string;
  /** Optional: Height for the scroll area. Defaults to 'h-96'. */
  height?: string;
   /** Optional: Initial expanded depth. 0 means all closed. 1 means top level open, etc. -1 means all open */
  initialExpandedDepth?: number;
}

const FileTreeBrowser: React.FC<FileTreeBrowserProps> = ({
  data,
  className,
  height = 'h-96', // Default height
  // initialExpandedDepth = 0, // TODO: Implement initial expansion
}) => {
  console.log('FileTreeBrowser loaded');

  // TODO: Future enhancement: implement initialExpandedDepth by passing defaultOpen to FileTreeItem
  // For now, all folders start closed.

  if (!data || data.length === 0) {
    return (
      <div className={cn("p-4 text-sm text-muted-foreground", className)}>
        No files or folders to display.
      </div>
    );
  }

  return (
    <ScrollArea className={cn(height, "border rounded-md bg-background", className)}>
      <div className="p-1" role="tree">
        {data.map((item) => (
          <FileTreeItem
            key={item.id}
            item={item}
            level={0}
            // onFileSelect={onFileSelect} // Pass down if FileTreeBrowser accepts these
            // onFolderToggle={onFolderToggle}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default FileTreeBrowser;
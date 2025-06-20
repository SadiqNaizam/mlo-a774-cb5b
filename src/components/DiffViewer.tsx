import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DiffViewerProps {
  oldCode: string;
  newCode: string;
}

interface DiffLineDisplay {
  lineNumberOld?: number;
  lineNumberNew?: number;
  text: string;
  type: 'added' | 'removed' | 'common';
}

// This is a simplified diff generation for demonstration.
// A proper diff algorithm (e.g., Myers diff) would be more accurate and handle complex changes better.
const generateLineDiffs = (oldText: string, newText: string): DiffLineDisplay[] => {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const diffResult: DiffLineDisplay[] = [];

  let oldLineNum = 0;
  let newLineNum = 0;

  let i = 0; // Pointer for oldLines
  let j = 0; // Pointer for newLines

  while (i < oldLines.length || j < newLines.length) {
    if (i < oldLines.length && j < newLines.length) {
      if (oldLines[i] === newLines[j]) {
        // Common line
        oldLineNum++;
        newLineNum++;
        diffResult.push({ lineNumberOld: oldLineNum, lineNumberNew: newLineNum, text: oldLines[i], type: 'common' });
        i++;
        j++;
      } else {
        // Lines are different. Heuristic to check if one is an insert/delete against a common future line.
        // Look ahead one line to see if we can sync.
        const nextOldLineIsNewPlusOne = (i + 1 < oldLines.length && j + 1 < newLines.length && oldLines[i+1] === newLines[j+1]);

        // If newLines[j] matches oldLines[i+1] AND oldLines[i] matches newLines[j+1], this is a swap. Treat as remove/add.
        // For simplicity, we check if current new line will be common with next old line (implies old[i] is removed)
        // OR if current old line will be common with next new line (implies new[j] is added).
        
        let oldLineRemoved = false;
        let newLineAdded = false;

        // Try to match newLines[j] with a future oldLine (is newLines[j] an insertion before a common block?)
        let newLooksLikeInsertion = false;
        for(let k = i; k < oldLines.length; k++) {
            if(oldLines[k] === newLines[j]) {
                newLooksLikeInsertion = true; // newLines[j] found later in old text.
                break;
            }
        }
        
        // Try to match oldLines[i] with a future newLine (is oldLines[i] a deletion before a common block?)
        let oldLooksLikeDeletion = false;
        for(let k = j; k < newLines.length; k++) {
            if(newLines[k] === oldLines[i]) {
                oldLooksLikeDeletion = true; // oldLines[i] found later in new text.
                break;
            }
        }
        
        // Prioritize removing a line if it doesn't appear in the rest of the new text
        if (i < oldLines.length && !oldLooksLikeDeletion) {
          oldLineNum++;
          diffResult.push({ lineNumberOld: oldLineNum, text: oldLines[i], type: 'removed' });
          i++;
          oldLineRemoved = true;
        }

        // Prioritize adding a line if it doesn't appear in the rest of the old text
        if (j < newLines.length && !newLooksLikeInsertion) {
          newLineNum++;
          diffResult.push({ lineNumberNew: newLineNum, text: newLines[j], type: 'added' });
          j++;
          newLineAdded = true;
        }

        // If neither was a clear removal/addition based on above, remove old and add new
        if (i < oldLines.length && !oldLineRemoved) {
            oldLineNum++;
            diffResult.push({ lineNumberOld: oldLineNum, text: oldLines[i], type: 'removed' });
            i++;
        }
        if (j < newLines.length && !newLineAdded) {
            newLineNum++;
            diffResult.push({ lineNumberNew: newLineNum, text: newLines[j], type: 'added' });
            j++;
        }
      }
    } else if (i < oldLines.length) {
      // Only old lines remaining (deletions)
      oldLineNum++;
      diffResult.push({ lineNumberOld: oldLineNum, text: oldLines[i], type: 'removed' });
      i++;
    } else if (j < newLines.length) {
      // Only new lines remaining (additions)
      newLineNum++;
      diffResult.push({ lineNumberNew: newLineNum, text: newLines[j], type: 'added' });
      j++;
    }
  }
  return diffResult;
};

const DiffViewer: React.FC<DiffViewerProps> = ({ oldCode, newCode }) => {
  console.log('DiffViewer loaded');

  const diffLines = useMemo(() => {
    return generateLineDiffs(oldCode, newCode);
  }, [oldCode, newCode]);

  if (diffLines.length === 0 && oldCode === "" && newCode === "") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No content to compare.</p>
        </CardContent>
      </Card>
    );
  }
  
  const allCommon = diffLines.every(line => line.type === 'common');
  if (allCommon && oldCode === newCode) {
     return (
      <Card>
        <CardHeader>
          <CardTitle>Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">No changes detected.</p>
            <div className="mt-4 rounded-md border bg-gray-50 dark:bg-gray-800/30 p-4 overflow-x-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {newCode}
                </pre>
            </div>
        </CardContent>
      </Card>
    );   
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Differences</CardTitle>
        {/* Optional: Add summary like X additions, Y deletions */}
      </CardHeader>
      <CardContent className="overflow-x-auto p-0 md:p-2"> {/* Remove padding for table to take full width then add padding to md */}
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 sm:w-12 text-right select-none text-xs">Old</TableHead>
              <TableHead className="w-10 sm:w-12 text-right select-none text-xs">New</TableHead>
              <TableHead className="select-none text-xs">Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diffLines.map((line, index) => (
              <TableRow
                key={index}
                className={
                  line.type === 'added' ? 'bg-green-50 dark:bg-green-700/20 hover:bg-green-100 dark:hover:bg-green-700/30' :
                  line.type === 'removed' ? 'bg-red-50 dark:bg-red-700/20 hover:bg-red-100 dark:hover:bg-red-700/30' :
                  'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }
              >
                <TableCell className="p-1 pr-2 sm:p-2 sm:pr-3 text-right text-xs text-gray-500 dark:text-gray-400 select-none font-mono">
                  {line.lineNumberOld || ''}
                </TableCell>
                <TableCell className="p-1 pr-2 sm:p-2 sm:pr-3 text-right text-xs text-gray-500 dark:text-gray-400 select-none font-mono">
                  {line.lineNumberNew || ''}
                </TableCell>
                <TableCell className="p-1 sm:p-2 font-mono text-sm whitespace-pre-wrap break-all">
                  <span className={
                    line.type === 'added' ? 'text-green-700 dark:text-green-400' :
                    line.type === 'removed' ? 'text-red-700 dark:text-red-400' :
                    'text-gray-800 dark:text-gray-200'
                  }>
                    <span className="mr-2 select-none">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    {line.text}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DiffViewer;
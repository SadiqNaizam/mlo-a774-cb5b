import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown (tables, strikethrough, etc.)
import { cn } from '@/lib/utils'; // For combining class names

interface MarkdownRendererProps {
  markdownText: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdownText, className }) => {
  console.log('MarkdownRenderer loaded');

  const components = {
    h1: ({node, ...props}: any) => <h1 className="text-3xl font-bold my-5 border-b pb-2" {...props} />,
    h2: ({node, ...props}: any) => <h2 className="text-2xl font-semibold my-4 border-b pb-2" {...props} />,
    h3: ({node, ...props}: any) => <h3 className="text-xl font-semibold my-3" {...props} />,
    h4: ({node, ...props}: any) => <h4 className="text-lg font-semibold my-2" {...props} />,
    h5: ({node, ...props}: any) => <h5 className="text-base font-semibold my-1" {...props} />,
    h6: ({node, ...props}: any) => <h6 className="text-sm font-semibold my-1" {...props} />,
    p: ({node, ...props}: any) => <p className="my-4 leading-relaxed" {...props} />,
    ul: ({node, ...props}: any) => <ul className="list-disc list-inside my-4 pl-4 space-y-1" {...props} />,
    ol: ({node, ...props}: any) => <ol className="list-decimal list-inside my-4 pl-4 space-y-1" {...props} />,
    li: ({node, ...props}: any) => <li className="my-1" {...props} />,
    a: ({node, ...props}: any) => <a className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
    code: ({node, inline, className, children, ...props}: any) => {
      const match = /language-(\w+)/.exec(className || '');
      if (inline) {
        return <code className="bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md text-sm font-mono" {...props}>{children}</code>;
      }
      return match ? (
        <div className="my-4 rounded-md overflow-hidden bg-gray-900 dark:bg-gray-800">
          <div className="bg-gray-700 dark:bg-gray-700 text-gray-200 dark:text-gray-300 px-4 py-2 text-xs font-sans flex justify-between items-center">
            <span>{match[1]}</span>
            {/* Placeholder for copy button, actual implementation would require state and navigator.clipboard */}
            {/* <button className="text-xs hover:text-white">Copy</button> */}
          </div>
          <pre className="p-4 text-sm overflow-x-auto">
            <code className={`language-${match[1]} text-gray-100 dark:text-gray-200`} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 overflow-x-auto">
          <code className="text-sm font-mono text-gray-800 dark:text-gray-200" {...props}>{children}</code>
        </pre>
      );
    },
    img: ({node, ...props}: any) => <img className="max-w-full h-auto rounded my-4 shadow-sm border dark:border-gray-700" {...props} />,
    blockquote: ({node, ...props}: any) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 text-gray-700 dark:text-gray-300" {...props} />,
    hr: ({node, ...props}: any) => <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />,
    table: ({node, ...props}: any) => <div className="overflow-x-auto my-4"><table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" {...props} /></div>,
    thead: ({node, ...props}: any) => <thead className="bg-gray-100 dark:bg-gray-700" {...props} />,
    th: ({node, ...props}: any) => <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold" {...props} />,
    td: ({node, ...props}: any) => <td className="border border-gray-300 dark:border-gray-600 px-4 py-2" {...props} />,
  };

  return (
    <div className={cn("prose dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
        // security note: by default react-markdown sanitizes HTML.
        // If you need to allow specific HTML tags, use rehype-raw carefully.
        // For this component, we rely on the default sanitization.
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
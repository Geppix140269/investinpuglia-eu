// PATH: components/trullo/utils/messageRenderer.tsx
import React from 'react';

export function renderMessageWithLinks(content: string): React.ReactNode {
  // Simple markdown link pattern: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  
  const parts = content.split(linkPattern);
  const result: React.ReactNode[] = [];
  
  for (let i = 0; i < parts.length; i += 3) {
    // Add text before link
    if (parts[i]) {
      result.push(<span key={i}>{parts[i]}</span>);
    }
    
    // Add link if it exists
    if (i + 2 < parts.length && parts[i + 1] && parts[i + 2]) {
      result.push(
        
          key={i + 1}
          href={parts[i + 2]}
          target={parts[i + 2].startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 underline font-medium"
        >
          {parts[i + 1]}
        </a>
      );
    }
  }
  
  return <>{result}</>;
}
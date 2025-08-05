import React from 'react';

export function renderMessageWithLinks(content: string): React.ReactNode {
  // Simple markdown link pattern: [text](url)
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  const elements: React.ReactNode[] = [];
  let match;
  let keyIndex = 0;

  while ((match = linkPattern.exec(content)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      elements.push(
        <span key={`text-${keyIndex++}`}>
          {content.substring(lastIndex, match.index)}
        </span>
      );
    }

    // Add the link
    const linkText = match[1];
    const linkUrl = match[2];
    const isExternal = linkUrl.startsWith('http');
    
    elements.push(
      
        key={`link-${keyIndex++}`}
        href={linkUrl}
        target={isExternal ? '_blank' : '_self'}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="text-purple-600 hover:text-purple-800 underline font-medium"
      >
        {linkText}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < content.length) {
    elements.push(
      <span key={`text-${keyIndex++}`}>
        {content.substring(lastIndex)}
      </span>
    );
  }

  // If no links were found, return the original content
  if (elements.length === 0) {
    return <span>{content}</span>;
  }

  return <>{elements}</>;
}
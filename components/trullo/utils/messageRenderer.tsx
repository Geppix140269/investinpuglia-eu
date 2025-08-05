import React from "react";

export function renderMessageWithLinks(content: string): React.ReactNode {
  const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
  
  return (
    <>
      {parts.map((part, index) => {
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, text, url] = linkMatch;
          const isExternal = url.startsWith("http");
          return (
            
              key={index}
              href={url}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-purple-600 hover:text-purple-800 underline font-medium"
            >
              {text}
            </a>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

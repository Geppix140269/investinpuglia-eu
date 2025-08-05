import React from "react";

interface LinkPart {
  type: "text" | "link";
  content: string;
  url?: string;
}

export function renderMessageWithLinks(content: string): React.ReactNode {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: LinkPart[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkPattern.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: content.substring(lastIndex, match.index)
      });
    }
    parts.push({
      type: "link",
      content: match[1],
      url: match[2]
    });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      type: "text",
      content: content.substring(lastIndex)
    });
  }

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.content}</span>;
        } else {
          const isExternal = part.url?.startsWith("http") || false;
          return (
            
              key={index}
              href={part.url}
              target={isExternal ? "_blank" : "_self"}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="text-purple-600 hover:text-purple-800 underline font-medium"
            >
              {part.content}
            </a>
          );
        }
      })}
    </>
  );
}
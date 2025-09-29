const fs = require('fs');
const path = require('path');

// Markdown to Sanity Block Content converter
function convertMarkdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let currentBlock = null;
  let listItems = [];
  let inCodeBlock = false;
  let codeLanguage = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim() || 'text';
        currentBlock = {
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          children: []
        };
      } else {
        inCodeBlock = false;
        if (currentBlock && currentBlock.children.length > 0) {
          blocks.push(currentBlock);
        }
        currentBlock = null;
        codeLanguage = '';
      }
      continue;
    }

    if (inCodeBlock) {
      if (!currentBlock.children.length) {
        currentBlock.children.push({
          _type: 'span',
          _key: generateKey(),
          text: line,
          marks: ['code']
        });
      } else {
        currentBlock.children[0].text += '\n' + line;
      }
      continue;
    }

    // Handle headings
    if (line.startsWith('#')) {
      finishCurrentBlock();

      const level = (line.match(/^#+/) || [''])[0].length;
      const text = line.replace(/^#+\s*/, '').trim();

      let style = 'normal';
      if (level === 1) style = 'h1';
      else if (level === 2) style = 'h2';
      else if (level === 3) style = 'h3';
      else if (level === 4) style = 'h4';

      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: style,
        children: [{
          _type: 'span',
          _key: generateKey(),
          text: text,
          marks: []
        }]
      });
      continue;
    }

    // Handle list items
    if (line.match(/^[-*+]\s/) || line.match(/^\d+\.\s/)) {
      const isOrdered = line.match(/^\d+\.\s/);
      const text = line.replace(/^[-*+\d+\.]\s*/, '').trim();

      if (listItems.length === 0) {
        finishCurrentBlock();
      }

      listItems.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        listItem: isOrdered ? 'number' : 'bullet',
        level: 1,
        children: parseInlineFormatting(text)
      });
      continue;
    } else if (listItems.length > 0) {
      // Finish the list
      blocks.push(...listItems);
      listItems = [];
    }

    // Handle blockquotes
    if (line.startsWith('>')) {
      finishCurrentBlock();
      const text = line.replace(/^>\s*/, '').trim();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        children: parseInlineFormatting(text)
      });
      continue;
    }

    // Handle empty lines
    if (line.trim() === '') {
      finishCurrentBlock();
      continue;
    }

    // Handle regular paragraphs
    if (!currentBlock) {
      currentBlock = {
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: []
      };
    }

    if (currentBlock.children.length > 0) {
      currentBlock.children.push({
        _type: 'span',
        _key: generateKey(),
        text: '\n' + line,
        marks: []
      });
    } else {
      currentBlock.children = parseInlineFormatting(line);
    }
  }

  finishCurrentBlock();

  // Add any remaining list items
  if (listItems.length > 0) {
    blocks.push(...listItems);
  }

  return blocks;

  function finishCurrentBlock() {
    if (currentBlock && currentBlock.children.length > 0) {
      blocks.push(currentBlock);
    }
    currentBlock = null;
  }
}

function parseInlineFormatting(text) {
  const children = [];
  let currentText = '';
  let currentMarks = [];

  // Simple regex patterns for markdown formatting
  const patterns = [
    { regex: /\*\*(.*?)\*\*/g, mark: 'strong' },
    { regex: /\*(.*?)\*/g, mark: 'em' },
    { regex: /`(.*?)`/g, mark: 'code' },
    { regex: /\[([^\]]+)\]\(([^)]+)\)/g, type: 'link' }
  ];

  // For now, let's do a simple implementation that handles basic formatting
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`|\[.*?\]\(.*?\))/);

  parts.forEach(part => {
    if (part.match(/^\*\*(.*)\*\*$/)) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.replace(/^\*\*(.*)\*\*$/, '$1'),
        marks: ['strong']
      });
    } else if (part.match(/^\*(.*)\*$/)) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.replace(/^\*(.*)\*$/, '$1'),
        marks: ['em']
      });
    } else if (part.match(/^`(.*)`$/)) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part.replace(/^`(.*)`$/, '$1'),
        marks: ['code']
      });
    } else if (part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)) {
      const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: match[1],
        marks: [{
          _type: 'link',
          href: match[2]
        }]
      });
    } else if (part.trim()) {
      children.push({
        _type: 'span',
        _key: generateKey(),
        text: part,
        marks: []
      });
    }
  });

  return children.length > 0 ? children : [{
    _type: 'span',
    _key: generateKey(),
    text: text,
    marks: []
  }];
}

function generateKey() {
  return Math.random().toString(36).substr(2, 9);
}

// Convert all blog posts
const blogPostsDir = path.join(__dirname, '../content/blog-posts');
const outputDir = path.join(__dirname, '../content/sanity-formatted');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(blogPostsDir).filter(file => file.endsWith('.md') && file !== 'README-BLOG-CONTENT-DELIVERY.md');

files.forEach(file => {
  console.log(`\n🔄 Converting ${file}...`);

  const markdown = fs.readFileSync(path.join(blogPostsDir, file), 'utf8');

  // Extract title and meta info from markdown
  const lines = markdown.split('\n');
  const title = lines.find(line => line.startsWith('#'))?.replace(/^#+\s*/, '').trim() || 'Untitled';

  // Generate slug from filename
  const slug = file.replace('.md', '').toLowerCase().replace(/[^a-z0-9]+/g, '-');

  // Extract excerpt (first paragraph after title)
  const contentStart = lines.findIndex(line => line.startsWith('#')) + 1;
  const excerpt = lines.slice(contentStart).find(line => line.trim() && !line.startsWith('#'))?.trim().slice(0, 160) + '...' || '';

  const blocks = convertMarkdownToBlocks(markdown);

  const sanityDoc = {
    _type: 'post',
    title: title,
    slug: {
      current: slug
    },
    excerpt: excerpt,
    body: blocks,
    publishedAt: new Date().toISOString(),
    author: {
      _type: 'reference',
      _ref: 'giuseppe-funaro' // You'll need to create this author in Sanity
    },
    categories: [
      {
        _type: 'reference',
        _ref: 'investment-insights' // You'll need to create this category in Sanity
      }
    ]
  };

  const outputFile = path.join(outputDir, file.replace('.md', '.json'));
  fs.writeFileSync(outputFile, JSON.stringify(sanityDoc, null, 2));

  console.log(`✅ Converted to: ${outputFile}`);
  console.log(`   Title: ${title}`);
  console.log(`   Slug: ${slug}`);
  console.log(`   Blocks: ${blocks.length}`);
});

console.log('\n🎉 All blog posts converted to Sanity format!');
console.log(`📁 Check the ${outputDir} directory for the converted JSON files.`);
console.log('\n📋 Next steps:');
console.log('1. Import these JSON files into your Sanity Studio');
console.log('2. Create author "giuseppe-funaro" in Sanity if it doesn\'t exist');
console.log('3. Create category "investment-insights" in Sanity if it doesn\'t exist');
console.log('4. Add featured images to each post in Sanity Studio');
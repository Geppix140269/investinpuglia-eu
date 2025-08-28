'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Save, 
  Eye, 
  Undo, 
  Redo, 
  Type, 
  Image, 
  Link, 
  Layout, 
  Palette,
  Settings,
  Code,
  Smartphone,
  Monitor,
  Copy,
  Download,
  Upload,
  Trash2,
  Plus,
  Move,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Divide,
  Mail
} from 'lucide-react';

interface EmailBlock {
  id: string;
  type: 'text' | 'heading' | 'image' | 'button' | 'divider' | 'spacer' | 'social' | 'footer';
  content: any;
  styles: {
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    textAlign?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    borderRadius?: string;
    border?: string;
  };
}

interface EmailTemplate {
  id?: string;
  name: string;
  subject: string;
  blocks: EmailBlock[];
  globalStyles: {
    backgroundColor: string;
    fontFamily: string;
    width: string;
    maxWidth: string;
  };
  previewText?: string;
  category?: string;
  tags?: string[];
}

interface EmailTemplateBuilderProps {
  template?: EmailTemplate;
  onSave: (template: EmailTemplate) => void;
  onCancel: () => void;
}

export default function EmailTemplateBuilder({ 
  template, 
  onSave, 
  onCancel 
}: EmailTemplateBuilderProps) {
  const [currentTemplate, setCurrentTemplate] = useState<EmailTemplate>(
    template || {
      name: 'Untitled Template',
      subject: '',
      blocks: [],
      globalStyles: {
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        maxWidth: '600px'
      }
    }
  );

  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showCode, setShowCode] = useState(false);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [history, setHistory] = useState<EmailTemplate[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize history
    setHistory([currentTemplate]);
  }, []);

  const addToHistory = useCallback((template: EmailTemplate) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ ...template });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentTemplate(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentTemplate(history[historyIndex + 1]);
    }
  };

  const addBlock = (type: EmailBlock['type'], index?: number) => {
    const newBlock: EmailBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type)
    };

    const newBlocks = [...currentTemplate.blocks];
    const insertIndex = index !== undefined ? index : newBlocks.length;
    newBlocks.splice(insertIndex, 0, newBlock);

    const updatedTemplate = {
      ...currentTemplate,
      blocks: newBlocks
    };
    
    setCurrentTemplate(updatedTemplate);
    addToHistory(updatedTemplate);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = (blockId: string, updates: Partial<EmailBlock>) => {
    const updatedBlocks = currentTemplate.blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );

    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };
    
    setCurrentTemplate(updatedTemplate);
    addToHistory(updatedTemplate);
  };

  const deleteBlock = (blockId: string) => {
    const updatedBlocks = currentTemplate.blocks.filter(block => block.id !== blockId);
    
    const updatedTemplate = {
      ...currentTemplate,
      blocks: updatedBlocks
    };
    
    setCurrentTemplate(updatedTemplate);
    addToHistory(updatedTemplate);
    
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    const newBlocks = [...currentTemplate.blocks];
    const [movedBlock] = newBlocks.splice(fromIndex, 1);
    newBlocks.splice(toIndex, 0, movedBlock);

    const updatedTemplate = {
      ...currentTemplate,
      blocks: newBlocks
    };
    
    setCurrentTemplate(updatedTemplate);
    addToHistory(updatedTemplate);
  };

  const getDefaultContent = (type: EmailBlock['type']) => {
    switch (type) {
      case 'heading':
        return { text: 'Your Heading Here', level: 'h1' };
      case 'text':
        return { text: 'Your text content goes here. You can format this text and add links.' };
      case 'button':
        return { text: 'Call to Action', url: '#', trackingId: '' };
      case 'image':
        return { src: '', alt: 'Description', url: '', width: '100%' };
      case 'divider':
        return { style: 'solid', height: '1px' };
      case 'spacer':
        return { height: '20px' };
      case 'social':
        return { 
          platforms: [
            { name: 'facebook', url: '#' },
            { name: 'twitter', url: '#' },
            { name: 'linkedin', url: '#' }
          ]
        };
      case 'footer':
        return { 
          companyName: 'InvestInPuglia',
          address: 'Via Example 123, Bari, Italy',
          unsubscribeText: 'Unsubscribe from these emails',
          unsubscribeUrl: '{{unsubscribe_url}}'
        };
      default:
        return {};
    }
  };

  const getDefaultStyles = (type: EmailBlock['type']) => {
    switch (type) {
      case 'heading':
        return {
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333333',
          textAlign: 'left' as const,
          padding: '20px 0 10px 0'
        };
      case 'text':
        return {
          fontSize: '16px',
          color: '#666666',
          textAlign: 'left' as const,
          padding: '10px 0'
        };
      case 'button':
        return {
          backgroundColor: '#007bff',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          textAlign: 'center' as const,
          fontSize: '16px',
          fontWeight: 'bold'
        };
      case 'image':
        return {
          textAlign: 'center' as const,
          padding: '10px 0'
        };
      case 'divider':
        return {
          color: '#e0e0e0',
          margin: '20px 0'
        };
      case 'spacer':
        return {};
      case 'social':
        return {
          textAlign: 'center' as const,
          padding: '20px 0'
        };
      case 'footer':
        return {
          fontSize: '12px',
          color: '#999999',
          textAlign: 'center' as const,
          padding: '20px 0',
          backgroundColor: '#f8f8f8'
        };
      default:
        return {};
    }
  };

  const generateEmailHTML = () => {
    const blocksHTML = currentTemplate.blocks.map(block => {
      const styles = Object.entries(block.styles)
        .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
        .join('; ');

      switch (block.type) {
        case 'heading':
          return `<${block.content.level} style="${styles}">${block.content.text}</${block.content.level}>`;
        case 'text':
          return `<p style="${styles}">${block.content.text}</p>`;
        case 'button':
          return `<div style="text-align: ${block.styles.textAlign || 'center'}; padding: ${block.styles.padding || '20px 0'};">
            <a href="${block.content.url}" style="${styles}; text-decoration: none; display: inline-block;">${block.content.text}</a>
          </div>`;
        case 'image':
          return `<div style="${styles}">
            <img src="${block.content.src}" alt="${block.content.alt}" style="max-width: 100%; height: auto; width: ${block.content.width};" />
          </div>`;
        case 'divider':
          return `<hr style="${styles}" />`;
        case 'spacer':
          return `<div style="height: ${block.content.height};"></div>`;
        case 'footer':
          return `<div style="${styles}">
            <p>${block.content.companyName}<br/>
            ${block.content.address}</p>
            <p><a href="${block.content.unsubscribeUrl}" style="color: inherit;">${block.content.unsubscribeText}</a></p>
          </div>`;
        default:
          return '';
      }
    }).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentTemplate.subject}</title>
    <style>
        body { font-family: ${currentTemplate.globalStyles.fontFamily}; margin: 0; padding: 0; background-color: ${currentTemplate.globalStyles.backgroundColor}; }
        .container { width: ${currentTemplate.globalStyles.width}; max-width: ${currentTemplate.globalStyles.maxWidth}; margin: 0 auto; background-color: #ffffff; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; max-width: 100% !important; }
        }
    </style>
</head>
<body>
    <div class="container">
        ${blocksHTML}
    </div>
</body>
</html>`;
  };

  const handleSave = () => {
    onSave(currentTemplate);
  };

  const selectedBlock = selectedBlockId 
    ? currentTemplate.blocks.find(block => block.id === selectedBlockId)
    : null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Block Library */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Add Content</h3>
          
          <div className="space-y-2">
            <button
              onClick={() => addBlock('heading')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Type className="w-4 h-4" />
              Heading
            </button>
            
            <button
              onClick={() => addBlock('text')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <AlignLeft className="w-4 h-4" />
              Text
            </button>
            
            <button
              onClick={() => addBlock('button')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Plus className="w-4 h-4" />
              Button
            </button>
            
            <button
              onClick={() => addBlock('image')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Image className="w-4 h-4" />
              Image
            </button>
            
            <button
              onClick={() => addBlock('divider')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Divide className="w-4 h-4" />
              Divider
            </button>
            
            <button
              onClick={() => addBlock('spacer')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Layout className="w-4 h-4" />
              Spacer
            </button>
            
            <button
              onClick={() => addBlock('social')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Link className="w-4 h-4" />
              Social Links
            </button>
            
            <button
              onClick={() => addBlock('footer')}
              className="w-full p-2 text-left hover:bg-gray-50 rounded flex items-center gap-2 text-sm"
            >
              <Layout className="w-4 h-4" />
              Footer
            </button>
          </div>
        </div>

        {/* Template Settings */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Template Settings</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                value={currentTemplate.name}
                onChange={(e) => setCurrentTemplate(prev => ({ ...prev, name: e.target.value }))}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Subject Line
              </label>
              <input
                type="text"
                value={currentTemplate.subject}
                onChange={(e) => setCurrentTemplate(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Preview Text
              </label>
              <textarea
                value={currentTemplate.previewText || ''}
                onChange={(e) => setCurrentTemplate(prev => ({ ...prev, previewText: e.target.value }))}
                rows={2}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="Text that appears in email previews..."
              />
            </div>
          </div>
        </div>

        {/* Template List */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-900">Blocks</h3>
            <span className="text-xs text-gray-500">{currentTemplate.blocks.length}</span>
          </div>
          
          <div className="space-y-1">
            {currentTemplate.blocks.map((block, index) => (
              <div
                key={block.id}
                className={`p-2 text-xs rounded cursor-pointer flex items-center justify-between ${
                  selectedBlockId === block.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedBlockId(block.id)}
              >
                <span className="capitalize">{block.type}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBlock(block.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={undo}
                disabled={historyIndex <= 0}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-px h-6 bg-gray-300" />
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 ${previewMode === 'desktop' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 ${previewMode === 'mobile' ? 'text-blue-600' : 'text-gray-500'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-px h-6 bg-gray-300" />
            
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 ${showCode ? 'text-blue-600' : 'text-gray-500'}`}
            >
              <Code className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Template
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {showCode ? (
              <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm overflow-auto h-full">
                <pre>{generateEmailHTML()}</pre>
              </div>
            ) : (
              <div 
                className={`mx-auto bg-white shadow-lg rounded-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
                }`}
                ref={contentRef}
              >
                <div className="p-6">
                  {currentTemplate.blocks.map((block, index) => (
                    <EmailBlockRenderer
                      key={block.id}
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => setSelectedBlockId(block.id)}
                      onUpdate={(updates) => updateBlock(block.id, updates)}
                      onDelete={() => deleteBlock(block.id)}
                    />
                  ))}
                  
                  {currentTemplate.blocks.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Start building your email by adding content blocks</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties Panel */}
      {selectedBlock && (
        <div className="w-64 bg-white shadow-sm border-l border-gray-200 p-4">
          <BlockPropertiesPanel
            block={selectedBlock}
            onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
          />
        </div>
      )}
    </div>
  );
}

// Email Block Renderer Component
function EmailBlockRenderer({ 
  block, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete 
}: {
  block: EmailBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EmailBlock>) => void;
  onDelete: () => void;
}) {
  const handleContentChange = (newContent: any) => {
    onUpdate({ content: { ...block.content, ...newContent } });
  };

  const renderContent = () => {
    const style = {
      ...block.styles,
      outline: isSelected ? '2px solid #3b82f6' : undefined,
      position: 'relative' as const
    };

    switch (block.type) {
      case 'heading':
        const HeadingTag = block.content.level || 'h1';
        return (
          <HeadingTag 
            style={style}
            onClick={onSelect}
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => handleContentChange({ text: e.currentTarget.textContent })}
          >
            {block.content.text}
          </HeadingTag>
        );
        
      case 'text':
        return (
          <p 
            style={style}
            onClick={onSelect}
            suppressContentEditableWarning
            contentEditable
            onBlur={(e) => handleContentChange({ text: e.currentTarget.innerHTML })}
            dangerouslySetInnerHTML={{ __html: block.content.text }}
          />
        );
        
      case 'button':
        return (
          <div style={{ textAlign: block.styles.textAlign || 'center', padding: '20px 0' }}>
            <a
              href={block.content.url}
              style={style}
              onClick={(e) => { e.preventDefault(); onSelect(); }}
              className="inline-block text-decoration-none"
              suppressContentEditableWarning
              contentEditable
              onBlur={(e) => handleContentChange({ text: e.currentTarget.textContent })}
            >
              {block.content.text}
            </a>
          </div>
        );
        
      case 'image':
        return (
          <div style={{ ...style, cursor: 'pointer' }} onClick={onSelect}>
            {block.content.src ? (
              <img 
                src={block.content.src} 
                alt={block.content.alt}
                style={{ maxWidth: '100%', height: 'auto', width: block.content.width }}
              />
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded p-8 text-center text-gray-500">
                <Image className="w-8 h-8 mx-auto mb-2" />
                <p>Click to add image</p>
              </div>
            )}
          </div>
        );
        
      case 'divider':
        return <hr style={{ ...style, cursor: 'pointer' }} onClick={onSelect} />;
        
      case 'spacer':
        return (
          <div 
            style={{ height: block.content.height, cursor: 'pointer', backgroundColor: isSelected ? '#f0f8ff' : 'transparent' }}
            onClick={onSelect}
          />
        );
        
      default:
        return <div style={style} onClick={onSelect}>Unsupported block type</div>;
    }
  };

  return (
    <div className="relative group">
      {renderContent()}
      
      {isSelected && (
        <button
          onClick={onDelete}
          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

// Block Properties Panel Component
function BlockPropertiesPanel({ 
  block, 
  onUpdate 
}: {
  block: EmailBlock;
  onUpdate: (updates: Partial<EmailBlock>) => void;
}) {
  const updateContent = (newContent: any) => {
    onUpdate({ content: { ...block.content, ...newContent } });
  };

  const updateStyles = (newStyles: any) => {
    onUpdate({ styles: { ...block.styles, ...newStyles } });
  };

  return (
    <div>
      <h3 className="font-medium text-gray-900 mb-4 capitalize">{block.type} Settings</h3>
      
      <div className="space-y-4">
        {/* Content Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Content</h4>
          
          {block.type === 'text' || block.type === 'heading' ? (
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text
              </label>
              <textarea
                value={block.content.text || ''}
                onChange={(e) => updateContent({ text: e.target.value })}
                rows={3}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ) : null}
          
          {block.type === 'button' ? (
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={block.content.text || ''}
                  onChange={(e) => updateContent({ text: e.target.value })}
                  className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Link URL
                </label>
                <input
                  type="url"
                  value={block.content.url || ''}
                  onChange={(e) => updateContent({ url: e.target.value })}
                  className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : null}
          
          {block.type === 'image' ? (
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={block.content.src || ''}
                  onChange={(e) => updateContent({ src: e.target.value })}
                  className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={block.content.alt || ''}
                  onChange={(e) => updateContent({ alt: e.target.value })}
                  className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Style Settings */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Styling</h4>
          
          <div className="space-y-2">
            {(block.type === 'text' || block.type === 'heading' || block.type === 'button') && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <input
                  type="color"
                  value={block.styles.color || '#333333'}
                  onChange={(e) => updateStyles({ color: e.target.value })}
                  className="w-full h-8 rounded border border-gray-300"
                />
              </div>
            )}
            
            {block.type === 'button' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <input
                  type="color"
                  value={block.styles.backgroundColor || '#007bff'}
                  onChange={(e) => updateStyles({ backgroundColor: e.target.value })}
                  className="w-full h-8 rounded border border-gray-300"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Text Align
              </label>
              <select
                value={block.styles.textAlign || 'left'}
                onChange={(e) => updateStyles({ textAlign: e.target.value })}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            {(block.type === 'text' || block.type === 'heading') && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="text"
                  value={block.styles.fontSize || '16px'}
                  onChange={(e) => updateStyles({ fontSize: e.target.value })}
                  className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                  placeholder="16px"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Padding
              </label>
              <input
                type="text"
                value={block.styles.padding || '10px 0'}
                onChange={(e) => updateStyles({ padding: e.target.value })}
                className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                placeholder="10px 0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
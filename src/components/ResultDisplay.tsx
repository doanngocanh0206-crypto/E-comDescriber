import React from 'react';
import { ProductDescription } from '../types';
import Markdown from 'react-markdown';
import { Copy, Check, Code, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  descriptions: ProductDescription[];
}

export const ResultDisplay: React.FC<Props> = ({ descriptions }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<'preview' | 'html'>('preview');
  const [copied, setCopied] = React.useState(false);

  const current = descriptions[activeIndex];

  const handleCopy = async () => {
    const textToCopy = viewMode === 'preview' ? current.content : current.html;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (descriptions.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-medium text-slate-500">
            Phiên bản {activeIndex + 1} / {descriptions.length}
          </span>
          <button
            onClick={() => setActiveIndex(Math.min(descriptions.length - 1, activeIndex + 1))}
            disabled={activeIndex === descriptions.length - 1}
            className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'preview' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <FileText size={16} />
            Xem trước
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === 'html' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Code size={16} />
            HTML
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeIndex}-${viewMode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="relative bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all active:scale-95"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Đã sao chép' : 'Sao chép'}
            </button>
          </div>

          <div className="p-8 pt-16 min-h-[400px]">
            <div className="mb-4">
              <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {current.title}
              </span>
            </div>
            
            {viewMode === 'preview' ? (
              <div className="markdown-body">
                <Markdown>{current.content}</Markdown>
              </div>
            ) : (
              <pre className="p-6 bg-slate-50 rounded-xl overflow-x-auto text-sm text-slate-700 font-mono leading-relaxed whitespace-pre-wrap">
                {current.html}
              </pre>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

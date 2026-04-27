'use client';

import React from 'react';
import { ConceptCardProps } from '@/types';

/**
 * LAYMAN EXPLANATION:
 * This is a simple UI component to display Next.js concepts.
 * We pass "props" (properties) to it, and it renders them beautifully.
 */
const ConceptCard: React.FC<ConceptCardProps> = ({ title, description, code, tag }) => {
  return (
    <div className="pro-card group">
      {tag && (
        <span className="text-[10px] uppercase bg-[#6366f1] px-2 py-0.5 rounded font-bold w-fit mb-4 tracking-wider">
          {tag}
        </span>
      )}
      <h3 className="text-xl font-bold text-[#6366f1] mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4">
        {description}
      </p>
      {code && (
        <pre className="bg-black/30 p-4 rounded-xl text-xs overflow-x-auto border border-white/5 font-mono text-indigo-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default ConceptCard;


import React from 'react';
import { PdfIcon } from './icons/PdfIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <PdfIcon className="w-7 h-7 text-brand-light" />
            <span className="hidden sm:inline">Image to PDF Converter</span>
            <span className="sm:hidden">Img2PDF</span>
          </a>
          <nav>
            {/* Navigation links can be added here if needed */}
          </nav>
        </div>
      </div>
    </header>
  );
};

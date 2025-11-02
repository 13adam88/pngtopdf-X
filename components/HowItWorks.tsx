
import React from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { CheckIcon } from './icons/CheckIcon';
import { FileIcon } from './icons/FileIcon';

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-center text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="flex items-center justify-center w-16 h-16 mb-4 bg-slate-700 rounded-full text-brand-light">
                {icon}
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400">{description}</p>
        </div>
    );
};

export const HowItWorks: React.FC = () => {
    return (
        <section className="py-16 bg-slate-900/50 rounded-2xl">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
                    Simple Steps to Your PDF
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Step 
                        icon={<UploadIcon className="w-8 h-8"/>} 
                        title="1. Select Images" 
                        description="Click the upload area or drag and drop your image files (JPG, PNG, etc.). You can select multiple files at once."
                    />
                    <Step 
                        icon={<FileIcon className="w-8 h-8"/>} 
                        title="2. Convert" 
                        description="Once your images are listed, simply click the 'Convert to PDF' button to start the process instantly in your browser."
                    />
                    <Step 
                        icon={<CheckIcon className="w-8 h-8"/>} 
                        title="3. Download" 
                        description="Your PDF file will be generated and downloaded automatically. It's that easy with our Image to PDF Converter."
                    />
                </div>
            </div>
        </section>
    );
};

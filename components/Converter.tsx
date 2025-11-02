
import React, { useState, useCallback, useEffect } from 'react';
import { UploadIcon } from './icons/UploadIcon';
import { XIcon } from './icons/XIcon';
import { FileIcon } from './icons/FileIcon';
import { CheckIcon } from './icons/CheckIcon';

declare global {
  interface Window {
    jspdf: any;
  }
}

interface ImageFile {
  file: File;
  previewUrl: string;
}

export const Converter: React.FC = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    // Cleanup object URLs on unmount
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.previewUrl));
    };
  }, [images]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    setError(null);
    const newImageFiles = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));
    setImages(prev => [...prev, ...newImageFiles]);
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].previewUrl);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true); // Keep it true while dragging over
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };


  const convertToPdf = useCallback(async () => {
    if (images.length === 0) {
      setError("Please select at least one image.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      for (let i = 0; i < images.length; i++) {
        const { file } = images[i];
        
        const imageUrl = URL.createObjectURL(file);

        await new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            const margin = 10;
            const usableWidth = pageWidth - margin * 2;
            const usableHeight = pageHeight - margin * 2;

            const widthRatio = usableWidth / img.width;
            const heightRatio = usableHeight / img.height;
            const ratio = Math.min(widthRatio, heightRatio);

            const imgWidth = img.width * ratio;
            const imgHeight = img.height * ratio;

            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;

            if (i > 0) {
              doc.addPage();
            }
            doc.addImage(img, file.type.split('/')[1].toUpperCase(), x, y, imgWidth, imgHeight);
            URL.revokeObjectURL(imageUrl);
            resolve();
          };
          img.onerror = (err) => {
            URL.revokeObjectURL(imageUrl);
            console.error("Image load error:", err);
            reject(new Error(`Failed to load image: ${file.name}`));
          };
          img.src = imageUrl;
        });
      }

      doc.save('converted-from-pngtopdff.pdf');
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred during PDF conversion. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [images]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto">
      <input
        type="file"
        id="file-upload"
        multiple
        accept="image/png, image/jpeg, image/webp, image/bmp"
        onChange={(e) => handleFileChange(e.target.files)}
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-brand-light bg-slate-700/50' : 'border-slate-600 hover:border-brand-primary hover:bg-slate-700/30'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadIcon className="w-10 h-10 mb-4 text-slate-400" />
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold text-brand-light">Choose files</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            A free tool from <a href="https://pngtopdff.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-light transition-colors">pngtopdff.com</a>
          </p>
        </div>
      </label>

      {error && <p className="mt-4 text-center text-red-400">{error}</p>}
      
      {images.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">Selected Files ({images.length})</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
            {images.map((img, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg animate-fade-in-up" style={{animationDelay: `${index * 50}ms`}}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <img src={img.previewUrl} alt={img.file.name} className="w-10 h-10 rounded-md object-cover flex-shrink-0" />
                  <span className="text-sm text-slate-300 truncate">{img.file.name}</span>
                </div>
                <button onClick={() => removeImage(index)} className="p-1 rounded-full text-slate-400 hover:bg-slate-600 hover:text-white transition-colors">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={convertToPdf}
          disabled={isLoading || images.length === 0}
          className="w-full md:w-auto px-12 py-4 text-lg font-bold text-white bg-brand-primary rounded-lg shadow-lg hover:bg-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-primary/50 transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? 'Converting...' : 'Convert to PDF'}
        </button>
      </div>
    </div>
  );
};


import React, { useState } from 'react';

const FaqItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-5 px-2 flex justify-between items-center text-slate-200 hover:text-white transition-colors"
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="pb-5 px-2 text-slate-400">{children}</div>
      </div>
    </div>
  );
};

export const Faq: React.FC = () => {
    const SeoLink = () => <a href="https://pngtopdff.com" className="font-semibold text-brand-light hover:text-cyan-300 transition-colors">Image to PDF Converter</a>;

    return (
        <section className="py-16">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                    <FaqItem question="Is this Image to PDF Converter free to use?">
                        Absolutely! Our <SeoLink /> is completely free for everyone. There are no hidden charges, watermarks, or usage limits.
                    </FaqItem>
                    <FaqItem question="Are my images secure?">
                        Yes, your privacy is our top priority. The entire conversion process happens in your browser. Your images are never uploaded to any server, ensuring they remain 100% private and secure on your own device.
                    </FaqItem>
                    <FaqItem question="What image formats are supported?">
                        We support all major image formats, including PNG, JPG/JPEG, WEBP, and BMP. You can mix and match different file types in a single conversion.
                    </FaqItem>
                    <FaqItem question="Is there a limit to how many images I can convert?">
                        There is no hard limit on the number of images you can convert at once. However, performance may vary depending on your device's memory and processing power when converting a very large number of high-resolution images.
                    </FaqItem>
                </div>
            </div>
        </section>
    );
};

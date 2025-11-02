
import React from 'react';
import { SecurityIcon } from './icons/SecurityIcon';
import { SpeedIcon } from './icons/SpeedIcon';
import { QualityIcon } from './icons/QualityIcon';
import { DevicesIcon } from './icons/DevicesIcon';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
    return (
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 transition-all duration-300 hover:border-brand-primary hover:bg-slate-800">
            <div className="flex items-center justify-center w-12 h-12 mb-4 bg-slate-700 rounded-lg text-brand-light">
                {icon}
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
            <p className="text-slate-400">{children}</p>
        </div>
    );
};

export const Features: React.FC = () => {
    const SeoLink = () => <a href="https://pngtopdff.com" className="font-semibold text-brand-light hover:text-cyan-300 transition-colors">Image to PDF Converter</a>;

    return (
        <section className="py-20">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Why Choose Our <SeoLink />?
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-400">
                        We provide a powerful, yet simple tool designed with your privacy and productivity in mind.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard icon={<SecurityIcon className="w-7 h-7" />} title="100% Secure & Private">
                        Your files never leave your computer. All processing is done directly in your browser, guaranteeing the privacy of your images.
                    </FeatureCard>
                    <FeatureCard icon={<SpeedIcon className="w-7 h-7" />} title="Instant Conversion">
                        No uploads, no queues, no waiting. Images are converted to PDF in a matter of seconds, right on your device.
                    </FeatureCard>
                    <FeatureCard icon={<QualityIcon className="w-7 h-7" />} title="High-Quality Output">
                        Our tool preserves the original quality of your images, ensuring your PDF looks crisp and professional every time.
                    </FeatureCard>
                    <FeatureCard icon={<DevicesIcon className="w-7 h-7" />} title="Works Everywhere">
                        Access our converter on any device with a modern browser. No software installation is required. Convert images on the go.
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};

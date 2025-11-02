import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Article } from './components/Article';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      
      <main className="container mx-auto px-4 py-8 md:py-16">
        <Article />
      </main>

      <Footer />
    </div>
  );
};

export default App;
import React from 'react';

type StoreLayoutProps = {
  children: React.ReactNode;
};

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-mono">
      {/* Header */}
      <header className="border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-widest">REINCARNATED.STORE</h1>
          {/* Future: Nav links, Cart icon, etc. */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} Reincarnated.Store · All Rights Reserved
      </footer>
    </div>
  );
}

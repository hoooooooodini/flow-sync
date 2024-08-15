import React from 'react';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-red-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {/* Plus Icon */}
          <button className="bg-pink-500 text-white p-3 rounded-full">
            +
          </button>
          
          {/* Folder Icon */}
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              {/* Folder Icon SVG */}
              <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
            </svg>
          </button>

          {/* Settings Icon */}
          <button className="p-2">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
              {/* Settings Icon SVG */}
              <path d="M12 2a2 2 0 011.84 1.1L15 5.2l3.46.3a1 1 0 01.88 1.43l-2.6 4.51 1.1 3.9a1 1 0 01-1.5 1.1l-3.46-2-3.46 2a1 1 0 01-1.5-1.1l1.1-3.9-2.6-4.5a1 1 0 01.88-1.43l3.46-.3.16-2.1A2 2 0 0112 2z" />
            </svg>
          </button>

          {/* Title Text */}
          <h1 className="text-gray-800 font-semibold text-lg">New Workflow</h1>
        </div>

        {/* Save and Run Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">Save</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Run</button>
        </div>
      </header>

      {/* Main Content (Empty workspace for now) */}
      <main className="flex-1 flex justify-center items-center relative">
        {/* Plus icon on the left side */}
        <button className="fixed bottom-8 left-8 bg-pink-500 text-white p-4 rounded-full shadow-lg">
          +
        </button>

        {/* Placeholder for adding first node */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          + Add Your First Node
        </div>
      </main>
    </div>
  );
}

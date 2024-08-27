import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      
      {/* Header */}
      <header className="flex justify-center p-4 bg-blue-100">
        <div className="flex justify-between items-center w-full max-w-5xl p-4 bg-orange-500 rounded-lg">
          <h1 className="text-2xl font-bold text-black">New Workflow</h1>
          <button className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg flex items-center">
            ▶ Execute Workflow
          </button>
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="flex flex-col items-center w-20 bg-yellow-200 p-4 space-y-6">
          <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black font-bold">
            + Add new Flow
          </button>
          <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black">
            🗓️
          </button>
          <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black">
            ⚙️
          </button>
          <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black">
            ❓
          </button>
          <div className="mt-6">
            <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black">
              📤
            </button>
            <button className="w-12 h-12 bg-yellow-300 rounded-lg flex items-center justify-center text-black mt-2">
              💾
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow bg-blue-100 p-8">
          {/* Your main content goes here */}
        </main>
      </div>

      {/* Footer */}
      <footer className="flex justify-between items-center p-4 bg-orange-300 rounded-t-lg">
        <button className="text-lg">⬅️</button>
        <button className="text-lg">➡️</button>
        <button className="text-lg">🔔</button>
      </footer>
    </div>
  );
};

export default Dashboard;

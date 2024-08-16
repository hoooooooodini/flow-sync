import React, { useState, useEffect } from 'react';

// Define the type for the App and Notion database objects
interface App {
  id: number;
  name: string;
  image: string;
}

interface NotionDatabase {
  id: number;
  title: string;
  content: string; // Adding content to mock database entries
}
const mockApps: App[] = [
  { id: 1, name: 'Notion', image: '/images/notion.png' },
  { id: 2, name: 'Slack', image: '/images/slack.png' },
  { id: 3, name: 'GitHub', image: '/images/github.png' },
  { id: 4, name: 'Dropbox', image: '/images/dropbox.png' },
];

// Mock Data for Notion Databases
const mockNotionDatabases: NotionDatabase[] = [
  { id: 1, title: 'Project Management', content: 'Details of Project Management database, showing how to manage tasks, timelines, and deliverables.' },
  { id: 2, title: 'Content Calendar', content: 'Details of Content Calendar database, managing editorial workflows and scheduling content.' },
  { id: 3, title: 'Task Tracker', content: 'Details of Task Tracker database, keeping track of task completion status and priorities.' },
  { id: 4, title: 'Research Notes', content: 'Details of Research Notes database, tracking research findings and annotations.' },
];

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [apps, setApps] = useState<App[]>([]); // Correctly typing the apps state
  const [filteredApps, setFilteredApps] = useState<App[]>([]); // Also type the filteredApps state
  const [selectedApp, setSelectedApp] = useState<App | null>(null); // State to handle selected app
  const [notionDatabases, setNotionDatabases] = useState<NotionDatabase[] | null>(null); // State to hold Notion databases after selection
  const [selectedDatabase, setSelectedDatabase] = useState<NotionDatabase | null>(null); // Selected Notion Database
  const [connectToHugo, setConnectToHugo] = useState(false); // State to show Hugo connection prompt
  const [isHugoConnected, setIsHugoConnected] = useState(false); // State to check if Hugo is connected
  const [mockUrl, setMockUrl] = useState<string | null>(null); // Mock URL for the database

  // Fetch the app list from the mock API
  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch('/api/apps'); // Call the mock API
      const data: App[] = await response.json(); // Make sure the data is typed as an array of App
      setApps(data); // Set apps from API response
    };

    fetchApps();
  }, []);

  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);

    // Filter the apps based on search input
    const filtered = apps.filter((app) =>
      app.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredApps(filtered);
  };

  // Open the initial app selection modal
  const handleButtonClick = () => {
    setShowModal(true);
  };

  // Close the initial modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSearchInput(''); // Clear search input when closing the modal
  };

  // Handle app selection and open connect modal on the right
  const handleAppSelection = (app: App) => {
    if (app.name === 'Notion') {
      setSelectedApp(app);
      setNotionDatabases(mockNotionDatabases); // Set the mock Notion databases
      setShowModal(false); // Close the first modal
    } else {
      // For other apps, handle other logic
    }
  };

  // Handle selecting a Notion Database (stay on the same page)
  const handleDatabaseSelection = (db: NotionDatabase) => {
    setSelectedDatabase(db); // Set the selected database
    setConnectToHugo(true); // Show the prompt to connect to Hugo
  };

  // Handle connecting to Hugo and generating a URL
  const handleConnectToHugo = () => {
    const generatedUrl = `https://myhugo.site/${selectedDatabase?.title.toLowerCase().replace(/ /g, '-')}`; // Create a mock URL
    const generatedUrl1 = `https://aiea-lab.github.io/aiea-lab-temp.github.io/project/allprojects/`; // Create the correct URL
    setMockUrl(generatedUrl1); // Set the mock URL
    setIsHugoConnected(true); // Simulate connection to Hugo
    setConnectToHugo(false); // Hide the Hugo connection prompt
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Main dashboard button to select an app */}
      <div className="bg-white w-96 p-12 rounded-lg shadow-md flex flex-col items-center justify-center">
        <button
          className="bg-pink-500 text-white w-40 h-40 text-6xl rounded-full mb-6"
          onClick={handleButtonClick}
        >
          +
        </button>

        {/* First Modal: App Selection */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
              <h2 className="text-sm font-semibold mb-4">Which app do you want to connect?</h2>
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search for an app"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={searchInput}
                onChange={handleSearchChange}
              />
              
              {/* Display filtered app recommendations as clickable buttons */}
              <ul className="mb-4 grid grid-cols-2 gap-4">
                {filteredApps.length > 0 ? (
                  filteredApps.map((app) => (
                    <li key={app.id} className="flex flex-col items-center">
                      <button
                        className="bg-gray-100 border border-gray-300 p-4 rounded-lg hover:bg-gray-200 cursor-pointer focus:outline-none"
                        onClick={() => handleAppSelection(app)} // Handle app selection
                      >
                        <img src={app.image} alt={app.name} className="w-12 h-12 mb-2" />
                        <span>{app.name}</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="py-1 px-2 bg-gray-100 border-b border-gray-300 rounded">
                    No apps found
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Notion Databases Section */}
        {notionDatabases && (
          <div className="mt-4">
            <h2 className="text-sm font-semibold mb-4">Select a Notion Database</h2>
            <ul className="mb-4 grid grid-cols-1 gap-4">
              {notionDatabases.map((db) => (
                <li key={db.id}>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={() => handleDatabaseSelection(db)} // Handle database selection
                  >
                    {db.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prompt to connect to Hugo */}
        {connectToHugo && selectedDatabase && (
          <div className="mt-4 p-4 bg-blue-100 rounded-md w-full">
            <p className="text-lg font-semibold">Connected to Notion Database: <strong>{selectedDatabase.title}</strong></p>
            <p className="mb-4">Would you like to connect this database to Hugo?</p>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={handleConnectToHugo} // Simulate connection to Hugo
            >
              Connect to Hugo
            </button>
          </div>
        )}

        {/* Show the selected database content after connecting to Hugo */}
        {isHugoConnected && selectedDatabase && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md w-full">
            <h3 className="text-lg font-semibold">Notion Database Content (Published to Hugo):</h3>
            <p>{selectedDatabase.content}</p>
            {mockUrl && (
              <div className="mt-4">
                <p className="text-blue-600 underline">
                  View the published site: <a href={mockUrl} target="_blank" rel="noopener noreferrer">{mockUrl}</a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

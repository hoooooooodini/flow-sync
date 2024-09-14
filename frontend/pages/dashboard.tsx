import React from "react";
import Head from "next/head";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Flow Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>New Flow</h1>
          <button className="execute-button">▶ Execute Flow</button>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          <button>+ Add new Flow</button>
          <button>🗓️</button>
          <button>⚙️</button>
          <button>❓</button>
          <button>📤 Share</button>
          <button>💾 Save</button>
        </div>

        {/* Main Content */}
        <div className="main-content">Main Content Area</div>

        {/* Footer */}
        <div className="footer">
          <button>⬅️</button>
          <button>➡️</button>
          <button>🔔</button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

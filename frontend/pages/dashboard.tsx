import { useState } from 'react';
import styles from '../styles/DashboardSection.module.css';

const DashboardSection = () => {
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(false); // Placeholder visibility state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [notionURL, setNotionURL] = useState(''); // State for the Notion database URL

  // Function to handle the opening and closing of the placeholder
  const togglePlaceholder = () => {
    setIsPlaceholderVisible(!isPlaceholderVisible);
  };

  // Function to handle the opening and closing of the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle the Notion URL input change
  const handleURLChange = (e) => {
    setNotionURL(e.target.value);
  };

  // Function to submit Notion URL to backend API
  const submitNotionURL = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit-url', {  // Specify the full URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: notionURL }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert('Notion URL processed successfully');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting Notion URL:', error);
      alert('Failed to submit Notion URL');
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Sidebar */}

      {/* Main Dashboard Content */}
      <div className={styles.dashboardContainer}>
        {/* Flow Container */}
        <div className={styles.flowContainer}>
          <div className={styles.flowText}>
            New Flow
          </div>
          <button className={styles.executeButton}>
            <span>Execute Flow</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="black">
              <path d="M3 12l18-12v24z"/>
            </svg>
          </button>
        </div>

        {/* Add New Flow Button */}
        <div className={styles.addFlowContainer}>
          <button className={styles.addFlowButton} onClick={toggleModal}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            <span>Add new Flow</span>
          </button>
        </div>
      </div>

      {/* Placeholder for adding new flow (instead of modal) */}
      {isModalOpen && (
        <div className={styles.inlinePlaceholder}>
          <h3>Enter Notion Database URL</h3>
          <input
            type="text"
            value={notionURL}
            onChange={handleURLChange}
            placeholder="Enter Notion database URL"
            className={styles.modalInput}
          />
          <div className={styles.modalButtons}>
            <button onClick={toggleModal} className={styles.modalCancelButton}>
              Cancel
            </button>
            <button onClick={submitNotionURL} className={styles.modalSaveButton}>
              Submit
            </button>
          </div>
        </div>
      )}
        
      {/* Modal Component */}
      {/* {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Enter Notion Database URL</h3>
            <input
              type="text"
              value={notionURL}
              onChange={handleURLChange}
              placeholder="Enter Notion database URL"
              className={styles.modalInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={toggleModal} className={styles.modalCancelButton}>
                Cancel
              </button>
              <button onClick={() => alert(`Notion URL: ${notionURL}`)} className={styles.modalSaveButton}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DashboardSection;

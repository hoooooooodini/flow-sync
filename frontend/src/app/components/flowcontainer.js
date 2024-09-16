// components/FlowContainer.js

const FlowContainer = () => {
  return (
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
  );
};

export default FlowContainer;

import React from 'react';
import ReactDOM from 'react-dom/client';
import timelineItems from './timelineItems';

function App() {
  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h1>Timeline Component</h1>
      </div>
      <div className="timeline-content">
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
          Good luck with your assignment! ✨
        </h2>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          {timelineItems.length} timeline items to render
        </p>
        <div className="success-message">
          <p>
            ✅ TypeScript, ESLint, Jest, and date-fns are all configured!
          </p>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

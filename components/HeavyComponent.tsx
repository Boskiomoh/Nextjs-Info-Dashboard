import React from 'react';

/**
 * This component represents something "heavy" (lots of code).
 * When we use lazy loading, this code is kept in a separate file 
 * and only downloaded when requested.
 */
const HeavyComponent: React.FC = () => {
  return (
    <div className="heavy-box">
      <h3>I am the Heavy Component! 🚀</h3>
      <p>I was just downloaded on-demand. Check your Network tab in DevTools!</p>
      
      <style jsx>{`
        .heavy-box {
          padding: 2rem;
          background: rgba(16, 185, 129, 0.1);
          border: 2px solid #10b981;
          border-radius: 12px;
          margin-top: 1rem;
        }
        h3 { color: #10b981; margin-bottom: 0.5rem; }
      `}</style>
    </div>
  );
};

export default HeavyComponent;

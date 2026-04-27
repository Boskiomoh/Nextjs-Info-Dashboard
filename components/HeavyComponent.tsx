import React from 'react';

/**
 * This component represents something "heavy" (lots of code).
 * When we use lazy loading, this code is kept in a separate file 
 * and only downloaded when requested.
 */
const HeavyComponent: React.FC = () => {
  return (
    <div className="p-8 bg-emerald-500/10 border-2 border-emerald-500 rounded-xl mt-4">
      <h3 className="text-emerald-500 mb-2 text-xl font-bold">I am the Heavy Component! 🚀</h3>
      <p className="text-emerald-500/80">I was just downloaded on-demand. Check your Network tab in DevTools!</p>
    </div>
  );
};

export default HeavyComponent;

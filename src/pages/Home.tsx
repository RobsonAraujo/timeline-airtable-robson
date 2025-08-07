import React from 'react';
import Timeline from '../components/Timeline/Timeline';
import timelineItems from '../data/timelineItems';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Task Timeline
          </h1>
          <p className="text-lg text-gray-600">
            Hello! Here’s your task journey for today.
          </p>
        </div>
        <Timeline items={timelineItems} />
      </div>
    </div>
  );
};

export default Home;

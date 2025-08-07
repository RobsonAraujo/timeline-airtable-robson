import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './pages/Home';
import './styles/app.css';

const App: React.FC = () => {
  return <Home />;
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);

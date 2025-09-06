import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// RankEasy.ai Admin Panel Entry Point
console.log('Main.tsx loaded successfully');

try {
  console.log('Creating React root...');
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error('Root element not found!');
  } else {
    console.log('Root element found, rendering App...');
    createRoot(rootElement).render(<App />);
    console.log('App render initiated');
  }
} catch (error) {
  console.error('Error in main.tsx:', error);
}

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { EventsProvider } from './context/EventsContext';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <EventsProvider>
      <App />
    </EventsProvider>
  </BrowserRouter>
);

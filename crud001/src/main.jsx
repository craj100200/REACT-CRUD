import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Optional, only if you're using dropdowns, modals, etc.


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
	<QueryClientProvider client={queryClient} >
    <App />
	</QueryClientProvider>
  </StrictMode>
)

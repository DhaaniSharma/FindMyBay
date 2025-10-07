import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 1. Import the LoadScript component
import { LoadScript } from '@react-google-maps/api';

// 2. Add a variable for your API key
const googleMapsApiKey = "AIzaSyAmIWk78rUpRzydW2P4ohbx--MhXofOvIs"; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Wrap your <App /> component with <LoadScript> */}
    <LoadScript
      googleMapsApiKey={googleMapsApiKey}
      libraries={["places"]} // This tells Google to load the "places" functionality
    >
      <App />
    </LoadScript>
  </StrictMode>,
)
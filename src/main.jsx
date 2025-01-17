import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//internal imports
import GeneralBiology from './components/pages/GeneralBiology.jsx';
import GeneralChemistry from './components/pages/GeneralChemistry.jsx';
import GeneralGeology from './components/pages/Generalgeology.jsx';
import MedicalTerms from './components/pages/MedicalTerms.jsx';
import { Home } from './components/pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/GeneralBiology',
        element: <GeneralBiology />,
      },
      {
        path: '/GeneralChemistry',
        element: <GeneralChemistry />,
      },
      {
        path: '/GeneralGeology',
        element: <GeneralGeology />,
      },      {
        path: '/MedicalTerms',
        element: <GeneralGeology />,
      }

    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

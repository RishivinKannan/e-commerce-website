import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from "./components/Home.jsx";
import Test from './Test.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import SearchPage from './components/SearchPage.jsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App/>,
      children:[
        {
          path:"/",
          element:<Home/>,
        },
        {
          path:"/search",
          element:<SearchPage/>,
        },
      ]
    },
    {
      path: "/test",
      element: <Test/>
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from "./components/Home.jsx";
import Test from './Test.jsx'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import SearchPage from './components/SearchPage.jsx';
import FavouritePage from './components/FavouritePage.jsx';
import CartPage from './components/CartPage.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
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
        {
          path:'/category',
          element:<CategoryPage/>
        },
        {
          path:"/wishlist",
          element:<FavouritePage/>,
        },
        {
          path:"/cart",
          element:<CartPage/>,
        },
      ]
    },
    {
      path:'/register',
      element:<RegisterPage/>
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

import React from "react";
import './App.css';   
import './index.css'
import Form from "./Pages/Form.jsx";
import Preview from "./Pages/Preview.jsx";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


function App() {
  const router= createBrowserRouter([
    {
      path:'/',
      element:<Form/> 
    },{
      path:'/preview',
      element:<Preview/>
    }
  ])
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;

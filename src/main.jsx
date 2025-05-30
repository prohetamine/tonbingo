/* eslint-disable no-unused-vars */
/* eslint-disable no-empty */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './index.css'

import Template from './Template.jsx'
import Search from './Search.jsx'
import Menu from './Menu.jsx'
import Content from './Content.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    //errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <Search />
      },  
      {
        path: '/address/:address',
        element: <Menu />
      },  
      {
        path: '/address/:address/:type/:id',
        element: <Content />
      }
    ]
  }
], {
    basename: '/tonpic'
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

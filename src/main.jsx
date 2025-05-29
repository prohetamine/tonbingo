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

// tonpic@123456788@Logo@i@n@0:0x2:2@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAsSURBVHgB7c2xDQAABAAwJP4/mROMlvaB5nRPPKh4IhaLxWKxWCwWi8Xi2wKBsAJEujIuKgAAAABJRU5ErkJggg==
// tonpic@123456788@Logo@i@n@1:0x2:2@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAsSURBVHgB7c0xAQAwCAOwbhf+DYMETp7EQF66Ogd+jojFYrFYLBaLxWKxeDdkVgJC3o+n+gAAAABJRU5ErkJggg==
// tonpic@123456788@Logo@i@n@0:1x2:2@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAtSURBVHgB7c0xAQAwCAOwbv5NoBQkcPIkBvJS3Tnwc0QsFovFYrFYLBaLxbsB3CMC2yLNupMAAAAASUVORK5CYII=
// tonpic@123456788@Logo@i@n@1:1x2:2@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAtSURBVHgB7c0xAQAwCAOwbv4toBUkcPIkBvK60jnwc0QsFovFYrFYLBaLxbsBpXEC1/FbGqAAAAAASUVORK5CYII=
// data:image/png;base64,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


//tonpic@2@title@description@i@n@0.05@0:0x20:20@data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGWSURBVHgBxVfbksMgCIWMv7yv+7p/XTZqjIqAdGimTDsxyuWIQBD/fn8IDCIiQMQybs88155tzHkqIZwcgGy+yWXJBEGaDS7wszUgifccowuAZeBSMpkkWt45SBzktgDQUC65Nr9zvlG2GB9kwkewI/2I0AsgM/agG5VKrpVcPlLXAT4AmZFIAyYcyxRo+VczocbjqmgLgNQkJWNtBnKDuHX2cSIyywDMmSO5FsVEkfRK8snO4z0FxfcAdh6K0gFfpvT0DsMAojGyBfC0gTCA6BFZ0uVruH7NZrGtf1pvoC2jDixvPslLz1HTXoFR/Gv4LtzmkSb3tTpwNyR8B586AHIm1/GEcY0k/YkjfRcEMgFt5y9lfo2BD9UlgiHiDb5U6tDVdZUePj/R7wdSEPNo7/wwbfKAm/FixXj9NwOQrZU6oHUvnjLMwb4uI0uFVeYPy8jeE+iasuYdXfEGBDmWDRVBDwjGFiWmSI8B6ZLhoXJvaFbYGRPoTWtL07sOjJ7w77zm8HVFOVO4/g+qK1k5jgWBS5/z/wofrP9XjidAAAAAAElFTkSuQmCC@ok


import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SideMenuLayout from "./layouts/SideMenuLayout"

const router = createBrowserRouter([
  {
    path: '/',
    element: <SideMenuLayout />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>
      },
      {
        path: 'task-list',
        element: <h1>Task-list</h1>
      },
      {
        path: 'task-progress',
        element: <h1>Tas Progress</h1>
      }
    ]
  }
])


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SideMenuLayout from "./layouts/SideMenuLayout"
import {RecoilRoot} from "recoil"
import TaskSummary from "./features/tasks/components/TaskSummary"

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <SideMenuLayout/>
      </div>
    ), 
    children: [
      {
        path: '/',
        element: <TaskSummary />
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


function App(): JSX.Element {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import Register from './components/Register.jsx'
import Login from './components/Login.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.jsx'
import PrivateRoute from './utils/PrivateRoute.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import TeacherDashboard from './components/TeacherDashboard.jsx'
import StudentDashboard from './components/StudentDashboard.jsx'
import UserTable from './components/dashboardPages/UserTable.jsx'
import TaskManager from './components/dashboardPages/TaskManager.jsx'
import TaskTable from './components/dashboardPages/TaskTable.jsx'
// import AssignTaskForm from './components/AssignTaskForm.jsx'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'admin-dashboard',
        element: (
          <PrivateRoute allowedRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'teacher-dashboard',
        element: (
          <PrivateRoute allowedRole="teacher">
            <TeacherDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'student-dashboard',
        element: (
          <PrivateRoute allowedRole="student">
            <StudentDashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
  element: <UserTable />,
  path: "/users",
}
  ,
  {
  element: <TaskManager />,
  path: "/tasks",
}
  ,
  {
  element: <TaskTable />,
  path: "/tasktable",
}
  ,
//   {
//   element: <AssignTaskForm />,
//   path: "/teacherAssignTask",
// }
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
 <Provider store={store}>

    <RouterProvider router={router} />
 </Provider>
   
    
  </StrictMode>,
)

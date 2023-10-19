/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Admin,
  Profile,
  EditJob,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardloader } from "./pages/DashboardLayout";
import { loader as allJobsloader } from "./pages/AllJobs";
import { action as addJobAction } from "./pages/Addjob";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobloader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";
import { loader as adminloader } from "./pages/Admin";
import { loader as statsloader } from "./pages/Stats";

export const checkdefaultTheme = () => {
  const istoggleTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", istoggleTheme);
  return istoggleTheme;
};
checkdefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },

      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardloader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "alljobs",
            element: <AllJobs />,
            loader: allJobsloader,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsloader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminloader,
          },
          {
            path: "editjob/:id",
            element: <EditJob />,
            loader: editJobloader,
            action: editJobAction,
          },
          {
            path: "deletejob/:id",
            action: deleteJobAction,
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

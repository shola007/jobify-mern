/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
import { action as addJobAction } from "./pages/AddJob";
import { action as editJobAction } from "./pages/EditJob";
import { loader as editJobloader } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { action as profileAction } from "./pages/Profile";
import { loader as adminloader } from "./pages/Admin";
import { loader as statsloader } from "./pages/Stats";
import ErrorElement from "./components/ErrorElement";

export const checkdefaultTheme = () => {
  const istoggleTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", istoggleTheme);
  return istoggleTheme;
};
checkdefaultTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

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
        action: loginAction(queryClient),
      },
      {
        path: "dashboard",
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardloader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },
          {
            path: "alljobs",
            element: <AllJobs />,
            loader: allJobsloader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsloader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminloader,
          },
          {
            path: "editjob/:id",
            element: <EditJob />,
            loader: editJobloader(queryClient),
            action: editJobAction(queryClient),
          },
          {
            path: "deletejob/:id",
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
]);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools intialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

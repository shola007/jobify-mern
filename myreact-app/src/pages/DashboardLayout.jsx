import { createContext, useContext, useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  // useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar, Navbar, Loading } from "../components";
import { checkdefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
const DashboardContext = createContext();

const userQuery = {
  queryKey: ["getUser"],
  queryFn: async () => {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  },
};
// eslint-disable-next-line react-refresh/only-export-components
export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = ({ queryClient }) => {
  const { getUser } = useQuery(userQuery).data;
  const user = getUser;

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const [showSidebar, setshowSidebar] = useState(false);
  const [isToggleTheme, setisToggleTheme] = useState(checkdefaultTheme());
  const [isAuthError, setisAuthError] = useState(false);

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };
  const toggleTheme = () => {
    const newToggleTheme = !isToggleTheme;
    setisToggleTheme(newToggleTheme);
    document.body.classList.toggle("dark-theme", newToggleTheme);
    localStorage.setItem("darkTheme", newToggleTheme);
  };
  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    queryClient.invalidateQueries();
    toast.success("logging out....");
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setisAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isToggleTheme,
        toggleSidebar,
        toggleTheme,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <BigSidebar />
          <SmallSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;

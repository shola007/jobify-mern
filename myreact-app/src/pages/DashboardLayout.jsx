import { createContext, useContext, useState } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSidebar, SmallSidebar, Navbar } from "../components";
import { checkdefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
const DashboardContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardLayout = () => {
  const { getUser } = useLoaderData();
  const user = getUser;

  const navigate = useNavigate();
  const [showSidebar, setshowSidebar] = useState(false);
  const [isToggleTheme, setisToggleTheme] = useState(checkdefaultTheme());

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
    toast.success("logging out....");
  };

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
              <Outlet context={{ user }} />
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

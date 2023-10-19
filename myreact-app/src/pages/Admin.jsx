import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/StatsContainer";
import customFetch from "../utils/customFetch";
import { redirect, useLoaderData } from "react-router-dom";
import { StatItem } from "../components";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data);
    return redirect("/dashboard");
  }
};
const Admin = () => {
  const { users, jobs } = useLoaderData();
  return (
    <Wrapper>
      <StatItem
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        title="current-users"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        title="total jobs"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  );
};
export default Admin;

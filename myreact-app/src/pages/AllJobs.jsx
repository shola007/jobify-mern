import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import { JobsContainer, SearchContainer } from "../components";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async ({ request }) => {
  console.log(request.url);
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data);
    return error;
  }
};
const AlljobsContext = createContext();
const AllJobs = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AlljobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AlljobsContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAlljobsContext = () => useContext(AlljobsContext);
export default AllJobs;

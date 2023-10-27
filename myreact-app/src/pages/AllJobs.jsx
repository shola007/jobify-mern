// import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import { JobsContainer, SearchContainer } from "../components";
import { useQuery } from "@tanstack/react-query";

const alljobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", { params });
      return data;
    },
  };
};
// eslint-disable-next-line react-refresh/only-export-components
export const loader =
  (queryClient) =>
  async ({ request }) => {
    console.log(request.url);
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    console.log(params);
    await queryClient.ensureQueryData(alljobsQuery(params));
    return { searchValues: { ...params } };
  };
const AlljobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(alljobsQuery(searchValues));

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

import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      console.log(params);
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job deleted succesfully");
    } catch (error) {
      toast.error(error?.response?.data);
    }
    return redirect("/dashboard/alljobs");
  };
// const DeleteJob = () => {
//   return <div>DeleteJob</div>;
// };
// export default DeleteJob;

import Wrapper from "../assets/wrappers/DashboardFormPage";
import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const file = await formData.get("avatar");
    if (file && file.size > 500000) {
      toast.error("image file too large");
      return null;
    }
    try {
      await customFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["getUser"]);
      toast.success("profile updated succesfully");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data);
      return null;
    }
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { firstname, email, lastname, location } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h5 className="form-title">Profile</h5>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              select an image file Max(0.5MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            name="firstname"
            labelText="first name"
            defaultValue={firstname}
          />
          <FormRow
            type="text"
            name="lastname"
            labelText="last name"
            defaultValue={lastname}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            defaultValue={email}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            defaultValue={location}
          />
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submiting..." : " Save changes"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;

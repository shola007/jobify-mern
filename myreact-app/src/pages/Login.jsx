import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post("/auth/login", data);
      queryClient.invalidateQueries();
      toast.success("login successful");
      return redirect("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data);
      return error;
    }
  };
const Login = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const loginDemo = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    };
    try {
      await customFetch.post("/auth/login", data);
      toast.success("take a test drive");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data);
    }
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" labelText="email" />
        <FormRow type="password" name="password" labelText="password" />
        <button
          type="submit"
          className="btn  btn-block"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <button type="submit" className="btn  btn-block" onClick={loginDemo}>
          {" "}
          Explore the App{" "}
        </button>
        <p>
          Not a member Yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>{" "}
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;

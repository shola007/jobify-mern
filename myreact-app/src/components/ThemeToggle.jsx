import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { useDashboardContext } from "../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isToggleTheme, toggleTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleTheme}>
      {isToggleTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;

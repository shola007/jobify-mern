import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            {" "}
            Job <span>tracking</span> App
          </h1>
          <p>
            baby cloud bread organic typewriter, helvetica asymmetrical cred
            biodiesel vexillologist fingerstache man bun portland iceland offal
            pug. Poke organic poutine snackwave fam chartreuse. Chicharrones
            bruh drinking vinegar, swag sartorial chartreuse meditation. Pop-up
            cray literally beard tousled, viral waistcoat.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login/Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default Landing;

import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 className="navbar__logo">
        <Link className="navbar__logo__link" to="/">
          {"< Auth />"}
        </Link>
      </h1>
    </div>
  );
};

export default Navbar;

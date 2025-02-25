import { Link } from "react-router-dom";
import "../Components/Navbar.css";

const Navbar = () => {
  return (
    <nav className="top-navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/expenses">Expenses</Link></li>
        <li><Link to="/profit"> Profit</Link></li>
        <li><Link to="/income">Income</Link></li>
        <li><Link to="/superadmin">Super Admin</Link></li>
      </ul>
      <Link to="/login" className="login-btn">Login</Link>
    </nav>
  );
};

export default Navbar;

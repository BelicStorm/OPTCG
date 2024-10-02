// import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    {/* Logo */}
                    <div className="navbar-logo">
                        {/* <Link to="/"> */}
                            <img src="logo_op.png"></img>
                        {/* </Link> */}
                    </div>
                    {/* Primary Nav */}
                    <div className="navbar-links">

                    </div>
                </div>
                {/* Secondary Nav */}
                {/* <div className="navbar-right">
                        <Link to="/login" className="navbar-login">Login</Link>
                        <Link to="/signup" className="navbar-signup">Signup</Link>
                    </div> */}
            </div>
        </nav>
    );
}

export default NavBar;
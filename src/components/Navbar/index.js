import logo from "../../asset/logo_circle.png";
import {useRef, useState} from "react";
function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} height="28"/>
                </a>

                <a role="button" className={"navbar-burger " + (isNavbarOpen ? "is-active" : "")} aria-label="menu" aria-expanded={isNavbarOpen}
                   data-target="navbar" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>

            <div id="navbar" className={"navbar-menu " + (isNavbarOpen ? "is-active" : "")}>
                <div className="navbar-start">
                    <a className="navbar-item">
                        Dashboard
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            Configuration
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">
                                Report an issue
                            </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
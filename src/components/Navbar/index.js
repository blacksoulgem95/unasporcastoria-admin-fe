import logo from "../../asset/logo_circle.png";
import {useState} from "react";
import {useAuthState} from "react-firebase-hooks/auth";

import LoginModal from "../LoginModal";
import {auth} from "../../config/firebase";

function Navbar() {
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const [user] = useAuthState(auth)

    return (
        <>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <img src={logo} height="28" alt="logo"/>
                    </a>

                    <a role="button" className={"navbar-burger " + (isNavbarOpen ? "is-active" : "")} aria-label="menu"
                       aria-expanded={isNavbarOpen}
                       data-target="navbar" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                        <span aria-hidden="true"/>
                    </a>
                </div>

                <div id="navbar" className={"navbar-menu " + (isNavbarOpen ? "is-active" : "")}>
                    <div className="navbar-start">
                        {user ? <>
                            <a className="navbar-item">
                                Dashboard
                            </a>

                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">
                                    Configurazione
                                </a>

                                <div className="navbar-dropdown">
                                    <a className="navbar-item">
                                        Oggetti
                                    </a>
                                </div>
                            </div>
                        </> : <></>}
                    </div>

                    <div className="navbar-end">
                        {user ? <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button" onClick={() => auth.signOut()}>
                                        Log out
                                    </a>
                                </div>
                            </div> :
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a className="button is-primary" onClick={() => setIsLoginModalOpen(true)}>
                                        Log in
                                    </a>
                                </div>
                            </div>}
                    </div>
                </div>
            </nav>
            <LoginModal active={isLoginModalOpen} setActive={setIsLoginModalOpen}/>
        </>

    )
}

export default Navbar;
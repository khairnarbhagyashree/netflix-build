
import React, { useState, useHistory, useEffect } from 'react';

import "./Nav.css";

function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener('scroll', transitionNavBar)
    }, [])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav_contents">
                <img
                    className="nav_logo"
                    src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
                    alt="" />
                <img
                    onClick={() => history.push("/profile")}
                    className="nav_avatar"
                    src="https://ih0.redbubble.net/image.618393699.1999/flat,800x800,075,f.u2.jpg"
                    alt="" />
            </div>
        </div>

    );


}

export default Nav;
import React from "react";
import "./Footer.css";
import "../../../public/img/tmbdb.svg";

export const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__top">
                <div className="footer__left">
                    <div className="footer__attribution">
                        <p className="attribution--text">Powered By</p>
                        <img
                            id="tmdb--logo"
                            width="128"
                            alt="Tmdb-312x276-logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/6/6e/Tmdb-312x276-logo.png"
                        />
                    </div>
                </div>
                <div className="footer__bottom">© 2021</div>

                <div className="footer__right">
                    <div className="footer__contact">
                        <p>{"Designed & Developed By Colin Miller"}</p>
                    </div>
                    <div className="footer__interaction">
                        <div className="footer__github">
                            <div className="footer--connect">
                                <a href="https://github.com/colinrmiller/screen-draft">
                                    <img
                                        id="github--icon"
                                        width="64"
                                        alt="Octicons-mark-github"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/64px-Octicons-mark-github.svg.png"
                                    />{" "}
                                    Code
                                </a>
                            </div>
                        </div>
                        <div className="footer--connect">
                            <a href="https://www.linkedin.com/in/colin-miller-587704212/">
                                <img
                                    id="linkdin--logo"
                                    width="512"
                                    alt="LinkedIn logo initials"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/512px-LinkedIn_logo_initials.png"
                                />{" "}
                                Connect
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

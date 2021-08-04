import React from "react";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";
import angelList from "../images/profile/angel_list.png";
import website from "../images/profile/website.png";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-message">Developed by Connor Henderson</div>
        <div className="footer-links">
          <div className="icon-list">
            <a target="_blank" href="https://github.com/cch41/surfcamp">
              <img className="link" src={github} alt="Github" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/connor-henderson-833504123/"
            >
              <img className="link" src={linkedIn} alt="LinkedIn" />
            </a>
            <a target="_blank" href="https://angel.co/u/connor-henderson-2">
              <img className="link" src={angelList} alt="Angel List" />
            </a>
            <a target="_blank" href="https://cch41.github.io/">
              <img className="link" src={website} alt="personal website" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

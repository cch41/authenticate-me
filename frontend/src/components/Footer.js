import React from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-message">Developed by Connor Henderson</div>
        <div className="footer-links">
          <div className="icon-list">
            <a href="https://github.com/cch41" target="_blank">
              <i className="fab fa-fw fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/connor-henderson-833504123/"
              target="_blank"
            >
              <i className="fab fa-fw fa-linkedin-in"></i>
            </a>
            <a href="https://angel.co/u/connor-henderson-2" target="_blank">
              <i className="fab fa-fw fa-angellist"></i>
            </a>
            <a href="https://cch41.github.io/" target="_blank">
              <i id="globe" class="fas fa-solid fa-globe"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import headshot from "../images/profile/headshot.jpg";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="picture-container">
          <img src={headshot} alt="headshot" className="headshot"></img>
        </div>
        <div className="about-info">
          <p className="about-desc">
            Hi, I'm Connor Henderson, and I'm a web developer in New York City
            who enjoys <br></br>
            surfing and coding. This website is inspired by{" "}
            <a href="https://www.hipcamp.com/">HipCamp</a> and more information{" "}
            <br></br>
            about the designand technologies implemented can be found in the
            project's <a href="https://github.com/cch41/surfcamp">repository</a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

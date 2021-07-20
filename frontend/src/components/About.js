import React from "react";
import headshot from "../images/profile/headshot.jpg";
import github from "../images/profile/github.png";
import linkedIn from "../images/profile/linkedIn.jpeg";

export default function About() {
	return (
		<div className="about-container">
			<div className="picture-container">
				<img src={headshot} alt="headshot" className="headshot"></img>
			</div>
			<div className="about-info">
				<p className="about-desc">
					Hi, I'm Connor Henderson, a web developer with a passion for surfing and coding. <br></br>
                    This website is inspired by<a href="https://www.hipcamp.com/">HipCamp</a> and more information about the design<br></br>
                    and technologies implemented can be found in the project <a href="https://github.com/cch41/surfcamp">repo</a>.
				</p>
				<div className="about-links">
					<a href="https://github.com/cch41">
						<img
							style={{ height: "45px", width: "45px" }}
							src={github}
							alt="Github"
						/>
					</a>
					<a href="https://www.linkedin.com/in/connor-henderson-833504123/">
						<img
							style={{ height: "45px", width: "45px" }}
							src={linkedIn}
							alt="LinkedIn"
						/>
					</a>
				</div>
			</div>
		</div>
	);
}

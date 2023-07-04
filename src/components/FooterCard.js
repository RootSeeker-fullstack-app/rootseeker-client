import { Footer } from "react-daisyui";
import { Link } from "react-router-dom";
import { LogoGithub, LogoLinkedin } from "react-ionicons";

export default function FooterCard() {
	return (
		<Footer className="p-10 bg-neutral text-neutral-content">
			<div>
				<h1>RootSeeker</h1>
				<p>
					A project made as an exercise for module 3 on Ironhack's Web
					Development Bootcamp
					<br />
					Thank you Everyone
				</p>
			</div>

			<div>
				<Footer.Title>RootSeeker</Footer.Title>
				<Link to={"/"} className="link link-hover">
					Home
				</Link>
				<Link to={"/activities"} className="link link-hover">
					Activities
				</Link>
				<Link to={"/activities/create"} className="link link-hover">
					Become a Host
				</Link>
				<Link to={"/#"} className="link link-hover">
					About
				</Link>
			</div>
			<div>
				<Footer.Title>About us</Footer.Title>
				<a href="https://github.com/fndoRamos" className="link link-hover">
					Fernando Ramos
				</a>
				<a href="https://github.com/fndoRamos">
					<LogoLinkedin color={"#FFF"} height="20px" width="20px" />
					github.com/fndoRamos
				</a>
				<a href="https://github.com/fndoRamos">
					<LogoGithub color={"#FFF"} height="20px" width="20px" />
					github.com/fndoRamos
				</a>
			</div>
			<div className="mt-8">
				<a
					href="https://www.linkedin.com/in/gregory-tildis-junior-react/"
					className="link link-hover"
				>
					Greg Tildis
				</a>

				<a
					href="https://www.linkedin.com/in/gregory-tildis-junior-react/"
					className="link link-hover"
				>
					<LogoLinkedin color={"#FFF"} height="20px" width="20px" />
					https://www.linkedin.com/in/gregory-tildis-junior-react/
				</a>
				<a href="https://github.com/gtildis" className="link link-hover">
					<LogoGithub color={"#FFF"} height="20px" width="20px" />
					github.com/gtildis
				</a>
			</div>
		</Footer>
	);
}

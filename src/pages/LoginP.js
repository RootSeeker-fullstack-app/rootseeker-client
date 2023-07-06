import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Input } from "react-daisyui";
import FooterCard from "../components/FooterCard";

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage() {
	const navigate = useNavigate();
	const { storeToken, authenticateUser } = useContext(AuthContext);

	const [inputs, setInputs] = useState({});
	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleOnChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${API_URL}/auth/login`, inputs)
			.then((response) => {
				storeToken(response.data.authToken);
				authenticateUser();
				navigate("/");
			})
			.catch((error) => {
				const errorDescription =
					error.response?.data?.message || "An error occurred.";
				setErrorMessage(errorDescription);
			});
	};
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleLoginSubmit(event);
		}
	};

	return (
		<div>
			<div className="flex flex-row items-center justify-center h-screen w-70 bg-[#22A699]">
				<div>
					<img
						src="https://res.cloudinary.com/dcslof4ax/image/upload/v1688541243/rootseeker-gallery/nlidrsjfdbxhlghdzdjw.png"
						alt=""
					/>
				</div>
				<form className="LoginPage" onSubmit={handleLoginSubmit} open="visible">
					<h1 className="p-4 text-white text-9xl">Login.</h1>
					<div className="flex flex-col mt-3 text-left">
						<label className="text-white">Email:</label>
						<Input
							borderOffset={true}
							type="email"
							name="email"
							value={inputs.email || ""}
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
						/>

						<label className="text-white">Password:</label>
						<Input
							borderOffset={true}
							type="password"
							name="password"
							value={inputs.password || ""}
							onChange={handleOnChange}
							onKeyDown={handleKeyDown}
						/>

						<Button color="primary" type="submit" className="mt-3">
							Login
						</Button>
						<div className="flex flex-row justify-between text-white">
							<p>Don't have an account yet?</p>
							<p className="text-3xl rotate-90 my-9">YET??? </p>
						</div>
						<div className="flex flex-row justify-end">
							<Link to="/signup">
								<Button color="primary">Sign Up</Button>
							</Link>
						</div>
					</div>
					{errorMessage && <p className="error-message">{errorMessage}</p>}
				</form>
			</div>
			<FooterCard />
		</div>
	);
}

export default LoginPage;

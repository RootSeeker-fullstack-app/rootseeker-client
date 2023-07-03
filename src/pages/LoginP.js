import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Input } from "react-daisyui";

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
		<form className="LoginPage" onSubmit={handleLoginSubmit} open="visible">
			<h1>Login</h1>
			<div className="flex flex-col mt-3">
				<label>Email:</label>
				<Input
					borderOffset={true}
					type="email"
					name="email"
					value={inputs.email || ""}
					onChange={handleOnChange}
					onKeyDown={handleKeyDown}
				/>

				<label>Password:</label>
				<Input
					borderOffset={true}
					type="password"
					name="password"
					value={inputs.password || ""}
					onChange={handleOnChange}
					onKeyDown={handleKeyDown}
				/>

				<button color="primary" type="submit" className="mt-3">
					Login
				</button>
			</div>
			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Link to="/signup">Sign Up</Link>
		</form>
	);
}

export default LoginPage;

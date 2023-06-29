import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

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
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className="LoginPage">
			<h1>Login</h1>

			<form onSubmit={handleLoginSubmit}>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={inputs.email || ""}
					onChange={handleOnChange}
				/>

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={inputs.password || ""}
					onChange={handleOnChange}
				/>

				<button type="submit">Login</button>
			</form>
			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Link to={"/signup"}> Sign Up</Link>
		</div>
	);
}

export default LoginPage;

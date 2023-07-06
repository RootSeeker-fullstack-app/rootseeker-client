import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Modal, Button, Input } from "react-daisyui";

const API_URL = process.env.REACT_APP_API_URL;

function LoginPage({ toggleIsLoginVisible, toggleIsSignupVisible }) {
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
				toggleIsLoginVisible();
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

	const handleSignupClick = () => {
		toggleIsLoginVisible();
		toggleIsSignupVisible();
	};

	return (
		<Modal className="LoginPage" onSubmit={handleLoginSubmit} open="visible">
			<button
				size="sm"
				shape="circle"
				className="absolute right-2 top-2"
				onClick={toggleIsLoginVisible}
			>
				✕
			</button>
			<Modal.Header className="text-4xl">Login</Modal.Header>
			<Modal.Body className="flex flex-col mt-3">
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

				<Button color="primary" type="submit" className="mt-3">
					Login
				</Button>
			</Modal.Body>
			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Don't have an account yet?</p>
			<Button
				className="btn-outline btn-xs btn-primary"
				onClick={handleSignupClick}
			>
				Sign Up
			</Button>
		</Modal>
	);
}

export default LoginPage;

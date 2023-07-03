import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "react-daisyui";

function SignupP() {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({});
	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleOnChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSignupSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${process.env.REACT_APP_API_URL}/auth/signup`, inputs)
			.then((response) => {
				navigate("/login");
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSignupSubmit(event);
		}
	};

	return (
		<form className="SignupPage" onSubmit={handleSignupSubmit} open="visible">
			<div>Sign up now</div>

			<div className="flex flex-col ">
				<label>Email:</label>
				<Input
					borderOffset="true"
					type="email"
					name="email"
					value={inputs.email || ""}
					onChange={handleOnChange}
					required={true}
					onKeyDown={handleKeyDown}
				/>

				<label>Password:</label>
				<Input
					borderOffset="true"
					type="password"
					name="password"
					value={inputs.password || ""}
					onChange={handleOnChange}
					required={true}
					onKeyDown={handleKeyDown}
				/>

				<label>userName:</label>
				<Input
					type="text"
					borderOffset="true"
					name="username"
					value={inputs.username || ""}
					onChange={handleOnChange}
					required={true}
					onKeyDown={handleKeyDown}
				/>

				<label>firstName:</label>
				<Input
					type="text"
					name="firstName"
					borderOffset="true"
					value={inputs.firstName || ""}
					onChange={handleOnChange}
					required={true}
					onKeyDown={handleKeyDown}
				/>

				<label>lastName:</label>
				<Input
					type="text"
					name="lastName"
					value={inputs.lastName || ""}
					borderOffset="true"
					onChange={handleOnChange}
					required={true}
					onKeyDown={handleKeyDown}
				/>

				<Button color="primary" className="mt-3" type="submit">
					Sign Up
				</Button>

				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</div>

			<p>Already have an account?</p>
			<Link to="/login"> Login</Link>
		</form>
	);
}

export default SignupP;

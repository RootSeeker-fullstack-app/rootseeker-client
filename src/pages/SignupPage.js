import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
	// return (
	// 	<div className="font-sans">
	// 		<Modal {...args} open={visible}>
	// 			<Button
	// 				size="sm"
	// 				shape="circle"
	// 				className="absolute right-2 top-2"
	// 				onClick={toggleVisible}
	// 			>
	// 				✕
	// 			</Button>
	// 			<Modal.Header className="font-bold">
	// 				Congratulations random Interner user!
	// 			</Modal.Header>

	// 			<Modal.Body>
	// 				You've been selected for a chance to get one year of subscription to
	// 				use Wikipedia for free!
	// 			</Modal.Body>
	// 		</Modal>
	// 	</div>
	// );

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

	return (
		<div className="SignupPage">
			<h1>Sign Up</h1>

			<form onSubmit={handleSignupSubmit}>
				<label>Email:</label>
				<input
					type="email"
					name="email"
					value={inputs.email || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>Password:</label>
				<input
					type="password"
					name="password"
					value={inputs.password || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>userName:</label>
				<input
					type="text"
					name="username"
					value={inputs.username || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>firstName:</label>
				<input
					type="text"
					name="firstName"
					value={inputs.firstName || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>lastName:</label>
				<input
					type="text"
					name="lastName"
					value={inputs.lastName || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<button type="submit">Sign Up</button>
			</form>

			{errorMessage && <p className="error-message">{errorMessage}</p>}

			<p>Already have account?</p>
			<Link to={"/login"}> Login</Link>
		</div>
	);
}

export default SignupPage;

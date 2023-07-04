import { useState } from "react";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Input } from "react-daisyui";

function SignupPage({ toggleIsSignupVisible, toggleIsLoginVisible }) {
	// const navigate = useNavigate();
	const API_URL = process.env.REACT_APP_API_URL;
	const [inputs, setInputs] = useState({});
	const [imageUrl, setImageUrl] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);

	const handleOnChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFileUpload = (e) => {
		const uploadData = new FormData();

		uploadData.append("imageUrl", e.target.files[0]);

		axios
			.post(`${API_URL}/api/upload`, uploadData)
			.then((response) => {
				setImageUrl(response.data.fileUrl);
			})
			.catch((err) => console.log("Error while uploading the file: ", err));
	};

	const handleSignupSubmit = (e) => {
		e.preventDefault();

		const newProfile = {
			...inputs,
			imgProfile:
				imageUrl ||
				"https://res.cloudinary.com/dcslof4ax/image/upload/v1686592088/user-folder/wxjsptzx8l5kplnay3wn.png", // Assign imageUrl as a string
		};

		axios
			.post(`${API_URL}/auth/signup`, newProfile)
			.then((response) => {
				// navigate("/login");
				toggleIsSignupVisible();
				toggleIsLoginVisible();
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	const handleLoginClick = () => {
		toggleIsSignupVisible();
		toggleIsLoginVisible();
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSignupSubmit(event);
		}
	};

	return (
		<Modal className="SignupPage" onSubmit={handleSignupSubmit} open="visible">
			<Modal.Header>Sign up now</Modal.Header>
			<button
				size="sm"
				shape="circle"
				className="absolute right-2 top-2"
				onClick={toggleIsSignupVisible}
			>
				✕
			</button>

			<Modal.Body className="flex flex-col ">
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

				<label>Image:</label>
				<Input
					type="file"
					borderOffset="true"
					onChange={handleFileUpload}
					// required={true}
					// onKeyDown={handleKeyDown}
				/>

				<Button color="primary" className="mt-3" type="submit">
					Sign Up
				</Button>

				{errorMessage && <p className="error-message">{errorMessage}</p>}
			</Modal.Body>

			<p>Already have an account?</p>
			<Button onClick={handleLoginClick}> Login</Button>
		</Modal>
	);
}

export default SignupPage;

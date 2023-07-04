import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Modal, Input } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

function EditProfile({ toggleIsEditVisible }) {
	const navigate = useNavigate();
	// const { storeToken, authenticateUser } = useContext(AuthContext);
	const { user } = useContext(AuthContext);

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
		toggleIsEditVisible();
		setTimeout(() => {
			const storedToken = localStorage.getItem("authToken");

			axios
				.put(`${API_URL}/api/users/${user._id}`, inputs, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then(() => navigate(`/profile/${user.username}`))
				.catch((error) =>
					console.log("Error updating activity from API", error)
				);
		}, 3000);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleLoginSubmit(event);
		}
	};
	const notifyUpdate = () =>
		toast.success(`You updated successfully your profile`);

	return (
		<Modal className="EditProfile" onSubmit={handleLoginSubmit} open="visible">
			<button
				size="sm"
				shape="circle"
				className="absolute right-2 top-2"
				onClick={toggleIsEditVisible}
			>
				✕
			</button>

			<Modal.Body className="flex flex-col mt-3">
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

				<button
					color="primary"
					type="submit"
					onClick={notifyUpdate}
					className="mt-3"
				>
					Edit
				</button>
				<ToastContainer position="top-center" autoClose={2000} />
			</Modal.Body>
			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</Modal>
	);
}

export default EditProfile;

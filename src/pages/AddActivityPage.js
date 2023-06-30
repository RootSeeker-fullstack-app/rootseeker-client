import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function AddProject(props) {
	const [inputs, setInputs] = useState({});
	const [errorMessage, setErrorMessage] = useState(undefined);
	const navigate = useNavigate();
	const handleOnChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Get the token from the localStorage
		const storedToken = localStorage.getItem("authToken");
		axios
			.post(`${API_URL}/api/activities`, inputs, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then((response) => {
				// Reset the state
				setInputs("");
				navigate("/activities");
				// props.refreshActivities();
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className="AddActivity">
			<h3>Add Activity</h3>

			<form onSubmit={handleSubmit}>
				<label>Title:</label>
				<input
					type="text"
					name="name"
					value={inputs.name || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>Description:</label>
				<textarea
					type="text"
					name="description"
					value={inputs.description || ""}
					onChange={handleOnChange}
				/>

				<label>Duration:</label>
				<input
					type="number"
					name="duration"
					value={inputs.duration || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>Price per adult:</label>
				<input
					type="number"
					name="price"
					value={inputs.price || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>Date:</label>
				<input
					type="date"
					name="date"
					value={inputs.date || ""}
					onChange={handleOnChange}
					required={true}
				/>

				<label>Image:</label>
				<input
					type="text"
					name="image"
					value={inputs.image || ""}
					onChange={handleOnChange}
				/>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddProject;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, Textarea } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

function AddActivityPage(props) {
	const [inputs, setInputs] = useState({});
	const [errorMessage, setErrorMessage] = useState(undefined);
	const navigate = useNavigate();

	const handleOnChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		console.log(inputs.available);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setTimeout(() => {
			const storedToken = localStorage.getItem("authToken");
			axios
				.post(`${API_URL}/api/activities`, inputs, {
					headers: { Authorization: `Bearer ${storedToken}` },
				})
				.then((response) => {
					console.log(inputs);
					// Reset the state
					setInputs("");
					navigate("/activities");
					// props.refreshActivities();
				})
				.catch((error) => {
					const errorDescription = error.response.data.message;
					setErrorMessage(errorDescription);
					console.log(errorMessage);
				});
		}, 2000);
	};
	const notify = () =>
		toast.success(`Your reservation has been submitted!
                    Check it on cart`);

	return (
		<div className="flex flex-row">
			<div className="basis-1/4"></div>
			<div className="flex flex-row my-10 basis-1/2">
				<div className="AddActivity basis-1/2">
					<h3>Add Activity this is the left component</h3>

					<form className="flex flex-col" onSubmit={handleSubmit}>
						<label>Title:</label>
						<Input
							borderOffset="true"
							type="text"
							name="name"
							value={inputs.name || ""}
							onChange={handleOnChange}
							required={true}
						/>

						<label>Description:</label>
						<Textarea
							borderOffset="true"
							type="text"
							name="description"
							value={inputs.description || ""}
							onChange={handleOnChange}
						/>

						{/* <Form className="w-64 p-4 rounded-lg shadow bg-base-200">
              <Form.Label title="Available">
                <Checkbox
                  type="boolean"
                  value={inputs.available || ""}
                  onChange={handleOnChange}
                />
              </Form.Label>
            </Form> */}

						<label>Duration:</label>
						<Input
							borderOffset="true"
							type="number"
							name="duration"
							value={inputs.duration || ""}
							onChange={handleOnChange}
							required={true}
						/>

						<label>Price per adult:</label>
						<Input
							borderOffset="true"
							type="number"
							name="price"
							value={inputs.price || ""}
							onChange={handleOnChange}
							required={true}
						/>

						<label>Date:</label>
						<Input
							borderOffset="true"
							type="date"
							name="date"
							value={inputs.date || ""}
							onChange={handleOnChange}
							required={true}
						/>

						<label>Image:</label>
						<Input
							borderOffset="true"
							type="text"
							name="image"
							value={inputs.image || ""}
							onChange={handleOnChange}
						/>

						<Button onClick={notify} type="submit" className="mt-5">
							Submit
						</Button>
						<ToastContainer position="top-center" autoClose={2000} />
					</form>
				</div>
				<div className="basis-1/2">this is the right component</div>
			</div>
			<div className="basis-1/4"></div>
		</div>
	);
}

export default AddActivityPage;

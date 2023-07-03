import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MakeReservationForm from "../components/MakeReservationForm";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ActivityDetailsPage() {
	const [activity, setActivity] = useState(null);
	const [showReservationForm, setShowReservationForm] = useState(false);

	const { activityId } = useParams();

	const { user } = useContext(AuthContext);

	const navigate = useNavigate();
	const API_URL = process.env.REACT_APP_API_URL;

	const getActivity = () => {
		axios
			.get(`${API_URL}/api/activities/${activityId}`)
			.then((response) => {
				setActivity(response.data);
			})
			.catch((error) =>
				console.log("Error getting details from de API", error)
			);
	};

	useEffect(() => {
		getActivity();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteActivity = () => {
		const storedToken = localStorage.getItem("authToken");

		axios
			.delete(`${API_URL}/api/activities/${activityId}`, {
				headers: { Authorization: `Bearer ${storedToken}` },
			})
			.then(() => navigate(`/profile/${user.username}`))
			.catch((error) => console.log("Error deleting activity from API", error));
	};

	const reservationFormState = () => {
		setShowReservationForm(!showReservationForm);
	};
	const notify = () => toast.success(`You deleted successfully your activity`);

	return (
		<div>
			{!activity ? (
				<p>Loading...</p>
			) : (
				<div className="flex flex-row">
					<div className="basis-1/5"></div>
					<div className="grid-cols-2 basis-3/5">
						<div className="grid grid-cols-5 gap-4">
							<div className="col-span-2 bg-gray-200">
								<h1>{activity.name}</h1>
							</div>
							<div className="hidden col-span-3 bg-gray-300">Column empty</div>
							<div className="col-span-5 bg-gray-400">
								<p>{activity.description}</p>
							</div>
							<div className="col-span-2 bg-gray-400">
								<h3>Description: {activity.description}</h3>
								<h3>Duration: {activity.duration}min</h3>

								{/* <h3>Available: {activity.available}</h3> */}
								<h3>Date: {activity.date.slice(0, 10)}</h3>
								<h3>Price: {activity.price}€</h3>
								{user ? (
									<Link to={`/profile/${activity.user.username}`}>
										<h3>Host: {activity.user.username} </h3>
									</Link>
								) : (
									<h3>Host: {activity.user.username} </h3>
								)}
								{user === null ? (
									<p>
										<Link to={"/login"}>login</Link> to book this activity
									</p>
								) : (
									<>
										{user.username !== activity.user.username ? (
											<>
												{showReservationForm && (
													<MakeReservationForm {...activity} />
												)}

												{showReservationForm ? (
													<Button
														className="btn btn-primary"
														onClick={reservationFormState}
													>
														Hide Form
													</Button>
												) : (
													<Button
														className="btn btn-primary"
														onClick={reservationFormState}
													>
														Make reservation
													</Button>
												)}
											</>
										) : (
											<>
												<Link
													to={`/activities/edit/${activityId}`}
													className="btn btn-primary"
												>
													Edit
												</Link>
												<Button
													className="btn btn-error"
													onClick={() => {
														notify();
														setTimeout(deleteActivity, 3000);
													}}
												>
													Delete
												</Button>
												<ToastContainer
													position="top-center"
													autoClose={2000}
												/>
											</>
										)}
									</>
								)}
							</div>
							<div className="col-span-3 bg-gray-400">
								<img src={activity.images} alt="imageName" />
							</div>
						</div>
					</div>
					<div className="basis-1/5"></div>
				</div>
			)}
		</div>
	);
}

export default ActivityDetailsPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MakeReservationForm from "../components/MakeReservationForm";

function ActivityDetailsPage() {
	const [activity, setActivity] = useState(null);
	const [showReservationForm, setShowReservationForm] = useState(false);

	const { activityId } = useParams();

	const getActivity = () => {
		axios
			.get(`${process.env.REACT_APP_API_URL}/api/activities/${activityId}`)
			.then((response) => {
				setActivity(response.data);
			})
			.catch((error) =>
				console.log("Error getting details from de API", error)
			);
	};

	useEffect(() => {
		getActivity();
	}, []);

	const reservationFormState = () => {
		setShowReservationForm(!showReservationForm);
	};

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
								<h3>Duration: {activity.duration}min</h3>

								<h3>Available: {activity.available}</h3>
								<h3>Date: {activity.date.slice(0, 10)}</h3>
								<h3>Price: {activity.price}€</h3>
								{showReservationForm && <MakeReservationForm {...activity} />}

								{showReservationForm ? (
									<button onClick={reservationFormState}>Hide Form</button>
								) : (
									<button onClick={reservationFormState}>
										Make reservation
									</button>
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

import { useState, useEffect } from "react";
import axios from "axios";
import ActivityCard from "../context/ActivityCard";

export default function ActivityListPage() {
	const [activities, setActivities] = useState([]);

	const API_URL = process.env.REACT_APP_API_URL;

	const getAllActivities = () => {
		axios
			.get(`${API_URL}/api/activities`)
			.then((respone) => {
				setActivities(respone.data);
			})
			.catch((e) => console.log(e));
	};

	useEffect(() => {
		getAllActivities();
	}, []);

	return (
		<div className="ActivityListPage">
			{/* <AddProject refreshProjects={getAllProjects} /> */}

			{activities.map((activity) => (
				<ActivityCard key={activity._id} {...activity} />
			))}
		</div>
	);
}

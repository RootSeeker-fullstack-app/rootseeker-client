import { useState, useEffect } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import AddActivityPage from "./AddActivityPage";
import { Link } from "react-router-dom";

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
			<Link to={"/activities/create"}>Become a Host / Add an Activity</Link>

			{activities.map((activity) => (
				<ActivityCard key={activity._id} {...activity} />
			))}
		</div>
	);
}
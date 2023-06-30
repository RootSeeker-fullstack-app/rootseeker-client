import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserProfilePage() {
	const { username } = useParams();
	const [activities, setActivities] = useState(null);
	const API_URL = process.env.REACT_APP_API_URL;

	const getActivitiesOfUser = () => {
		let activitiesArr = [];

		axios
			.get(`${API_URL}/api/activities`)
			.then((response) => {
				console.log(response, "thiss is the activities array");
				activitiesArr.push(response.data);
				return axios.get(`${API_URL}/users/${username}`);
			})
			.then((userDetails) => {
				console.log(userDetails, "this is the the user data");
				setActivities(
					activitiesArr.filter((activity) => {
						return userDetails._id === activity.user._id;
					})
				);
				console.log(activities, "this is the end");
			})
			.catch((error) =>
				console.log("error getting the list of activities", error)
			);
	};

	useEffect(() => {
		getActivitiesOfUser();
	}, []);

	return (
		<div>
			<div>
				{/* <img src={imgProfile} /> */}
				<p>username</p>
				<p>first name</p>
				<p>last name</p>
			</div>
		</div>
	);
}

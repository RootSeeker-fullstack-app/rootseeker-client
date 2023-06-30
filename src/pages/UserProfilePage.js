import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

export default function UserProfilePage() {
  const { username } = useParams();
  const [activities, setActivities] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  const getActivitiesOfUser = () => {
    let activitiesArr;

    axios
      .get(`${API_URL}/api/activities`)
      .then((response) => {
        activitiesArr = response.data;
        return axios.get(`${API_URL}/api/users/${username}`);
      })
      .then((userDetails) => {
        setCurrentUser(userDetails.data[0]);
        const filteredArr = activitiesArr.filter((activity) => {
          return userDetails.data[0]._id === activity.user._id;
        });
        setActivities(filteredArr);
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
        {!currentUser ? (
          <p>Loading...</p>
        ) : (
          <div>
            <img src={currentUser.imgProfile} />
            <p>{currentUser.username}</p>
            <p>{currentUser.firstName}</p>
            <p>{currentUser.lastName}</p>
          </div>
        )}
      </div>
      <div>
        {!activities ? (
          <p>Loading...</p>
        ) : (
          activities.map((activity) => {
            return <ActivityCard key={activity._id} {...activity} />;
          })
        )}
      </div>
    </div>
  );
}

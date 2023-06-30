import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ActivityDetailsPage() {
  const [activity, setActivity] = useState(null);

  const { activityId } = useParams();

  const getActivity = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/activities/${activityId}`)
      .then((response) => setActivity(response.data))
      .catch((error) =>
        console.log("Error getting details from de API", error)
      );
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <div>
      {!activity ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{activity.name}</h1>
          <p>{activity.description}</p>
          <h3>Duration: {activity.duration}min</h3>
          <img src={activity.images} alt="imageName" />
          <h3>Available: {activity.available}</h3>
          <h3>Date: {activity.date}</h3>
          <h3>Price: {activity.price}€</h3>
        </div>
      )}
    </div>
  );
}

export default ActivityDetailsPage;

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";
import { Card, Button } from "react-daisyui";
import { AuthContext } from "../context/auth.context";

export default function UserProfilePage() {
  const { username } = useParams();
  const { user } = useContext(AuthContext);
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
	// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      <div className="grid grid-cols-9 gap-4 grid-rows-15 p-11">
        <div className="hidden col-span-2 bg-gray-200 p-11 ">Column 1</div>
        <div className="col-span-5 col-start-3 row-span-5 p-11">
          {!currentUser ? (
            <p>Loading...</p>
          ) : (
            <Card side="lg" className="shadow-xl">
              <Card.Image
                src={currentUser.imgProfile}
                className="w-20 h-20 top-2 left-2 "
                alt="profile-image "
              />
              <Card.Body>
                <Card.Title tag="h2">{currentUser.username}</Card.Title>
                <Card.Title tag="h4">
                  Member since: {currentUser.createdAt.slice(0, 10)}
                </Card.Title>
                {user.username === username && (
                  <Card.Actions className="justify-end">
                    <Button color="primary">Edit Profile</Button>
                  </Card.Actions>
                )}
              </Card.Body>
            </Card>
          )}
        </div>
        <div className="hidden col-span-2 bg-gray-200 p-11">1</div>
        <div className="col-span-9 bg-gray-200 p-11">2</div>
        <div className="hidden col-span-3 bg-gray-400 p-11">3</div>
        <div className="col-span-3 col-start-4 p-11">
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
        <div className="hidden col-span-3 bg-gray-400 p-11">5</div>
      </div>
    </div>
  );
}

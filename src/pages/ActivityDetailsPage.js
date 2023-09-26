import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import MakeReservationForm from "../components/MakeReservationForm";
import { AuthContext } from "../context/auth.context";
import { Button } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterCard from "../components/FooterCard";
import LeafMapDetails from "../Leaflet/LeafMapDetails";

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
    <div className="text-center">
      {!activity ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <div className="items-center justify-center w-11/12 min-h-screen lg:flex md:flex">
          <div className="max-w-xl my-16 lg:w-1/2 mx-14">
            <LeafMapDetails coordinates={activity.coordinates} />
          </div>

          <div className="lg:w-1/2">
            <div className="border-2 rounded-lg lg:flex md:flex border-primary">
              <div className=" lg:w-1/2 sm:w-80">
                <div>
                  <h1 className="text-4xl underline decoration-primary">
                    {activity.name}
                  </h1>

                  <div className="mx-4 text-left">
                    <h3>
                      Description:<br></br>
                    </h3>
                    <p>{activity.description}</p>
                    <br></br>
                    <h3>Duration ⌚: {activity.duration}min</h3>

                    {/* <h3>Available: {activity.available}</h3> */}
                    <h3>Date 📅: {activity.date.slice(0, 10)}</h3>
                    <h3>Price 💰: {activity.price}€</h3>
                    <h3>
                      Max. participants 👩🏾‍🤝‍🧑: {activity.maxParticipants}
                    </h3>
                    <h3>Category: {activity.category}</h3>
                    {user ? (
                      <Link to={`/profile/${activity.user.username}`}>
                        <div>
                          Host:
                          <p className="inline text-primary">
                            {activity.user.username}
                          </p>
                        </div>
                      </Link>
                    ) : (
                      <h3>Host: {activity.user.username} </h3>
                    )}
                  </div>
                </div>
              </div>
              <div className=" lg:w-1/2 sm:w-80">
                <div className="w-full carousel">
                  {activity.images.map((image, index) => (
                    <div
                      id={`slide${index}`}
                      className="relative w-full carousel-item"
                      key={index}
                    >
                      <img
                        src={image}
                        className="w-full h-[420px]"
                        alt={`Slide ${index}`}
                      />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        {index > 0 && (
                          <a
                            href={`#slide${index - 1}`}
                            className="btn btn-circle"
                          >
                            ❮
                          </a>
                        )}
                        {index < activity.images.length - 1 && (
                          <a
                            href={`#slide${index + 1}`}
                            className="btn btn-circle"
                          >
                            ❯
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-b-2 border-l-2 border-r-2 rounded-lg border-primary">
              {user === null ? (
                <p>
                  <Link to={"/login"}>
                    <Button color="primary"> Login</Button>
                  </Link>
                  to book this activity
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
                          className="btn btn-outline btn-primary"
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
                    <div className="mx-4 my-5 text-right">
                      <Link
                        to={`/activities/edit/${activityId}`}
                        className="mx-3 btn btn-primary"
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
                      <ToastContainer position="top-center" autoClose={2000} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <FooterCard />
    </div>
  );
}

export default ActivityDetailsPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Textarea } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = process.env.REACT_APP_API_URL;

function EditActivityPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState(null);

  const handleOnChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/api/activities/${activityId}`)
      .then((response) => {
        setInputs(response.data);
      })
      .catch((error) =>
        console.log("Error getting activity details from the API", error)
      );
  }, [activityId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const storedToken = localStorage.getItem("authToken");

      axios
        .put(`${API_URL}/api/activities/${activityId}`, inputs, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => navigate(`/activities/${activityId}`))
        .catch((error) =>
          console.log("Error updating activity from API", error)
        );
    }, 3000);
  };
  const notifyUpdate = () =>
    toast.success(`You updated successfully your activity`);

  return (
    <div>
      {!inputs ? (
        <p>Loading...</p>
      ) : (
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
                  value={inputs.date.slice(0, 10) || ""}
                  onChange={handleOnChange}
                  required={true}
                />

                <label>Maximum of participants:</label>
                <Input
                  borderOffset="true"
                  type="number"
                  min={1}
                  name="maxParticipants"
                  value={inputs.maxParticipants || ""}
                  onChange={handleOnChange}
                  required={true}
                />

                <label>Image:</label>
                <Input
                  borderOffset="true"
                  type="text"
                  name="image"
                  value={inputs.images || ""}
                  onChange={handleOnChange}
                />

                <Button type="submit" onClick={notifyUpdate} className="mt-5">
                  Submit
                </Button>
                <ToastContainer position="top-center" autoClose={2000} />
              </form>
            </div>
            <div className="basis-1/2">this is the right component</div>
          </div>
          <div className="basis-1/4"></div>
        </div>
      )}
    </div>
  );
}

export default EditActivityPage;

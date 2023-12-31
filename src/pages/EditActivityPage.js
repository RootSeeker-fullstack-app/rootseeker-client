import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Input, Button, Textarea } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterCard from "../components/FooterCard";

function EditActivityPage() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [showAddImage, setShowAddImage] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [inputs, setInputs] = useState(null);

  const toggleImage = () => {
    setShowAddImage(!showAddImage);
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    setIsUploadingImage(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log("this one", response);
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

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

    const newActivity = {
      ...inputs,
    };

    if (imageUrl) {
      newActivity.images = imageUrl;
    }

    setTimeout(() => {
      const storedToken = localStorage.getItem("authToken");

      axios
        .put(`${API_URL}/api/activities/${activityId}`, newActivity, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => navigate(`/activities/${activityId}`))
        .catch((error) =>
          console.log("Error updating activity from API", error)
        );
    }, 3000);
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    notifyUpdate();
    const storedToken = localStorage.getItem("authToken");
    setTimeout(() => {
      axios
        .get(`${API_URL}/api/activities/${activityId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const activity = response.data;
          const newImages = activity.images || []; // Retrieve existing images or initialize an empty array

          if (imageUrl) {
            newImages.push(imageUrl); // Push the new image URL to the array
          }

          const updatedActivity = {
            ...activity,
            images: newImages,
          };

          return axios.put(
            `${API_URL}/api/activities/${activityId}`,
            updatedActivity,
            {
              headers: { Authorization: `Bearer ${storedToken}` },
            }
          );
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
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <div className="flex flex-row min-h-screen">
          <div className="basis-1/4"></div>
          <div className="flex flex-row mx-12 my-10 basis-1/2">
            <div className="AddActivity basis-1/2">
              <h3 className="text-6xl underline decoration-primary">
                Add Activity 🐱‍👤
              </h3>

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

                <label>Category:</label>
                <select
                  className="w-full select select-bordered"
                  name="category"
                  required={true}
                  onChange={handleOnChange}
                >
                  <option disabled selected>
                    {inputs.category}
                  </option>
                  <option value={"Land"}>Land</option>
                  <option value={"Water"}>Water</option>
                  <option value={"Sky"}>Sky</option>
                  <option value={"Cultural"}>Cultural</option>
                </select>

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
                  type="file"
                  onChange={handleFileUpload}
                />
                {isUploadingImage ? (
                  <Button
                    color="primary"
                    onClick={notifyUpdate}
                    className="mt-5"
                    disabled
                  >
                    Uploading image...
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={notifyUpdate}
                    className="mt-5"
                  >
                    Submit
                  </Button>
                )}
                <ToastContainer position="top-center" autoClose={2000} />
              </form>

              <Button
                className="my-4 btn-primary btn-outline"
                onClick={toggleImage}
              >
                Add more photos
              </Button>
              {showAddImage && (
                <div>
                  <label>Another image:</label>
                  <Input
                    borderOffset="true"
                    type="file"
                    onChange={handleFileUpload}
                  />
                  {isUploadingImage ? (
                    <Button onClick={handleAddImage} disabled>
                      Uploading image...
                    </Button>
                  ) : (
                    <Button color="primary" onClick={handleAddImage}>
                      Submit new photo
                    </Button>
                  )}
                </div>
              )}
            </div>
            <div className="mx-4 my-24 basis-1/2">
              <img src={inputs.images[0]} alt="activityimage" />
            </div>
          </div>
          <div className="basis-1/4"></div>
        </div>
      )}
      <FooterCard />
    </div>
  );
}

export default EditActivityPage;

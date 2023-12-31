import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, Button, Textarea } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import FooterCard from "../components/FooterCard";
import "react-toastify/dist/ReactToastify.css";
import LeafMap from "../Leaflet/LeafMap";

const API_URL = process.env.REACT_APP_API_URL;

function AddActivityPage(props) {
  const [inputs, setInputs] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [coordinates, setCoordinates] = useState([]);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    setIsUploadingImage(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImageUrl(response.data.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err))
      .finally(() => {
        setIsUploadingImage(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const storedToken = localStorage.getItem("authToken");
      const newActivity = {
        ...inputs,
        coordinates,
        images:
          imageUrl ||
          "https://res.cloudinary.com/dcslof4ax/image/upload/v1686843478/user-folder/p6sarfts5pwi4hygwgtm.jpg",
      };

      axios
        .post(`${API_URL}/api/activities`, newActivity, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // Reset the state
          setInputs({});
          navigate("/activities");
          // props.refreshActivities();
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          console.log(errorMessage);
        });
    }, 2000);
  };

  const handleCreated = (createdObject) => {
    let coords;
    if (createdObject.layer.editing.latlngs) {
      coords = createdObject.layer.editing.latlngs[0];
    } else {
      coords = [createdObject.layer._latlng];
    }

    let banana = coords.map((e) => {
      if (
        typeof e === "object" &&
        e.hasOwnProperty("lat") &&
        e.hasOwnProperty("lng")
      ) {
        const latitude = parseFloat(e.lat);
        const longitude = parseFloat(e.lng);
        return { latitude, longitude };
      }
      return null;
    });

    setCoordinates(banana);
  };

  const notify = () =>
    toast.success(`Your activity has been created successfully`);

  return (
    <div>
      <div className="justify-center min-h-screen my-5 lg:flex">
        <div className="my-10 lg:flex basis-2/3">
          <div className="mt-36 lg:mt-24 lg:mr-10 lg:ml-10 basis-1/2">
            <LeafMap onCreated={handleCreated} />
          </div>
          <div className="mx-8 mb-5 lg:mx-10 AddActivity basis-1/2 ">
            <h3 className="mb-4 text-6xl text-right underline decoration-primary">
              Add Activity 🐱‍🚀
            </h3>

            <form className="flex flex-col text-left " onSubmit={handleSubmit}>
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
                required={true}
              />
              <label>Category:</label>
              <select
                className="w-full select select-bordered"
                name="category"
                required={true}
                onChange={handleOnChange}
              >
                <option disabled selected>
                  Select category
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
                value={inputs.date || ""}
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
                // name="images"
                // value={inputs.images || ""}
                onChange={(e) => handleFileUpload(e)}
              />

              {isUploadingImage ? (
                <Button
                  onClick={notify}
                  type="submit"
                  className="mt-5"
                  disabled
                >
                  Uploading image...
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={notify}
                  type="submit"
                  className="mt-5"
                >
                  Submit
                </Button>
              )}
              <ToastContainer position="top-center" autoClose={2000} />
            </form>
          </div>
        </div>
      </div>
      <FooterCard />
    </div>
  );
}

export default AddActivityPage;

import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Modal, Input } from "react-daisyui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProfile({ toggleIsEditVisible }) {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const [imageUrl, setImageUrl] = useState("");

  const { user, storeToken, authenticateUser } = useContext(AuthContext);

  const [inputs, setInputs] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [toggle, setToggle] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    setIsUploadingImage(true);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log(response.data);
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    notifyUpdate();
    toggleIsEditVisible();
    setTimeout(() => {
      const storedToken = localStorage.getItem("authToken");
      const newProfile = {
        ...inputs,
        imgProfile: imageUrl, // Assign imageUrl as a string
      };
      axios
        .put(`${API_URL}/api/users/${user._id}`, newProfile, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          storeToken(response.data.authToken);
          console.log(response.data);
          authenticateUser();
          setToggle(!toggle);
        })
        .catch((error) => {
          setErrorMessage(error);
          console.log("Error updating activity from API", error);
        });
    }, 3000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLoginSubmit(event);
    }
  };
  const notifyUpdate = () =>
    toast.success(`You updated successfully your profile`);

  return (
    <dialog id="my_modal_1" className="modal" open="visible">
      <form method="dialog" className="modal-box" onSubmit={handleLoginSubmit}>
        <div className="EditProfile">
          <button
            size="sm"
            shape="circle"
            className="absolute right-2 top-2"
            onClick={toggleIsEditVisible}
          >
            ✕
          </button>

          <Modal.Body className="flex flex-col mt-3">
            <label>firstName:</label>
            <Input
              type="text"
              name="firstName"
              borderOffset="true"
              value={inputs.firstName || ""}
              onChange={handleOnChange}
              // required={true}
              onKeyDown={handleKeyDown}
            />

            <label>lastName:</label>
            <Input
              type="text"
              name="lastName"
              value={inputs.lastName || ""}
              borderOffset="true"
              onChange={handleOnChange}
              // required={true}
              onKeyDown={handleKeyDown}
            />

            <label>Image:</label>
            <Input
              type="file"
              borderOffset="true"
              onChange={handleFileUpload}
            />

            {isUploadingImage ? (
              <button
                color="primary"
                onClick={notifyUpdate}
                className="mt-3"
                disabled
              >
                Uploading image...
              </button>
            ) : (
              <button color="primary" onClick={notifyUpdate} className="mt-3">
                Edit
              </button>
            )}
            <ToastContainer position="top-center" autoClose={2000} />
          </Modal.Body>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </form>
    </dialog>
  );
}

export default EditProfile;

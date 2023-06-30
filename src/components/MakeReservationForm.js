import axios from "axios";
import { useState } from "react";

function MakeReservationForm(props) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [numberOfPeople, setNumberOfPeople] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const newReservation = {
      activity: props._id,
      numberOfPeople,
      price: props.price,
    };

    axios
      .post(`${API_URL}/api/reservations`, newReservation, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then()
      .catch((error) => console.log("Error booking reservation", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Make a reservation</h1>

      <label>Number of participants:</label>
      <input
        value={numberOfPeople}
        type="number"
        name="numberOfPeople"
        min={1}
        onChange={(e) => {
          setNumberOfPeople(e.target.value);
        }}
        required={true}
      />
      <p>Total Price: {numberOfPeople * props.price}€</p>
      <button type="submit">submit</button>
      <br />
      <br />
    </form>
  );
}

export default MakeReservationForm;

import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MakeReservationForm(props) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [numOfPeopleReservation, setNumOfPeopleReservation] = useState("");
  const [totalParticipants, setTotalParticipants] = useState(0);
  const notify = (option) => {
    if (option === "a") {
      return toast.success(`Your reservation has been submitted!
		Check it on cart`);
    } else if (option === "b") {
      return toast.error(`there are not enough spots available`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");

    const newReservation = {
      activity: props._id,
      numberOfPeople: numOfPeopleReservation,
      price: props.price,
    };

    if (
      Number(numOfPeopleReservation) + totalParticipants >
      props.maxParticipants
    ) {
      notify("b");
      return;
    }

    axios
      .post(`${API_URL}/api/reservations`, newReservation, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        notify("a");
        getReservationParticipants();
      })
      .catch((error) => console.log("Error booking reservation", error));
  };

  const getReservationParticipants = () => {
    let participantsCount = 0;
    axios
      .get(`${API_URL}/api/reservations`)
      .then((reservationsArr) => {
        const reservationArrFiltered = reservationsArr.data.filter(
          (reservation) => {
            return reservation.activity._id === props._id;
          }
        );
        console.log(reservationArrFiltered);
        reservationArrFiltered.map((elm) => {
          return (participantsCount = participantsCount + elm.numberOfPeople);
        });

        setTotalParticipants(participantsCount);
      })
      .catch((error) =>
        console.log("Error getting reservations from API", error)
      );
  };

  useEffect(() => {
    getReservationParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1>Make a reservation</h1>
      <br />
      <h2>Spots Available: {props.maxParticipants - totalParticipants}</h2>

      <label>Number of participants:</label>
      <input
        value={numOfPeopleReservation}
        type="number"
        name="numberOfPeople"
        min={1}
        onChange={(e) => {
          setNumOfPeopleReservation(e.target.value);
        }}
        required={true}
      />
      <p>Total Price: {numOfPeopleReservation * props.price}€</p>
      <button type="submit">submit</button>
      <ToastContainer position="top-center" autoClose={2000} />
      <br />
      <br />
    </form>
  );
}

export default MakeReservationForm;

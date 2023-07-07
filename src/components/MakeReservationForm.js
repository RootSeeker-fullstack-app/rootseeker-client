import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Input } from "react-daisyui";

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
    <div className="text-left ">
      <form onSubmit={handleSubmit} className="mx-4 my-5">
        <h1 className="text-4xl underline decoration-primary">
          Make a reservation
        </h1>
        <br />
        <h2 className="text-xl">
          Spots Available: {props.maxParticipants - totalParticipants}
        </h2>

        <label className="text-xl">Number of participants:</label>
        <Input
          borderOffset
          value={numOfPeopleReservation}
          type="number"
          name="numberOfPeople"
          min={1}
          onChange={(e) => {
            setNumOfPeopleReservation(e.target.value);
          }}
          required={true}
        />
        <p className="text-xl underline decoration-primary">
          Total Price: {numOfPeopleReservation * props.price}€
        </p>
        <Button color="primary" type="submit">
          submit
        </Button>
        <ToastContainer position="top-center" autoClose={2000} />
        <br />
        <br />
      </form>
    </div>
  );
}

export default MakeReservationForm;

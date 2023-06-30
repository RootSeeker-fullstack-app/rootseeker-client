import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";


function MakeReservationForm() {
    const [ numberOfParticipants, setNumberOfParticipants] = useState('')

    const { user } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
      <h1>Make a reservation</h1>

      <label>Number of participants:</label>
      <input
        value={numberOfParticipants}
        type="number"
        name="name"
        min={1}
        onChange={(e) => {
          setNumberOfParticipants(e.target.value);
        }}
        required={true}
      />
      </form>
    )

}

export default MakeReservationForm;
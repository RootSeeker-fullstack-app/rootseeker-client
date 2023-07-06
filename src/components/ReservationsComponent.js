import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function ReservationsComponent(props) {
	return (
		<>
			<div>
				<div className="my-4 text-left shadow-xl card bg-primary">
					<div className="card-body">
						<h2 className="card-title">{props.reservation.activity.name}</h2>
						<p>Date 📅: {props.reservation.activity.date.slice(0, 10)}</p>
						<h3>Participants 👩🏾‍🤝‍🧑: {props.reservation.numberOfPeople}</h3>
						<h3>Total price 💰: {props.reservation.totalPrice}</h3>
					</div>
				</div>
				<h3></h3>
				<h3></h3>
			</div>
		</>
	);
}

export default ReservationsComponent;

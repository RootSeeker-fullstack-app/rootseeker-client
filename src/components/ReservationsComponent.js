import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = process.env.REACT_APP_API_URL;

function ReservationsComponent(props) {
    
  return (
    <>
      <div>
        <h3>{props.reservation.activity.name}</h3>
        <h3>Activity date: {props.reservation.activity.date.slice(0, 10)}</h3>
        <h3>Number of people: {props.reservation.numberOfPeople}</h3>
        <h3>Total price: {props.reservation.totalPrice}</h3>
      </div>
    </>
  );
}

export default ReservationsComponent;

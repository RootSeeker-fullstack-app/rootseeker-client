import { Link } from "react-router-dom";
import { Card, Button, Divider } from "react-daisyui";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ActivityCard(props) {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Card className="my-2 shadow-xl ActivityCard card lg:card-side bg-base-100">
        <div className="lg:w-80">
          <img
            className="object-cover w-full lg:h-full "
            src={props.images[0]}
            alt="image"
          />
        </div>

        <Card.Body className="text-left card-body">
          <Link to={`/activities/${props._id}`}>
            <Card.Title className="text-2xl card-title">
              {props.name}
            </Card.Title>
          </Link>
          <p>Description: {props.description} </p>
          <br />
          <div className="gap-2 lg:grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2">
            <p>⌚: {props.duration}min </p>
            <p>📅: {props.date.slice(0, 10)} </p>
            <p>💰: {props.price}€ </p>
            <p>👩🏾‍🤝‍🧑: {props.maxParticipants} </p>
            <p className="font-bold">Category: {props.category} </p>
            {user ? (
              <Link to={`/profile/${props.user.username}`}>
                <p className="font-bold">Host: {props.user.username} </p>
              </Link>
            ) : (
              <p>Host: {props.user.username} </p>
            )}
          </div>

          <Link to={`/activities/${props._id}`}>
            <Card.Actions className="justify-end card-actions">
              <Button className="btn btn-primary">More details</Button>
            </Card.Actions>
          </Link>
        </Card.Body>
      </Card>
      <Divider></Divider>
    </>
  );
}

export default ActivityCard;

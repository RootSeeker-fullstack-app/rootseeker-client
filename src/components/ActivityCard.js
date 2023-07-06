import { Link } from "react-router-dom";
import { Card, Button, Divider } from "react-daisyui";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function ActivityCard(props) {
	const { user } = useContext(AuthContext);
	return (
		<>
			<Card className="my-2 shadow-xl ActivityCard card lg:card-side">
				<div className="lg:w-80">
					<img
						className="object-cover w-full lg:h-full "
						src={props.images[0]}
						alt="image"
					/>
				</div>

				<Card.Body className="card-body">
					<Link to={`/activities/${props._id}`}>
						<Card.Title className="card-title">{props.name}</Card.Title>
					</Link>
					<p>Description: {props.description} </p>
					<p>Duration: {props.duration}min </p>
					<p>Activity date: {props.date.slice(0, 10)} </p>
					<p>Price per adult: {props.price}€ </p>
					<p>Max. Participants: {props.maxParticipants} </p>
					<p>Category: {props.category} </p>
					{user ? (
						<Link to={`/profile/${props.user.username}`}>
							<p>Host: {props.user.username} </p>
						</Link>
					) : (
						<p>Host: {props.user.username} </p>
					)}
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

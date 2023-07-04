import { Link } from "react-router-dom";
import { Card, Button, Divider } from "react-daisyui";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import FooterCard from "./FooterCard";

function ActivityCard(props) {
	const { user } = useContext(AuthContext);
	return (
		<>
			<Card className="my-2 bg-gray-200 shadow-xl ActivityCard card lg:card-side">
				<Card.Image
					src={props.images[0]}
					alt="image"
					style={{ maxWidth: "300px" }}
				/>
				<Card.Body className="card-body">
					<Link to={`/activities/${props._id}`}>
						<Card.Title className="card-title">{props.name}</Card.Title>
					</Link>
					<p>{props.description} </p>
					<p>{props.duration} </p>
					<p>{props.availabe} </p>
					<p>{props.date.slice(0, 10)} </p>
					<p>{props.price} </p>
					{user ? (
						<Link to={`/profile/${props.user.username}`}>
							<p>{props.user.username} </p>
						</Link>
					) : (
						<p>{props.user.username} </p>
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

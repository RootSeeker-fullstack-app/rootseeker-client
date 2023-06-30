import { Link } from "react-router-dom";
import { Card, Button, Divider } from "react-daisyui";

function ActivityCard(props) {
	return (
		<container>
			<Card className="w-2/5 my-2 bg-gray-200 shadow-xl ActivityCard card lg:card-side">
				<Card.Image
					src={props.images}
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
					<p>{props.date} </p>
					<p>{props.price} </p>
					<p>{props.user.username} </p>
					<Card.Actions className="justify-end card-actions">
						<Button className="btn btn-primary">Make a reservation</Button>
					</Card.Actions>
				</Card.Body>
			</Card>
		</container>
	);
}

export default ActivityCard;

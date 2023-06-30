import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ActivityCard({
	// user,
	name,
	_id,
	description,
	duration,
	images,
	availabe,
	date,
	price,
	user,
}) {
	return (
		<div className="ActivityCard card">
			<Link to={`/activities/${_id}`}>
				<h3>{name}</h3>
			</Link>
			<p style={{ maxWidth: "400px" }}>{description} </p>
			<p style={{ maxWidth: "400px" }}>{duration} </p>
			<p style={{ maxWidth: "400px" }}>{images} </p>
			<p style={{ maxWidth: "400px" }}>{availabe} </p>
			<p style={{ maxWidth: "400px" }}>{date} </p>
			<p style={{ maxWidth: "400px" }}>{price} </p>
			<p style={{ maxWidth: "400px" }}>{user.username} </p>
		</div>
	);
}

export default ActivityCard;

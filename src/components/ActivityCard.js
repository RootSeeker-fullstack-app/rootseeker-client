import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function ActivityCard(
	props

	//   {
	// 	// user,
	// 	name,
	// 	_id,
	// 	description,
	// 	duration,
	// 	images,
	// 	availabe,
	// 	date,
	// 	price,
	// 	user,
	// }
) {
	console.log(props);
	return (
		<div className="ActivityCard card">
			<Link to={`/activities/${props._id}`}>
				<h3>{props.name}</h3>
			</Link>
			<p style={{ maxWidth: "400px" }}>{props.description} </p>
			<p style={{ maxWidth: "400px" }}>{props.duration} </p>
			<p style={{ maxWidth: "400px" }}>{props.images} </p>
			<p style={{ maxWidth: "400px" }}>{props.availabe} </p>
			<p style={{ maxWidth: "400px" }}>{props.date} </p>
			<p style={{ maxWidth: "400px" }}>{props.price} </p>
			<p style={{ maxWidth: "400px" }}>{props.user.username} </p>
		</div>
	);
}

export default ActivityCard;

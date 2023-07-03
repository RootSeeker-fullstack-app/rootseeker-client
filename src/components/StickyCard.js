import { useSpring, animated } from "@react-spring/web";
// import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function HomeCard() {
	const springs = useSpring({
		from: { x: "-800%" },
		to: { x: "120%" },
	});

	return (
		<animated.div
			style={{
				width: 20 + "rem",
				height: 20 + "rem",
				// background: "#ff6d6d",
				borderRadius: 8,
				...springs,
			}}
		>
			<div className="card w-96 bg-neutral text-neutral-content">
				<div className="items-center text-center card-body">
					<h2 className="card-title">
						With RootSeeker you can track activities all over the World
					</h2>
					<p>
						With Rootseeker you can meet new people and find cool outdoor
						activities in your city or in the nature nearby
					</p>
					<div className="justify-end card-actions">
						<h1>Track activities now</h1>

						<Button color="ghost" className="btn-xs">
							Activities
						</Button>
					</div>
				</div>
			</div>
		</animated.div>
	);
}

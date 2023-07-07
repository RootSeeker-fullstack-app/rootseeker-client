import { Button } from "react-daisyui";
import { Link } from "react-router-dom";
export default function StickySmall() {
	return (
		<div
			className="h-auto text-black lg:h-screen hero"
			style={{ backgroundColor: "#F2BE22" }}
		>
			<div className="flex flex-col justify-center w-3/5 hero-content lg:flex-row">
				<div className="">
					<h1 className="text-3xl lg:p-4 lg:text-8xl">
						With RootSeeker you can track activities all over the World
					</h1>
					<p>
						With Rootseeker you can meet new people and find cool outdoor
						activities in your city or in the nature nearby
					</p>
					<div className="justify-end p-5 card-actions">
						<h1>Track activities now</h1>
						<Link to={"/activities"}>
							<Button color="primary" className="btn-xs">
								Activities
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

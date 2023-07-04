import { useState, useEffect } from "react";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import Search from "../components/SearchBarComp";
import FooterCard from "../components/FooterCard";

export default function ActivityListPage() {
	const [activities, setActivities] = useState(null);

	const API_URL = process.env.REACT_APP_API_URL;

	const getAllActivities = () => {
		axios
			.get(`${API_URL}/api/activities`)
			.then((respone) => {
				setActivities(respone.data);
			})
			.catch((e) => console.log(e));
	};

  useEffect(() => {
    getAllActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

	return (
		<div>
			<div className="flex flex-row">
				<div className="basis-1/4"></div>
				<div className="flex flex-row ActivityListPage basis-1/2">
					<div className="basis-1/3">this is the categories</div>
					<div className="basis-2/3">
						<div>
							<div className="">
								<Search />
							</div>
							<div>
								{!activities ? (
									<p>loading...</p>
								) : (
									activities.map((activity) => (
										<ActivityCard key={activity._id} {...activity} />
									))
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="basis-1/4"></div>
			</div>
			<FooterCard />
		</div>
	);
}

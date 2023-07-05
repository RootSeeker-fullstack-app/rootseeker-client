import { useState, useEffect } from "react";
import { Button } from "react-daisyui";
import axios from "axios";
import ActivityCard from "../components/ActivityCard";
import Search from "../components/SearchBarComp";
import FooterCard from "../components/FooterCard";

export default function ActivityListPage() {
  const [activities, setActivities] = useState(null);
  const [activitiesFiltered, setActivitiesFiltered] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const getAllActivities = () => {
    axios
      .get(`${API_URL}/api/activities`)
      .then((response) => {
        setActivities(response.data);
        setActivitiesFiltered(response.data);
      })
      .catch((e) => console.log(e));
  };

  const filterByCategory = (category) => {
    switch (category) {
      case "Land":
        const filteredByLand = activities.filter((activity) => {
          return activity.category === "Land";
        });
        setActivitiesFiltered(filteredByLand);
        break;
      case "Water":
        const filteredByWater = activities.filter((activity) => {
          return activity.category === "Water";
        });
        setActivitiesFiltered(filteredByWater);
        break;
      case "Cultural":
        const filteredByCultural = activities.filter((activity) => {
          return activity.category === "Cultural";
        });
        setActivitiesFiltered(filteredByCultural);
        break;
      case "Sky":
        const filteredBySky = activities.filter((activity) => {
          return activity.category === "Sky";
        });
        setActivitiesFiltered(filteredBySky);
        break;
      case "All":
        setActivitiesFiltered(activities);
        break;
    }
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
          {!activities ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            <>
              <div className="basis-1/3">
                <h1>Filter activities by category</h1>
                <Button
                  className="btn btn-primary"
                  onClick={() => filterByCategory("Land")}
                >
                  Land
                </Button>
                <br />
                <br />
                <Button
                  className="btn btn-primary"
                  onClick={() => filterByCategory("Water")}
                >
                  Water
                </Button>
                <br />
                <br />
                <Button
                  className="btn btn-primary"
                  onClick={() => filterByCategory("Sky")}
                >
                  Sky
                </Button>
                <br />
                <br />
                <Button
                  className="btn btn-primary"
                  onClick={() => filterByCategory("Cultural")}
                >
                  Cultural
                </Button>
                <br />
                <br />
                <Button
                  className="btn btn-primary"
                  onClick={() => filterByCategory("All")}
                >
                  All
                </Button>
              </div>
            </>
          )}

          <div className="basis-2/3">
            <div>
              <div className="">
                <Search />
              </div>
              <div>
                {!activitiesFiltered ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  activitiesFiltered.map((activity) => (
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

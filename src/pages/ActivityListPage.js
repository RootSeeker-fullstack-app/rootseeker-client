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
      <div className="flex flex-col min-h-screen lg:flex-row lg:flex ">
        <div className="flex flex-col items-center basis-1/3">
          {!activities ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            <>
              <div className="flex flex-col items-center w-4/5 my-5 basis-1/3 ">
                <div className="relative flex flex-row">
                  <h1 className="mx-4 my-12 text-5xl text-left underline decoration-primary">
                    Mood
                  </h1>
                  <div className="rotate-45 text-8xl">?</div>
                  <span className="absolute top-[-30px] left-[-60px] -rotate-45 text-8xl">
                    ?
                  </span>
                  <span className="absolute bottom-[-100px] left-[-80px] -rotate-45 text-8xl">
                    ?
                  </span>
                  <span className="absolute bottom-[-200px] left-[200px] rotate-45 text-8xl">
                    ?
                  </span>
                </div>
                <div className="grid w-1/3">
                  <Button
                    className="btn btn-primary"
                    onClick={() => filterByCategory("Land")}
                  >
                    🌄 Land
                  </Button>

                  <br />
                  <br />
                  <Button
                    className="btn btn-primary"
                    onClick={() => filterByCategory("Water")}
                  >
                    🏄‍♀️ Water
                  </Button>
                  <br />
                  <br />
                  <Button
                    className="btn btn-primary"
                    onClick={() => filterByCategory("Sky")}
                  >
                    🪂 Sky
                  </Button>
                  <br />
                  <br />
                  <Button
                    className="btn btn-primary"
                    onClick={() => filterByCategory("Cultural")}
                  >
                    🗿 Cultural
                  </Button>
                  <br />
                  <br />
                  <Button
                    className="btn btn-primary"
                    onClick={() => filterByCategory("All")}
                  >
                    🐱‍👤 All
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col ActivityListPage basis-2/3">
          <div className=" lg:w-4/5">
            <div className="my-4">
              <Search />
            </div>
            <div className="mx-3">
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
      <FooterCard />
    </div>
  );
}

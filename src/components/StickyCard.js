import { useSpring, animated } from "@react-spring/web";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";

export default function HomeCard() {
  const springs = useSpring({
    from: { x: "-800%" },
    to: { x: "50%" },
  });

  return (
    <animated.div
      style={{
        width: 40 + "rem",
        height: 40 + "rem",
        // background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    >
      <div className="text-gray-800  w-auto  lg:w-auto left-[-190px] lg:left-[120px] lg:bg-transparent">
        <div className="items-center text-center card-body">
          <h2 className="text-4xl text-left lg:p-4 lg:text-5xl card-title">
            With RootSeeker you can track activities all over the World
          </h2>
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
    </animated.div>
  );
}

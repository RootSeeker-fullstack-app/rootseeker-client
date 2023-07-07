import { useSpring, animated } from "@react-spring/web";
// import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";

export default function HostCard() {
  const springs = useSpring({
    from: { x: "-800%" },
    to: { x: "80%" },
  });

  return (
    <animated.div
      style={{
        width: 40 + "rem",
        height: 20 + "rem",
        // background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    >
      <div className="text-gray-800 card w-96">
        <div className="relative items-center text-center card-body">
          <h2 className="text-5xl text-right card-title">Become a host</h2>
          <p className="my-4 text-2xl">
            You can be a from a tourist guide or a dive instructor to a game
            maker. <br /> <br />
            Now you have the oportunity to make your dream job come true
          </p>
          <div className="z-30 justify-end card-actions"></div>
        </div>
      </div>
    </animated.div>
  );
}

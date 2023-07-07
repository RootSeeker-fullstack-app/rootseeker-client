import { useSpring, animated } from "@react-spring/web";

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
        background: "#ff6d6d",
        borderRadius: 8,
        ...springs,
      }}
    ></animated.div>
  );
}

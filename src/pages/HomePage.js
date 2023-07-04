// import { Parallax, ParallaxLayer } from "@react-spring/parallax";

// import SearchBarComp from "../components/SearchBarComp";
// import WelcomeCard from "../components/WelcomeCard";
// import StickyCard from "../components/StickyCard";
// import ChooseCard from "../components/ChooseCard";
// import FooterCard from "../components/FooterCard";

export default function HomePage() {
	// const alignCenter = { display: "flex", alignItems: "center" };
	return (
		<div className="flex justify-center">
			{/* <div className="justify-center w-1/2 ">
				<SearchBarComp />
			</div>
			<div />

			<Parallax pages={5}>
				<ParallaxLayer
					offset={0}
					style={{
						...alignCenter,
						justifyContent: "center",
						top: "100px",
						left: "0",
					}}
					speed={0.5}
				>
					<WelcomeCard />
				</ParallaxLayer>

				<ParallaxLayer
					className=""
					sticky={{ start: 1, end: 3 }}
					style={{ ...alignCenter, justifyContent: "flex-start" }}
				>
					<div>
						<StickyCard />
					</div>
				</ParallaxLayer>

				<ParallaxLayer
					className="right-0"
					offset={1.5}
					speed={1.5}
					style={{ ...alignCenter, justifyContent: "center" }}
				>
					<div>
						<ChooseCard />
					</div>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2.5}
					speed={1.5}
					style={{ ...alignCenter, justifyContent: "center" }}
				>
					<div>
						<ChooseCard />
					</div>
				</ParallaxLayer>
				<ParallaxLayer
					sticky={{ start: 3.5, end: 5 }}
					style={{ ...alignCenter, justifyContent: "center" }}
				>
					<div className="w-11/12 h-72">
						<FooterCard />
					</div>
				</ParallaxLayer>
			</Parallax> */}
		</div>
	);
}

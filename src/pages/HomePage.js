import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import SearchBarComp from "../components/SearchBarComp";
import WelcomeCard from "../components/WelcomeCard";
import StickyCard from "../components/StickyCard";
import ChooseCard from "../components/HostCard";
import FooterCard from "../components/FooterCard";
import HostCard from "../components/ChooseCard";

export default function HomePage() {
	const alignCenter = { display: "flex", alignItems: "center" };
	const url =
		"https://images.pexels.com/photos/17201962/pexels-photo-17201962/free-photo-of-landscape-sunset-field-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
	return (
		<div className="flex justify-center">
			<div className="z-40 justify-center w-1/2 ">
				<SearchBarComp />
			</div>

			<Parallax pages={5}>
				<ParallaxLayer
					className="z-30"
					offset={0}
					style={{
						...alignCenter,
						justifyContent: "center",
					}}
					speed={0.5}
				>
					<WelcomeCard />
				</ParallaxLayer>
				<ParallaxLayer
					sticky={{ start: 1, end: 3 }}
					style={{
						...alignCenter,
						justifyContent: "flex-start",
					}}
				>
					<StickyCard />
				</ParallaxLayer>
				<ParallaxLayer
					offset={0.5}
					factor={4.5}
					style={{
						// backgroundImage: `url(https://images.pexels.com/photos/17201962/pexels-photo-17201962/free-photo-of-landscape-sunset-field-summer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
						backgroundSize: "contain",
						backgroundColor: "#F2BE22",
					}}
				>
					<ParallaxLayer
						className="right-0"
						offset={1.5}
						speed={1.5}
						style={{
							...alignCenter,
							justifyContent: "center",
							zIndex: 2,
						}}
					>
						<ChooseCard />
					</ParallaxLayer>

					<ParallaxLayer
						offset={2.5}
						speed={1.5}
						style={{
							...alignCenter,
							justifyContent: "center",
							zIndex: 30,
						}}
					>
						<HostCard />
					</ParallaxLayer>
				</ParallaxLayer>

				<ParallaxLayer
					offset={4}
					style={{
						...alignCenter,
						justifyContent: "center",
						backgroundColor: "#F29727",
					}}
				>
					<div className="flex flex-col min-h-screen">
						<div className="flex-grow"></div>

						<FooterCard className="flex flex-col max-w-screen flex-end" />
					</div>
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

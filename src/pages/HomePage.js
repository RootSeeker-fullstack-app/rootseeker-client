import { Parallax, ParallaxLayer } from "@react-spring/parallax";

import SearchBarComp from "../components/SearchBarComp";
import WelcomeCard from "../components/WelcomeCard";
import StickyCard from "../components/StickyCard";
import ChooseCard from "../components/ChooseCard";
import FooterCard from "../components/FooterCard";

export default function HomePage() {
	const alignCenter = { display: "flex", alignItems: "center" };
	return (
		<div className="flex justify-center">
			<div className="z-40 justify-center w-1/2 ">
				<SearchBarComp />
			</div>
			<div />

			<Parallax pages={5}>
				<ParallaxLayer
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
					offset={4}
					style={{ ...alignCenter, justifyContent: "center" }}
				>
					<div class="min-h-screen flex flex-col">
						<div class="flex-grow"></div>

						<FooterCard className="flex flex-col max-w-screen flex-end" />
					</div>
				</ParallaxLayer>
			</Parallax>
		</div>
	);
}

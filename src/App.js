import { Route, Routes } from "react-router-dom";
import "./App.css";

import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import AddActivityPage from "./pages/AddActivityPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditActivityPage from "./pages/EditActivityPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { Theme, useTheme } from "react-daisyui";
import LoginP from "./pages/LoginP";
import SignupP from "./pages/SignupP";
import { useEffect, useState } from "react";

function App() {
	const [theme, setTheme] = useState("light");

	const handleTheme = (banana) => {
		switch (banana) {
			case "dark":
				setTheme("dark");
				break;
			case "cupcake":
				setTheme("cupcake");
				break;
			case "bumblebee":
				setTheme("bumblebee");
				break;
			case "emerald":
				setTheme("emerald");
				break;
			case "corporate":
				setTheme("corporate");
				break;
			case "synthwave":
				setTheme("synthwave");
				break;
			case "retro":
				setTheme("retro");
				break;
			case "cyberpunk":
				setTheme("cyberpunk");
				break;
			case "valentine":
				setTheme("valentine");
				break;
			case "halloween":
				setTheme("halloween");
				break;
			case "garden":
				setTheme("garden");
				break;
			case "forest":
				setTheme("forest");
				break;
			case "aqua":
				setTheme("aqua");
				break;
			case "lofi":
				setTheme("lofi");
				break;
			case "pastel":
				setTheme("pastel");
				break;
			case "fantasy":
				setTheme("fantasy");
				break;
			case "wireframe":
				setTheme("wireframe");
				break;
			case "black":
				setTheme("black");
				break;
			case "luxury":
				setTheme("luxury");
				break;
			case "dracula":
				setTheme("dracula");
				break;
			case "cmyk":
				setTheme("cmyk");
				break;
			case "autumn":
				setTheme("autumn");
				break;
			case "business":
				setTheme("business");
				break;
			case "acid":
				setTheme("acid");
				break;
			case "lemonade":
				setTheme("lemonade");
				break;
			case "night":
				setTheme("night");
				break;
			case "coffee":
				setTheme("coffee");
				break;
			case "winter":
				setTheme("winter");
				break;
			default:
				setTheme("light");
				break;
		}
	};

	return (
		<Theme dataTheme={theme}>
			<div className="App">
				<NavBarComponent handleTheme={handleTheme} />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/signup"
						element={
							<IsAnon>
								<SignupP />
							</IsAnon>
						}
					/>
					<Route
						path="/login"
						element={
							<IsAnon>
								<LoginP />
							</IsAnon>
						}
					/>
					<Route
						path="/activities"
						element={
							<IsAnon>
								<ActivityListPage />
							</IsAnon>
						}
					/>
					<Route
						path="/activities/edit/:activityId"
						element={
							<IsPrivate>
								<EditActivityPage />
							</IsPrivate>
						}
					/>
					<Route
						path="/activities/:activityId"
						element={
							<IsAnon>
								<ActivityDetailsPage />
							</IsAnon>
						}
					/>
					<Route
						path="/activities/create"
						element={
							<IsPrivate>
								<AddActivityPage />
							</IsPrivate>
						}
					/>
					<Route
						path="/profile/:username"
						element={
							<IsPrivate>
								<UserProfilePage />
							</IsPrivate>
						}
					/>
				</Routes>
			</div>
		</Theme>
	);
}

export default App;

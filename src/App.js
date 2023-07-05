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
		if (banana === "dark") {
			setTheme("dark");
			console.log(theme);
		} else if (banana === "aqua") {
			setTheme("aqua");
			console.log(theme);
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

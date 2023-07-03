import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import NavBarComponent from "./components/NavBarComponent";
import HomePage from "./pages/HomePage";
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import AddActivityPage from "./pages/AddActivityPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditActivityPage from "./pages/EditActivityPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";
import { Theme } from "react-daisyui";

function App() {
	return (
		<Theme dataTheme="light">
			<div className="App">
				<NavBarComponent />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
					<Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
					<Route path="/activities" element={<IsAnon><ActivityListPage /></IsAnon>} />
					<Route path="/activities/edit/:activityId" element={<IsPrivate><EditActivityPage /></IsPrivate>} />
					<Route
						path="/activities/:activityId"
						element={<IsAnon><ActivityDetailsPage /></IsAnon>}
					/>
					<Route path="/activities/create" element={<IsPrivate><AddActivityPage /></IsPrivate>} />
					<Route path="/profile/:username" element={<IsPrivate><UserProfilePage /></IsPrivate>} />
				</Routes>
			</div>
		</Theme>
	);
}

export default App;

import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ActivityListPage from "./pages/ActivityListPage";
import ActivityDetailsPage from "./pages/ActivityDetailsPage";
import AddActivityPage from "./pages/AddActivityPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/activities" element={<ActivityListPage />} />
				<Route
					path="/activities/:activityId"
					element={<ActivityDetailsPage />}
				/>
				<Route path="/activities/create" element={<AddActivityPage />} />
				<Route path="/profile/:username" element={<UserProfilePage />} />
			</Routes>

			<h1 className="text-3xl font-bold underline">Hello world!</h1>
		</div>
	);
}

export default App;

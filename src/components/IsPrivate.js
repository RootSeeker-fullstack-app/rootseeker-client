import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
	const { isLoggedIn, isLoading } = useContext(AuthContext);

	// If the authentication is still loading
	if (isLoading) return <span className="loading loading-ring loading-md"></span>;

	if (!isLoggedIn) {
		// If the user is not logged in
		console.log("this is the problem");
		return <Navigate to="/" />;
	} else {
		// If the user is logged in, allow to see the page
		return children;
	}
}

export default IsPrivate;

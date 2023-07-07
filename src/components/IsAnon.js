import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading)
    return <span className="loading loading-ring loading-md"></span>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the home page
    return children;
  } else {
    // If the user is not logged in, allow to see the page
    return children;
  }
}

export default IsAnon;

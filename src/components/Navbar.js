import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
	return (
		<nav>
			<Link to="/">
				<button>Home</button>
			</Link>
			<Link to="/activities">
				<button>Activities</button>
			</Link>
			{isLoggedIn && (
				<>
					<button onClick={logOutUser}>Logout</button>

					<Link to={`/profile/${user.username}`}>{user && user.username}</Link>
				</>
			)}

			{!isLoggedIn && (
				<>
					<Link to="/signup">
						<button>Sign Up</button>
					</Link>
					<Link to="/login">
						<button>Login</button>
					</Link>
				</>
			)}
		</nav>
	);
}

export default Navbar;

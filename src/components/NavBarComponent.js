import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import {
	Button,
	Dropdown,
	Navbar,
	Indicator,
	Card,
	Badge,
} from "react-daisyui";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ReservationsComponent from "./ReservationsComponent";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function NavBarComponent(props) {
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

	const [isSignupVisible, setIsSignupVisible] = useState(false);
	const [isLoginVisible, setIsLoginVisible] = useState(false);
	const [reservations, setReservations] = useState([]);

	const getReservations = () => {
		axios
			.get(`${API_URL}/api/reservations`)
			.then((reservationsArr) => {
				const filteredArr = reservationsArr.data.filter((reservation) => {
					return reservation.user?._id === user?._id;
				});
				setReservations(filteredArr);
			})
			.catch((error) =>
				console.log("Error getting reservations from API", error)
			);
	};

	useEffect(() => {
		getReservations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const toggleIsSignupVisible = () => {
		setIsSignupVisible(!isSignupVisible);
	};

	const toggleIsLoginVisible = () => {
		setIsLoginVisible(!isLoginVisible);
	};
	const themes = [
		"light",
		"dark",
		"cupcake",
		"bumblebee",
		"emerald",
		"corporate",
		"synthwave",
		"retro",
		"cyberpunk",
		"valentine",
		"halloween",
		"garden",
		"forest",
		"aqua",
		"lofi",
		"pastel",
		"fantasy",
		"wireframe",
		"black",
		"luxury",
		"dracula",
		"cmyk",
		"autumn",
		"business",
		"acid",
		"lemonade",
		"night",
		"coffee",
		"winter",
	];

	return (
		<div className="z-40 flex items-center justify-center w-full gap-2 p-4 pb-0 font-sans component-preview ">
			<Navbar className="z-40">
				<Navbar.Start>
					<h3>Logo</h3>
					<h3>
						<strong>RootSeeker</strong>
					</h3>
					<Link to="/">
						<Button color="ghost" className="btn-xs">
							home
						</Button>
					</Link>
					<Link to="/activities">
						<Button color="ghost" className="btn-xs">
							Activities
						</Button>
					</Link>
					{isLoggedIn && (
						<Link to={"/activities/create"}>
							<Button color="ghost" className="btn-xs">
								Become a Host
							</Button>
						</Link>
					)}
				</Navbar.Start>
				<Navbar.End>
					<div className="primary-content dropdown ">
						<label tabIndex={0} className="m-1 btn">
							Theme
						</label>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52"
						>
							{themes.map((theme, index) => {
								return (
									<div className="primary-content">
										<li>
											<p
												onClick={() => {
													props.handleTheme(`${theme}`);
												}}
											>
												{theme}
											</p>
										</li>
									</div>
								);
							})}
						</ul>
					</div>
					<div className="z-40 flex-none">
						{isLoggedIn && (
							<>
								<Dropdown vertical="end">
									<strong>{user && user.username}</strong>
									<Button
										color="primary"
										className="avatar bg-cyan-50"
										shape="circle"
									>
										<div className="w-10 rounded-full">
											<img
												src={
													user.imgProfile
														? user.imgProfile
														: "https://api.lorem.space/image/face?hash=33791"
												}
												alt="imageasd"
											/>
										</div>
									</Button>
									<Dropdown.Menu className="z-40 mt-3 w-52 menu-compact right-8">
										<li>
											<Link to={`/profile/${user.username}`}>Profile</Link>
										</li>
										<Dropdown.Item>Settings</Dropdown.Item>
										<Dropdown.Item>
											<Link onClick={logOutUser}>Logout</Link>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						)}
					</div>

					{!isLoggedIn && (
						<>
							<Button
								onClick={toggleIsSignupVisible}
								color="ghost"
								variant="outline"
								className="btn-xs"
							>
								Sign Up
							</Button>

							<>
								<Button
									color="ghost"
									className="btn-xs"
									onClick={toggleIsLoginVisible}
								>
									Login
								</Button>
							</>
						</>
					)}

					{/* {THIS IS GOING TO BE A COMPONENT} */}
					<Dropdown vertical="end">
						<div tabIndex={0} className="z-40 drawer drawer-end drawer-overlay">
							<input
								id="my-drawer-4"
								type="checkbox"
								className="drawer-toggle"
							/>
							<div className="drawer-content">
								{/* Page content here */}
								<label
									htmlFor="my-drawer-4"
									shape="circle"
									className="p-5 m-3 drawer-button"
								>
									<Indicator>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											onClick={getReservations}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
									</Indicator>
									<span className="z-30 badge" size="sm">
										{reservations?.length}
									</span>
								</label>
							</div>
							<div className="drawer-side">
								<label htmlFor="my-drawer-4" className="drawer-overlay"></label>
								<div className="h-full p-4 menu w-80 ">
									{/* Sidebar content here */}
									<Card.Body className="card-body">
										<>
											<h2>RESERVATIONS:</h2>
											{reservations.length === 0 && (
												<>
													<p>No booked activities</p>
													<Link to={"/activities"}>Check out activities!</Link>
												</>
											)}
											{!reservations ? (
												<p>Loading...</p>
											) : (
												<div>
													{reservations.map((reservation) => {
														return (
															<div key={reservation._id}>
																<ReservationsComponent
																	reservation={reservation}
																/>
																<hr />
															</div>
														);
													})}
												</div>
											)}
										</>
									</Card.Body>
								</div>
							</div>
						</div>
					</Dropdown>

					{/* {THIS IS GOING TO BE A COMPONENT} */}
				</Navbar.End>
			</Navbar>

			{isSignupVisible && (
				<SignupPage
					toggleIsSignupVisible={toggleIsSignupVisible}
					toggleIsLoginVisible={toggleIsLoginVisible}
				/>
			)}
			{isLoginVisible && (
				<LoginPage
					toggleIsLoginVisible={toggleIsLoginVisible}
					toggleIsSignupVisible={toggleIsSignupVisible}
				/>
			)}
		</div>
	);
}

export default NavBarComponent;

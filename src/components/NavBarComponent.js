import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Button, Dropdown, Navbar, Indicator, Card } from "react-daisyui";
import SignupPage from "../pages/SignupPage";
import LoginPage from "../pages/LoginPage";
import ReservationsComponent from "./ReservationsComponent";
import axios from "axios";
import Search from "./SearchBarComp";

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
		<div className="z-[1000] items-center justify-center w-full gap-2 p-4 pb-0 font-sans lg:items-center lg:justify-center lg:flex component-preview">
			<Navbar className="z-[1000] shadow-xl navbar bg-base-100 rounded-box items-center burger">
				<Navbar.Start className="dropdown">
					<div className="text-left">
						<Button tabIndex={0} className=" btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</Button>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-base-100 text-left rounded-box w-52 lg:hidden"
					>
						<Link to={"/"}>
							<img
								src="https://res.cloudinary.com/dcslof4ax/image/upload/v1688686997/rootseeker-gallery/hygql6wxlswbuauyysaj.png"
								alt="rootseeker logo"
							/>
							<h3>
								<strong>RootSeeker</strong>
							</h3>
						</Link>
						<Link to="/activities">
							<Button color="primary" className="mx-2 my-4 btn-xs">
								<p>Activities</p>
							</Button>
						</Link>

						{isLoggedIn && (
							<Link to={"/activities/create"}>
								<Button color="primary" className="btn-xs">
									Become a Host
								</Button>
							</Link>
						)}
					</ul>
					<div className="hidden navbar-start lg:flex ">
						<div>
							<Link className="flex flex-row items-center mx-2" to={"/"}>
								<img
									className="w-10 h-10"
									src="https://res.cloudinary.com/dcslof4ax/image/upload/v1688687634/rootseeker-gallery/pll9z8ui5busttl3a0iu.png"
									alt="rootseeker logo"
								/>

								<h5 className="inline ml-2 text-xl font-bold underline decoration-primary">
									RootSeeker
								</h5>
							</Link>
						</div>
						<Link to="/activities">
							<Button color="primary" className="mx-2 btn-xs ">
								Activities
							</Button>
						</Link>
						{isLoggedIn && (
							<Link to={"/activities/create"}>
								<Button color="primary" className="btn-xs">
									Become a Host
								</Button>
							</Link>
						)}
					</div>
				</Navbar.Start>

				<Navbar.End className="flex flex-end">
					<Dropdown className="dropdown dropdown-end">
						<Button
							color="primary"
							tabIndex={0}
							className="z-50 m-1 btn-xs lg:mr-3"
						>
							Theme
						</Button>
						<ul
							tabIndex={0}
							className="dropdown-content z-[1000]  menu p-2 shadow bg-base-100 rounded-box left-2 w-52 "
						>
							{themes.map((theme, index) => {
								return (
									<Dropdown.Item
										className="z-auto"
										key={index}
										onClick={() => {
											props.handleTheme(theme);
										}}
									>
										{theme}
									</Dropdown.Item>
								);
							})}
						</ul>
					</Dropdown>
					<div className="z-40">
						{isLoggedIn && (
							<>
								<Dropdown vertical="end">
									<h1>
										<strong>{user && user.username}</strong>
									</h1>
									<Button
										color="primary"
										className=" avatar bg-cyan-50"
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
									<Dropdown.Menu className="z-[1000]  mt-3 w-52 menu-compact right-3 lg:right-8">
										<Link to={`/profile/${user.username}`}>
											<Dropdown.Item>Profile</Dropdown.Item>
										</Link>
										<Link to={"/activities/create"}>
											<Dropdown.Item>Create activity</Dropdown.Item>
										</Link>
										<Link onClick={logOutUser}>
											<Dropdown.Item>Logout</Dropdown.Item>
										</Link>
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
					<Dropdown vertical="end" className="z-[1000]">
						<div
							tabIndex={0}
							className="z-[1000]  drawer drawer-end drawer-overlay"
						>
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
									<span className="z-[1000]  badge" size="sm">
										{reservations?.length}
									</span>
								</label>
							</div>
							<div className="drawer-side">
								<label htmlFor="my-drawer-4" className="drawer-overlay"></label>
								<div className="h-full p-4 menu w-80 bg-base-200 text-base-content">
									{/* Sidebar content here */}
									<Card.Body className="card-body">
										<>
											<h2 className="text-2xl font-semibold">
												RESERVATIONS 🐱‍👓:
											</h2>
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

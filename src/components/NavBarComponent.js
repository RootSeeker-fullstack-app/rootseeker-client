import { Link } from "react-router-dom";
import { useContext, useState } from "react";
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

function NavBarComponent() {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		setVisible(!visible);
	};

	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
	return (
		<div className="flex items-center justify-center w-full gap-2 p-4 pb-0 font-sans component-preview">
			<Navbar className="shadow-xl navbar bg-base-100 rounded-box">
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
					<div className="flex-none">
						{isLoggedIn && (
							<>
								<Dropdown vertical="end">
									<Button color="primary" className="avatar" shape="circle">
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
									<Dropdown.Menu className="mt-3 w-52 menu-compact right-8">
										<li>
											<Link to={`/profile/${user.username}`}>
												{user && user.username}
											</Link>
										</li>
										<Dropdown.Item>Settings</Dropdown.Item>
										<Dropdown.Item>
											<Button
												onClick={logOutUser}
												color="ghost"
												className="btn-xs"
											>
												Logout
											</Button>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						)}
					</div>

					{!isLoggedIn && (
						<>
							<Button
								onClick={toggleVisible}
								color="ghost"
								variant="outline"
								className="btn-xs"
							>
								Sign Up
							</Button>

							<Link to="/login">
								<Button color="ghost" className="btn-xs">
									Login
								</Button>
							</Link>
						</>
					)}
					<Dropdown vertical="end">
						<Button tabIndex={0} color="ghost" shape="circle">
							<Indicator item={<Badge size="sm">8</Badge>}>
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
										strokeWidth={2}
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</Indicator>
						</Button>
						<Dropdown.Menu
							tabIndex={0}
							className="mt-3 card card-compact right-2 w-52 bg-base-100 !p-0"
						>
							<Card.Body className="card-body">
								<span className="text-lg font-bold">8 Items</span>
								<span className="text-info">Subtotal: $999</span>
								<Card.Actions>
									<Button color="primary" fullWidth>
										View cart
									</Button>
								</Card.Actions>
							</Card.Body>
						</Dropdown.Menu>
					</Dropdown>
				</Navbar.End>
			</Navbar>

			{visible && <SignupPage />}
		</div>
	);
}

export default NavBarComponent;

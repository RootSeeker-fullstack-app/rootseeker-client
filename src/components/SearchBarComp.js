import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Input, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

function Search() {
	const [activities, setActivities] = useState([]);
	const [users, setUsers] = useState([]);
	const [value, setValue] = useState("");
	const API_URL = process.env.REACT_APP_API_URL;
	const navigate = useNavigate();

	useEffect(() => {
		getItemsFromApi();
	}, []);

	const getItemsFromApi = () => {
		axios
			.get(`${API_URL}/api/activities`)
			.then((response) => {
				setActivities(response.data);
				return axios.get(`${API_URL}/api/users`);
			})
			.then((response) => {
				setUsers(response.data);
			})
			.catch((error) => console.log(error));
	};
	const filteredItems = [...activities, ...users].filter((item) => {
		const searchTerm = value.toLowerCase();
		const itemLow = (item.name || item.username)?.toLowerCase();
		return (
			searchTerm && itemLow?.includes(searchTerm) && itemLow !== searchTerm
		);
	});

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onSearch = (searchTerm) => {
		setValue(searchTerm);
	};
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			const selectedItem =
				activities.find((item) => item.name === value) ||
				users.find((item) => item.username === value);

			if (selectedItem) {
				if (selectedItem.name) {
					navigate(`/activities/${selectedItem._id}`);
				} else if (selectedItem.username) {
					navigate(`/profile/${selectedItem.username}`);
				}
			}
		}
	};

	return (
		<>
			<div className="flex flex-col">
				<label className="my-2 text-left">Search</label>
				<form>
					<div className="flex flex-row mb-2">
						<Input
							bordered
							className="mr-2 grow"
							value={value}
							type="text"
							onChange={onChange}
							onKeyDown={handleKeyDown}
						/>
					</div>
				</form>
			</div>
			<Dropdown className="flex flex-col text-left list-none border-b-4 border-l-4 border-r-4 rounded-lg">
				{!filteredItems ? (
					<p>loading...</p>
				) : (
					filteredItems.map((item) => {
						return (
							<Dropdown.Item
								className="px-3 py-1 bg-white rounded"
								onClick={() =>
									onSearch(item.name && navigate(`/activities/${item._id}`)) ||
									(item.username && navigate(`/profile/${item.username}`))
								}
								key={item._id}
							>
								{item.name || item.username}
							</Dropdown.Item>
						);
					})
				)}
			</Dropdown>
		</>
	);
}

export default Search;

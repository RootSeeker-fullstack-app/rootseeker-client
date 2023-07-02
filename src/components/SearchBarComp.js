import { useEffect, useState } from "react";
import axios from "axios";
import { Dropdown, Input, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

function Search() {
	const [items, setItems] = useState([]);
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
				setItems(response.data);

				return axios.get(`${API_URL}/api/users`);
			})
			.then((response) => {
				setItems((prevState) => [...prevState, ...response.data]);
				console.log(items);
			})
			.catch((e) => console.log(e));
	};

	console.log(items);
	const filteredItems = items.filter((item) => {
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
		// navigate(`/${}`)
		console.log("search", searchTerm);
	};

	return (
		<>
			<label>Search</label>
			<Input value={value} type="text" onChange={onChange} />
			<Button onClick={() => onSearch(value)}>Search</Button>
			<Dropdown className="flex flex-col">
				{!filteredItems ? (
					<p>loading...</p>
				) : (
					filteredItems.map((item) => {
						return (
							<Dropdown.Item
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

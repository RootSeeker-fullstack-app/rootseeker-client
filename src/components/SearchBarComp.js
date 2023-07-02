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
			})
			.catch((e) => console.log(e));
	};

	const filteredItems = items.filter((item) => {
		const searchTerm = value.toLowerCase();
		const itemLow = item.name.toLowerCase();
		return (
			searchTerm &&
			itemLow.includes(searchTerm.toLowerCase()) &&
			itemLow !== searchTerm
		);
	});

	const onChange = (e) => {
		setValue(e.target.value);
	};

	const onSearch = (searchTerm) => {
		setValue(searchTerm);
		// navigate(`/activities/${}`)
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
							<Dropdown.Item onClick={() => onSearch(item.name)} key={item._id}>
								{item.name}
							</Dropdown.Item>
						);
					})
				)}
			</Dropdown>
		</>
	);
}

export default Search;

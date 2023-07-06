export default {
	maptiler: {
		url: "https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=9PYIUlLUjlDdHSDx4ZpR",
		attribution:
			'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
		tilejson: "2.0.0",
		name: "Dataviz",
		minzoom: 0,
		maxzoom: 22,
		bounds: [-180, -85.0511, 180, 85.0511],
		format: "png",
		type: "baselayer",
		center: [0, 0, 0],
		color: "hsl(30,25%,98%)",
		tiles: [
			"https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=9PYIUlLUjlDdHSDx4ZpR",
		],
		logo: "https://api.maptiler.com/resources/logo.svg",
	},
};

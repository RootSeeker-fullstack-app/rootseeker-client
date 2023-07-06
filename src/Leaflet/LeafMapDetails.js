import { useState } from "react";
import { useRef } from "react";
import {
	FeatureGroup,
	MapContainer,
	Marker,
	Polyline,
	TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import osmProviders from "./osm-providers";

const LeafMapDetails = (props) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	const markerIcon = new L.Icon({
		iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [10, 41],
		popupAnchor: [2, -40],
	});
	const coordsArray = props.coordinates.map((coord) => [
		coord.latitude,
		coord.longitude,
	]);
	const [center, setCenter] = useState({
		lat: coordsArray[0][0],
		lng: coordsArray[0][1],
	});

	return (
		<div>
			<MapContainer
				style={{ height: "480px", width: "620px" }}
				center={center}
				zoom={16}
				ref={mapRef}
				whenReady={setMap}
				scrollWheelZoom={true}
			>
				<FeatureGroup>
					{coordsArray?.map((mark, i) => (
						<Marker key={i} position={mark} icon={markerIcon} />
					))}

					<Polyline positions={coordsArray} color="red" />
				</FeatureGroup>

				<TileLayer
					url={osmProviders.maptiler.url}
					attribution={osmProviders.maptiler.attribution}
				/>
			</MapContainer>
		</div>
	);
};

export default LeafMapDetails;

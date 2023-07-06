import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import osmProviders from "./osm-providers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import LeafletSearch from "./LeafSearch";

const LeafMap = (props) => {
	//////
	const markerIcon = new L.Icon({
		iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
		iconSize: [25, 41],
		iconAnchor: [10, 41],
		popupAnchor: [2, -40],
	});
	const [center, setCenter] = useState({
		lat: 52.0925857753,
		lng: 5.125002096780512,
	});
	const ZOOM_LEVEL = 13;
	const mapRef = useRef(null);
	const created = (e) => {
		if (typeof props.onCreated === "function") {
			props.onCreated(e);
		}
		console.log(e);
	};
	///////

	return (
		<div className="row">
			<div className="text-center col">
				<div className="col">
					<MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
						<LeafletSearch />
						<FeatureGroup>
							<EditControl
								position="topright"
								onCreated={created}
								draw={{
									rectangle: false,
									circle: false,
									circlemarker: false,
									// marker: false,
									polygon: false,
								}}
							/>
						</FeatureGroup>
						<TileLayer
							url={osmProviders.maptiler.url}
							attribution={osmProviders.maptiler.attribution}
						/>
					</MapContainer>
				</div>
			</div>
		</div>
	);
};

export default LeafMap;

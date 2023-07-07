import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  // iconRetinaUrl:
  // 	"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  // shadowUrl:
  // 	"https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
});

const LeafletSearch = () => {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.Geocoder.nominatim();

    const markerIcon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
    });
    L.Control.geocoder({
      marker: false,
      query: "",
      placeholder: "Search here...",
      defaultMarkGeocode: false,
      geocoder,
    })
      .on("markgeocode", function (e) {
        const latlng = e.geocode.center;
        L.marker(latlng, { markerIcon });
        // .addTo(map)
        // .bindPopup(e.geocode.name)
        // .openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, []);

  return null;
};

export default LeafletSearch;

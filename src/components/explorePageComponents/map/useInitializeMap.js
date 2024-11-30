import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MAPS_API_KEY } from "../../../utils/secrets";
import mapOptions from "./mapOptions";

const useInitializeMap = (location) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null); // To store the map instance
    const [mapBounds, setMapBounds] = useState(null);

    useEffect(() => {
        const initializeMap = async () => {
            if (!location || !mapRef.current || mapRef.current._isInitialized)
                return;
            mapRef.current._isInitialized = true;

            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly"
            });

            const { Map } = await loader.importLibrary("maps");

            // Initialize the map and save the instance
            const mapInstance = new Map(mapRef.current, {
                ...mapOptions,
                center: { lat: location.lat, lng: location.lng }
            });

            mapInstanceRef.current = mapInstance;

            // Update bounds whenever the map changes
            const updateBounds = () => {
                if (mapInstance) {
                    const bounds = mapInstance.getBounds();
                    if (bounds) {
                        const ne = bounds.getNorthEast();
                        const sw = bounds.getSouthWest();
                        setMapBounds({ ne, sw });
                    }
                }
            };

            mapInstance.addListener("bounds_changed", updateBounds);
            updateBounds(); // Initial call
        };

        initializeMap();
    }, [location]);

    return { mapRef, mapInstance: mapInstanceRef.current, mapBounds };
};

export default useInitializeMap;

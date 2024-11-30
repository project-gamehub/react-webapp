import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MAPS_API_KEY } from "../../../utils/secrets";
import mapOptions from "./mapOptions";

const useInitializeMap = (location) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const initializeMap = async () => {
            if (!location || !mapRef.current || mapRef.current._isInitialized) return;
            mapRef.current._isInitialized = true;

            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly"
            });

            const { Map } = await loader.importLibrary("maps");
            const { AdvancedMarkerElement } =
                await loader.importLibrary("marker");

            // Initialize the map
            const map = new Map(mapRef.current, {
                ...mapOptions,
                center: { lat: location.lat, lng: location.lng },
            });

            // Add an advanced marker
            new AdvancedMarkerElement({
                map,
                position: { lat: location.lat, lng: location.lng }
            });
        };

        initializeMap();
    }, [location]);

    return mapRef;
};

export default useInitializeMap;

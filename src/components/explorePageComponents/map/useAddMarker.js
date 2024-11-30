import { useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MAPS_API_KEY } from "../../../utils/secrets";
import createMarkerContent from "./createMarkerContent";

const useAddMarker = (mapInstance) => {
    const addMarker = useCallback(
        async (location, userData) => {
            if (!mapInstance || !location) return;

            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly"
            });

            const avatarURL = userData?.avatar;

            const { AdvancedMarkerElement } =
                await loader.importLibrary("marker");

            const markerContent = createMarkerContent(avatarURL);

            new AdvancedMarkerElement({
                map: mapInstance,
                position: { lat: location.lat, lng: location.lng },
                content: markerContent
            });
        },
        [mapInstance]
    );

    return addMarker;
};

export default useAddMarker;

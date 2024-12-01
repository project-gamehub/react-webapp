import { useCallback } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { MAPS_API_KEY } from "../../../utils/secrets";
import createMarkerContent from "./createMarkerContent";
import getInfoWindowContent from "./getInfoWindowContent.js";

const useAddMarker = (mapInstance) => {
    const addMarker = useCallback(
        async (location, userData, navigate) => {
            if (!mapInstance || !location) return;

            const loader = new Loader({
                apiKey: MAPS_API_KEY,
                version: "weekly"
            });

            const avatarURL = userData?.avatar;

            const { AdvancedMarkerElement } =
                await loader.importLibrary("marker");
            const { InfoWindow } = await loader.importLibrary("maps");

            const markerContent = createMarkerContent(avatarURL);

            const marker = new AdvancedMarkerElement({
                map: mapInstance,
                position: { lat: location.lat, lng: location.lng },
                content: markerContent
            });

            const infoWindow = new InfoWindow({
                content: getInfoWindowContent(userData)
            });

            marker.addListener("click", () => {
                infoWindow.open({
                    anchor: marker,
                    map: mapInstance
                });

                setTimeout(() => {
                    const button = document.querySelector(
                        ".map-info-window-view-profile-button"
                    );
                    if (button) {
                        button.addEventListener("click", () => {
                            navigate(`/user/${userData._id}`);
                        });
                    }
                }, 0);
            });
        },
        [mapInstance]
    );

    return addMarker;
};

export default useAddMarker;

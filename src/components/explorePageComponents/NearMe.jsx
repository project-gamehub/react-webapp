import React, { useEffect } from "react";
import mapContainerStyle from "./map/mapContainerStyle";
import useUserLocation from "./map/useUserLocation";
import useInitializeMap from "./map/useInitializeMap";
import useAddMarker from "./map/useAddMarker";
import { useSelector } from "react-redux";
import useFetchNearbyUsers from "./map/useFetchNearbyUsers";

const NearMe = () => {
    const { location, error } = useUserLocation();
    const { mapRef, mapInstance, mapBounds } = useInitializeMap(location);
    const addMarker = useAddMarker(mapInstance);

    const mapData = useSelector((state) => state.mapDataSlice.data);

    useFetchNearbyUsers(mapBounds);

    // Add markers for users
    useEffect(() => {
        if (mapInstance && Object.keys(mapData).length > 0) {
            Object.values(mapData).forEach((user) => {
                addMarker(
                    {
                        lat: user.location.coordinates[1], // Assuming GeoJSON format [lng, lat]
                        lng: user.location.coordinates[0]
                    },
                    user
                );
            });
        }
    }, [mapInstance, mapData, addMarker]);

    if (error) {
        return (
            <p>Unable to load map. Location access denied or unavailable.</p>
        );
    }

    return <div ref={mapRef} style={mapContainerStyle}></div>;
};

export default NearMe;

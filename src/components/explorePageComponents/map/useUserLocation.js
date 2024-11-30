import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_SERVICE_URL } from "../../../utils/constant";

// Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of Earth
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
};

const useUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(false);

    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    useEffect(() => {
        if (!accessToken) {
            toast.error("User not logged in!");
            setError(true);
        } else if (navigator.geolocation) {
            let previousLocation = null;

            const watchId = navigator.geolocation.watchPosition(
                async (position) => {

                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude

                    const newLocation = {
                        lat, lng
                    };

                    setLocation(newLocation);

                    // Only make API call if user moved more than 100 meters
                    if (
                        !previousLocation ||
                        calculateDistance(
                            previousLocation.lat,
                            previousLocation.lng,
                            newLocation.lat,
                            newLocation.lng
                        ) > 100
                    ) {
                        try {
                            await axios.patch(
                                USER_SERVICE_URL + "/update-user-location",
                                { lat, lng },
                                {
                                    headers: {
                                        "access-token": accessToken,
                                    },
                                }
                            );
                            previousLocation = newLocation;
                        } catch (err) {
                            console.error("Failed to update location:", err);
                        }
                    }
                },
                () => {
                    setError(true);
                },
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setError(true);
        }
    }, [accessToken]);

    return { location, error };
};

export default useUserLocation;

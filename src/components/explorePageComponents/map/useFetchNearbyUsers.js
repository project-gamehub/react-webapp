import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateMapData } from "../../../config/mapDataSlice";
import { USER_SERVICE_URL } from "../../../utils/constant";

const useFetchNearbyUsers = (mapBounds) => {
    const [exploredAreas, setExploredAreas] = useState(new Set());
    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.userDataSlice.accessToken);

    useEffect(() => {
        if (mapBounds) {
            const boundsKey = `${mapBounds.ne.lat()}_${mapBounds.ne.lng()}_${mapBounds.sw.lat()}_${mapBounds.sw.lng()}`;

            // Check if the bounds have already been explored
            if (!exploredAreas.has(boundsKey) && accessToken) {
                const points = {
                    ne: { lat: mapBounds.ne.lat(), lng: mapBounds.ne.lng() },
                    sw: { lat: mapBounds.sw.lat(), lng: mapBounds.sw.lng() }
                };

                const fetchNearbyUsers = async () => {
                    try {
                        const response = await axios.post(
                            `${USER_SERVICE_URL}/get-nearby-users`,
                            { points },
                            {
                                headers: {
                                    "access-token": accessToken
                                }
                            }
                        );
                        dispatch(updateMapData(response.data.users));
                        setExploredAreas((prev) =>
                            new Set(prev).add(boundsKey)
                        );
                    } catch (error) {
                        console.error("Error fetching nearby users:", error);
                    }
                };

                const debounceTimeout = setTimeout(() => {
                    fetchNearbyUsers();
                }, 2000);

                return () => clearTimeout(debounceTimeout);
            }
        }
    }, [mapBounds, accessToken, exploredAreas, dispatch]);

    return exploredAreas;
};

export default useFetchNearbyUsers;

import mapContainerStyle from "./map/mapContainerStyle";
import useUserLocation from "./map/useUserLocation";
import useInitializeMap from "./map/useInitialzeMap";

const NearMe = () => {
    const { location, error } = useUserLocation();
    const mapRef = useInitializeMap(location);

    if (error) {
        return (
            <p>Unable to load map. Location access denied or unavailable.</p>
        );
    }

    return <div ref={mapRef} style={mapContainerStyle}></div>;
};

export default NearMe;

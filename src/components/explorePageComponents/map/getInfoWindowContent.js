const getInfoWindowContent = (userData) => {
    if (userData.avatar) {
        return `
            <div class="map-info-window-container disp-flx" style="font-family: Arial, sans-serif;">
                <div class="map-info-window-img-container"> 
                    <img class="map-info-window-img" src=${userData.avatar}> 
                </div>
                <div class="map-info-window-details-container">
                    <h4 class="map-info-window-username">${userData.username || "username"}</h4>
                    <button class="map-info-window-view-profile-button">
                        View Profile
                    </button>
                </div>
            </div>
        `;
    }

    return `
        <div class="map-info-window-container disp-flx" style="font-family: Arial, sans-serif;">
            <div class="map-info-window-img-container disp-flx"> 
                <span class="material-symbols-rounded">person</span>
            </div>
            <div class="map-info-window-details-container">
                <h4 class="map-info-window-username">${userData.username || "username"}</h4>
                <button class="map-info-window-view-profile-button">
                    View Profile
                </button>
            </div>
        </div>
    `;
};

export default getInfoWindowContent;

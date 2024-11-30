const createMarkerContent = (avatarURL) => {
    const markerContent = document.createElement("div");
    markerContent.style.width = "50px";
    markerContent.style.height = "50px";
    markerContent.style.borderRadius = "50%";
    markerContent.style.overflow = "hidden";
    markerContent.style.backgroundColor = "#fff";
    markerContent.style.border = "2px solid white";

    if (avatarURL) {
        const avatarImage = document.createElement("img");
        avatarImage.src = avatarURL;
        avatarImage.alt = "User Avatar";
        avatarImage.style.width = "100%";
        avatarImage.style.height = "100%";
        avatarImage.style.objectFit = "cover";
        markerContent.appendChild(avatarImage);
    } else {
        const fallbackIcon = document.createElement("span");
        fallbackIcon.className = "material-symbols-rounded disp-flx";
        fallbackIcon.textContent = "person";
        fallbackIcon.style.fontSize = "36px";
        fallbackIcon.style.color = "black";
        fallbackIcon.style.height = "100%";
        fallbackIcon.style.width = "100%";
        markerContent.appendChild(fallbackIcon);
    }

    return markerContent;
};

export default createMarkerContent;

const isOthersMessage = (senderId, otherUserId) => {
    if (!senderId) {
        return false;
    }

    if (senderId === otherUserId) {
        return true;
    }
    return false;
};

export default isOthersMessage;

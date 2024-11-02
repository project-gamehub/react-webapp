function formatTimestampToIST(utcTimestamp) {
    const date = new Date(utcTimestamp);
    const options = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true
    };
    const timeInIST = date.toLocaleTimeString("en-IN", options);

    const today = new Date();
    const isToday = today.toDateString() === date.toDateString();

    if (isToday) {
        return timeInIST;
    } else {
        const dateOptions = { day: "numeric", month: "short" };
        const dateInIST = date.toLocaleDateString("en-IN", dateOptions);
        return `${timeInIST}, ${dateInIST}`;
    }
}

export default formatTimestampToIST;

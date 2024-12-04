export default function trimString(str) {
    if (!str) {
        return str;
    }
    if (str.length > 25) {
        return str.slice(0, 20) + "...";
    }
    return str;
}

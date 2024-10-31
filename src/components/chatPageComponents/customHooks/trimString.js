export default function trimString(str) {
    if (!str) {
        return str;
    }
    if (str.length > 40) {
        return str.slice(0, 33) + "...";
    }
    return str;
}

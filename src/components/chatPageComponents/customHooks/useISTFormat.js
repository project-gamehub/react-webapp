import { useMemo } from "react";

function useISTFormat(dateString) {
    return useMemo(() => {
        const givenDate = new Date(dateString);
        const now = new Date();
        const timeDifference = now - givenDate;
        const hours24 = 24 * 60 * 60 * 1000;

        const optionsTime = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "Asia/Kolkata"
        };

        const optionsDate = {
            day: "numeric",
            month: "short",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        };

        if (timeDifference < hours24) {
            return new Intl.DateTimeFormat("en-IN", optionsTime).format(
                givenDate
            );
        } else {
            return new Intl.DateTimeFormat("en-IN", optionsDate).format(
                givenDate
            );
        }
    }, [dateString]);
}

export default useISTFormat;

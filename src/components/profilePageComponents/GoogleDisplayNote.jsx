import { useState } from "react";

const GoogleDisplayNote = ({ isGoogleLogin }) => {
    const [displayNote, setDisplayNote] = useState(false);
    return (
        <div
            className="google-ico-container"
            onMouseEnter={() => {
                setDisplayNote(true);
            }}
            onMouseLeave={() => {
                setDisplayNote(false);
            }}
        >
            {isGoogleLogin && (
                <img
                    className="signed-in-with-google"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-google-1772223-1507807.png"
                    alt=""
                />
            )}

            {displayNote && (
                <div className="note-container">
                    You have used Google to sign in
                </div>
            )}
        </div>
    );
};

export default GoogleDisplayNote;

import React from "react";

const ShowRole = ({ currentUserTurn, selfUserRole }) => {
    return (
        <>
            {currentUserTurn ? <>Its your turn</> : <>Its opponents turn</>}
            <p>You are {selfUserRole}</p>
        </>
    );
};

export default ShowRole;

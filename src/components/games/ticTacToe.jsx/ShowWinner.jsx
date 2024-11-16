import useUsername from "../../../utils/useUsername";

const ShowWinner = ({ winner }) => {
    const winnerUsername = useUsername(winner);
    if (!winnerUsername) {
        return;
    }
    return (
        <div>
            <h3>Winner: {winnerUsername}</h3>
        </div>
    );
};

export default ShowWinner;

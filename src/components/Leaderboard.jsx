import React, { useEffect, useState } from "react";
// import dummyLb from "../dummy-data/dummyLeaderboardData.json";
import { SERVER_URL } from "../utils/constant";
import "../styles/leaderboard.css";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState(null);

    const fetchLbData = async () => {
        const data = await fetch(`${SERVER_URL}/api/get-leaderboard-data`);
        const prsed = await data.json();
        return prsed;
    };

    useEffect(() => {
        fetchLbData().then((data) => {
            setLeaderboardData(data);
        });
    }, []);
    return (
        <div className="leaderboard">
            {leaderboardData ? (
                <>
                    <table>
                        <thead className="lb-header">
                            <tr>
                                <th> Rank </th>
                                <th> Username </th>
                                <th> Score </th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((singlePerson) => (
                                <tr key={singlePerson.rank}>
                                    <td> {singlePerson.rank} </td>
                                    <td> {singlePerson.username} </td>
                                    <td> {singlePerson.score} </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="current-users-score">
                                <td> 0 </td>
                                <td> Name </td>
                                <td> NULL </td>
                            </tr>
                        </tfoot>
                    </table>
                </>
            ) : (
                <div className="loding-lb-div">Loading</div>
            )}
        </div>
    );
};

export default Leaderboard;

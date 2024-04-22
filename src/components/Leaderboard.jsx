import React, { useEffect, useState } from "react";
import "../styles/leaderboard.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGamesData } from "../config/gamesDataSlice";
import { fetchLeaderboardData } from "../config/leaderboardsDataSlice";

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState(null);
    const {gameslug} = useParams();

    const { gamesData } = useSelector(
        (state) => state.gamesDataSlice
    );

    const {leaderboardsData, leaderboardsDataLoading, leaderboardsDataError } = useSelector(
        (state) => state.leaderboardsDataSlice
    );

    const dispatch = useDispatch();
    
    useEffect(() => {
            if(!gamesData){
                dispatch(fetchGamesData());
            }
            else {
                const gameId = gamesData.find( (gameData) => 
                gameslug === gameData.gameSlug
            )
            dispatch(fetchLeaderboardData(gameId._id));
            if(leaderboardsData && !leaderboardsDataLoading){
                setLeaderboardData(leaderboardsData[gameId._id])
            }
        }
    }, [gameslug, gamesData, dispatch, leaderboardsData ]);

    // convert userId to userName and display leaderboard

    console.log(leaderboardData);

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-defination">TOP 10 PLAYERS</h2>

            <div className="leaderboard">
                <table>
                    <thead>
                        <tr className="current-users-score">
                            <th> Rank </th>
                            <th> Username </th>
                            <th> Score </th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData?.data
                            ? 
                            leaderboardData.data.map((singlePerson, idx) => (
                                  <tr key={idx + 1}>
                                      <td> {idx + 1} </td>
                                      <td> {singlePerson.username} </td>
                                      <td> {singlePerson.score} </td>
                                  </tr>
                              ))
                        //    <>"Hi"</>
                            : 
                            <>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                <tr className="leaderboard-loader">
                                    <td colSpan={3}></td>
                                </tr>
                                
                               
                            </>
                        }
                    </tbody>
                    <tfoot>
                        <tr className="current-users-score">
                            <td> 0 </td>
                            <td> Name </td>
                            <td> NULL </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;

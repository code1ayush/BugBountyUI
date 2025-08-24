import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import LeaderBoardComp from '../components/LeaderBoard';

const LeaderBoard = () => {

  const {getLeaderBoard,leaderBoard} = useAppContext();

  useEffect(()=>{
    if(leaderBoard.length ===0){
      getLeaderBoard();
    }
  },[getLeaderBoard,leaderBoard]);


  return (
    <div>
      <LeaderBoardComp leaderBoard={leaderBoard}/>
    </div>
  )
}

export default LeaderBoard

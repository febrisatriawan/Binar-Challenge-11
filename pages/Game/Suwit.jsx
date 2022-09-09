import React, { useState, useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import Player from "../../components/Player";
import firebaseDB from "../../config/firebaseDB";
import { useSelector } from "react-redux";
import { collection, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { useRouter } from "next/router";
import Authenticated from "../../middlewares/Authenticated";
import styles from "../../styles/Game.module.css";
import { Table } from "react-bootstrap";

function Game() {
  const weapons = ["rock", "paper", "scissors"];
  const [playerOne, setPlayerOne] = useState(weapons[0]);
  const [playerTwo, setPlayerTwo] = useState(weapons[0]);
  const [winner, setWinner] = useState("");
  const [uid, setUid] = useState("");
  const [scoreFromDoc, setScoreFromDoc] = useState(0);
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const { displayNameName } = players;
  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);

  console.log("aku adalah authenticated user:", authenticatedUser);

  const getQuery = async () => {
    const q = query(collection(firebaseDB, "users"), where("uid", "==", authenticatedUser.uid));
    const querySnapshot = await getDocs(q);
    const res = querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data().score);
      setUid(doc.id);
      setScoreFromDoc(doc.data().score);
    });
  };

  useEffect(() => {
    getQuery();
    switch (playerOne + playerTwo) {
      case "scissorspaper":
      case "rockscissors":
      case "paperrock":
        setWinner("YOU WIN!");
        setScore(score + 1);
        break;
      case "paperscissors":
      case "scissorsrock":
      case "rockpaper":
        setWinner("YOU LOSE!");
        break;
      case "rockrock":
      case "paperpaper":
      case "scissorsscissors":
        setWinner("ITS A DRAW!");
        break;
    }
  }, [playerOne, playerTwo]);

  const selectWeapon = (weapon) => {
    setPlayerOne(weapon);
    setPlayerTwo(weapons[Math.floor(Math.random() * weapons.length)]);
    setWinner("");
  };

  const updateScore = async (event) => {
    event.preventDefault();
    const docId = doc(firebaseDB, "users", uid);

    if (score > scoreFromDoc) {
      await updateDoc(docId, {
        score,
      });
    }
  };

  return (
    <Authenticated>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Rock Paper Scissors</h1>
      <div className="text-center">
        <div>
          <Player weapon={playerOne} />
          <Player weapon={playerTwo} />
        </div>
        <div>
          <button className={styles.weaponBtn} onClick={() => selectWeapon("rock")}>
            rock
          </button>
          <button className={styles.weaponBtn} onClick={() => selectWeapon("paper")}>
            paper
          </button>
          <button className={styles.weaponBtn} onClick={() => selectWeapon("scissors")}>
            scissor
          </button>
        </div>
        <div className={styles.winner}>{winner}</div>
        <div>
          <h1>Score: {score}</h1>
        </div>
        <div>
          <h1>Player: {authenticatedUser.displayName}</h1>
        </div>
      </div>
      <div className="text-center">
        <Button variant="outline-danger" onClick={(event) => updateScore(event)}>
          Submit Score
        </Button>
      </div>
    </Authenticated>
  );
}

export default Game;

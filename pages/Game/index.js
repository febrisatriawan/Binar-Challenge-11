import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import NavbarComponent from "../../components/Navbar";
import Image from "next/image";
import scissors from "../../public/assets/gunting.png";
import Link from "next/link";
import { doc, where, getDocs, query, collection, addDoc, updateDoc } from "firebase/firestore";
import firebaseDB from "../../config/firebaseDB";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import Authenticated from "../../middlewares/Authenticated";

const ListGame = () => {
  const router = useRouter();
  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);
  const [playedGames, setPlayedGames] = useState([]);
  console.log("played Games user", playedGames);
  const [uid, setUid] = useState("");

  const getPlayedGames = async () => {
    try {
      const q = query(collection(firebaseDB, "users"), where("uid", "==", authenticatedUser.uid));
      const querySnapshot = await getDocs(q);
      const res = querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data().games_played);
        setUid(doc.id);
        if (doc.data().games_played === undefined) {
          setPlayedGames([]);
        } else {
          setPlayedGames(doc.data().games_played);
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const submitToSuwit = async () => {
    const docId = doc(firebaseDB, "users", uid);
    console.log(uid);
    playedGames.push("suwit");
    const condition = playedGames.includes("suwit");
    await updateDoc(docId, {
      games_played: playedGames,
    });
    router.push("/Game/Suwit");
  };

  const submitToRandom = async () => {
    const docId = doc(firebaseDB, "users", uid);
    console.log(uid);
    playedGames.push("random");
    const condition = playedGames.includes("random");
    await updateDoc(docId, {
      games_played: playedGames,
    });
    router.push("/Game/Random");
  };

  useEffect(() => {
    getPlayedGames();
  }, []);

  return (
    <Authenticated>
      <NavbarComponent />
      <div className="text-center">
        <h1>List Game</h1>
      </div>
      <div className="d-flex justify-content-center gap-5 mt-5">
        <Card style={{ width: "18rem" }}>
          <Image variant="top" src={scissors} width={250} height={200} />
          <Card.Body>
            <Card.Title>Suwit Game</Card.Title>
            <Card.Text>Uji keberuntungan mu dengan memainkan game ini dan jadilah juaranya!!</Card.Text>
            <p>{playedGames.includes("suwit") ? "Game has been played" : null}</p>
            <Button onClick={(event) => submitToSuwit(event)}>Play Now!</Button>
          </Card.Body>
        </Card>
      </div>
    </Authenticated>
  );
};

export default ListGame;

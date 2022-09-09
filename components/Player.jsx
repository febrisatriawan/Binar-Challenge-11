import React from "react";
import scissors from "../public/assets/gunting.png";
import paper from "../public/assets/kertas.png";
import rock from "../public/assets/batu.png";
import Image from "next/image";
import styles from "../styles/Game.module.css";

const Player = ({ weapon }) => (
  <>
    <div className={styles.player}>
      <Image
        className={styles.playerImage}
        src={
          weapon === "rock" ? rock : weapon === "scissors" ? scissors : paper
        }
        alt="Rock Paper Scissors"
      />
    </div>
  </>
);

export default Player;

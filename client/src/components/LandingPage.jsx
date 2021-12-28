import React from "react";
import { Link } from "react-router-dom";
import styles from "./styless/LandingPage.module.css";
import { FaPaw } from "react-icons/fa";
import video from "./../img/video.mp4";


export default function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1 class="animate__animated  animate__tada animate__infinite	infinite">
          Welcome{" "}
        </h1>
        <Link to="/home">
          <p>
            <FaPaw className={styles.icon} />{" "}
          </p>
        </Link>
      </div>
      <video className={styles.background} muted autoPlay loop src={video} />
    </div>
  );
}

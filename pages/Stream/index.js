import React from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import NavbarStream from "../../components/NavbarStream";

export default function Home() {
  return (
    <main className="d-flex flex-column min-vh-100">
      <NavbarStream />:
      <div className="container-fluid">
        <div className="row justify-content-center">
          <h1 className="text-center">VIDEO GALLERY</h1>
          <Player playsInline fluid={false} width={1080} height={520}>
            <source src="https://res.cloudinary.com/aldiamiri/video/upload/v1662438635/video/ydgywa6ogq1t7gnqwszd.mp4" />
          </Player>
        </div>
      </div>
    </main>
  );
}

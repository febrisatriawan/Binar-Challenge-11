import React, { useState } from "react";
// import "video-react/dist/video-react.css";
import NavbarUpload from "../../components/NavbarUpload";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";

export default function Upload() {
  const [audioSelected, setAudioSelected] = useState("");

  const uploadAudio = () => {
    const formData = new FormData();
    formData.append("file", audioSelected);
    formData.append("upload_preset", "wtho3wu9");

    Axios.post("https://api.cloudinary.com/v1_1/aldiamiri/upload", formData).then((response) => {
      console.log(response);
    });
  };

  return (
    <main className="d-flex flex-column min-vh-100">
      <NavbarUpload />;
      <div className="container-fluid text-center">
        <div className="row text-center">
          <h2>Select Your Upload Audio</h2>
        </div>
        <input
          type="file"
          className="text-center px-4"
          onChange={(event) => {
            setAudioSelected(event.target.files[0]);
          }}
        />
        <button type="button" className="btn btn-danger px-4 justify-content-center" onClick={uploadAudio}>
          Upload
        </button>
      </div>
    </main>
  );
}

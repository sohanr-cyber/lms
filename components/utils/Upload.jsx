import React, { useState } from "react";
import styles from "@/styles/Utils/Upload.module.css";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "@/utils/firebase";
import ProgressBar from "./ProgressBar";
const Upload = ({ handle }) => {
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(null);
  const [image, setImage] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  console.log({ file });

  const handleFile = (file) => {
    console.log("file upload starred");
    console.log(file);
    if (!file) return;

    console.log("uploading...");
    setUploading(true);

    const storageRef = ref(storage, `division/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          handle({
            name: file.name,
            size: file.size,
            type: file.type,
            image: downloadURL,
          });
          setImage(downloadURL);
          setUploading(false);
          setFile("");
        });
      }
    );
  };
  return (
    <div
      className={styles.container}
      style={{ width: "100%", background: "lightgrey", borderRadius: "5px" }}
    >
      {uploading && <ProgressBar value={progresspercent} />}

      <input
        type="file"
        className={styles.inputfile}
        onChange={(e) => {
          setFile(e.target.files[0]);
          handleFile(e.target.files[0]);
        }}
        style={uploading ? { display: "none" } : { display: "block" }}
      />
    </div>
  );
};

export default Upload;

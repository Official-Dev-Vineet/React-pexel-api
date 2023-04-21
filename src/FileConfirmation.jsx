import React, { useEffect, useState } from "react";

const FileConfirmation = (props) => {
  //  const keys=Object.keys(props.data);
  const [size, setSize] = useState(null);
  const imgUrl = props.data.src.large2x;
  const downloadHandler = () => {
    const fileName = props.data.alt;
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        setSize(blob.size);
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName || "download image from Pixel";
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(() => console.log("Failed to download image!"));
  };
  useEffect(() => {
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        setSize((blob.size/1024).toLocaleString('en').split('.')[0]);
      });
  });
  return (
    <div className="file-handler">
      {console.log(props.data)}
      <h1 className="alt-text">{props.data.alt}</h1>
      <p className="author details">photographer :{props.data.photographer}</p>
      <p className="image-url">
        <a href={props.data.url}> {props.data.url} </a>
      </p>
      <div
        className="image-area"
        style={{ "--avgColor": props.data.avg_color }}
      >
        <div className="img">
          <img src={props.data.src.large2x} alt={props.data.alt} width={100} />
          <h3>
            {" "}
            image id:
            {props.data.id}
            <br />
            size : {size} kb
          </h3>
        </div>
      </div>
      <button
        onClick={() => {
          downloadHandler();
        }}
      >
        free download
      </button>
      <button onClick={() => props.fileConfirmation(!props.fileConfirmation)}>
        close
      </button>
    </div>
  );
};

export default FileConfirmation;

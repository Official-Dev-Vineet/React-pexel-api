import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const FileConfirmation = (props) => {
  //  const keys=Object.keys(props.data);
  const [size, setSize] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const imgUrl = props.data.src.original;
  const downloadHandler = () => {
    setIsLoading(true);
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
      .catch(() => console.log("Failed to download image!"))
      .finally(() => {
        setIsLoading(false);
      });
  };
  const copyToClipboard = (e, data) => {
    e.target.textContent = "...";
    e.preventDefault();
    let result = navigator.clipboard.writeText(data);
    result
      .then(() => {
        e.target.textContent = "copied";
        e.target.style.pointerEvents = "none";
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((blob) => {
        setSize((blob.size / 1024).toLocaleString("en").split(".")[0]);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <div
      className="file-handler"
      style={{ "--avgColor": props.data.avg_color }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="alt-text">{props.data.alt}</h1>
          <div className="image-area">
            <div className="img">
              <img src={props.data.src.large2x} alt={props.data.alt} />
            </div>
            <div className="img-info">
              <p className="info">
                photo Id : <span>{props.data.id}</span>
              </p>
              <p className="info">
                photographer :{" "}
                <span>
                  <a href={props.data.photographer_url}>
                    {props.data.photographer}
                  </a>
                </span>
              </p>
              <p className="info">
                size : <span>{size} kb</span>
              </p>
              <p className="info">
                image alternate :{" "}
                <ul>
                  {Object.keys(props.data.src).map((url, index) => {
                    return (
                      <li key={index}>
                        <a href={props.data.src[url]}>{url}</a>
                        <button
                          onClick={(e) =>
                            copyToClipboard(e, props.data.src[url])
                          }
                        >
                          copy
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </p>
            </div>
          </div>
          <button className="download-btn"
            onClick={() => {
              downloadHandler();
            }}
          >
            free download
          </button>
          <button className="close-btn"
            onClick={() => props.fileConfirmation(!props.fileConfirmation)}
          >
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default FileConfirmation;

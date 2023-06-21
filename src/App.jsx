import React, { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import GoToTopButton from "./GoToTopButton";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDownload,
  FaSearch,
} from "react-icons/fa";
import Loader from "./Loader";
import FileConfirmation from "./FileConfirmation";

function App() {
  const browse = [
    "trending",
    "new",
    "sun",
    "moon",
    "nature",
    "hd wallpaper",
    "4k wallpaper",
    "mountain",
    "sky",
    "night sky",
    "rain",
    "cloud",
    "laptop",
    "desktop",
    "smart phone",
    "tablet",
    "tv",
    "car",
    "bike",
    "animals",
    "birds",
    "insects",
  ];
  const [count, setCount] = useState(20);
  const [page, SetPage] = useState(1);
  const [search, setSearch] = useState("latest");
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const searchKeyWord = useRef();
  const [isLoading, setLoading] = useState(false);
  const [fileConfirmation, setFileConfirmation] = useState(false);
  const [imageData, setImageData] = useState(null);

  const apiURL = `https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=${count}}`;
  const data = async () => {
    setLoading(true);

    const errorSet = () => {
      SetPage(0);
      setErrorMsg("Photos not found !");
    };
    await fetch(apiURL, {
      headers: {
        Authorization:
          import.meta.env.VITE_KEY,
      },
    })
      .then((res) => res?.json())
      .then((data) => {
        data?.photos?.length > 0 ? setImages(data.photos) : errorSet();
      })
      .catch((e) => setErrorMsg("Failed to load images! the reason is :", e))
      .finally(() => {
        setLoading(false);
      });
  };
  function toggler(data) {
    setFileConfirmation(data);
  }
  const fileHandling = (data) => {
    setFileConfirmation(true);
    setImageData(data);
  };
  const searchHandler = () => {
    setErrorMsg(null);
    setSearch(searchKeyWord.current.value);
  };
  const pageHandler = (text) => {
    text === "pre" && page > 1 && errorMsg === null
      ? SetPage((pre) => pre - 1)
      : "";
    text === "next" && page > 0 && errorMsg === null
      ? SetPage((pre) => pre + 1)
      : "";
  };
  useEffect(() => {
    setErrorMsg(null);
    SetPage(1);
    data();
  }, [search]);
  useMemo(() => {
    data();
  }, [page]);
  return (
    <div className="App">
      <div className="input_box">
        <input type="text" placeholder="Search image..." ref={searchKeyWord} />
        <button onClick={() => searchHandler()}>
          <FaSearch />
        </button>
      </div>
      <div className="browse-tab">
        <ul>
          {browse.map((value, index) => {
            return (
              <li key={index} onClick={() => setSearch(value)}>
                {value}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="report">
        showing result of {search} page : {page}:-
      </div>
      <div className={`image-container ${!isLoading ? "column" : ""}`}>
        {errorMsg === "Photos not found !" ? (
          <div className="error_msg">{errorMsg.slice(0, -1)}🥲🥲🥲</div>
        ) : isLoading ? (
          <Loader />
        ) : (
          images?.map((image, index) => {
            return (
              <div className="image" key={index}>
                <div className="actual_image">
                  <img src={image?.src?.large} alt={image?.alt} />
                </div>
                <div className="image-details">
                  <div className="image-title">
                    <p>{image?.photographer}</p>
                    <button
                      onClick={() => fileHandling(image)}
                      className="download-btn"
                    >
                      <FaDownload />{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {fileConfirmation ? (
        <FileConfirmation data={imageData} fileConfirmation={toggler} />
      ) : (
        ""
      )}
      <div className="btn-group">
        <button
          className="previous"
          style={
            isLoading ? { pointerEvents: "none" } : { pointerEvents: "all" }
          }
          onClick={() => pageHandler("pre")}
        >
          <FaArrowLeft />
        </button>
        <button
          className="next"
          style={
            isLoading ? { pointerEvents: "none" } : { pointerEvents: "all" }
          }
          onClick={() => pageHandler("next")}
        >
          <FaArrowRight />
        </button>
      </div>
      <GoToTopButton />
    </div>
  );
}

export default App;

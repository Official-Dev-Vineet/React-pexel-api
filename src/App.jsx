import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import GoToTopButton from "./GoToTopButton";
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import Loader from "./Loader";

function App() {
  const [count, setCount] = useState(20);
  const [page, SetPage] = useState(1);
  const [search, setSearch] = useState("images");
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const searchKeyWord = useRef();
  const [isLoading, setLoading] = useState(false);

  const apiURL = `https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=${count}}`;
  const data = async () => {
    setLoading(true);
    const imageSet = (image) => {
      setImages(image);
      setLoading(false);
    };
    const errorSet = () => {
      SetPage(0);
      setErrorMsg("Photos not found !");
    };
    await fetch(apiURL, {
      headers: {
        Authorization:
          "563492ad6f91700001000001af762a74bbf447dd8b768b453406edc7",
      },
    })
      .then((res) => res?.json())
      .then((data) => {
        data?.photos?.length > 0 ? imageSet(data?.photos) : errorSet();
      })
      .catch(() => setErrorMsg("Failed to load images!"));
  };
  const searchHandler = () => {
    setErrorMsg("");
    setSearch(searchKeyWord.current.value);
  };
  const pageHandler = (text) => {
    text === "pre" && page > 1 && errorMsg === ""
      ? SetPage((pre) => pre - 1)
      : "";
    text === "next" && page > 0 && errorMsg === ""
      ? SetPage((pre) => pre + 1)
      : "";
  };
  useEffect(() => {
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
      <div className="report">showing Page {page} result :-</div>
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
                  <img src={image?.src?.large2x} alt={image?.alt} />
                </div>
                <div className="image-details">
                  <div className="image-title">{image?.photographer}</div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="btn-group">
        <button className="previous" onClick={() => pageHandler("pre")}>
          <FaArrowLeft />
        </button>
        <button className="next" onClick={() => pageHandler("next")}>
          <FaArrowRight />
        </button>
      </div>
      <GoToTopButton />
    </div>
  );
}

export default App;

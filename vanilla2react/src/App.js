import "./App.css";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Content from "./components/Content";
import { useState } from "react";
import WishList from "./components/WishList";

function App() {
  const [modalTitle, setModalTitle] = useState("");
  const [modalImg, setModalImg] = useState("");
  const [modalDesc, setModalDesc] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [wishList, setWishList] = useState([]);

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }

  const getInfoHandler = (title, img, desc) => {
    setModalTitle(title);
    setModalImg(img);
    setModalDesc(desc);
    setIsModalActive(true);
  };

  const addWishListHandler = (movie) => {
    if (!containsObject(movie, wishList)) {
      setWishList([...wishList, movie]);
    }
    console.log(wishList);
  };

  window.onclick = (eventModal) => {
    if (eventModal.target === document.getElementById("modal")) {
      setIsModalActive(false);
    }
  };

  window.onscroll = () => {
    if (
      document.body.scrollTop > 25 ||
      document.documentElement.scrollTop > 25
    ) {
      document.getElementById("title").style.fontSize = "30px";
      document.getElementById("subtitle").style.fontSize = "0px";
      document.getElementById("header").style.backgroundColor = "black";
      document.getElementById("headerLink").style.display = "none";
    } else {
      document.getElementById("subtitle").style.fontSize = "15px";
      document.getElementById("header").style.backgroundColor =
        "rgba(255, 0, 0, 0)";
      document.getElementById("header").style.boxShadow = "none";
      document.getElementById("headerLink").style.display = "flex";
      if (window.matchMedia("screen and (max-width: 600px)").matches) {
        document.getElementById("title").style.fontSize = "35px";
      } else {
        document.getElementById("title").style.fontSize = "45px";
      }
    }
  };

  return (
    <div className="App">
      <Header wl={wishList}/>
      {isModalActive ? (
        <Modal title={modalTitle} img={modalImg} desc={modalDesc} />
      ) : null}
      <Content getInfo={getInfoHandler} addWishList={addWishListHandler} />
    </div>
  );
}

export default App;

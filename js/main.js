/* *** KAMUS *** */
let movieList = [];

let baseURL = "https://api.themoviedb.org/3/";
let configData = null;
let baseImageURL = null;
const APIKEY = "a16108f68fc8c50911181985a3114d13";

let getConfig = () => {
  let newMovie;
  let url = "".concat(baseURL, "configuration?api_key=", APIKEY);
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      baseImageURL = data.images.secure_base_url;
      configData = data.images;
      console.log("config:", data);
      console.log("config fetched");
      firstLoad();
    })
    .catch((err) => {
      alert(err);
    });
};

let firstLoad = () => {
  url = "".concat(
    "https://api.themoviedb.org/3/movie/popular?api_key=",
    APIKEY,
    "&language=en-US&page=1"
  );
  // url = "".concat("https://api.themoviedb.org/3/search/keyword?api_key=", APIKEY, "&page=1");
  fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data.results);
      movieList = [];
      data.results.forEach((element) => {
        let poster;
        if (element.poster_path === null) {
          poster = "../img/1.jpg";
        } else {
          poster = "".concat(baseImageURL, "w185", element.poster_path);
        }
        newMovie = {
          title: element.title,
          img: poster,
          desc: element.overview,
        };
        movieList.push(newMovie);
      });
      buildMovieList(movieList);
    });
};

let runSearch = (keyword) => {
  let newMovie;
  let url = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIKEY,
    "&query=",
    keyword
  );
  fetch(url)
    .then((result) => result.json())
    .then((data) => {
      console.log(data.results);
      movieList = [];
      data.results.forEach((element) => {
        let poster;
        if (element.poster_path === null) {
          poster = "../img/1.jpg";
        } else {
          poster = "".concat(baseImageURL, "w185", element.poster_path);
        }
        newMovie = {
          title: element.title,
          img: poster,
          desc: element.overview,
        };
        movieList.push(newMovie);
      });
      buildMovieList(movieList);
    });
};

document.addEventListener("DOMContentLoaded", getConfig);

/* *** FUNGSI ANTARA *** */
const buildMovieList = (movieList) => {
  /* KAMUS LOKAL */
  let movieListHTML;
  let i;
  let newMovieHTML;
  /* ALGORITMA */
  // Inisialisasi
  movieListHTML = document.getElementById("movieList-grid");
  movieListHTML.innerHTML = "";
  movieList.forEach((movie) => {
    let desc = movie.desc.replace(/'/g, "&aposTemp");
    console.log(desc)
    newMovieHTML = `<div class="content-movieList-grid-item">
                    <img src="${movie.img}" onClick="displayModal('${movie.title}', '${movie.img}', '${desc}')"/>
                    <label>${movie.title}</label>
                </div>`;
    movieListHTML.innerHTML += newMovieHTML;
  });
};

const displayModal = (title, img, desc) => {
  /* KAMUS LOKAL */
  let modalHTML = document.getElementById("modal");
  let procDesc;
  /* ALGORITMA */
  procDesc = desc.replace(/&aposTemp/g, "'");
  modalHTML.style.display = "block";
  modalHTML.innerHTML = `<div class="modal-content">
                          <div class="modal-content-img">
                            <img src="${img}"/>
                          </div>
                          <div class="modal-content-span">
                            <h1>${title}</h1>
                            <p>${procDesc}</p>
                          </div>
                         </div>`;
};

/* *** ALGORITMA *** */
buildMovieList(movieList);

/* FILTER */
document
  .getElementById("inputSearch")
  .addEventListener("submit", (eventInput) => {
    eventInput.preventDefault();
    // console.log(document.getElementById("inputSearch").elements[0].value);
    runSearch(document.getElementById("inputSearch").elements[0].value);
  });

/* NAVBAR ANIMATION */
window.onscroll = () => {
  if (document.body.scrollTop > 25 || document.documentElement.scrollTop > 25) {
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

/* MODAL */
window.onclick = (eventModal) => {
  if (eventModal.target === document.getElementById("modal"))
    document.getElementById("modal").style.display = "none";
};

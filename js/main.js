/* *** KAMUS *** */
const movieList = [
  { title: "Money Heist1", img: "../img/1.jpg", desc: "a" },
  { title: "Money Heist2", img: "../img/1.jpg", desc: "b" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "c" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "d" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "e" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "f" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "g" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "h" },
];

/* *** FUNGSI ANTARA *** */
const buildMovieList = (movieList) => {
  /* KAMUS LOKAL */
  let movieListHTML;
  let i;
  let newMovie;
  /* ALGORITMA */
  // Inisialisasi
  movieListHTML = document.getElementById("movieList-grid");
  movieListHTML.innerHTML = "";
  for (i = 0; i < movieList.length; i++) {
    // newMovie = `<div class="content-movieList-grid-item">
    //                 <img class="lazy" data-src="${movieList[i].img}" />
    //                 <label>${movieList[i].title}</label>
    //             </div>`;
    newMovie = `<div class="content-movieList-grid-item">
                    <img src="${movieList[i].img}" onClick="displayModal('${movieList[i].title}', '${movieList[i].img}', '${movieList[i].desc}')"/>
                    <label>${movieList[i].title}</label>
                </div>`;
    movieListHTML.innerHTML += newMovie;
  }
};

const displayModal = (title, img, desc) => {
  /* KAMUS LOKAL */
  let modalHTML = document.getElementById("modal")
  let newModal
  /* ALGORITMA */
  modalHTML.style.display = "block";
  modalHTML.innerHTML = "";
  newModal = `<div class="modal-content">
                <div class="modal-content-img">
                  <img src="${img}"/>
                </div>
                <div class="modal-content-span">
                  <h1>${title}</h1>
                  <p>${desc}</p>
                </div>
              </div>`
  modalHTML.innerHTML += newModal;
};

/* *** ALGORITMA *** */
buildMovieList(movieList);

/* FILTER */
document
  .getElementById("inputSearch")
  .addEventListener("keyup", (eventInput) => {
    /* KAMUS LOKAL */
    let i;
    let newMovieList;
    let currMovie;
    /* ALGORITMA */
    newMovieList = [];
    for (i = 0; i < movieList.length; i++) {
      currMovie = movieList[i].title.toLowerCase();
      if (currMovie.includes(eventInput.target.value.toLowerCase())) {
        newMovieList.push(movieList[i]);
      }
    }
    console.log(newMovieList);
    buildMovieList(newMovieList);
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

/* LAZY LOAD */
// document.addEventListener("DOMContentLoaded", function () {
//   var lazyloadImages = document.querySelectorAll("img.lazy");
//   var lazyloadThrottleTimeout;

//   function lazyload() {
//     if (lazyloadThrottleTimeout) {
//       clearTimeout(lazyloadThrottleTimeout);
//     }

//     lazyloadThrottleTimeout = setTimeout(function () {
//       var scrollTop = window.pageYOffset;
//       lazyloadImages.forEach(function (img) {
//         if (img.offsetTop < window.innerHeight + scrollTop) {
//           img.src = img.dataset.src;
//           img.classList.remove("lazy");
//         }
//       });
//       if (lazyloadImages.length == 0) {
//         document.removeEventListener("scroll", lazyload);
//         window.removeEventListener("resize", lazyload);
//         window.removeEventListener("orientationChange", lazyload);
//       }
//     }, 20);
//   }
//
//   document.addEventListener("scroll", lazyload);
//   window.addEventListener("resize", lazyload);
//   window.addEventListener("orientationChange", lazyload);
// });

/* MODAL */
window.onclick = (eventModal) => {
  if (eventModal.target === document.getElementById("modal"))
    document.getElementById("modal").style.display = "none";
};

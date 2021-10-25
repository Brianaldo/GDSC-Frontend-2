/* *** KAMUS *** */
const movieList = [
  { title: "Money Heist1", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist2", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
  { title: "Money Heist", img: "../img/1.jpg", desc: "" },
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
                    <img class="lazy" src="${movieList[i].img}" />
                    <label>${movieList[i].title}</label>
                </div>`;
    movieListHTML.innerHTML += newMovie;
  }
};

/* *** ALGORITMA *** */
buildMovieList(movieList);

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

document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;
  
  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    
    
    lazyloadThrottleTimeout = setTimeout(function() {
        var scrollTop = window.pageYOffset;
        lazyloadImages.forEach(function(img) {
            if(img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
        });
        if(lazyloadImages.length == 0) { 
          document.removeEventListener("scroll", lazyload);
          window.removeEventListener("resize", lazyload);
          window.removeEventListener("orientationChange", lazyload);
        }
    }, 20);
  }
  
  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});
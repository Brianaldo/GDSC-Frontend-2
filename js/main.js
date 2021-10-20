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
    newMovie = `<div class="content-movieList-grid-item">
                        <img src="${movieList[i].img}" />
                        <label>${movieList[i].title}</label>
                    </div>`;
    movieListHTML.innerHTML += newMovie;
  }
};

/* *** ALGORITMA *** */
buildMovieList(movieList);

document.getElementById("inputSearch").addEventListener("keyup", (event) => {
  // console.log(event.target.value);
  /* KAMUS LOKAL */
  let i;
  let newMovieList;
  let currMovie;
  /* ALGORITMA */
  newMovieList = [];
  for (i = 0; i < movieList.length; i++) {
    currMovie = movieList[i].title.toLowerCase();
    if (currMovie.includes(event.target.value.toLowerCase())) {
      newMovieList.push(movieList[i]);
    }
  }
  console.log(newMovieList);
  buildMovieList(newMovieList);
});

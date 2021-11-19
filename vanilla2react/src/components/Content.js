import { useEffect, useState } from "react";

const Content = (props) => {
  const [movieList, setMovieList] = useState([]);
  let tempMovieList;
  let baseURL = "https://api.themoviedb.org/3/";
  const [configData, setConfigData] = useState("");
  const [baseImageURL, setBaseImageURL] = useState("");
  let url;
  let newMovie;
  const APIKEY = "a16108f68fc8c50911181985a3114d13";
  useEffect(() => {
    url = "".concat(baseURL, "configuration?api_key=", APIKEY);
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        setBaseImageURL(data.images.secure_base_url.toString());
        setConfigData(data.images.toString());
        console.log("config:", data);
        console.log("config fetched");
        firstLoad(data.images.secure_base_url.toString(), data.images.toString());
      })
      .catch((err) => {
        alert(err);
      });
      
  }, []);
  const firstLoad = (a, b) => {
    url = "".concat(
      "https://api.themoviedb.org/3/movie/popular?api_key=",
      APIKEY,
      "&language=en-US&page=1"
    );
    fetch(url)
      .then((result) => {
        return result.json();
      })
      .then((data) => {
        // console.log(data.results);
        let tempMovieList = [];
        data.results.forEach((element) => {
          let poster;
          if (element.poster_path === null) {
            poster = "../img/1.jpg";
          } else {
            poster = "".concat(a, "w185", element.poster_path);
          }
          newMovie = {
            title: element.title,
            img: poster,
            desc: element.overview,
          };
          tempMovieList.push(newMovie);
        });
        setMovieList(tempMovieList);
      });
  };

  console.log(movieList);

  const runSearch = (evRun) => {
    evRun.preventDefault();
    let newMovie;
    let url = "".concat(
      baseURL,
      "search/movie?api_key=",
      APIKEY,
      "&query=",
      evRun.target[0].value
    );
    fetch(url)
      .then((result) => result.json())
      .then((data) => {
        console.log(data.results);
        tempMovieList = [];
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
          tempMovieList.push(newMovie);
        });
        // buildMovieList(movieList);
        setMovieList(tempMovieList);
      });
  };
//   firstLoad();
  return (
    <div className="content">
      <div className="content-searchBar">
        <form id="inputSearch" onSubmit={runSearch}>
          <input type="text" name="" />
        </form>
      </div>
      <div className="content-movieList">
        <div className="content-movieList-grid" id="movieList-grid">
          {movieList.map((movie) => (
            //   console.log(movie.title)
            <div className="content-movieList-grid-item">
              <div className="content-movieList-grid-item-wishlist">
                <svg
                  class="heart"
                  viewBox="0 0 32 29.6"
                  onClick={() => {
                    props.addWishList(movie);
                  }}
                >
                  <path
                    d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
	c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"
                  />
                </svg>
              </div>
              <img
                src={movie.img}
                onClick={() => {
                  props.getInfo(movie.title, movie.img, movie.desc);
                }}
              />
              <label>{movie.title}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Content;

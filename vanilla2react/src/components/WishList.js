import { useState } from "react";

const WishList = (props) => {
  const [isHoverWishList, setIsHoverWishList] = useState(false);
  return (
    <div className="wishlist">
      <button
        class="dropbtn"
        onMouseEnter={() => setIsHoverWishList(true)}
        onMouseLeave={() => setIsHoverWishList(false)}
      >
        Wish List
      </button>
      {isHoverWishList ? (
        <div class="dropdown-content">
          {props.wl.map((movie) => (
            <p>{movie.title}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default WishList;

import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio eligendi
          deserunt itaque ad quisquam alias hic quam voluptatem omnis iure?
          Reprehenderit tenetur nostrum iure qui, perspiciatis beatae distinctio
          ex odit.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;

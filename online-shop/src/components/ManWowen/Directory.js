import React from "react";
import ShopMen from "../../assets/shopMens.jpg";
import ShopWomen from "../../assets/shopWomens.jpg";
import "./directory.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div className="item" style={{ backgroundImage: `url(${ShopMen})` }}>
          <a>Shop Mans</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a>Shop Womens</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;

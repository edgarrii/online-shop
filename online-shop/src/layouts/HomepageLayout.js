import React from "react";
import Header from "../components/header/Header";

const HomepageLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header />
      {props.children}
    </div>
  );
};

export default HomepageLayout;
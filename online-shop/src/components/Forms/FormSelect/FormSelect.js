import React from "react";
import "./formSelect.scss";

const FormSelect = () => {
  return (
    <div className="formRow">
      <select className="formSelect" value="VALIE">
        <option>Mens</option>
        <option>Womans</option>
      </select>
    </div>
  );
};

export default FormSelect;

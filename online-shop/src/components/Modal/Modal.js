import React, { useState } from "react";
import "./modal.scss";
import FormSelect from "../Forms/FormSelect/FormSelect";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

const Modal = ({ active, setActive }) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modalContent active" : "modalContent"}
        onClick={(e) => e.stopPropagation()}
      >
        <form>
          <FormSelect
            label="Category"
            options={[
              {
                value: "mens",
                name: "Mens",
              },
              {
                value: "womens",
                name: "Womens",
              },
            ]}
            // handleChange={(e) => setProductCategory(e.target.value)}
          />

          <FormInput
            label="Name"
            type="text"
            // value="productName"
            // handleChange={(e) => setProductName(e.target.value)}
          />

          <FormInput
            label="Main image URL"
            type="url"
            // value="productThumbnail"
            // handleChange={(e) => setProductThumbnail(e.target.value)}
          />

          <FormInput
            label="Price"
            type="number"
            min="0.00"
            max="10000.00"
            step="0.01"
            value="productPrice"
            // handleChange={(e) => setProductPrice(e.target.value)}
          />

          <div className="buttonsModal">
            <Button className="addBtn btn" type="submit">
              Add product
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setActive(false);
              }}
              className="cancelBtn btn"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;

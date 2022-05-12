import "./product.styles.scss";
import React from "react";
import Button from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  return (
    <div className="product-card-container">
      <img src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted">Add to Cart</Button>
    </div>
  );
};

export default ProductCard;

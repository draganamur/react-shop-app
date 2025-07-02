import React from "react";
import Button from "../button/Button";
import classes from "./Products.module.scss";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setSelectedItem, addItemTocart } from "../../store/slices/cart-slice";
import { useNavigate } from "react-router-dom";
import { ProductCardProps } from "../../interfaces/index";
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleShowDetails = () => {
    dispatch(setSelectedItem(product));
    navigate(`${product.id}`);
  };

  const addItemHandler = () => {
    dispatch(
      addItemTocart({
        title: product.title,
        price: product.price,
        id: product.id,
        image: product.image,
      })
    );
  };

  return (
    <div className={classes.productCard}>
      <div className={classes.productImage}>
        <img src={product.image} alt={product.title} />
      </div>

      <div className={classes.productName}>{product.title}</div>
      <div className={classes.productPrice}>${product.price}</div>
      <div className={classes.productDetails}>
        <div className={classes.productDescription}>{product.description}</div>
        <Button className={classes.detailsButton} onClick={handleShowDetails}>
          <span className="icon">👁️</span>Details
        </Button>
      </div>
      <Button className={classes.addToCart} onClick={addItemHandler}>
        🛒 ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;

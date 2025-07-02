import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import classes from "./CartDetails.module.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { addItemTocart } from "../../store/slices/cart-slice";
import { API_ROUTES } from "../../utils/constants";
import { useBackToShop } from "../../hooks/useBackToShop";

const CartDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) => state.cart.selectedItem);

  const backToShop = useBackToShop();

  const addItemToCart = () => {
    dispatch(
      addItemTocart({
        title: product.title,
        price: product.price,
        image: product.image,
        id: product.id,
      })
    );
    navigate(API_ROUTES.CART, { replace: true });
  };
  return (
    <div className={classes.cart}>
      <Button className={classes.button} onClick={backToShop}>
        🛒
      </Button>
      <div className={classes.image}>
        {" "}
        <img src={product.image} alt={product.title} />
      </div>
      <div className={classes.details}>
        <div className={classes.name}>{product.title}</div>

        <div className={classes.price}>Price: ${product.price}</div>
        <Button className={classes.addButton} onClick={addItemToCart}>
          ADD
        </Button>
        <div className={classes.description}>{product.description}</div>
      </div>
    </div>
  );
};

export default CartDetails;

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./Products.module.scss";
import CartButton from "../cart/CartButton";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { getDesign } from "../../utils";
import { Product } from "../../interfaces";
import { fetchProducts } from "../../services/ApiConsumer";

const Products = () => {
  const designVersion = useAppSelector((state) => state.config.designVersion);

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div
      className={`${classes.productPage} ${getDesign(designVersion, classes)}`}
    >
      <header className={`${getDesign(designVersion, classes)}`}>
        <div className={classes.title}>
          Sh<span>o</span>p🛍️
          <CartButton className={classes.cartIcon} />
        </div>

        <p className={classes.subtitle}>
          Everything you need, all in one place.
        </p>
      </header>
      <div className={classes.product}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;

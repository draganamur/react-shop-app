import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import classes from "./Products.module.scss";
import CartButton from "../cart/CartButton";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { getDesign } from "../../utils";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const designVersion = useAppSelector((state) => state.config.designVersion);

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

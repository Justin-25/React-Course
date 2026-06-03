import axios from "axios";
import { Link } from "react-router";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchHomeData() {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }

    fetchHomeData()
  }, []);

  return (
    <>
      <link rel="icon" type="image/png" href="/home-favicon.png" />
      <title>HomePage</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}

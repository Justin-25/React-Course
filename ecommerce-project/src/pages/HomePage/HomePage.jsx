import axios from "axios";
import { Link, useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { ProductsGrid } from "./ProductsGrid";
import "./HomePage.css";

export function HomePage({ cart, loadCartData }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    async function fetchHomeData() {
      if (search) {
        const response = await axios.get(`/api/products?search=${search}`);
          setProducts(response.data);
      } else {
        const response = await axios.get(`/api/products`);
          setProducts(response.data);
      }
    }

    fetchHomeData();
  }, [search]);

  return (
    <>
      <link rel="icon" type="image/png" href="/home-favicon.png" />
      <title>HomePage</title>

      <Header cart={cart} search={search} />

      <div className="home-page">
        <ProductsGrid products={products} loadCartData={loadCartData} />
      </div>
    </>
  );
}

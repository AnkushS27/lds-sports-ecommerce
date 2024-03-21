"use client";

import { useState, useEffect } from "react";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import { loggedIn } from "../../api/user/loggedIn";
import style1 from "./page.module.css";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import ProductCard from "@/Components/productCard/page";
import { auth } from "@/auth";
import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import { getSession } from "next-auth/react";
import Footer from "@/Components/Footer/page";

export default function SearchResults({
  params,
}: {
  params: { query: string };
}) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        setSession(userSession);
        const query = params.query;

        const res = await fetch("/api/product/getSearchProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar
        params={{ name: "ABC", loggedIn: session ? true : false }}
      />
      <div className={style1.HorizontalmainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: session ? true : false }}
        />
        <div className={style1.VerticalmainContainer}>
          {/* <div className={style1.optionsSection}>
            <div className={style1.optionItem}>sort by price low to high </div>
            <div className={style1.optionItem}> sort by price high to low </div>
            <div className={style1.optionItem}> sort by reviews </div>
            <div className={style1.optionItem}> sort by latest </div>
          </div> */}
            <div className={style1.resultsHead}>
              Results for &quot;{params.query}&quot;
            </div>
          <div className={style1.productCardWrapper}>
              {loading ? (
                <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100px",
                  }}
                >
                  Loading products please wait...
                </h4>
              ) : products.length === 0 ? (
                <h4>No products found.</h4>
              ) : (
                products.map((product) => (
                  <ProductCard key={product.productId} params={product} />
                ))
              )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

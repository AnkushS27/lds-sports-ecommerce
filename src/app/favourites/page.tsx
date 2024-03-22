"use client";

import { useState, useEffect } from "react";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";

import { loggedIn } from "../api/user/loggedIn";

import style1 from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import { auth } from "@/auth";
import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import { getSession } from "next-auth/react";

export default function Favourites() {
  const [session, setSession] = useState<any>();
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        const userId = userSession?.user?.email;
        setSession(userSession);
        const res = await fetch("/api/favourite/getAllFavourites", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar
        params={{ name: "ABC", loggedIn: session ? true : false }}
      />
      <div className={style1.HorizontalMainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: session ? true : false }}
        />
        <div className={style1.VerticalMainContainer}>
          <div className={style1.productCardWrapper}>
            <div className={style1.productCardHead}> Favourites </div>
            {loading ? (
              <h4
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100px"
              }}
            >
              Loading, please wait...
            </h4>
            ) : product.length === 0 ? (
              <h4
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100px"
                  }}
                >
                  No products in Favourites
                </h4>
            ) : (
              product.map((product, index) => (
                <ProductCard key={index} params={product} />
              ))
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

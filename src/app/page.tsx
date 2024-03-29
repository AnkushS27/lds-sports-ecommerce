// Styles
"use client";
import { useState, useEffect } from "react";
import Footer from "@/Components/Footer/page";
import style1 from "./page.module.css";

// Imports

// Components
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import ProductCard from "@/Components/productCard/page";
import { auth } from "@/auth";
import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import { getSession } from "next-auth/react";
import Loader from "@/Components/Loader/page";

// const product: ProductType = {
//     productId: "ABC123",
//     img: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
//     name: "Sample Product",
//     desc: "This is a sample product description.",
//     companyId: "XYZ456",
//     tags: ["tag1", "tag2", "tag3"],
//     variations: [JSON.stringify({diff:'',stock:20,price:'₹120'})],
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     comments: ["comment1", "comment2"],
//     offers: ["offer1", "offer2"]
// };

// let forYou: ProductType[] = []
// let others: ProductType[] = []

export default function Home() {
  const [session, setSession] = useState<any>();
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        setSession(userSession);
        const res = await fetch("/api/product/getAllProducts", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  let trending: ProductType[] = product;
  let latest: ProductType[] = product;

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
          <div className={style1.brandAdsDisplayContainer}>
            Display your brand ads here.
          </div>
          <div className={style1.sectionContainer}>
            <div className={style1.sectionHead}> Categories </div>
            <div className={style1.categoriesContainer}>
              <div className={style1.categoriesItem}> Cricket bat </div>
              <div className={style1.categoriesItem}> ball </div>
              <div className={style1.categoriesItem}> tigh pads </div>
              <div className={style1.categoriesItem}> Other accessories </div>
            </div>
          </div>
          <div className={style1.sectionContainer}>
            <div className={style1.sectionHead}> Latest </div>
            <div
              className={style1.categoriesContainer}
              style={{
                flexWrap: "nowrap",
                overflowX: "auto",
                maxWidth: "100%",
              }}
            >
              {latest && !loading ? (
                latest.map((product, index) => {
                  return <ProductCard key={index} params={product} />;
                })
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className={style1.sectionContainer}>
            <div className={style1.sectionHead}> Trending </div>
            <div
              className={style1.categoriesContainer}
              style={{
                flexWrap: "nowrap",
                overflowX: "auto",
                maxWidth: "100%",
              }}
            >
              {trending && !loading ? (
                trending.map((product, index) => {
                  return <ProductCard key={index} params={product} />;
                })
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

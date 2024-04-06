"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import { loggedIn } from "@/app/api/user/loggedIn";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import { getSession, useSession } from "next-auth/react";
import { CartVariation, ProductType } from "@/TypeInterfaces/TypeInterfaces";
import Loader from "@/Components/Loader/page";

export default function Cart() {
  const [session, setSession] = useState<any>();
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [variantValues, setVariantValues] = useState<CartVariation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        const userId = userSession?.user?.email;
        setSession(userSession);
        const res = await fetch("/api/cart/getAllCart", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("Data on client side: " + data);
        setProducts(data);

        const extractedVariants = data.map((prod: any) => ({
          qty: prod.qty,
          colorIdx: prod.colorIdx,
          variationIdx: prod.variationIdx,
        }));
        setVariantValues(extractedVariants);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Update the quantity in the cartProducts array
    const updatedCart = product.map((prod) =>
      prod.productId === productId ? { ...prod, quantity: newQuantity } : prod
    );
    setProducts(updatedCart);
  };


  // WOrk on subtotal calculation left from here last time //
  // ********************************** //
  const calculateSubtotal = () => {
    return product.reduce((subtotal, prod) => {
      let productSubtotal = 0;
      variantValues.map((value, index) => {
        productSubtotal = prod.variations.variations[value.variationIdx].price * (prod.quantity || 1);
      });
      return subtotal + productSubtotal;
    }, 0);
  };

  return (
    <div className={styles.mainWrapper}>
      <HorizontalNavBar
        params={{ name: "ABC", loggedIn: session ? true : false }}
      />
      <div className={styles.HorizontalmainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: session ? true : false }}
        />
        <div className={styles.VerticalmainContainer}>
          <div className={styles.productCradWrapper}>
            <div className={styles.productCardHead}> Cart </div>
            {loading ? (
              <Loader />
            ) : product.length === 0 ? (
              <h4
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100px",
                }}
              >
                No products in Cart!
              </h4>
            ) : (
              product.map((product, index) => (
                <ProductCard
                  key={index}
                  params={product}
                  variant={variantValues[index]}
                  isCart={true}
                  handleQuantityChange={handleQuantityChange}
                />
              ))
            )}
          </div>
          <div className={styles.cartTotals}>
            <h2>Order Summary</h2>
            <div className={styles.subtotal}>
              <span>SUBTOTAL</span>
              <span>Rs. {calculateSubtotal()}</span>
            </div>
            <div className={styles.total}>
              <span>TOTAL</span>
              <span>Rs. {calculateSubtotal()}</span>
            </div>
            <button className={styles.checkoutButton}>
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

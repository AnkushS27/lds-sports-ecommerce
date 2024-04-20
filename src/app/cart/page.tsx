"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import { getSession } from "next-auth/react";
import { CartVariation, ProductType } from "@/TypeInterfaces/TypeInterfaces";
import Loader from "@/Components/Loader/page";
import PaymentTesting from "@/Components/PaymentButton/page";

export default function Cart() {
  const [session, setSession] = useState<any>();
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [variantValues, setVariantValues] = useState<CartVariation[]>([]);

  let fetchData = async () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Update the quantity in the cartProducts array
    const updatedCart = product.map((prod) =>
      prod.productId === productId ? { ...prod, quantity: newQuantity } : prod
    );
    setProducts(updatedCart);
    fetchData();
  };

  const calculateSubtotal = () => {
    const subtotal = product.reduce((total, prod) => {
      return variantValues.reduce((acc, value) => {
        const quantity = value.qty || 1; // Default quantity is 1 if not provided
        const variationPrice = prod.variations.variations[value.variationIdx].price;
        return acc + variationPrice * quantity; // Accumulate total price for each variation
      }, 0);
    }, 0);
    return subtotal;
  };

  const placeOrder = async () => {
    try {
      const userSession = await getSession();
      const userId = userSession?.user?.email;
      const res = await fetch("/api/order/placeOrder", {
        method: "POST",
        body: JSON.stringify({ userId, products: product, variants: variantValues, totalPrice: calculateSubtotal()}),
      });
      if (!res.ok) {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  }

  const handlePaymentClick = async () => {
    // Example: Call placeOrder function from Cart component
    await placeOrder();
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
            {/* <div className={styles.subtotal}>
              <span>SUBTOTAL</span>
              <span>Rs. {subTotal}</span>
            </div> */}
            <div className={styles.total}>
              <span>TOTAL</span>
              <span>Rs. {calculateSubtotal()}.00</span>
            </div>
            <PaymentTesting amount={calculateSubtotal()*100} handlePaymentClick={handlePaymentClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

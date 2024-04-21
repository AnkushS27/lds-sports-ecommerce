"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import { getSession } from "next-auth/react";
import {
  AddressType,
  CartVariation,
  ProductType,
} from "@/TypeInterfaces/TypeInterfaces";
import Loader from "@/Components/Loader/page";
import PaymentTesting from "@/Components/PaymentButton/page";

export default function Cart() {
  const [session, setSession] = useState<any>();
  const [product, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [variantValues, setVariantValues] = useState<CartVariation[]>([]);
  const [userAddress, setUserAddress] = useState<AddressType[]>();

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

      const res2 = await fetch("/api/user/getUserAddress", {
        method: "POST",
        body: JSON.stringify({ userId }),
      });
      if (!res2.ok) {
        throw new Error("Failed to fetch data");
      }
      const data2 = await res2.json();
      setUserAddress(data2);

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
    let subtotal = 0;
    for (let i = 0; i < product.length; i++) {
      const prod = product[i];
      const value = variantValues[i];
      const variation = prod.variations.variations[value.variationIdx];
      subtotal += variation.price * value.qty;
      console.log(variation.price, value.qty, subtotal);
    }
    return subtotal;
  };

  const placeOrder = async () => {
    try {
      const userSession = await getSession();
      const userId = userSession?.user?.email;
      const res = await fetch("/api/order/placeOrder", {
        method: "POST",
        body: JSON.stringify({
          userId,
          products: product,
          variants: variantValues,
          totalPrice: calculateSubtotal(),
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

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
            <div className={styles.total}>
              <span>TOTAL</span>
              <span>Rs. {calculateSubtotal()}.00</span>
            </div>
            <div className={styles.addressContainer}>
              Select Shipping Address:
              <select>
                {userAddress &&
                  userAddress.map((address, index) => (
                    <option key={index} value={index}>
                      {address.houseno}, {address.street}, {address.city}
                    </option>
                  ))}
              </select>
            </div>
            <PaymentTesting
              amount={calculateSubtotal() * 100}
              handlePaymentClick={handlePaymentClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

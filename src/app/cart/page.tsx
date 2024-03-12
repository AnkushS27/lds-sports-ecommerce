"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import { loggedIn } from "@/app/api/user/loggedIn";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data: session } = useSession();

  type Product = {
    pid: string;
    name: string;
    img?: string;
    desc: string
    price: string;
    stock: string;
    quantity?: number;
    company: string;
    offer?: {
      discount: string;
      newPrice?: string;
    };
  };

  // State to store the list of products in the cart
  const [cartProducts, setCartProducts] = useState<Product[]>([
    // Initial list of products, replace this with your actual data
    { name: "prod_1", company: "c1", pid: "001", desc:"sample desc", price: "₹1500", stock: "50" },
    { name: "prod_2", company: "c1", pid: "002", desc:"sample desc", price: "₹2000", stock: "30" },
    { name: "prod_3", company: "c1", pid: "003", desc:"sample desc", price: "₹6500", stock: "30" },
    { name: "prod_4", company: "c1", pid: "004", desc:"sample desc", price: "₹1000", stock: "30" },
    { name: "prod_5", company: "c1", pid: "005", desc:"sample desc", price: "₹1500", stock: "30" },
    // ... add more products as needed
  ]);

  // Function to handle product removal from the cart
  const handleRemoveFromCart = (productId: string) => {
    // Filter out the product to be removed
    const updatedCart = cartProducts.filter(
      (product) => product.pid !== productId
    );
    setCartProducts(updatedCart);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    // Update the quantity in the cartProducts array
    const updatedCart = cartProducts.map((product) =>
      product.pid === productId
        ? { ...product, quantity: newQuantity }
        : product
    );
    setCartProducts(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((subtotal, product) => {
      const productPrice = parseInt(product.price.replace(/[^\d]/g, ""), 10);
      return subtotal + productPrice * (product.quantity || 1);
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
            {/* Map through the cartProducts and render ProductCard for each product */}
            {cartProducts.map((product) => (
              <ProductCard
                key={product.pid}
                params={{
                  productId: product.pid,
                  img: [product.img || ""],
                  name: product.name,
                  desc: product.desc, // Add the description if available
                  companyId: product.company,
                  tags: [], // Add tags if available
                  variations: [], // Add variations if available
                }}
                isCart={true}
                handleRemoveFromCart={() => handleRemoveFromCart(product.pid)}
                handleQuantityChange={(quantity) =>
                  handleQuantityChange(product.pid, quantity)
                }
              />
            ))}
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

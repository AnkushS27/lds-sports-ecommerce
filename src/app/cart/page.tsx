"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import ProductCard from "@/Components/productCard/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";


import { loggedIn } from '@/app/api/user/loggedIn';
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";

export default function Cart() {
  const isloggedIn = loggedIn({});
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Shadowtech Eclipse Sneakers",
      image: "/shadowtech-eclipse-sneakers.jpg",
      price: 120.53,
      quantity: 1,
      isChecked: true,
    },
    {
      id: 2,
      name: "Neonoir Vanguard Boots",
      image: "/neonoir-vanguard-boots.jpg",
      price: 210.14,
      quantity: 1,
      isChecked: false,
    },
    {
      id: 3,
      name: "Cybergoth Stealth Kicks",
      image: "/cybergoth-stealth-kicks.jpg",
      price: 154.32,
      quantity: 1,
      isChecked: false,
    },
  ]);

  const handleCheckboxChange = (itemId: number, checked: boolean) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: checked } : item
      )
    );
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      // If new quantity is less than 1, filter out the item from the cart
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } else {
      // Update the quantity if new quantity is greater than or equal to 1
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateSubtotal = () => {
    const subtotal = cartItems
      .filter((item) => item.isChecked)
      .reduce((total, item) => total + item.price * item.quantity, 0);

    return subtotal.toFixed(2);
  };

  return (
    <div className={styles.mainWrapper}>
        <HorizontalNavBar params={{name:'ABC',loggedIn: isloggedIn}} />
        <div className={styles.HorizontalmainContainer}> 
            <VerticalNavBar params={{name : 'ABC', loggedIn : isloggedIn, homePage : true}} />
            <div className={styles.VerticalmainContainer}>
              <div className={styles.productCradWrapper}>
                <div className={styles.productCardHead}> Cart </div>
              <ProductCard params={{name:'prod_1',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
              <ProductCard params={{name:'prod_2',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
              <ProductCard params={{name:'prod_3',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
              <ProductCard params={{name:'prod_4',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
              <ProductCard params={{name:'prod_5',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
              <ProductCard params={{name:'prod_6',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
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
                <button className={styles.checkoutButton}>CHECKOUT</button>
              </div>
        </div>
        
      </div>
    </div>
  );
}

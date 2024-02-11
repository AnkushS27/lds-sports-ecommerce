"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Cart() {
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
    <div className={styles.cartWrapper}>
      <div className={styles.cartHeader}>
        <h1 className={styles.cartTitle}>Shopping Cart</h1>
      </div>
      <div className={styles.cartContainer}>
        <ul className={styles.cartItemsList}>
          {cartItems.map((item, index) => (
            <div key={item.id}>
              <li className={styles.cartItem}>
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.itemCheckbox}>
                    <input
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={() =>
                        handleCheckboxChange(item.id, !item.isChecked)
                      }
                    />
                  </div>
                  <div className={styles.itemImage}>
                    <Image src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemSize}>BLACK, US 8</p>
                    <div className={styles.itemQuantity}>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className={styles.itemPrice}>Rs. {item.price}</p>
                    <button className={styles.itemMoveToFavorites}>
                      MOVE TO FAVORITES
                    </button>
                  </div>
                </li>
              </li>
              {index < cartItems.length - 1 && (
                <hr className={styles.horizontalLine} />
              )}
            </div>
          ))}
        </ul>
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
  );
}

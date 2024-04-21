"use client"
import styles from "./page.module.css";


import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/logo.svg";
import { useState } from "react";

export default function VerticalNavBar({
  params,
}: {
  params: {
    name: string;
    loggedIn: boolean;
  };
}) {
  const [showNavBar, setShowNavBar] = useState(false);
  if (!showNavBar) {return(
    <div className={styles.NavOpenContainer} onClick={() => {setShowNavBar(true)}}>
        <div className={styles.NavHamburgerLine}></div>
        <div className={styles.NavHamburgerLine}></div>
        <div className={styles.NavHamburgerLine}></div>
    </div>
)}
  return (
    <div className={styles.navWrapper}>
      <div className={styles.NavMenuCloseBtn} onClick={() => {setShowNavBar(false)}}> Close </div>
      <div className={styles.verticalNavContainer}>
        <Link href="/cms" className={styles.logoContainer}>
          <Image className={styles.logoImage} src={Logo} alt="Logo" />
        </Link>
        <div className={styles.menuItemsContainer}>
          <Link href="/cms" className={styles.menuItem}>
            Dashboard
          </Link>
          <Link href="/cms/product" className={styles.menuItem}>
            Products
          </Link>
          <Link href="/cms/customers" className={styles.menuItem}>
            Customers
          </Link>
          <Link href="/cms/orders" className={styles.menuItem}>
            Orders
          </Link>
          <Link href="#" className={styles.menuItem}>
            Offers/Discounts
          </Link>
        </div>
      </div>
    </div>
  );
}

import styles from "./page.module.css";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../../public/logo.svg";

export default function VerticalNavBar({
  params,
}: {
  params: {
    name: string;
    loggedIn: boolean;
  };
}) {
  return (
    <div className={styles.navWrapper}>
      <div className={styles.verticalNavContainer}>
        <Link href="/cms" className={styles.logoContainer}>
          <Image className={styles.logoImage} src={Logo} alt="Logo" />
        </Link>
        <div className={styles.menuItemsContainer}>
          <Link href="#" className={styles.menuItem}>
            Dashboard
          </Link>
          <Link href="#" className={styles.menuItem}>
            Products
          </Link>
          <Link href="#" className={styles.menuItem}>
            Customers
          </Link>
          <Link href="#" className={styles.menuItem}>
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

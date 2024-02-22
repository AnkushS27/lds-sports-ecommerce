import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";

import styles from "./page.module.css";
import { auth } from "@/auth";

export default async function order({ params }: { params: { Id: string } }) {
  const session = await auth();
  return (
    <div className={styles.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: session?true:false}} />
            <div className={styles.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : session?true:false}} />
                <div className={styles.VerticalmainContainer}>
                <div className={styles.order}>
      <h2 className={styles.orderId}>Order #987654</h2>
      <div className={styles.header}>
        <div className={styles.orderInfo}>
          <p className={styles.customerInfo}>By John Doe from ABC Company</p>
          <p className={styles.createdAt}>Created on October 26, 2023</p>
          <p className={styles.fulfillmentStatus}>Shipped</p>
        </div>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Total Amount</p>
          <p className={styles.summaryValue}>Rs. 123.45</p>
        </div>
        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Shipping Charges</p>
          <p className={styles.summaryValue}>Rs. 10.12</p>
        </div>
        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Discount</p>
          <p className={styles.summaryValue}>Rs. 5.00</p>
        </div>
        <div className={styles.summaryCol}>
          <p className={styles.summaryLabel}>Net Amount</p>
          <p className={styles.summaryValue}>Rs. 118.33</p>
        </div>
      </div>
      <div className={styles.items}>
        <h2>Items in order</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>T-Shirt</td>
              <td>2</td>
              <td>Rs. 39.99</td>
            </tr>
            <tr>
              <td>Mug</td>
              <td>1</td>
              <td>Rs. 19.99</td>
            </tr>
            <tr>
              <td>Notebook</td>
              <td>1</td>
              <td>Rs. 25.00</td>
            </tr>
          </tbody>
        </table>
        <p>Has 3 items</p>
      </div>
    </div>
                    <Footer />
                </div>
            </div>
      </div>
    
  );
}

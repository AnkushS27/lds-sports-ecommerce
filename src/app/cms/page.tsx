import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";
import styles from "./page.module.css";

import { loggedIn } from "../api/user/loggedIn";

import { FaSackDollar } from "react-icons/fa6";
import { AiFillCreditCard } from "react-icons/ai";
import { MdInventory } from "react-icons/md";

export default function Home() {
  const isloggedIn = loggedIn({});
  return (
    <div className={styles.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={styles.VerticalMainContainer}>
        <div className={styles.homeContainer}>
          <div className={styles.cmsContent}>
            <h2>Dashboard</h2>
            <div className={styles.topWrapper}>
              <div className={styles.topContainer}>
                <div className={styles.card}>
                  <h3>
                    Total Revenue
                    <FaSackDollar />
                  </h3>
                  <p>Rs. 1,512.00</p>
                </div>
                <div className={styles.card}>
                  <h3>
                    Total Orders
                    <AiFillCreditCard />
                  </h3>
                  <p>+62</p>
                </div>
                <div className={styles.card}>
                  <h3>
                    Products in Stock
                    <MdInventory />
                  </h3>
                  <p>2</p>
                </div>
              </div>
            </div>
            <div className={styles.graph}>
              <p>Graph will be displayed here...</p>
            </div>
            <div className={styles.recentSectionContainer}>
              <h3>Recent Orders</h3>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Location</th>
                      <th>Fulfillment</th>
                      <th>Payment</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#12345</td>
                      <td>09/20/22</td>
                      <td>John Smith</td>
                      <td>San Francisco, CA</td>
                      <td>Not fulfilled</td>
                      <td>Credit card</td>
                      <td>Rs. 120.00</td>
                    </tr>
                    <tr>
                      <td>#12345</td>
                      <td>09/20/22</td>
                      <td>John Smith</td>
                      <td>San Francisco, CA</td>
                      <td>Not fulfilled</td>
                      <td>Credit card</td>
                      <td>Rs. 120.00</td>
                    </tr>
                    <tr>
                      <td>#12345</td>
                      <td>09/20/22</td>
                      <td>John Smith</td>
                      <td>San Francisco, CA</td>
                      <td>Not fulfilled</td>
                      <td>Credit card</td>
                      <td>Rs. 120.00</td>
                    </tr>
                    {/* Add more rows for other recent orders */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

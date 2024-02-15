import styles from "./page.module.css";

export default function order({ params }: { params: { Id: string } }) {
  return (
    <div className={styles.order}>
      <h2 className={styles.orderId}>Order #987654</h2>
      <div className={styles.upperContainer}>
        <div className={styles.header}>
          <div className={styles.orderInfo}>
            <p className={styles.customerInfo}>By John Doe from ABC Company</p>
            <p className={styles.createdAt}>Created on October 26, 2023</p>
            <p className={styles.fulfillmentStatus}>Shipped</p>
          </div>
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryRow}>
            <p className={styles.summaryLabel}>Total Amount</p>
            <p className={styles.summaryValue}>Rs. 123.45</p>
          </div>
          <div className={styles.summaryRow}>
            <p className={styles.summaryLabel}>Total GST</p>
            <p className={styles.summaryValue}>Rs. 10.12</p>
          </div>
          <div className={styles.summaryRow}>
            <p className={styles.summaryLabel}>Discount</p>
            <p className={styles.summaryValue}>Rs. 5.00</p>
          </div>
          <div className={styles.summaryRow}>
            <p className={styles.summaryLabel}>Net Amount</p>
            <p className={styles.summaryValue}>Rs. 118.33</p>
          </div>
        </div>
      </div>
      <div className={styles.items}>
        <h2>Items in order</h2>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Cost</th>
              <th>Tax</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>T-Shirt</td>
              <td>2</td>
              <td>Rs. 39.99</td>
              <td>Rs. 4.00</td>
            </tr>
            <tr>
              <td>Mug</td>
              <td>1</td>
              <td>Rs. 19.99</td>
              <td>Rs. 2.00</td>
            </tr>
            <tr>
              <td>Notebook</td>
              <td>1</td>
              <td>Rs. 25.00</td>
              <td>Rs. 2.50</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

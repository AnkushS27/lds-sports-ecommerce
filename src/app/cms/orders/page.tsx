import styles from "./page.module.css";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";

export default function OrderPage() {
    const order = [
        {
          id: "001",
          cname: "John Doe",
          tprice: 1300,
          caddress: "123 Main Street, Apartment 4B, Some Long Avenue, Kathmandu, Zip: 44600",
          cphone: "987654321",
          date: "2023-10-10",
          payment: "Cash",
          status: "Pending",
        },
        {
          id: "002",
          cname: "Jane Smith",
          tprice: 800,
          caddress: "456 Oak Lane, Floor 7, Another Long Street, Pokhara, Zip: 33700",
          cphone: "123456789",
          date: "2023-10-12",
          payment: "Credit Card",
          status: "Processing",
        },
        {
          id: "003",
          cname: "Bob Johnson",
          tprice: 2500,
          caddress: "789 Pine Road, Suite 12, Yet Another Long Street, Lalitpur, Zip: 25500",
          cphone: "555444333",
          date: "2023-10-15",
          payment: "Online Transfer",
          status: "Shipped",
        },
        {
          id: "004",
          cname: "Alice Brown",
          tprice: 500,
          caddress: "987 Cedar Court, Unit 5, Longest Street Ever, Bhaktapur, Zip: 11600",
          cphone: "999888777",
          date: "2023-10-18",
          payment: "Cash",
          status: "Delivered",
        },
        // Add more orders data as needed
      ];

  return (
    <div className={styles.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={styles.VerticalMainContainer}>
        <div className={styles.topContainer}>
          <h1>Manage Orders({order.length})</h1>
        </div>
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Search order" />
            <button>Search</button>
        </div>
        <div className={styles.orderContainer}>
          <table className={styles.orderTable}>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Total Price</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Payment Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((order) => (
                <tr key={order.id}>
                  <td>{order.cname}</td>
                  <td>Rs. {order.tprice}</td>
                  <td>{order.caddress}</td>
                  <td>{order.cphone}</td>
                  <td>{order.date}</td>
                  <td>{order.payment}</td>                  
                  <td>{order.status}</td>                  
                  <td>
                    {/* Add buttons or links for managing user accounts */}
                    <button>View</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

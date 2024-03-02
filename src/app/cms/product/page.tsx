import styles from "./page.module.css";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";

export default function ProductPage() {
  const product = [
    {
      id: "001",
      name: "thigh pad",
      price: 400,
      category: "thigh pads",
      date: "2023-10-10",
    },
    {
      id: "002",
      name: "thigh pad",
      price: 350,
      category: "thigh pads",
      date: "2023-10-10",
    },
    {
      id: "003",
      name: "thigh pad",
      price: 300,
      category: "thigh pads",
      date: "2023-10-10",
    },
    // Add more product data as needed
  ];

  return (
    <div className={styles.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={styles.VerticalMainContainer}>
        <div className={styles.topContainer}>
          <h1>Manage Products({product.length})</h1>
          <button>+ Add Product</button>
        </div>
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Search Product" />
            <button>Search</button>
        </div>
        <div className={styles.productContainer}>
          <table className={styles.productTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.date}</td>
                  <td>
                    {/* Add buttons or links for managing user accounts */}
                    <button>View/Modify</button>
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

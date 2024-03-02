// pages/users.tsx

import styles from "./page.module.css";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";

const Users: React.FC = () => {
  // Fetch user data from your API or mock data
  const users = [
    { id: 673521, name: "John Doe", email: "john@example.com" },
    { id: 262563, name: "Jane Doe", email: "jane@example.com" },
    // Add more user data as needed
  ];

  return (
    <div className={styles.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={styles.VerticalMainContainer}>
        <h1>Manage Users</h1>
        <div className={styles.usersContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Add buttons or links for managing user accounts */}
                    <button>Edit</button>
                    <button>Orders</button>
                    <button>Favourites</button>
                    <button>Delete User</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

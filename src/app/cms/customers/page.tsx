"use client";

import { UserType } from "@/TypeInterfaces/TypeInterfaces";
import styles from "./page.module.css";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";
import { useState, useEffect } from "react";

export default function Users() {
  // Fetch user data from your API or mock data
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cms/user/getAllUser", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log(data);
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={styles.VerticalMainContainer}>
        <h1>Manage Users</h1>
        <div className={styles.usersContainer}>
          {loading ? (
            <h4>Loadind please wait..</h4>
          ) : (
            <table className={styles.userTable}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  !loading &&
                  users.map((user: UserType) => (
                    <tr key={user.email}>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.phone}</td>
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
          )}
        </div>
      </div>
    </div>
  );
}

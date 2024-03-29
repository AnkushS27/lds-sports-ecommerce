"use client";

import styles from "./page.module.css";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";

import { useState, useEffect } from "react";
import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import Link from "next/link";

import Loader from "@/Components/Loader/page";

export default function ProductPage() {
  const [product, setProducts] = useState<ProductType[]>([]);
  const [nextProductId, setNextProductId] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/product/getAllProducts", {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setProducts(data);

        let newPIdNumber =
          data.length > 0
            ? parseInt(data[data.length - 1].productId, 10) + 1
            : 1;
        const newPIdw0 = newPIdNumber
          .toString()
          .padStart(
            data.length > 0 ? data[data.length - 1].productId.length : 1,
            "0"
          );
        setNextProductId(newPIdw0);
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
        <div className={styles.topContainer}>
          <h1>Manage Products({product.length})</h1>
          <Link href={`/cms/product/${nextProductId}`}>+ Add Product</Link>
        </div>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search Product" />
          <button>Search</button>
        </div>
        <div className={styles.productContainer}>
          {loading ? (
            <Loader />
          ) : (
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
                {product &&
                  product.map((product) => (
                    <tr key={product.productId}>
                      <td>{product.productId}</td>
                      <td>{product.name}</td>
                      <td>Rs. {product.variations.variations[0].price}</td>
                      <td>
                        {product.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </td>
                      <td>
                        {product.createdAt
                          ? new Date(product.createdAt).toLocaleDateString(
                              "en-GB"
                            )
                          : ""}
                      </td>
                      <td>
                        {/* Add buttons or links for managing user accounts */}
                        <button>View/Modify</button>
                        <button>Delete</button>
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

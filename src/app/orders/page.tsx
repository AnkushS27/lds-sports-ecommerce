"use client";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import style1 from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { OrderType } from "@/TypeInterfaces/TypeInterfaces";
import Loader from "@/Components/Loader/page";

export default function Orders() {
  const [session, setSession] = useState<any>();
  const [orders, setOrders] = useState<OrderType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSession = await getSession();
        const userId = userSession?.user?.email;
        setSession(userSession);
        const res = await fetch("/api/order/getAllOrder", {
          method: "POST",
          body: JSON.stringify({ userId }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar
        params={{ name: "ABC", loggedIn: session ? true : false }}
      />
      <div className={style1.HorizontalmainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: session ? true : false }}
        />
        <div className={style1.VerticalmainContainer}>
          {loading ? (
            <Loader />
          ) : orders && orders.length === 0 ? (
            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100px",
              }}
            >
              No orders!
            </h4>
          ) : (
            <div className={style1.ordersHolder}>
              {orders &&
                orders.map((order, index) => (
                  <Link
                    href={`/orders/${order._id}`}
                    className={style1.orderItemContainer}
                    key={index}
                  >
                    <Image src={'/images/box.jpg'} width={80} height={80} alt={"image"}className={style1.ImgContainer} />

                    <div className={style1.orderItemRight}>
                      <div className={style1.orderRightItemId}>
                        Order Id: {order._id}
                      </div>
                      <div className={style1.orderTitleLabel}>
                        Ordered on:{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </div>
                      <div className={style1.orderRightItemPrice}>
                        Total Price: Rs. {order.totalPrice}.00
                      </div>
                      <div className={style1.orderRightItemId}>
                        *has {order.products.length} item
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

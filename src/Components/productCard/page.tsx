"use client";

import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
// style
import style1 from "./page.module.css";

// Imports
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import { getSession } from "next-auth/react";

export default function ProductCard({
  params,
  checkFavourite,
  checkCart,
  isCart = false,
  handleRemoveFromCart,
  handleQuantityChange,
}: {
  params: ProductType;
  checkFavourite?: boolean;
  checkCart?: boolean;
  isCart?: boolean; // Add isCart to the type definition
  handleRemoveFromCart?: () => void;
  handleQuantityChange?: (quantity: number) => void;
}) {
  const [favourite, setFavourite] = useState(checkFavourite);
  const [cart, setCart] = useState(checkCart);
  const [qty, setQty] = useState(1);
  const stock = 10;
  const price = params.variations.variations[0].price;

  const fetchFavorites = async () => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const productId = params.productId;
      if (userId) {
        const response = await fetch(
          "/api/favourite/checkFavourite", 
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, userId }),
          }
        );
        const data = await response.json();
        setFavourite(data.isFavourite);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };
  
  useEffect(() => {
    if (checkFavourite === undefined) {
      fetchFavorites();
    }
  }, []);

  const updateChoice = async (choice: string) => {
    // Backend function call is left.
    if (choice === "favourite") {
      if (!favourite) {
        await addToFavorites(params.productId);
      } else {
        await removeFromFavorites(params.productId);
      }
    } else {
      setCart(!cart);
    }
  };

  const handleDecreaseQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
      handleQuantityChange && handleQuantityChange(qty - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (qty < stock) {
      setQty(qty + 1);
      handleQuantityChange && handleQuantityChange(qty + 1);
    }
  };

  const addToFavorites = async (productId: string) => {
    try {
      const session = await getSession();
        const userId = session?.user?.email;
      const response = await fetch('/api/favourite/addFavourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      });
      if (response.ok) {
        setFavourite(true); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      // Handle error, maybe show a notification
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const response = await fetch('/api/favourite/removeFavourite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, userId }),
      });
      if (response.ok) {
        setFavourite(false); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
      // Handle error, maybe show a notification
    }
  };

  return (
    <div className={style1.productMainContainer}>
      {/* Image here */}
      <Link href={`/product/${params.productId}`}>
        {params.img && (
          <Image
            src={params.img[0].replace("./public", "")}
            width={100}
            height={100}
            alt="product_img"
            className={style1.productImgSection}
          />
        )}
      </Link>
      <Link
        href={`/product/${params.productId}`}
        className={style1.productBottomSection}
      >
        <div className={style1.productName}>{params.name}</div>
        <div className={style1.productCompany}>{params.companyId}</div>
        <div className={style1.productPriceSection}>
          <div className={style1.productPrice}>Rs. {price}</div>
        </div>
      </Link>

      {/* Data here will be appeared from the cart page */}
      {isCart && (
        <div
          className={style1.productCardBtnsContainer}
          style={{ bottom: "40px" }}
        >
          <div className={style1.productQtyContainer}>
            <div
              className={style1.productQtyBtn}
              onClick={handleDecreaseQty}
            >
              -
            </div>
            <div>{qty}</div>
            <div
              className={style1.productQtyBtn}
              onClick={handleIncreaseQty}
            >
              +
            </div>
          </div>
        </div>
      )}

      <div className={style1.productCardBtnsContainer}>
        {favourite ? (
          <FaHeart
            className={style1.productCardBtn}
            onClick={() => {
              updateChoice("favourite");
            }}
          />
        ) : (
          <CiHeart
            className={style1.productCardBtn}
            onClick={() => {
              updateChoice("favourite");
            }}
          />
        )}
        {cart ? (
          <IoCartSharp
            className={style1.productCardBtn}
            onClick={() => {
              updateChoice("cart");
            }}
          />
        ) : (
          <IoCartOutline
            className={style1.productCardBtn}
            onClick={() => {
              updateChoice("cart");
            }}
          />
        )}
      </div>
    </div>
  );
}

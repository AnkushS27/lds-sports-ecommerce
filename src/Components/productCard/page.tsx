"use client";

import { CartVariation, ProductType } from "@/TypeInterfaces/TypeInterfaces";
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
  variant,
  isCart = false,
  handleQuantityChange,
}: {
  params: ProductType;
  checkFavourite?: boolean;
  variant?: CartVariation;
  checkCart?: boolean;
  isCart?: boolean; // Add isCart to the type definition
  handleQuantityChange?: (productId: string, newQuantity: number) => void;
}) {
  const [favourite, setFavourite] = useState(checkFavourite);
  const [cart, setCart] = useState(checkCart);
  const [qty, setQty] = useState(variant?.qty ?? 1);
  const stock = 10;
  const price = params.variations.variations[variant?.variationIdx ?? 0].price;
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const fetchFavorites = async () => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const productId = params.productId;
      if (userId) {
        const response = await fetch("/api/favourite/checkFavourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, userId }),
        });
        const data = await response.json();
        setFavourite(data.isFavourite);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const productId = params.productId;
      if (userId) {
        const response = await fetch("/api/cart/checkCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, userId }),
        });
        const data = await response.json();
        setCart(data.isCart);
      }
    } catch (error) {
      console.error("Error fetching Cart:", error);
    }
  };

  useEffect(() => {
    if (checkFavourite === undefined) {
      fetchFavorites();
    }
    if (checkCart === undefined) {
      fetchCart();
    }
    discountCalculate(price);
  }, [cart, favourite]);

  const updateChoice = async (choice: string) => {
    // Backend function call is left.
    if (choice === "favourite") {
      if (!favourite) {
        await addToFavorites(params.productId);
      } else {
        await removeFromFavorites(params.productId);
      }
    } else if (choice === "cart") {
      if (!cart) {
        await addToCart(params.productId, qty);
      } else {
        await removeFromCart(params.productId, qty);
      }
    }
  };

  const handleDecreaseQty = async () => {
    if (qty > 1) {
      try {
        const session = await getSession();
        const userId = session?.user?.email;
        const productId = params.productId;
        const colorIdx = variant?.colorIdx ?? 0;
        const variationIdx = variant?.variationIdx ?? 0;
        if (userId && variant) {
          const response = await fetch("/api/cart/decreaseQty", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId, userId, colorIdx, variationIdx }),
          });
          const data = await response.json();
          setQty(data.updatedQty);
          handleQuantityChange && handleQuantityChange(params.productId, qty - 1);
        }
      } catch (error) {
        console.error("Error fetching Cart:", error);
      }
    }
  };

  const handleIncreaseQty = async () => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const productId = params.productId;
      const colorIdx = variant?.colorIdx ?? 0;
      const variationIdx = variant?.variationIdx ?? 0;
      if (userId && variant) {
        const response = await fetch("/api/cart/increaseQty", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId, userId, colorIdx, variationIdx }),
        });
        const data = await response.json();
        setQty(data.updatedQty);
        handleQuantityChange && handleQuantityChange(params.productId, qty + 1);
      }
    } catch (error) {
      console.error("Error fetching Cart:", error);
    }
  };

  const addToFavorites = async (productId: string) => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const response = await fetch("/api/favourite/addFavourite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }),
      });
      if (response.ok) {
        setFavourite(true); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // Handle error, maybe show a notification
    }
  };

  const removeFromFavorites = async (productId: string) => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const response = await fetch("/api/favourite/removeFavourite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId }),
      });
      if (response.ok) {
        setFavourite(false); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      // Handle error, maybe show a notification
    }
  };

  const addToCart = async (productId: string, qty: number) => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const response = await fetch("/api/cart/addCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, userId, qty }),
      });
      if (response.ok) {
        setCart(true); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // Handle error, maybe show a notification
    }
  };

  const removeFromCart = async (productId: string, qty: number) => {
    try {
      const session = await getSession();
      const userId = session?.user?.email;
      const variationIdx = variant?.variationIdx ?? 0;
      const colorIdx = variant?.colorIdx ?? 0;
      const response = await fetch("/api/cart/removeCart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId,
          qty,
          colorIdx,
          variationIdx,
        }),
      });
      if (response.ok) {
        setCart(false); // Update the local state to reflect the change
      } else {
        // Handle error, maybe show a notification
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      // Handle error, maybe show a notification
    }
  };

  const capitalizeFirstLetter = (word: any) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  const discountCalculate = (price: number) => {
    // Generate a random discount percentage between 18% to 25%
    const randomDiscountPercent =
      Math.floor(Math.random() * (28 - 15 + 1)) + 15;

    // Calculate original price based on discounted price and discount percentage
    const calculatedOriginalPrice =
      Math.round((price / (1 - randomDiscountPercent / 100)) * 100) / 100;

    // Update state variables with calculated values
    setDiscountPercent(randomDiscountPercent);
    setOriginalPrice(calculatedOriginalPrice);
  };

  return (
    <div className={style1.productMainContainer}>
      {/* Image here */}
      <Link href={`/product/${params.productId}`}>
        {params.img && (
          <Image
            src={params.img[0].replace("./public", "")}
            width={500}
            height={500}
            alt="product_img"
            className={style1.productImgSection}
          />
        )}
      </Link>
      <Link
        href={`/product/${params.productId}`}
        className={style1.productBottomSection}
      >
        <div className={style1.productName}>
          {params.name.length > 20
            ? `${params.name.slice(0, 20)}...`
            : params.name}
        </div>
        <div className={style1.productCompany}>{params.companyId}</div>

        {isCart && variant && (
          <div className={style1.variationContainer}>
            {params.variations && (
              <div className={style1.variantChild}>
                Size: {params.variations.variations[variant.variationIdx].value}
              </div>
            )}
            {params.colors && (
              <div className={style1.variantChild}>
                ,{capitalizeFirstLetter(`${params.colors[variant.colorIdx]}`)}
              </div>
            )}
          </div>
        )}

        <div className={style1.productPriceSection}>
          <div className={style1.discountedPrice}>Rs. {price}</div>
          <div className={style1.originalPrice}>{originalPrice}</div>
          <div className={style1.discountPercent}>{discountPercent}%</div>
        </div>
      </Link>

      {/* Data here will be appeared from the cart page */}
      {isCart && (
        <div className={style1.productQtyContainer}>
          <div className={style1.productQtyBtn} onClick={handleDecreaseQty}>
            -
          </div>
          <div>{qty}</div>
          <div className={style1.productQtyBtn} onClick={handleIncreaseQty}>
            +
          </div>
        </div>
      )}

      <div className={style1.productCardBtnsContainer}>
        {favourite ? (
          <FaHeart
            className={style1.productCardFavBtn}
            onClick={() => {
              updateChoice("favourite");
            }}
          />
        ) : (
          <CiHeart
            className={style1.productCardFavBtn}
            onClick={() => {
              updateChoice("favourite");
            }}
          />
        )}
        {cart ? (
          <IoCartSharp
            className={style1.productCardCartBtn}
            onClick={() => {
              updateChoice("cart");
            }}
          />
        ) : (
          <IoCartOutline
            className={style1.productCardCartBtn}
            onClick={() => {
              updateChoice("cart");
            }}
          />
        )}
      </div>
    </div>
  );
}

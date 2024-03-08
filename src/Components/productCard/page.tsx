"use client";

import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
// style
import style1 from "./page.module.css";

// Imports
import Link from "next/link";
import { useState } from "react";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

export default function ProductCard({
  params,
  checkFavourite,
  checkCart,
  isCart = false,
  handleRemoveFromCart,
  handleQuantityChange,
}: {
  params: ProductType;
  checkFavourite?: boolean,
  checkCart?: boolean,
  isCart?: boolean; // Add isCart to the type definition
  handleRemoveFromCart?: () => void;
  handleQuantityChange?: (quantity: number) => void;
}) {
  const [favourite, setFavourite] = useState(checkFavourite);
  const [cart, setCart] = useState(checkCart);
  const [qty, setQty] = useState(1);
  const stock = 10;
  const price = JSON.parse(params.variations[0]).price;

  const updateChoice = async (choice: string) => {
      // Backend function call is left.
      if (choice === 'favourite') {setFavourite(!favourite);}
      else {setCart(!cart);}
  }

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

  return (
    <div className={style1.productMainContainer}>
      {/* Image here */}
      <Link href={`/product/${params.productId}`}
        className={style1.productImgSection}
      > No Image Currently </Link>
      <Link href={`/product/${params.productId}`}
        className={style1.productBottomSection}
      >
        <div className={style1.productName}>{params.name}</div>
        <div className={style1.productCompany}>{params.companyId}</div>
        <div className={style1.productPriceSection}>
          <div className={style1.productPrice}>{price}</div>
        </div>
      </Link>

      {/* Data here will be appeared from the cart page */}
      {isCart && (
        <div className={style1.productCardBtnsContainer} style={{bottom:'40px'}}>
          <div className={style1.productQtyContainer}>
            <div className={style1.productQtyBtn} onClick={handleDecreaseQty}>
              -
            </div>
            <div>{qty}</div>
            <div className={style1.productQtyBtn} onClick={handleIncreaseQty}>
              +
            </div>
          </div>
        </div>
      )}

        <div className={style1.productCardBtnsContainer}>
          {favourite ?
            <FaHeart className={style1.productCardBtn} onClick={() => {updateChoice('favourite')}} />
          :
            <CiHeart className={style1.productCardBtn} onClick={() => {updateChoice('favourite')}} />
          }
          {cart ?
            <IoCartSharp className={style1.productCardBtn}
              onClick={() => {updateChoice('cart')}}
            /> :
            <IoCartOutline className={style1.productCardBtn}
              onClick={() => {updateChoice('cart')}}
            />
          }
        </div>
      
    </div>
  );
}

"use client";

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
  isCart = false,
  handleRemoveFromCart,
  handleQuantityChange,
}: {
  params: {
    pid: string;
    name: string;
    img?: string;
    price: string;
    stock: string;
    company: string;
    offer?: {
      discount: string;
      newPrice?: string;
    };
  };
  isCart?: boolean; // Add isCart to the type definition
  handleRemoveFromCart?: () => void;
  handleQuantityChange?: (quantity: number) => void;
}) {
  const [favourite, setFavourite] = useState(false);
  const [cart, setCart] = useState(false);
  const [qty, setQty] = useState(1);
  const stock = 10;

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
      <Link
        href={`/product/${params.pid}`}
        className={style1.productImgSection}
      ></Link>

      <Link
        href={`/product/${params.pid}`}
        className={style1.productBottomSection}
      >
        <div className={style1.productName}>{params.name}</div>
        <div className={style1.productCompany}>{params.company}</div>
        <div className={style1.productPriceSection}>
          <div className={style1.productPrice}>{params.price}</div>
        </div>
      </Link>

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
            <FaHeart className={style1.productCardBtn} onClick={() => {setFavourite(false);}} />
          :
            <CiHeart className={style1.productCardBtn} onClick={() => { setFavourite(true);}} />
          }
          {cart ?
            <IoCartSharp
              className={style1.productCardBtn}
              onClick={() => {
                setCart(false);
              }}
            /> :
            <IoCartOutline
              className={style1.productCardBtn}
              onClick={() => {
                setCart(true);
              }}
            />
          }
        </div>
      
    </div>
  );
}

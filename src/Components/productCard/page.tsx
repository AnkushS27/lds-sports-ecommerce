'use client'

// style
import style1 from './page.module.css'

// Imports
import Link from "next/link"
import { useState } from "react";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { IoCartOutline, IoCartSharp } from "react-icons/io5";

export default function ProductCard(
    { params } : {
        params : {
            pid : string,
            name : string,
            img ?: string,
            price : string,
            stock : string,
            company : string,
            offer ?: {
                discount : string,
                newPrice ?: string,
            }
        }
    }
) {
    const [favourite,setFavourite] = useState(false);
    const [cart,setCart] = useState(false);
    return (
        <div className={style1.productMainContainer}>
            {/* Image here */}
            <Link href='#' className={style1.productImgSection}></Link>

            <Link href='#' className={style1.productBottomSection}>
                <div className={style1.productName}>{params.name}</div>
                <div className={style1.productCompany}>{params.company}</div>
                <div className={style1.productPriceSection}>
                    <div className={style1.productPrice}>{params.price}</div>
                    {/* <input type='number' className={style1.productQty} min={0} max={params.stock} value={1} /> */}
                </div>
                <div className={style1.productCardBtnsContainer}>
                    {favourite ? 
                    <FaHeart className={style1.productCardBtn} onClick={() => {setFavourite(false)}} /> :
                    <CiHeart className={style1.productCardBtn} onClick={() => {setFavourite(true)}} /> }
                    {cart ? 
                    <IoCartSharp className={style1.productCardBtn} onClick={() => {setCart(false)}} /> :   
                    <IoCartOutline className={style1.productCardBtn} onClick={() => {setCart(true)}} />}
                </div>
            </Link>
        </div>
    )
}   
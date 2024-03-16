'use client'
// Components
import Link from "next/link"

// Icons
import { FaHotjar, FaHistory, FaShoppingCart, FaRegHeart, FaQuestion, FaUser } from "react-icons/fa";
import { CiDiscount1 } from "react-icons/ci";
import { MdSupervisorAccount, MdOutlineLabel } from "react-icons/md";
import { FiLogIn, FiLogOut } from "react-icons/fi";

// Styles
import style1  from './page.module.css';
import { useState } from "react";
import { FcAbout } from "react-icons/fc";

export default function VerticalNavBar(
    {params} : {params : 
        {name : string,
         loggedIn : boolean,
        }
    }) {
    const [showNavBar, setShowNavBar] = useState(false);
    if (!showNavBar) {return(
        <div className={style1.NavOpenContainer} onClick={() => {setShowNavBar(true)}}>
            <div className={style1.NavHamburgerLine}></div>
            <div className={style1.NavHamburgerLine}></div>
            <div className={style1.NavHamburgerLine}></div>
        </div>
    )} else {
    return (
        <div className={style1.NavMainWrapper}>
            <div className={style1.NavMenuCloseBtn} onClick={() => {setShowNavBar(false)}}> Close </div>
            <div className={style1.NavMainContainer}>

            <div className={style1.VerticalNavSection}>
                <div className={style1.VerticalNavSectionHead}> Dashboard </div>
                <Link href="/" className={style1.VerticalNavSectionItem}>
                    <FaHotjar className={style1.VerticalNavSectionIcon} />
                    latest arrivals 
                </Link>
                <Link href="/orders" className={style1.VerticalNavSectionItem}> 
                    <FaHistory className={style1.VerticalNavSectionIcon} />
                    Orders
                </Link>
                <Link href="/offers" className={style1.VerticalNavSectionItem}> 
                    <CiDiscount1 className={style1.VerticalNavSectionIcon} />
                    Offers
                </Link>
                <Link href="/cart" className={style1.VerticalNavSectionItem}>
                    <FaShoppingCart className={style1.VerticalNavSectionIcon} />
                    Cart
                </Link>
                <Link href="/favourites" className={style1.VerticalNavSectionItem}>
                    <FaRegHeart className={style1.VerticalNavSectionIcon} />
                    Favourites
                </Link>
            </div>
            
            <div className={style1.VerticalNavSection}>
                <div className={style1.VerticalNavSectionHead}> Other Settings </div>
                <Link href='/myaccount' className={style1.VerticalNavSectionItem}>
                    <FaUser className={style1.VerticalNavSectionIcon} />
                    My Account
                </Link>
                <Link href='/faq' className={style1.VerticalNavSectionItem}>
                    <FaQuestion className={style1.VerticalNavSectionIcon} />
                    FAQ
                </Link>
                <Link href='/about' className={style1.VerticalNavSectionItem}>
                    <FcAbout className={style1.VerticalNavSectionIcon} />
                    About
                </Link>
                <div className={style1.VerticalNavSectionItem}>
                    <MdOutlineLabel className={style1.VerticalNavSectionIcon} />
                    Categories
                </div>
            </div>
            
            <div className={style1.VerticalNavSection}>
                <div className={style1.VerticalNavSectionHead}> Account Settings </div>
                {params.loggedIn ?
                <div>
                <Link href='#' className={style1.VerticalNavSectionItem}>
                    <FiLogOut className={style1.VerticalNavSectionIcon} />
                    Logout
                </Link>
                </div> :
                <div>
                <Link href='#' className={style1.VerticalNavSectionItem}>
                    <FiLogIn className={style1.VerticalNavSectionIcon} />
                    Login
                </Link>
                <Link href='#' className={style1.VerticalNavSectionItem}>
                    <FiLogIn className={style1.VerticalNavSectionIcon} />
                    Signup
                </Link>
                </div>

    }
            </div>
            </div>
        </div>
    )}
}


/////////////////////////////////
// Work left
/////////////////////////////////
/*
1. Sort and remove unwanted links
2. Active Link should be highlighted
*/
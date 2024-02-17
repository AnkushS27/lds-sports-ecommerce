'use client'

import { useState } from 'react'
// styles.
import style1 from './page.module.css'

// Icons
import { FaShoppingCart, FaRegUserCircle } from 'react-icons/fa';

// Imports
import Link from 'next/link';
import Image from 'next/image'
import Logo from '../../../public/logo.svg'

export default function HorizontalNavBar(
    {params} : {
        params : {
            name : string,
            loggedIn : boolean,
        }
    }
) { 
    const [search,setSearch] = useState('');
    return (
    <div className={style1.NavMainWrapper}>
        <div className={style1.NavMainContainer}>
            {/* Logo */}
            <Link href='/' className={style1.NavLogoSection}> 
                <Image className={style1.navLogoImage} src={Logo} alt={"logo"}/> 
                <div className={style1.iconsContainer}>
                    <Link href="/cart">
                        <FaShoppingCart className={style1.navbarIcon} />
                    </Link>
                    <Link href="/cart">
                        <FaRegUserCircle className={style1.navbarIcon} />
                    </Link>
                </div>
            </Link>
            <div className={style1.NavRightSection}>
                {/* Search bar */}
                <div className={style1.navSearchbarContainer}>
                    <input type="text" className={style1.NavSearchBox} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search here' />
                    <Link href={`/search/${search}`} className={style1.navSearchBtn}> Search </Link>
                </div>
                {/* Authentication Options */}
                {params.loggedIn ?
                    <div className={style1.navAuthenticationCotanier}>
                        <Link href='/' className={style1.navAuthenticationItem}> <span>Profile</span> </Link>
                        <Link href='/' className={style1.navAuthenticationItem}> <span>Logout</span> </Link>
                    </div>
                :    
                <div className={style1.navAuthenticationCotanier}>
                    <Link href='/login' className={style1.navAuthenticationItem}> <span>Login</span> </Link>
                    <Link href='/signup' className={style1.navAuthenticationItem}> <span>Signup</span> </Link>
                </div>
                }
            </div>
        </div>
    </div>
)}
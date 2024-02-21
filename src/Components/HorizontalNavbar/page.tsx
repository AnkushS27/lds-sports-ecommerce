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
import axios from 'axios';

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
            <div className={style1.NavLogoSection}> 
                <Link href='/'>
                    <Image className={style1.navLogoImage} src={Logo} alt={"logo"}/> 
                </Link>
                <div className={style1.iconsContainer}>
                    <Link href="/cart">
                        <FaShoppingCart className={style1.navbarIcon} />
                    </Link>
                    <Link href="/profile">
                        <FaRegUserCircle className={style1.navbarIcon} />
                    </Link>
                </div>
            </div>
            <div className={style1.NavRightSection}>
                {/* Search bar */}
                <div className={style1.navSearchbarContainer}>
                    <input type="text" className={style1.NavSearchBox} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search here' />
                    <Link href={`/search/${search}`} className={style1.navSearchBtn}> Search </Link>
                </div>
                {/* Authentication Options */}
                {params.loggedIn ?
                    <div className={style1.navAuthenticationCotanier}>
                        <Link href='/profile' className={style1.navAuthenticationItem}> <span>Profile</span> </Link>
                        <div className={style1.navAuthenticationItem}> <span>Logout</span> </div>
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
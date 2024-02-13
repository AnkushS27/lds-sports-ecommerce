'use client'

import { useState } from 'react'
// styles.
import style1 from './page.module.css'

// Imports
import Link from 'next/link'

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
            <Link href='/' className={style1.NavLogoSection}> LDS sports </Link>
            <div className={style1.NavRightSection}>
                {/* Search bar */}
                <div className={style1.navSearchbarContainer}>
                    <input type="text" className={style1.NavSearchBox} onChange={(e) => {setSearch(e.target.value)}} placeholder='Search here' />
                    <Link href={`/search/${search}`} className={style1.navSearchBtn}> Search </Link>
                </div>
                {/* Authentication Options */}
                {params.loggedIn ?
                    <div className={style1.navAuthenticationCotanier}>
                        <Link href='/' className={style1.navAuthenticationItem}> Profile </Link>
                        <Link href='/' className={style1.navAuthenticationItem}> Logout </Link>
                    </div>
                :    
                <div className={style1.navAuthenticationCotanier}>
                    <Link href='/login' className={style1.navAuthenticationItem}> Login </Link>
                    <Link href='/signup' className={style1.navAuthenticationItem}> Sign up </Link>
                </div>
                }
            </div>
        </div>
    </div>
)}
import Link from "next/link"

import style1 from './page.module.css'

export default function Footer() {
    return (
        <div className={style1.mainWrapper}>
            {/* This is a Footer.
            <Link href='/'> Home </Link>
            <Link href='/faq'> FAQ </Link> */}
            <div className={style1.mainContainer}>
                <div className={style1.leftSection}>
                    <div className={style1.logoContainer}> LDS sports </div>
                </div>
                <div className={style1.rightSection}>
                    <div className={style1.linkHolder}>
                        <div className={style1.linkHolderHead}> Quick Links </div>
                        <Link href='/' className={style1.linkItem}> Home </Link>
                        <Link href='/myaccount' className={style1.linkItem}> Account </Link>
                        <Link href='/cart' className={style1.linkItem}> Cart </Link>
                    </div>
                    <div className={style1.linkHolder}>
                        <div className={style1.linkHolderHead}> Support </div>
                        <Link href='/faq' className={style1.linkItem}> FAQ </Link>
                        <Link href='#' className={style1.linkItem}> abc@gmail.com </Link>
                        <Link href='#' className={style1.linkItem}> 1122334455 </Link>
                    </div>
                </div>
            </div>
            <div className={style1.copyRightSection}>
                @copyright belongs to the owner
            </div>
        </div>
    )
}
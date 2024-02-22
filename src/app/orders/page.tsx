import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import { loggedIn } from "../api/user/loggedIn";

import style1 from './page.module.css'
import Link from "next/link";
import { useEffect } from "react";
import { auth } from "@/auth";

let ordersItems = [
    {id:'001',createdDate:'12,june,2024',shipping:'Delivered', price: '₹12,000'},
    {id:'002',createdDate:'12,june,2024',shipping:'Delivered', price: '₹12,000'},
    {id:'003',createdDate:'12,june,2024',shipping:'Delivered', price: '₹12,000'},
    {id:'004',createdDate:'12,june,2024',shipping:'Delivered', price: '₹12,000'},
    {id:'005',createdDate:'12,june,2024',shipping:'Delivered', price: '₹12,000'},
]


export default async function Orders() {
    const session = await auth();
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: session?true:false}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : session?true:false}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.ordersHolder}>
                        {ordersItems.map((item,index) => {
                            return(
                                <Link href={`/orders/${item.id}`} className={style1.orderItemContainer} key={index}>
                                    <div className={style1.orderItemLeft}>
                                        <div className={style1.ImgContainer}></div>
                                    </div>
                                    <div className={style1.orderItemRight}>
                                        <div className={style1.orderRightItemId}> Order Id : {item.id}</div>
                                        <div className={style1.orderRightItemTitle}>
                                            <div className={style1.orderTitleLabel}>Ordered on : </div>
                                            {item.createdDate}
                                        </div>
                                        <div className={style1.orderRightItemPrice}> {item.price}</div>
                                        <div className={style1.orderRightItemShipping}>{item.shipping}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
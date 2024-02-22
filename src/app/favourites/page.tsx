import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";

import { loggedIn } from "../api/user/loggedIn";

import style1 from './page.module.css'
import ProductCard from "@/Components/productCard/page";
import { auth } from "@/auth";

export default async function Favourites() {
    const session = await auth();
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: session? true:false}} />
            <div className={style1.HorizontalMainContainer}>
                <VerticalNavBar params={{name : 'ABC', loggedIn : session? true:false}} />
                <div className={style1.VerticalMainContainer}>
                    <div className={style1.productCardWrapper}>
                        <div className={style1.productCardHead}> Favourites </div>
                        <ProductCard params={{name:'prod_1',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        <ProductCard params={{name:'prod_2',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        <ProductCard params={{name:'prod_3',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        <ProductCard params={{name:'prod_4',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        <ProductCard params={{name:'prod_5',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        <ProductCard params={{name:'prod_6',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
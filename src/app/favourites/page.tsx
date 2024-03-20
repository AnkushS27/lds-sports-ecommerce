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
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], }} />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
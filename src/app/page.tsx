// Styles
import Footer from '@/Components/Footer/page';
import style1 from './page.module.css'

// Imports

// Components
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";


////////////////// Functions ////////////////////////
// async function loggedIn() {
//     var res = await fetch('http://localhost:3000/api/user',{method:'GET',});
//     const data = await res.json();
//     return data.result === 'success';
// }
import { loggedIn } from './(backend)/api/(user related)/user/loggedIn';
import ProductCard from '@/Components/productCard/page';

export default function Home() {
    const isloggedIn = loggedIn({});
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: isloggedIn}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : isloggedIn, homePage : true}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.brandAdsDisplayContainer}>
                        Display your brand ads here.
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Categories </div>
                        <div className={style1.categoriesContainer}>
                            <div className={style1.categoriesItem}> Cricket bat </div>
                            <div className={style1.categoriesItem}> ball </div>
                            <div className={style1.categoriesItem}> tigh pads </div>
                            <div className={style1.categoriesItem}> Other accessories </div>
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Trending </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            <ProductCard params={{name:'prod_1',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                            <ProductCard params={{name:'prod_2',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                            <ProductCard params={{name:'prod_3',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                            <ProductCard params={{name:'prod_4',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                            <ProductCard params={{name:'prod_5',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                            <ProductCard params={{name:'prod_6',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
////////////////////////////
// Works
/*
1. Link in function is to be replaced
*/
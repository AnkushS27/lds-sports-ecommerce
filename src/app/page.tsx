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
import { loggedIn } from './api/user/loggedIn';
import ProductCard from '@/Components/productCard/page';

let product = {name:'prod_1',"company" : "c1", "pid" : "001", "price" : "₹1500", "stock" : "50"}

let trending = [product, product, product, product, product, product, product]
let forYou = [product, product, product, product, product, product, product]
let latest = [product, product, product, product, product, product, product]
let others = [product, product, product, product, product, product, product]
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
                        <div className={style1.sectionHead}> Latest </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {latest.map((porduct,index) => {return(<ProductCard params={product} />)})}
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Trending </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {trending.map((porduct,index) => {return(<ProductCard params={product} />)})}
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> For You </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {forYou.map((porduct,index) => {return(<ProductCard params={product} />)})}
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Others </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {others.map((porduct,index) => {return(<ProductCard params={product} />)})}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
////////////////////////////
// Works
/*
1. Link in function is to be replaced
*/
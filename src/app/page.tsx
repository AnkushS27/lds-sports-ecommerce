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
// }\
import ProductCard from '@/Components/productCard/page';
import { auth } from '@/auth';
import { ProductType } from '@/TypeInterfaces/TypeInterfaces';

const product: ProductType = {
    productId: "ABC123",
    img: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    name: "Sample Product",
    desc: "This is a sample product description.",
    companyId: "XYZ456",
    tags: ["tag1", "tag2", "tag3"],
    variations: [JSON.stringify({diff:'',stock:20,price:'₹120'})],
    createdAt: new Date(),
    updatedAt: new Date(),
    comments: ["comment1", "comment2"],
    offers: ["offer1", "offer2"]
};

let trending: ProductType[] = []
let forYou: ProductType[] = []
let latest: ProductType[] = []
let others: ProductType[] = []
export default async function Home() {
    const session = await auth();
    console.log(session?.user?.email??"No User");
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: session? true : false}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : session? true : false}} />
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
                            {latest ?
                            latest.map((product,index) => {return(<ProductCard key={index} params={product} />)}) :
                            <h2 style={{display:'flex',justifyContent:'center',width:'100%'}}>No Products available at this moment.</h2>
                            }
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Trending </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {trending ?
                            trending.map((product,index) => {return(<ProductCard key={index} params={product} />)}) :
                            <h2 style={{display:'flex',justifyContent:'center',width:'100%'}}>No Products available at this moment.</h2>
                            }
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> For You </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {forYou && forYou.length > 0 ?
                            forYou.map((product,index) => {return(<ProductCard key={index} params={product} />)}) :
                            <h2 style={{display:'flex',justifyContent:'center',width:'100%'}}>No Products available at this moment.</h2>
                            }
                        </div>
                    </div>
                    <div className={style1.sectionContainer}>
                        <div className={style1.sectionHead}> Others </div>
                        <div className={style1.categoriesContainer} style={{flexWrap:"nowrap",overflowX:"auto", maxWidth:"100%"}}>
                            {others ?
                            others.map((product,index) => {return(<ProductCard key={index} params={product} />)}) :
                            <h2 style={{display:'flex',justifyContent:'center',width:'100%'}}>No Products available at this moment.</h2>
                            }
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
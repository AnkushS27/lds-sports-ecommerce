
import HorizontalNavBar from '@/Components/HorizontalNavbar/page';
import { loggedIn } from '../../api/user/loggedIn'
import style1 from './page.module.css'
import VerticalNavBar from '@/Components/VerticalNavbar/page';
import ProductCard from '@/Components/productCard/page';
import { auth } from '@/auth';

export default async function SearchResults({ params } : { params : { query : string } }) {
    const session = await auth();
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: session?true:false}} />
            <div className={style1.HorizontalmainContainer}>
                <VerticalNavBar params={{name : 'ABC', loggedIn : session?true:false}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.optionsSection}>
                        <div className={style1.optionItem}>sort by price low to high </div>
                        <div className={style1.optionItem}> sort by price high to low </div>
                        <div className={style1.optionItem}> sort by reviews </div>
                        <div className={style1.optionItem}> sort by latest </div>
                    </div>
                    <div className={style1.productCardWrapper}>
                        <div className={style1.resultsHead}>
                            Results for &quot;{params.query}&quot;
                        </div>
                        {/* <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], "variations": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], "variations": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], "variations": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], "variations": [], }} />
                        <ProductCard params={{name:'prod_1', "companyId" : "c1", "productId" : "001", "desc": "", "tags": [], "variations": [], }} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
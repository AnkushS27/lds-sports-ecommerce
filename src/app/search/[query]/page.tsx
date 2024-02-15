
import HorizontalNavBar from '@/Components/HorizontalNavbar/page';
import { loggedIn } from '../../api/user/loggedIn'
import style1 from './page.module.css'
import VerticalNavBar from '@/Components/VerticalNavbar/page';
import ProductCard from '@/Components/productCard/page';

export default function SearchResults({ params } : { params : { query : string } }) {
    const isloggedIn = loggedIn({});
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: isloggedIn}} />
            <div className={style1.HorizontalmainContainer}>
                <VerticalNavBar params={{name : 'ABC', loggedIn : isloggedIn, homePage : true}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.optionsSection}>
                        <div className={style1.optionItem}>sort by price low to high </div>
                        <div className={style1.optionItem}> sort by price high to low </div>
                        <div className={style1.optionItem}> sort by reviews </div>
                        <div className={style1.optionItem}> sort by latest </div>
                    </div>
                    <div className={style1.productCardWrapper}>
                        <div className={style1.resultsHead}>
                            Results for "{params.query}"
                        </div>
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
    )
}

import HorizontalNavBar from '@/Components/HorizontalNavbar/page';
import { loggedIn } from '../../api/user/loggedIn'
import style1 from './page.module.css'
import VerticalNavBar from '@/Components/VerticalNavbar/page';

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
                    Search Results here for {params.query}.
                </div>
            </div>
        </div>
    )
}
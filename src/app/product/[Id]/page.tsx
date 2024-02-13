import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import style1 from './page.module.css'
import { loggedIn } from "@/app/api/user/loggedIn";

export default function ProductDetails({ params } : { params : { Id : string } }) {
    const isloggedIn = loggedIn({});
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: isloggedIn}} />
            <div className={style1.HorizontalMainContainer}>
                <VerticalNavBar params={{name : 'ABC', loggedIn : isloggedIn, homePage : true}} />
                <div className={style1.VerticalMainContainer}>
                    Page requested for product Id : {params.Id}
                </div>
            </div>
        </div>
    )
}
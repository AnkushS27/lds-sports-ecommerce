import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import { loggedIn } from "../api/user/loggedIn";

import style1 from './page.module.css'

export default function Orders() {
    const isloggedIn = loggedIn({});
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn: isloggedIn}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : isloggedIn, homePage : true}} />
                <div className={style1.VerticalmainContainer}>
                    Your Orders here.
                </div>
            </div>
        </div>
    )
}
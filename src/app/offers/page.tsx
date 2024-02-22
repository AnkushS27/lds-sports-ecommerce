import Footer from "@/Components/Footer/page";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import style1 from './page.module.css'
import { auth } from "@/auth";

export default async function Offers() {
    const session = await auth();
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn:session?true:false}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn :session?true:false}} />
                <div className={style1.VerticalmainContainer}>
                    <div className="OffersHead"> Offer </div>
                    <div className="OfferSection">
                        <div className="SectionHead"> Limited Time Offer </div>
                        <div className="SectionItemsWrapper"> Offer Items here </div>
                    </div>
                    <div className="OfferSection">
                        <div className="SectionHead"> Special Discount Offer </div>
                        <div className="SectionItemsWrapper"> Offer Items here </div>
                    </div>
                    <div className="OfferSection">
                        <div className="SectionHead"> Seasonal Offers </div>
                        <div className="SectionItemsWrapper"> Offer Items here </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
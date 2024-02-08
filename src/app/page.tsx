// Styles
import Footer from '@/Components/Footer/page';
import style1 from './page.module.css'

// Imports

// Components
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

export default function Home() {
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn:true}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : true, homePage : true}} />
                <div className={style1.VerticalmainContainer}>
                    This is the Home page
                </div>
            </div>
            <Footer />
        </div>
    )
}
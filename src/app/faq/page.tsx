import Footer from "@/Components/Footer/page";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

export default function FAQ() {
    return (
        <div className="mainWrapper">
            <HorizontalNavBar params={{name:'ABC',loggedIn:true}} />
            <div className="HorizontalmainContainer"> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : true}} />
                <div className="VerticalmainContainer">
                    This is the FAQ page
                </div>
            </div>
            <Footer />
        </div>
    )
}
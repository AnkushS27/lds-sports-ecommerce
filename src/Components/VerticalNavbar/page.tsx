'use client'

import Link from "next/link"

export default function VerticalNavBar(
    {params} : {params : 
        {name : string,
         loggedIn : boolean,
         homePage ?: boolean,
        }
    }) {
    return (
        <div className="NavMainWrapper">
            {params.homePage && <div className="NavMenuCloseBtn"> Close </div>}
            <div className="NavMainContainer">

            <div className="VerticalNavSection">
                <div className="VerticalNavSectionHead"> Dashboard </div>
                <div className="VerticalNavSectionItem"> latest arrivals </div>
                <div className="VerticalNavSectionItem"> History </div>
                <div className="VerticalNavSectionItem"> Offers </div>
                <div className="VerticalNavSectionItem"> Cart </div>
                <div className="VerticalNavSectionItem"> Wishlist </div>
            </div>
            
            <div className="VerticalNavSection">
                <div className="VerticalNavSectionHead"> Other Settings </div>
                <div className="VerticalNavSectionItem"> Account Overview </div>
                <Link href='/faq' className="VerticalNavSectionItem"> FAQ </Link>
                <div className="VerticalNavSectionItem"> Categories </div>
            </div>
            
            <div className="VerticalNavSection">
                <div className="VerticalNavSectionHead"> Account Settings </div>
                <div className="VerticalNavSectionItem"> Change Account </div>
                <div className="VerticalNavSectionItem"> Logout </div>
            </div>
            </div>
        </div>
    )
}
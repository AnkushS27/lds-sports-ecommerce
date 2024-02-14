'use client'
import FAQComponent from "@/Components/FAQ/page";
import Footer from "@/Components/Footer/page";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import style1 from './page.module.css'
import { useState } from "react";

type FaqItem = {
    question: string;
    answer: string;
}

const faqData: FaqItem[] = [
{
    question: "What is your product?",
    answer: "Our product is a fantastic solution for...",
},
{
    question: "How can I get started?",
    answer: "To get started, simply follow these steps:...",
},
// Add more FAQ items as needed
];

export default function FAQ() {
    const [search, setSearch] = useState('');
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn:true}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : true}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.faqHead}>Frequently Asked Questions</div>
                    <div className={style1.FAQContainer}>
                        <div className={style1.faqSearchContainer}>
                        <input type="text" className={style1.faqQuestionInp} placeholder="Search your question here" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                        <div className={style1.faqSearchBtn} onClick={() => {console.log(search); setSearch('');}}> Search </div>
                        </div>
                        {faqData.map((item,index) => {
                            return (<FAQComponent key={index} params={item} />)
                        })
                        }
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}
'use client'
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page"

import style1 from './page.module.css'
import { useState } from "react";

let prod = {
    pid: "001",
    name: "cricket Bat",
    company: "kokabura",
    price: "₹1000",
    tags: ['bat', 'cricket bat', 'cricket','kokabura'],
    desc: "Product 1 is one the most selled products from the company 1. Limited products so buy soon.",
    DiversityInfo: { sizes: [6, 7, 8, 9, 10], color: ["black", "red"] },
  };

export default function Product({ params } : {
    params : {
        Id : string,
    }
}) {
    const [addChoice, setAddChoice] = useState(false);
    const [product, setProduct] = useState(prod);
    const [activeTagIndex, setActiveTagIndex] = useState(-1);
    
    const AddProductTag = () => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags, ""], // Add an empty string to the tags array
      }));
      setActiveTagIndex(product.tags.length);
    };

    const changeActiveTagIndex = (idx: number) => {
      // Check if the active index is current index.
      if (idx === activeTagIndex) return;
    
      // Remove the previous active tag if it is empty.
      if (activeTagIndex !== -1 && product.tags[activeTagIndex] === '') {
        setProduct(prevProduct => ({
          ...prevProduct,
          tags: prevProduct.tags.filter((tag, index) => index !== activeTagIndex)
        }));
      }
    
      // Set this new tag as active.
      setActiveTagIndex(idx);
    }
    
    return (
        <div className={style1.mainWrapper}>
            <VerticalNavBar
              params={{ name: "ABC", loggedIn: true }}
            />
            <div className={style1.VerticalMainContainer}>
              <div className={style1.productContainer}>
                <div className={style1.productDetailsContainer}>
                  <div className={style1.LeftSection}>
                    <div className={style1.ImgsContainer}>
                      <div className={style1.ImgsHolder}>
                        <div className={style1.ImgSmallBox}></div>
                        <div
                          className={`${style1.ImgSmallBox} ${style1.activeImgBox}`}
                        ></div>
                        <div className={style1.ImgSmallBox}></div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div className={style1.ImgsController}>
                        <div className={style1.ImgsControllBtn}>^</div>
                        see more
                        <div className={style1.ImgsControllBtn}>v</div>
                      </div>
                    </div>
                    <input type="image" className={style1.ImgContainer} alt="Active Image here" />
                  </div>
                  <div className={style1.RightSection}>
                    <input type='text' className={style1.productTitleHead} placeholder="Product Name" />
                    <input type='text' className={style1.productCompany} placeholder="Company" />
                    {/* Tags here. */}
                    <div className={style1.productTagsSection}>
                      <div className={style1.addProductTagBtn} onClick={() => {AddProductTag()}}> + Add Tag </div>
                      <div className={style1.tagsWrapper}>
                        {product.tags.map((tag,index) => {
                        return(<input type="text" className={style1.productTagsInput} placeholder="NewTag"
                          onChange={()=>{changeActiveTagIndex(index)}} defaultValue={tag} />)})}
                      </div>
                    </div>
                    <textarea className={style1.productTitleDesc} placeholder="Description about your product..."></textarea>
                    <div className={style1.productButtons}>
                      <div className={style1.productBuyBtn}>{" "} Save {" "}</div>
                      <div className={style1.productBuyBtn}>
                        {" "}
                        Cancel {" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style1.productBottomContainer}>
                  <div className={style1.prodBL}>
                    <div className={style1.productDiversityContainer}>
                    <div className={style1.addDiversityBtn} onClick={() => {setAddChoice(true)}}> + Add Choice </div>
                      {/* Diversity choices here */}
                      {Object.entries(product.DiversityInfo).map(
                        ([k, value], index) => {
                          return (
                            <div
                              className={style1.productDiversityOptionsContainer}
                              key={index}
                            >
                                <div className={style1.DiversityItemHead}>{k}</div>
                              {(value as string[]).map((item, idx1) => {
                                return (
                                  <div
                                    className={style1.productDiversityItem}
                                    key={idx1}
                                  >
                                    {item}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
}
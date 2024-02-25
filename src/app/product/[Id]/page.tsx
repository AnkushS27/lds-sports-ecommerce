"use client";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";

import style1 from "./page.module.css";
import { loggedIn } from "@/app/api/user/loggedIn";
import Comment from "@/Components/Comment/page";
import Chatbox from "@/Components/Chatbox/page";
import { useState } from "react";

// import { getData } from "@/db/testing";

//icons import
import { BsCaretUpFill, BsCaretDownFill } from "react-icons/bs";

let product = {
  pid: "001",
  name: "cricket Bat",
  company: "kokabura",
  price: "₹1000",
  tags: ["bat", "cricket bat", "cricket", "kokabura"],
  desc: "Product 1 is one the most selled products from the company 1. Limited products so buy soon.",
  Variations: {
    name: "Sizes",
    variations: [
      { size: 6, stock: 40, price: "₹120" },
      { size: 7, stock: 40, price: "₹10" },
      { size: 8, stock: 40, price: "₹130" },
      { size: 9, stock: 40, price: "₹180" },
      { size: 10, stock: 40, price: "₹210" },
    ],
  },
};

export default function ProductDetails({ params }: { params: { Id: string } }) {
  const isloggedIn = loggedIn({});
  const [variationIdx, setVariationIdx] = useState(0);
  // const data = await getData();
  // console.log(data);
  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar params={{ name: "ABC", loggedIn: isloggedIn }} />
      <div className={style1.HorizontalMainContainer}>
        <VerticalNavBar params={{ name: "ABC", loggedIn: isloggedIn }} />
        <div className={style1.VerticalMainContainer}>
          <div className={style1.productContainer}>
            <div className={style1.productDetailsContainer}>
              <div className={style1.LeftSection}>
                <div className={style1.imageContainer}>
                  <div className={style1.ImgsContainer}>
                    <div className={style1.ImgsHolder}>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div
                          className={`${style1.ImgSmallBox} ${style1.activeImgBox}`}
                        ></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                      <div>
                        <div className={style1.ImgSmallBox}></div>
                      </div>
                    </div>
                  </div>
                  <div className={style1.biggestImage}>
                    <div className={style1.ImgContainer}>
                      {" "}
                      Active Image here{" "}
                    </div>
                  </div>
                </div>
                <div className={style1.productButtons}>
                  <div className={style1.productCartBtn}>+ Add to Cart</div>
                  <div className={style1.productBuyBtn}>
                    {" "}
                    Add to Favourites{" "}
                  </div>
                </div>
              </div>
              <div className={style1.RightSection}>
                <div className={style1.productTitleHead}>{product.name}</div>
                <div className={style1.productTagsContainer}>
                  {product.tags.map((tag, index) => {
                    return (
                      <div className={style1.productTagItem} key={index}>
                        {tag}
                      </div>
                    );
                  })}
                </div>
                <div className={style1.productCompany}>{product.company}</div>
                <div className={style1.productTitleDesc}>{product.desc}</div>
                <div className={style1.productDiversityContainer}>
                  <div className={style1.productVaritionsName}>
                    {product.Variations.name}:
                  </div>
                  <div className={style1.productVariationsHolder}>
                    {product.Variations.variations.map((diversity, index) => {
                      return (
                        <div
                          className={style1.productDiversityItem}
                          style={
                            index == variationIdx
                              ? { backgroundColor: "white", color: "black" }
                              : {}
                          }
                          key={index}
                          onClick={() => {
                            setVariationIdx(index);
                          }}
                        >
                          {diversity.size}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="productPriceContainer">
                  <div className="productPriceHolder">
                    {/* Previous Product Price */}
                    <div className={style1.productPrice}>
                      {product.Variations.variations[variationIdx].price}
                    </div>
                    {/* Price After the discount */}
                  </div>
                  <div className="productDiscountOptions">
                    {/* <div className="productDiscountHead">Discount</div> */}
                    {/* Discount percentage */}
                  </div>
                </div>
              </div>
            </div>
            <div className={style1.QNAContainer}>
              <h3>45 Comments</h3>
              <div className={style1.productChatContainer}>
                <Chatbox />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

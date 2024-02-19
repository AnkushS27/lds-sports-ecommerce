'use client'
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page"

import style1 from './page.module.css'
import { useState } from "react";
import Link from "next/link";

let prod = {
    pid: "001",
    name: "cricket Bat",
    company: "kokabura",
    price: "₹1000",
    tags: ['bat', 'cricket bat', 'cricket','kokabura'],
    desc: "Product 1 is one the most selled products from the company 1. Limited products so buy soon.",
    DiversityInfo:[
      {size: 6, color: 'black', stock: 40, price: '₹120'},
      {size: 7, color: 'black', stock: 40, price: '₹120'},
      {size: 8, color: 'black', stock: 40, price: '₹120'},
      {size: 6, color: 'white', stock: 40, price: '₹120'},
      {size: 6, stock: 40, price: '₹120'},
    ],
  };

export default function Product({ params } : {
    params : {
        Id : string,
    }
}) {
    const [addChoice, setAddChoice] = useState(false);
    const [product, setProduct] = useState(prod);
    const [activeTagIndex, setActiveTagIndex] = useState(-1);
    
    const SendUpdateToBackend = () => {
      console.log(product);
    }

    const AddProductTag = () => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: [...prevProduct.tags,""], // Add an empty string to the tags array
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
          tags: prevProduct.tags.filter((tag, index) => {if (index !== activeTagIndex) return tag;})
        }));
      }
    
      // Set this new tag as active.
      setActiveTagIndex(idx);
    }
    
    const updateTag = (idx: number, str: string) => {
      setProduct(prevProduct => ({
        ...prevProduct,
        tags: prevProduct.tags.map((tag, index) => (index === idx ? str : tag))
      }));
      console.log(product);
    }
    const updateProductDetail = (key: string, value: string) => {
      setProduct(prevProduct => ({
        ...prevProduct,
        [key]: value
      }));
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
                    <input type="file" accept="image/*" className={style1.ImgContainer} alt="Active Image here" />
                  </div>
                  <div className={style1.RightSection}>
                    <input type='text' className={style1.productTitleHead} value={product.name}
                    placeholder="Product Name" onChange={(e) => {updateProductDetail('name',e.target.value)}} />
                    <input type='text' className={style1.productCompany} value={product.company}
                    placeholder="Company" onChange={(e) => {updateProductDetail('company',e.target.value)}} />
                    {/* Tags here. */}
                    <div className={style1.productTagsSection}>
                      <div className={style1.addProductTagBtn} onClick={() => {AddProductTag()}}> + Add Tag </div>
                        {product.tags.map((tag,index) => {
                        return(<input type="text" className={style1.productTagsInput} placeholder="NewTag"
                          onClick={()=>{changeActiveTagIndex(index)}} value = {tag} key={index}
                          onChange={(e)=>{updateTag(index, e.target.value)}} />)})}
                    </div>

                    <textarea className={style1.productTitleDesc} placeholder="Description about your product..."
                    onChange={(e) => {updateProductDetail('desc',e.target.value)}}>{product.desc}</textarea>
                    
                  </div>
                </div>
                <div className={style1.productBottomContainer}>
                  <div className={style1.prodBL}>
                    <div className={style1.productDiversityContainer}>
                    <div className={style1.addDiversityBtn} onClick={() => {setAddChoice(true)}}> + Add Choice </div>
                      {/* Diversity choices here */}
                      {product.DiversityInfo.map((diversity, index) => {
                      return (
                        <div className={style1.productDiversityOptionsContainer} key={index}>
                          {/* Common information */}
                          <div className={style1.DiversityItemHead}>Size: {diversity.size}</div>
                          <div className={style1.DiversityItem}>Color: {diversity.color || 'N/A'}</div>
                          <div className={style1.DiversityItem}>Stock: {diversity.stock}</div>
                          <div className={style1.DiversityItem}>Price: {diversity.price}</div>
                          
                          {/* Optional attributes */}
                          {Object.entries(diversity).map(([key, value], idx) => {
                            if (!['size', 'color', 'stock', 'price'].includes(key)) {
                              return (
                                <div className={style1.DiversityItem} key={idx}>
                                  {key}: {value}
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      );
                    })}

                    </div>
                  </div>
                  <div className={style1.prodBR}>
                    <input type="text" className={style1.productPrice} value={product.price}
                    placeholder="Price in ₹" onChange={(e) => {updateProductDetail('price',e.target.value)}} />
                    <div className={style1.productButtons}>
                      <div className={style1.productBuyBtn} onClick={() => SendUpdateToBackend()}>{" "} Save {" "}</div>
                      <Link href='/cms' className={style1.productBuyBtn}>
                        {" "}Cancel {" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
    )
}
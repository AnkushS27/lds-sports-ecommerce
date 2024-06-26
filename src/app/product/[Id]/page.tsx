"use client";
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";
import Loader from "@/Components/Loader/page";

import Image from "next/image";
import style1 from "./page.module.css";
import { loggedIn } from "@/app/api/user/loggedIn";
import Comment from "@/Components/Comment/page";
import Chatbox from "@/Components/Chatbox/page";
import { useEffect, useState } from "react";
import { ProductType } from "@/TypeInterfaces/TypeInterfaces";
import { getSession } from "next-auth/react";

export default function ProductDetails({ params }: { params: { Id: string } }) {
  const [session, setSession] = useState<any>();
  const [variationIdx, setVariationIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  const [product, setProduct] = useState<ProductType>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (index: number, image: string) => {
    setSelectedImageIndex(index);
    setSelectedImage(image);
  };

  useEffect(() => {
    const fetchData = async () => {
      const productId = params.Id;
      const userSession = await getSession();
      setSession(userSession);
      try {
        const response = await fetch("/api/product/getProduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSelectedImage(data.img[0].replace("./public", ""));
        setProduct(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addToCart = async () => {
    if (session && product) {
      try {
        const session = await getSession();
        const email = session?.user?.email;
        const response = await fetch("/api/cart/addToCart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: email,
            productId: product.productId,
            qty: 1,
            variationIdx,
            colorIdx,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const addToFavorites = async () => {
    if (session && product) {
      try {
        const session = await getSession();
        const userId = session?.user?.email;
        const response = await fetch("/api/favourite/addFavourite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId: product.productId, userId }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error adding to favorites:", error);
        // Handle error, maybe show a notification
      }
    }
  };

  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar
        params={{ name: "ABC", loggedIn: session ? true : false }}
      />
      <div className={style1.HorizontalMainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: session ? true : false }}
        />
        <div className={style1.VerticalMainContainer}>
          {product ? (
            <div className={style1.productContainer}>
              <div className={style1.productDetailsContainer}>
                <div className={style1.LeftSection}>
                  <div className={style1.imageContainer}>
                    <div className={style1.ImgsContainer}>
                      {product && product.img && product.img.length > 0 && (
                        <div className={style1.ImgsHolder}>
                          {product.img.map((image, index) => (
                            <div
                              className={style1.smallImage}
                              onClick={() =>
                                handleImageClick(
                                  index,
                                  image.replace("./public", "")
                                )
                              } // Add onClick event handler
                              key={index}
                            >
                              <Image
                                src={image.replace("./public", "")}
                                alt={`Product Image ${index + 1}`}
                                className={`${style1.productImg} ${
                                  selectedImageIndex === index &&
                                  style1.activeImgBox
                                }`}
                                width={90}
                                height={90}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={style1.biggestImage}>
                      <div className={style1.ImgContainer}>
                        {product &&
                          product.img &&
                          product.img[0] &&
                          selectedImage && (
                            <Image
                              src={selectedImage}
                              alt="Product Image"
                              className={style1.productImg}
                              objectFit="cover"
                              width={400}
                              height={400}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  <div className={style1.productButtons}>
                    <div className={style1.productCartBtn} onClick={addToCart}>
                      Add to Cart
                    </div>
                    <div
                      className={style1.productBuyBtn}
                      onClick={addToFavorites}
                    >
                      Add to Favourites
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
                  <div className={style1.productCompany}>
                    {product.companyId}
                  </div>
                  <div className={style1.productTitleDesc}>{product.desc}</div>
                  <div className={style1.productDiversityContainer}>
                    <div className={style1.productVariationsName}>
                      {product.variations.name}:
                    </div>
                    <div className={style1.productVariationsHolder}>
                      {product.variations.variations.map((variation, index) => {
                        return (
                          <div
                            className={style1.productDiversityItem}
                            style={
                              index === variationIdx
                                ? {
                                    backgroundColor: "white",
                                    color: "black",
                                  }
                                : {}
                            }
                            key={index}
                            onClick={() => {
                              setVariationIdx(index);
                            }}
                          >
                            {variation.value}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {product.colors && product.colors.length > 0 && (
                    <div className={style1.productDiversityContainer}>
                      <div className={style1.productVariationsName}>
                        Colors:
                      </div>
                      <div className={style1.productVariationsHolder}>
                        {product.colors.map((color, index) => {
                          return (
                            <div
                              className={style1.productDiversityItem}
                              style={
                                index === colorIdx
                                  ? {
                                      backgroundColor: "white",
                                      color: "black",
                                    }
                                  : {}
                              }
                              key={index}
                              onClick={() => {
                                setColorIdx(index);
                              }}
                            >
                              {color}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="productPriceContainer">
                    <div className="productPriceHolder">
                      {/* Previous Product Price */}
                      <div className={style1.productPrice}>
                        Rs. {product.variations.variations[variationIdx].price}
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
          ) : (
            <Loader />
          )}
          <Footer />
        </div>
      </div>
    </div>
  );
}

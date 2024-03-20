"use client";
import VerticalNavBar from "@/Components/CMS/VerticalNavbar/page";

import style1 from "./page.module.css";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export interface FrontendProductType {
  productId: string;
  imgs: File[];
  name: string;
  companyId: string;
  tags: string[];
  desc: string;
  colors: string[];
  variations: {
    name: string;
    variations: { value: number; stock: number; price: number }[];
  };
}

let prod: FrontendProductType = {
  productId: "",
  imgs: [],
  name: "",
  companyId: "",
  tags: [],
  desc: "",
  colors: [],
  variations: {
    name: "Size",
    variations: [
      { value: 5, stock: 10, price: 1000 },
      { value: 6, stock: 20, price: 1100 },
      { value: 7, stock: 15, price: 1200 },
    ],
  },
};

export default function Product({
  params,
}: {
  params: {
    Id: string;
  };
}) {
  prod.productId = params.Id;
  const [product, setProduct] = useState(prod);
  const [activeTagIndex, setActiveTagIndex] = useState(-1);
  const [activeColorIndex, setActiveColorIndex] = useState(-1);
  const imgWindowSize = 3; // 3 + 1 (Add Image Btn)
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const AddVariation = () => {
    let newVariation = { value: 0, stock: 0, price: 0 };
    setProduct((prevProd) => ({
      ...prevProd,
      variations: {
        ...prevProd.variations,
        variations: [newVariation, ...prevProd.variations.variations],
      },
    }));
  };

  const SendUpdateToBackend = async () => {
    console.log(product);
    const formData = new FormData();

    // Append product details to FormData
    Object.entries(product).forEach(([key, value]) => {
      if (key === "imgs") {
        // Filter out empty files before appending to FormData
        const nonEmptyImgs = value.filter((img: File) => img.size > 0);
        nonEmptyImgs.forEach((img: File, index: number) => {
          formData.append(`imgs`, img);
        });
      } else if (typeof value === "object") {
        if (key === "variations") {
          // Map variations to include only non-empty variations
          const filteredVariations = value.variations.filter(
            (variation: any) => variation.value !== 0
          );
          formData.append(
            key,
            JSON.stringify({
              name: value.name,
              variations: filteredVariations,
            })
          );
        } else {
          formData.append(key, JSON.stringify(value));
        }
      } else {
        formData.append(key, value);
      }
    });

    const res = await axios.post("/api/cms/product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
  };

  const AddNewImg = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      imgs: [...prevProduct.imgs, new File([], "")],
    }));

    setActiveImgIndex(product.imgs.length);
  };

  const UpdateImg = (newImg: FileList | null) => {
    if (!newImg) return;
    setProduct((prevProduct) => ({
      ...prevProduct,
      imgs: [
        ...prevProduct.imgs.map((img, idx) => {
          return idx === activeImgIndex ? newImg[0] : img;
        }),
      ],
    }));
  };

  const removeImg = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    if (activeImgIndex === 0) return;

    setProduct((prevProduct) => ({
      ...prevProduct,
      imgs: prevProduct.imgs.filter((img, idx) => idx !== activeImgIndex),
    }));
  };

  const AddProductTag = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: [...prevProduct.tags, ""], // Add an empty string to the tags array
    }));
    setActiveTagIndex(product.tags.length);
  };

  const AddColor = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: [...prevProduct.colors, ""], // Add an empty string to the colors array
    }));
    setActiveColorIndex(product.colors.length);
  };

  const updateProductVariationName = (name: string) => {
    setProduct((prevProd) => ({
      ...prevProd,
      variations: {
        ...prevProd.variations,
        name: name,
      },
    }));
  };

  const updateProductVariation = (
    idx: number,
    key: string,
    value: string | number
  ) => {
    setProduct((prevProd) => ({
      ...prevProd,
      variations: {
        ...prevProd.variations,
        variations: prevProd.variations.variations.map((variation, i) => {
          if (i === idx) {
            return {
              ...variation,
              [key]: value,
            };
          }
          return variation;
        }),
      },
    }));
  };

  const changeActiveTagIndex = (idx: number) => {
    // Check if the active index is current index.
    if (idx === activeTagIndex) return;

    // Remove the previous active tag if it is empty.
    if (activeTagIndex !== -1 && product.tags[activeTagIndex] === "") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        tags: prevProduct.tags.filter((tag, index) => {
          if (index !== activeTagIndex) return tag;
        }),
      }));
    }

    // Set this new tag as active.
    setActiveTagIndex(idx);
  };

  const updateTag = (idx: number, str: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      tags: prevProduct.tags.map((tag, index) => (index === idx ? str : tag)),
    }));
  };

  const updateColor = (idx: number, str: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colors: prevProduct.colors.map((color, index) => (index === idx ? str : color)),
    }));
  };  

  const changeActiveColorIndex = (idx: number) => {
    // Check if the active index is current index.
    if (idx === activeColorIndex) return;

    // Remove the previous active tag if it is empty.
    if (activeColorIndex !== -1 && product.colors[activeColorIndex] === "") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        colors: prevProduct.colors.filter((color, index) => {
          if (index !== activeColorIndex) return color;
        }),
      }));
    }

    // Set this new tag as active.
    setActiveColorIndex(idx);
  };

  const updateProductDetail = (key: string, value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [key]: value,
    }));
  };

  return (
    <div className={style1.mainWrapper}>
      <VerticalNavBar params={{ name: "ABC", loggedIn: true }} />
      <div className={style1.VerticalMainContainer}>
        <div className={style1.productContainer}>
          <div className={style1.productDetailsContainer}>
            <div className={style1.LeftSection}>
              <div className={style1.ImgsContainer}>
                <div className={style1.ImgsHolder}>
                  {product.imgs.map((img, idx) => {
                    if (
                      idx < activeImgIndex - imgWindowSize ||
                      (activeImgIndex >= imgWindowSize
                        ? idx > activeImgIndex
                        : idx > imgWindowSize)
                    )
                      return "";
                    return (
                      <div
                        className={`${style1.ImgSmallBox} ${
                          idx === activeImgIndex ? style1.activeImgBox : ""
                        }`}
                        key={idx}
                        onClick={() => {
                          setActiveImgIndex(idx);
                        }}
                      >
                        <Image
                          src={img.size > 0 ? URL.createObjectURL(img) : ""}
                          alt="Add Your Image"
                          fill
                          className={style1.smallImg}
                        />
                      </div>
                    );
                  })}
                  <div
                    className={style1.ImgSmallBox}
                    onClick={() => {
                      AddNewImg();
                    }}
                  >
                    {" "}
                    + Add{" "}
                  </div>
                </div>
                <div className={style1.ImgsController}>
                  <div
                    className={style1.ImgsControllBtn}
                    onClick={() => {
                      setActiveImgIndex(activeImgIndex - 1);
                    }}
                    style={activeImgIndex > 0 ? {} : { display: "none" }}
                  >
                    ^
                  </div>
                  see more
                  <div
                    className={style1.ImgsControllBtn}
                    onClick={() => {
                      setActiveImgIndex(activeImgIndex + 1);
                    }}
                    style={
                      activeImgIndex < product.imgs.length - 1
                        ? {}
                        : { display: "none" }
                    }
                  >
                    v
                  </div>
                </div>
              </div>
              <div
                className={style1.ImgContainer}
                onClick={() => {
                  document.getElementById("activeInpImg")?.click();
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  alt="Active Image here"
                  hidden
                  id="activeInpImg"
                  onChange={(e) => {
                    UpdateImg(e.target.files);
                  }}
                />
                <div className={style1.smallImg}>
                  <Image
                    src={
                      product.imgs[activeImgIndex]
                        ? URL.createObjectURL(product.imgs[activeImgIndex])
                        : ""
                    }
                    alt=" Add your Image"
                    fill
                  />
                  <div
                    className={style1.removeImgBtn}
                    onClick={(e: React.SyntheticEvent) => {
                      removeImg(e);
                    }}
                  >
                    {" "}
                    Remove{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className={style1.RightSection}>
              <input
                type="text"
                className={style1.productTitleHead}
                value={product.name}
                placeholder="Product Name"
                onChange={(e) => {
                  updateProductDetail("name", e.target.value);
                }}
              />
              <input
                type="text"
                className={style1.productCompany}
                value={product.companyId}
                placeholder="Company"
                onChange={(e) => {
                  updateProductDetail("companyId", e.target.value);
                }}
              />
              {/* Tags here. */}
              <div className={style1.productTagsSection}>
                <div
                  className={style1.addProductTagBtn}
                  onClick={() => {
                    AddProductTag();
                  }}
                >
                  {" "}
                  + Add Tag{" "}
                </div>
                {product.tags.map((tag, index) => {
                  return (
                    <input
                      type="text"
                      className={style1.productTagsInput}
                      placeholder="NewTag"
                      onClick={() => {
                        changeActiveTagIndex(index);
                      }}
                      value={tag}
                      key={index}
                      onChange={(e) => {
                        updateTag(index, e.target.value);
                      }}
                    />
                  );
                })}
              </div>
              
              {/* Colors here */}
              <div className={style1.productTagsSection}>
                <div
                  className={style1.addProductTagBtn}
                  onClick={() => {
                    AddColor();
                  }}
                >
                  {" "}
                  + Add Colour{" "}
                </div>
                {product.colors.map((color, index) => {
                  return (
                    <input
                      type="text"
                      className={style1.productTagsInput}
                      placeholder="NewColour"
                      onClick={() => {
                        changeActiveColorIndex(index);
                      }}
                      value={color}
                      key={index}
                      onChange={(e) => {
                        updateColor(index, e.target.value);
                      }}
                    />
                  );
                })}
              </div>

              <textarea
                className={style1.productTitleDesc}
                placeholder="Description about your product..."
                onChange={(e) => {
                  updateProductDetail("desc", e.target.value);
                }}
                defaultValue={product.desc}
              ></textarea>
            </div>
          </div>
          <div className={style1.productBottomContainer}>
            <div className={style1.prodBL}>
              <div className={style1.productDiversityContainer}>
                <div className={style1.productVariationsTop}>
                  <input
                    type="text"
                    className={style1.productVariationsName}
                    defaultValue={product.variations.name}
                    onChange={(e) => {
                      updateProductVariationName(e.target.value);
                    }}
                    placeholder="Variation Name"
                  />
                  <div
                    className={style1.addVariationBtn}
                    onClick={() => {
                      AddVariation();
                    }}
                  >
                    {" "}
                    + Add Variation{" "}
                  </div>
                </div>
                <div className={style1.variationsHolder}>
                  {product.variations.variations.map((variation, index) => {
                    return (
                      <div
                        className={style1.variationItemContainer}
                        key={index}
                      >
                        <input
                          type="numeric"
                          className={style1.variationItemDiff}
                          onChange={(e) => {
                            updateProductVariation(
                              index,
                              "value",
                              parseInt(e.target.value)
                            );
                          }}
                          defaultValue={variation.value.toString()}
                          placeholder="Size"
                        />
                        <input
                          type="numeric"
                          className={style1.variationItemDiff}
                          onChange={(e) => {
                            updateProductVariation(
                              index,
                              "stock",
                              parseInt(e.target.value)
                            );
                          }}
                          defaultValue={variation.stock.toString()}
                          placeholder="Stock"
                        />
                        <input
                          type="numeric"
                          className={style1.variationItemDiff}
                          onChange={(e) => {
                            updateProductVariation(
                              index,
                              "price",
                              parseInt(e.target.value)
                            );
                          }}
                          defaultValue={variation.price.toString()}
                          placeholder="Price"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={style1.prodBR}>
              <input
                type="text"
                className={style1.productPrice}
                value={product.variations.variations[0].price}
                placeholder="Price in ₹"
                onChange={(e) => {
                  updateProductVariation(0, "price", parseInt(e.target.value));
                }}
              />
              <div className={style1.productButtons}>
                <div
                  className={style1.productBuyBtn}
                  onClick={() => SendUpdateToBackend()}
                >
                  {" "}
                  Save{" "}
                </div>
                <Link href="/cms" className={style1.productBuyBtn}>
                  {" "}
                  Cancel{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import HorizontalNavBar from "@/Components/HorizontalNavbar/page"
import VerticalNavBar from "@/Components/VerticalNavbar/page"

import style1 from './page.module.css'

let product = {
    pid: "001",
    name: "cricket Bat",
    company: "kokabura",
    price: "₹1000",
    desc: "Product 1 is one the most selled products from the company 1. Limited products so buy soon.",
    DiversityInfo: { sizes: [6, 7, 8, 9, 10], color: ["black", "red"] },
  };

export default function Product({ params } : {
    params : {
        Id : string,
    }
}) {

    return (
        <div className={style1.mainWrapper}>
            <VerticalNavBar
              params={{ name: "ABC", loggedIn: true, homePage: true }}
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
                    <div className={style1.ImgContainer}> Active Image here </div>
                  </div>
                  <div className={style1.RightSection}>
                    <div className={style1.productTitleHead}>{product.name}</div>
                    <div className={style1.productCompany}>{product.company}</div>
                    <div className={style1.productTitleDesc}>{product.desc}</div>
                    <div className={style1.productDiversityContainer}>
                      {Object.entries(product.DiversityInfo).map(
                        ([k, value], index) => {
                          return (
                            <div
                              className={style1.productDiversityOptionsContainer}
                              key={index}
                            >
                                {k}
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
                    <div className={style1.productButtons}>
                      <div className={style1.productCartBtn}>+ Add to Cart</div>
                      <div className={style1.productBuyBtn}>
                        {" "}
                        Add to Favourites{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={style1.productCommentsContainer}>
                  No Comments Yet !
                </div>
              </div>
          </div>
        </div>
    )
}
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";
import Footer from "@/Components/Footer/page";

import style1 from "./page.module.css";
import { loggedIn } from "@/app/api/user/loggedIn";
// import { getData } from "@/db/testing";

let product = {
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

export default async function ProductDetails({
  params,
}: {
  params: { Id: string };
}) {
  const isloggedIn = loggedIn({});
  // const data = await getData();
  // console.log(data);
  return (
    <div className={style1.mainWrapper}>
      <HorizontalNavBar params={{ name: "ABC", loggedIn: isloggedIn }} />
      <div className={style1.HorizontalMainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: isloggedIn }}
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
                <div className={style1.productTagsContainer}>
                  {product.tags.map((tag,index) => {
                    return(
                      <div className={style1.productTagItem} key={index}>{tag}</div>
                    )
                  })}
                </div>
                <div className={style1.productCompany}>{product.company}</div>
                <div className={style1.productTitleDesc}>{product.desc}</div>
                <div className={style1.productDiversityContainer}>
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
          <Footer />
        </div>
      </div>
    </div>
  );
}

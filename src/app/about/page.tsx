import styles from "./page.module.css";
import Link from 'next/link';

// components
// Components
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import { loggedIn } from "@/app/api/user/loggedIn";

export default function About() {
  const isloggedIn = loggedIn({});

  return (
    <div className={styles.aboutWrapper}>
      <HorizontalNavBar params={{ name: "ABC", loggedIn: isloggedIn }} />
      <div className={styles.verticalMainContainer}>
        <VerticalNavBar
          params={{ name: "ABC", loggedIn: isloggedIn, homePage: true }}
        />

        <main className={styles.aboutContainer}>
          <section className={styles.section}>
            <h1>Our Story</h1>
            <p>
              Welcome to LDS Sports, your premier source for top-notch cricket
              equipment. Founded with a passion for sports, we aim to provide
              cricket enthusiasts with the finest gear to enhance their game.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Our Services</h2>
            <p>
              At LDS Sports, we are dedicated to offering exceptional services
              to our customers. From a wide range of cricket products to
              excellent customer support, we strive to make your shopping
              experience seamless and enjoyable.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Quality Matters</h2>
            <p>
              We take pride in the quality of our products. Every cricket bat,
              ball, and accessory in our inventory is carefully selected to meet
              the highest standards. Trust LDS Sports for durable and
              high-performance cricket equipment.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Why Choose LDS Sports?</h2>
            <ul className={styles.whyList}>
              <li className={styles.whyListItems}>
                Extensive Selection: Explore a diverse range of cricket
                equipment tailored to your needs.
              </li>
              <li className={styles.whyListItems}>
                Quality Assurance: Our products undergo rigorous quality checks
                to ensure top-notch performance.
              </li>
              <li className={styles.whyListItems}>
                Expert Advice: Need assistance? Our knowledgeable team is here
                to help you make informed decisions.
              </li>
              <li className={styles.whyListItems}>
                Customer Satisfaction: Your satisfaction is our priority, and we
                go the extra mile to exceed your expectations.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
          <h2>Ready to Gear Up?</h2>
          <p>Explore our catalog and find the perfect cricket equipment for you.</p>
          <div className={styles.ctaButtons}>
            <Link href="#" className={styles.ctaButton}>
              Explore Catalog
            </Link>
            <Link href="#" className={styles.ctaButton}>
              Contact Us
            </Link>
          </div>
        </section>
        </main>
      </div>
    </div>
  );
}

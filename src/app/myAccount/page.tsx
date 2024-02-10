"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
}

interface ShippingInfo {
  name: string;
  phone: string;
  email: string;
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface BillingInfo {
  name: string;
  phone: string;
  email: string;
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface EditMode {
  personal: boolean;
  shipping: boolean;
  billing: boolean;
}

export default function myAccount() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    houseNo: "456",
    street: "Billing St",
    landmark: "Near Mall",
    city: "Cityville",
    state: "Stateville",
    pincode: "54321",
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    houseNo: "456",
    street: "Billing St",
    landmark: "Near Mall",
    city: "Cityville",
    state: "Stateville",
    pincode: "54321",
  });

  const [editMode, setEditMode] = useState<EditMode>({
    personal: false,
    shipping: false,
    billing: false,
  });

  const handleEdit = (section: keyof EditMode) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [section]: true }));
  };

  const handleSave = (section: keyof EditMode) => {
    // You can implement saving logic here, e.g., making an API request to update user information
    setEditMode((prevEditMode) => ({ ...prevEditMode, [section]: false }));
  };

  const renderEditablePersonalInfo = (
    personalInfo: PersonalInfo,
    setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>,
    section: keyof EditMode
  ) => {
    return Object.keys(personalInfo).map((key) => (
      <div key={key} className={styles.field}>
        <p className={styles.label}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:
        </p>
        {editMode[section] ? (
          <input
            type="text"
            className={styles.inputField}
            value={personalInfo[key as keyof PersonalInfo]}
            onChange={(e) =>
              setPersonalInfo((prevInfo) => ({
                ...prevInfo,
                [key]: e.target.value,
              }))
            }
          />
        ) : (
          <p className={styles.value}>
            {personalInfo[key as keyof PersonalInfo]}
          </p>
        )}
      </div>
    ));
  };

  const renderEditableShippingBillingInfo = (
    shippingBillingInfo: ShippingInfo | BillingInfo,
    setShippingBillingInfo: React.Dispatch<
      React.SetStateAction<ShippingInfo | BillingInfo>
    >,
    section: keyof EditMode
  ) => {
    return Object.keys(shippingBillingInfo).map((key) => (
      <div key={key} className={styles.field}>
        <p className={styles.label}>
          {key.charAt(0).toUpperCase() + key.slice(1)}:
        </p>
        {editMode[section] ? (
          <input
            type="text"
            className={styles.inputField}
            value={
              shippingBillingInfo[key as keyof (ShippingInfo | BillingInfo)]
            }
            onChange={(e) =>
              setShippingBillingInfo((prevInfo) => ({
                ...prevInfo,
                [key]: e.target.value,
              }))
            }
          />
        ) : (
          <p className={styles.value}>
            {shippingBillingInfo[key as keyof (ShippingInfo | BillingInfo)]}
          </p>
        )}
      </div>
    ));
  };

  const [activeSection, setActiveSection] = useState('mydetails');

  const handleSectionChange = (section:string) => {
    setActiveSection(section);
  };

  return (
    <div className={styles.myAccount}>
      <h1 className={styles.title}>My Account</h1>

      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li>
            <button
              className={`${styles.navLink} ${
                activeSection === "mydetails" && styles.activeLink
              }`}
              onClick={() => handleSectionChange("mydetails")}
            >
              My Details
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeSection === "wishlist" && styles.activeLink
              }`}
              onClick={() => handleSectionChange("wishlist")}
            >
              Wishlist
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeSection === "myorders" && styles.activeLink
              }`}
              onClick={() => handleSectionChange("myorders")}
            >
              My Orders
            </button>
          </li>
          <li>
            <button
              className={`${styles.navLink} ${
                activeSection === "trackorder" && styles.activeLink
              }`}
              onClick={() => handleSectionChange("trackorder")}
            >
              Track Order
            </button>
          </li>
        </ul>
      </nav>

      <div className={styles.myAccount}>
        {activeSection === "mydetails" && (
          <div>
            <div className={styles.infoBlock}>
              <h2 className={styles.blockTitle}>
                Personal Information
                {editMode.personal ? (
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave("personal")}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit("personal")}
                  >
                    EDIT
                  </button>
                )}
              </h2>
              <div className={styles.info}>
                {renderEditablePersonalInfo(
                  personalInfo,
                  setPersonalInfo,
                  "personal"
                )}
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.blockTitle}>
                Shipping Information
                {editMode.shipping ? (
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave("shipping")}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit("shipping")}
                  >
                    EDIT
                  </button>
                )}
              </h2>
              <div className={styles.info}>
                {renderEditableShippingBillingInfo(
                  shippingInfo,
                  setShippingInfo,
                  "shipping"
                )}
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h2 className={styles.blockTitle}>
                Billing Information
                {editMode.billing ? (
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave("billing")}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit("billing")}
                  >
                    EDIT
                  </button>
                )}
              </h2>
              <div className={styles.info}>
                {renderEditableShippingBillingInfo(
                  billingInfo,
                  setBillingInfo,
                  "billing"
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {activeSection === "wishlist" && (
          <div className={styles.infoBlock}>
            {/* ... (content for the "Track Order" section) */}
          </div>
        )}
      </div>

      <div>
        {activeSection === "myorders" && (
          <div className={styles.infoBlock}>
            {/* ... (content for the "my orders" section) */}
          </div>
        )}
      </div>

      <div>
        {activeSection === "trackorder" && (
          <div className={styles.infoBlock}>
            {/* ... (content for the "Track Order" section) */}
          </div>
        )}
      </div>
    </div>
  );
}

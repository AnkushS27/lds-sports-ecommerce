"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

interface PersonalInfo {
  name: string;
  phone: string;
  email: string;
}

interface ShippingInfo {
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
}

interface BillingInfo {
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

export default function MyAccount() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  });

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    houseNo: "456",
    street: "Billing St",
    landmark: "Near Mall",
    city: "Cityville",
    state: "Stateville",
    pincode: "54321",
  });

  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
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

  return (
    <div className={styles.mainWrapper}>
      <h1 className={styles.title}>My Account</h1>

      <div className={styles.myAccount}>
        <div className={styles.seperateSection}>
          <div className={styles.personalInfo}>
            <div className={styles.profilePicBlock}>
              <div className={styles.profilePic}>
                <div className={styles.profilePicImage}></div>
                {/* Edit button for profile picture */}
              </div>
            </div>
            <div className={styles.infoBlock}>
              <h2 className={styles.blockTitle}>
                Personal Information
                {editMode.personal ? (
                  <button
                    className={styles.saveButton}
                    onClick={() => handleSave("personal")}
                  >
                    SAVE
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
          </div>

          <div className={styles.infoBlock}>
            <h2 className={styles.blockTitle}>
              Primary Address
              {editMode.shipping ? (
                <button
                  className={styles.saveButton}
                  onClick={() => handleSave("shipping")}
                >
                  SAVE
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
              Secondary Address
              {editMode.billing ? (
                <button
                  className={styles.saveButton}
                  onClick={() => handleSave("billing")}
                >
                  SAVE
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
      </div>
    </div>
  );
}

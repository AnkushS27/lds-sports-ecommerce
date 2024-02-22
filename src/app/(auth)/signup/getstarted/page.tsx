"use client";
import { useState } from "react";

import styles from "./page.module.css";

type AddressForm = {
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

export default function GetStarted() {
  const [address, setAddress] = useState<AddressForm>({
    houseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic for handling form submission
    console.log("Address:", address);
    console.log("Phone Number:", phoneNumber);
  };
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.getStartedContainer}>
        {/* Form heading */}
        <h1 className={styles.getStartedTitle}>Get Started</h1>

        {/* Form Container */}
        <h3>Please fill out the following information:</h3>
        <form>
          <label>
            House Number:
            <input
              type="text"
              value={address.houseNo}
              onChange={(e) =>
                setAddress({ ...address, houseNo: e.target.value })
              }
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
            />
          </label>
          <label>
            Landmark:
            <input
              type="text"
              value={address.landmark}
              onChange={(e) =>
                setAddress({ ...address, landmark: e.target.value })
              }
            />
          </label>
          <label>
            City:
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </label>
          <label>
            State:
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
          </label>
          <label>
            Pincode:
            <input
              type="text"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </form>
        <p>*Disclaimer: This form should be filled only once during signup.</p>
        <button type="submit" onClick={handleSubmit}>
          Proceed
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { userAgent } from "next/server";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
};

type Address = {
  houseNo: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
};

export default function MyAccount() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      houseNo: "123",
      street: "Main Street",
      landmark: "Near Park",
      city: "Cityville",
      state: "Stateville",
      pincode: "12345",
    },
    // Add more addresses as needed
  ]);

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddressIndex, setEditAddressIndex] = useState<number | null>(null);
  const [showAddAddressButton, setShowAddAddressButton] = useState(true);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleAddressChange = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
      return updatedAddresses;
    });
  };

  const handleSavePersonalInfo = () => {
    // Implement your save logic for personal info here
    setEditPersonalInfo(false);
    console.log("Saving personal info:", personalInfo);
  };

  const handleSaveAddress = (index: number) => {
    const editedAddress = addresses[index];
  
    // Check if all fields in the address are filled
    if (Object.values(editedAddress).every((value) => value.trim() !== '')) {
      // Implement your save logic for individual address here
      console.log('Saving address:', editedAddress);
      setShowAddAddressButton(true);
    } else {
      // Display an error message or handle the case where not all fields are filled
      console.error('Please fill in all fields before saving the address.');
      // Optionally, you may choose to return or not save the address based on your requirements.
      return;
    }
  
    setEditAddressIndex(null);
  };

  const handleAddAddress = () => {
    setShowAddAddressButton(false);
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        houseNo: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
      },
    ]);
    setEditAddressIndex(addresses.length);
  };

  const handleCancelAddress = (index: number) => {
    // Check if the address is the last one (the one being added)
    if (index === addresses.length - 1) {
      if (isEmptyAddress(addresses[index])) {
        // If it's an unsaved new address, remove it from the addresses array
        setAddresses((prevAddresses) => prevAddresses.slice(0, -1));
        // Show the "Add Address" button again
        setShowAddAddressButton(true);
      } else {
        // Revert the changes made during editing by resetting the address to its original state
        setAddresses((prevAddresses) => {
          const updatedAddresses = [...prevAddresses];
          updatedAddresses[index] = { ...addresses[index] };
          return updatedAddresses;
        });
      }
    } else {
      // Revert the changes made during editing by resetting the address to its original state
      setAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses];
        updatedAddresses[index] = { ...addresses[index] };
        return updatedAddresses;
      });
    }
    setEditAddressIndex(null);
  };  

  const isEmptyAddress = (address: Address): boolean => {
    return Object.values(address).every((value) => value === "");
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainProfileContainer}>
        <h1 className={styles.title}>User Profile</h1>

        {/* Personal Info Section */}
        <div className={styles.personalInfoContainer}>
            <div className={styles.userImageContainer}>
                <div></div>
                <p>Hi {personalInfo.name}</p>
            </div>
            <div className={styles.section}>
            <h2>
                Personal Information
                {editPersonalInfo ? (
                <button onClick={handleSavePersonalInfo}>Save</button>
                ) : (
                <button onClick={() => setEditPersonalInfo(true)}>Edit</button>
                )}
            </h2>
            <div className={styles.inputContainer}>
            <div className={styles.inputContainerItem}>
                <label>Name:</label>
                {editPersonalInfo ? (
                <input
                    type="text"
                    value={personalInfo.name}
                    onChange={(e) =>
                    handlePersonalInfoChange("name", e.target.value)
                    }
                />
                ) : (
                <span>{personalInfo.name}</span>
                )}
            </div>
            <div className={styles.inputContainerItem}>
                <label>Email:</label>
                {editPersonalInfo ? (
                <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                    }
                />
                ) : (
                <span>{personalInfo.email}</span>
                )}
            </div>
            <div className={styles.inputContainerItem}>
                <label>Phone:</label>
                {editPersonalInfo ? (
                <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                    }
                />
                ) : (
                <span>{personalInfo.phone}</span>
                )}
            </div>
            </div>
            </div>
        </div>

        {/* Address Section */}
        <div className={styles.section}>
          <h2>
            Manage Addresses
            {showAddAddressButton && (
              <button onClick={handleAddAddress}>+ Add Address</button>
            )}
          </h2>
          {addresses.map((address, index) => (
            <div key={index} className={styles.address}>
              <h2>
                Address {index + 1}
                {editAddressIndex === index ? (
                  <div className={styles.saveCancelButtons}>
                    <button onClick={() => handleSaveAddress(index)}>
                      Save
                    </button>
                    <button onClick={() => handleCancelAddress(index)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setEditAddressIndex(index)}>
                    Edit
                  </button>
                )}
              </h2>
              <div className={styles.inputContainer}>
                <div className={styles.inputContainerItem}>
                  <label>House No:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.houseNo}
                      onChange={(e) =>
                        handleAddressChange(index, "houseNo", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.houseNo}</span>
                  )}
                </div>
                <div className={styles.inputContainerItem}>
                  <label>Street:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange(index, "street", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.street}</span>
                  )}
                </div>
                <div className={styles.inputContainerItem}>
                  <label>Landmark:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) =>
                        handleAddressChange(index, "landmark", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.landmark}</span>
                  )}
                </div>
                <div className={styles.inputContainerItem}>
                  <label>City:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange(index, "city", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.city}</span>
                  )}
                </div>
                <div className={styles.inputContainerItem}>
                  <label>State:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) =>
                        handleAddressChange(index, "state", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.state}</span>
                  )}
                </div>
                <div className={styles.inputContainerItem}>
                  <label>Pincode:</label>
                  {editAddressIndex === index ? (
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        handleAddressChange(index, "pincode", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.pincode}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

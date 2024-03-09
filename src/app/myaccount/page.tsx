"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { userAgent } from "next/server";

type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
};

type Address = {
  houseno: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  postalCode: string;
};

export default function MyAccount() {
  useEffect(() => {
    const fetchData = async () => {
      const email = 'sampleuser@example.com'; // for testing purpose email will be taken from session

      try {
        const response = await fetch('/api/user/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Data:', data);
        setPersonalInfo({
          name: data.username,
          email: data.email,
          phone: data.phone,
        });
        setAddresses(data.addresses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Fetch data when the component mounts

    // You can add dependencies to the array below if needed
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts


  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "username",
    email: "email",
    phone: "phone",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      houseno: "houseno",
      street: "street",
      landmark: "landmark",
      city: "city",
      state: "state",
      postalCode: "postalCode",
    },
    // Add more addresses as needed
  ]);

  const handleUpdateUser = async () => {
    try {
      const response = await fetch('/api/user/updateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: personalInfo.email,
          username: personalInfo.name,
          phone: personalInfo.phone,
          addresses,
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating user data');
      }

      const updatedUserData = await response.json();

      console.log('User details updated successfully:', updatedUserData);

      // Add any further actions or state updates here if needed

    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const [editPersonalInfo, setEditPersonalInfo] = useState(false);
  const [editAddressIndex, setEditAddressIndex] = useState<number | null>(null);
  const [showAddAddressButton, setShowAddAddressButton] = useState(true);
  const [originalAddresses, setOriginalAddresses] = useState<Address[]>([]);
  const [isAddressBeingEdited, setIsAddressBeingEdited] = useState(false);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const handleEditAddress = (index: number) => {
    setOriginalAddresses(addresses); // Copy current addresses to originalAddresses
    setEditAddressIndex(index);
    setIsAddressBeingEdited(true); // Set the flag to true when an address is being edited
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
    handleUpdateUser();
    setEditPersonalInfo(false);
    console.log("Saving personal info:", personalInfo);
  };

  const handleSaveAddress = async (index: number) => {
    const editedAddress = addresses[index];

    // Check if all fields in the address are filled
    if (Object.values(editedAddress).every((value) => value.trim() !== '')) {
      setAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses];
        updatedAddresses[index] = { ...editedAddress };
        return updatedAddresses;
      });

      setShowAddAddressButton(true);
    } else {
      // Display an error message or handle the case where not all fields are filled
      console.error('Please fill in all fields before saving the address.');
      // Optionally, you may choose to return or not save the address based on your requirements.
      return;
    }

    setEditAddressIndex(null);
    setIsAddressBeingEdited(false); // Reset the flag when saving the address
    handleUpdateUser(); // Call the common update function after saving the address
  };

  const handleAddAddress = () => {
    setShowAddAddressButton(false);
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        houseno: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        postalCode: "",
      },
    ]);
    setEditAddressIndex(addresses.length);
    setIsAddressBeingEdited(true); // Set the flag to true when an address is being added
  };

  const handleCancelAddress = (index: number) => {
    if (originalAddresses.length > 0) {
      setAddresses(originalAddresses);
    } else {
      // Handle reverting to initial state
      setAddresses((prevAddresses) => {
        const updatedAddresses = [...prevAddresses];
        updatedAddresses.splice(index, 1); // Remove the newly added address
        return updatedAddresses;
      });
    }
    setEditAddressIndex(null);
    setShowAddAddressButton(true);
    setIsAddressBeingEdited(false); // Reset the flag when cancelling the address
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
                    readOnly
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
              <button onClick={ () => {if(editAddressIndex === null){handleAddAddress();}}}>+ Add Address</button>
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
                  <button onClick={() => {if (!isAddressBeingEdited) {setEditAddressIndex(index);handleEditAddress(index);}}}>
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
                      value={address.houseno}
                      onChange={(e) =>
                        handleAddressChange(index, "houseno", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.houseno}</span>
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
                      value={address.postalCode}
                      onChange={(e) =>
                        handleAddressChange(index, "postalCode", e.target.value)
                      }
                    />
                  ) : (
                    <span>{address.postalCode}</span>
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

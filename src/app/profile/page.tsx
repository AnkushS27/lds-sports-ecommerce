'use client'
import HorizontalNavBar from "@/Components/HorizontalNavbar/page";
import VerticalNavBar from "@/Components/VerticalNavbar/page";

import style1 from './page.module.css'
import { useState } from "react";

type addressObj = {
    city : string,
    state : string,
    street : string,
    others : string,
}

type userType = {
    name : string,
    email : string,
    mobile : string,
    address : addressObj[],
}

let sampleUser = {
    name : 'jhon doe',
    email : 'jhondoe@email.com',
    mobile : '1122334455',
    address : [
        {city : 'Delhi', state : 'Delhi', street : 'something', others : 'remaning'},
        {city : 'Vadodara', state : 'Gujarat', street : 'something', others : 'remaning'},
        {city : 'Faridabad', state : 'Haryana', street : 'something', others : 'remaning'},
    ]
}


export default function Profile() {
    const [edit, setEdit] = useState(false);
    const updateDetails = () => {
        // Send the details to the backend
        setEdit(!edit);
    }
    const cancelUpdate = () => {
        // Request the previous details from the backend
        setEdit(!edit);
    }
    const [user,setUser] = useState<userType>(sampleUser);
    return (
        <div className={style1.mainWrapper}>
            <HorizontalNavBar params={{name:'ABC',loggedIn:true}} />
            <div className={style1.HorizontalmainContainer}> 
                <VerticalNavBar params={{name : 'ABC', loggedIn : true}} />
                <div className={style1.VerticalmainContainer}>
                    <div className={style1.updateBtnsContainer}>
                        <div className={style1.updateDetailsBtn} onClick={() => updateDetails()}> {edit ? 'Save' : 'Edit'}</div>
                        {edit && <div className={style1.updateDetailsBtn} onClick={() => cancelUpdate()} style={{background:'red'}}> Cancel </div>}
                    </div>
                    <div className={style1.profileSection}>
                        <div className={style1.profileLeftSection}>
                            <div className={style1.profilePic}>Pic here</div>
                        </div>
                        <div className={style1.profileRightSection}>
                            <div className={style1.profileItemsContainer}>
                                <div className={style1.profileSectionHead}> Personal Info </div>
                                <div className={style1.profileItem}>
                                    <div className={style1.profileItemLabel}> Name : </div>
                                    <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={user.name} />
                                </div>
                                <div className={style1.profileItem}>
                                    <div className={style1.profileItemLabel}> Email : </div>
                                    <input type="email" className={style1.profileItemInp} readOnly={(!edit)} value={user.email} />
                                </div>
                                <div className={style1.profileItem}>
                                    <div className={style1.profileItemLabel}> Mobile : </div>
                                    <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={user.mobile} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style1.addressSection}>
                        <div className={style1.profileSectionHead}> Address </div>
                        {user.address.map((add,index) => {
                            return(
                                <div className={style1.profileaddressContainer} key={index}>
                                    <div className={style1.profileAddressHead}> Address {` ${index+1}`}</div>    
                                    <div className={style1.profileItem}>
                                        <div className={style1.profileItemLabel}> City : </div>
                                        <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={add.city} />
                                    </div>
                                    <div className={style1.profileItem}>
                                        <div className={style1.profileItemLabel}> State : </div>
                                        <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={add.state} />
                                    </div>
                                    <div className={style1.profileItem}>
                                        <div className={style1.profileItemLabel}> Street : </div>
                                        <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={add.street} />
                                    </div>
                                    <div className={style1.profileItem}>
                                        <div className={style1.profileItemLabel}> Other : </div>
                                        <input type="text" className={style1.profileItemInp} readOnly={(!edit)} value={add.others} />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style1.profileSettingsSection}>
                        <div className={style1.profileSectionHead}> Account Settings </div>
                        <div className={style1.profileSettingsBtn}> Update Password </div>
                        <div className={style1.profileSettingsBtn}> Delete Account </div>
                        <div className={style1.profileSettingsBtn}> previous Orders </div>
                        <div className={style1.profileSettingsBtn}> Spending Analysis </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
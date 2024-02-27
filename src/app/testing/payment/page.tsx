"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { v4 as uuid } from 'uuid'
import sha256 from 'crypto-js/sha256'
import style1 from './page.module.css'

export default function PaymentTesting() {
    const router = useRouter();
    const apiKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399'
    const saltIndex = 1;
    // Self generated transaction id.
    const transactionId = "MT-"+uuid().toString(36).slice(-6);
    const payload = JSON.stringify({
        "merchantId": "PGTESTPAYUAT",
        "merchantTransactionId": "MT7850590068188104",
        "merchantUserId": "MU933037302229373",
        "amount": 10000,
        "redirectUrl": `http://localhost:3000/testing/api/payment/${transactionId}`,
        "redirectMode": "POST",
        "mobileNumber": "9999999999",
        "callbackUrl": `http://localhost:3000/testing/api/payment/${transactionId}`,
        "paymentInstrument": {
          "type": "PAY_PAGE"
        }
    })
    const Base64Load = Buffer.from(payload).toString("base64");
    const fullURL = Base64Load + "/pg/v1/pay" + apiKey;
    const SHA256data = sha256(fullURL);
    // const handlePayment = () => {
    //     console.log(payload);
    //     console.log(Base64Load);
    //     console.log(SHA256data + '###' + saltIndex);
    // }
    const handlePayment = async () => {
        console.log('processing payment...');
        const res = (await axios.post(
            'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
            {request:Base64Load},
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-verify': SHA256data + '###' + saltIndex,
                }
            }
        )).data;
        const redirectUrl = res.data.instrumentResponse.redirectInfo.url;
        router.push(redirectUrl);
    }
    return(
        <div className={style1.mainWrapper}>
            <div className={style1.mainContainer}>
                <button onClick={() => {handlePayment()}} className={style1.paymentBtn}> Pay ₹100 </button>
            </div>
        </div>
    )
}
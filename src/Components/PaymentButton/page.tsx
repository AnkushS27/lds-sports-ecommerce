"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import sha256 from "crypto-js/sha256";
import style1 from "./page.module.css";

export default function PaymentTesting({
  amount,
  handlePaymentClick,
}: {
  amount: number;
  handlePaymentClick?: () => Promise<void>;
}) {
  const router = useRouter();
  const apiKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  const saltIndex = 1;
  // Self generated transaction id.
  const transactionId = "MT-517485";
  const payload = JSON.stringify({
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: "MU933037302229373",
    amount: amount,
    redirectUrl: `http://lds-sports.vercel.app/testing/api/payment/${transactionId}`,
    redirectMode: "POST",
    mobileNumber: "9999999999",
    callbackUrl: `http://lds-sports.vercel.app/testing/api/payment/${transactionId}`,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  });
  const Base64Load = Buffer.from(payload).toString("base64");
  const fullURL = Base64Load + "/pg/v1/pay" + apiKey;
  const SHA256data = sha256(fullURL);
  const handlePayment = async () => {
    if (handlePaymentClick) {
      await handlePaymentClick();
    }
    const res = (
      await axios.post(
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
        { request: Base64Load },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-verify": SHA256data + "###" + saltIndex,
          },
        }
      )
    ).data;
    const redirectUrl = res.data.instrumentResponse.redirectInfo.url;
    router.push(redirectUrl);
  };
  return (
    <>
      <button
        onClick={() => {
          handlePayment();
        }}
        className={style1.checkoutButton}
      >
        PROCEED TO PAYMENT
      </button>
    </>
  );
}

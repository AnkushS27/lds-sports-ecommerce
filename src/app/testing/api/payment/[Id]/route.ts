import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    // console.log(data);
    const status = data.get('code');
    const merchantId = data.get('merchantId');
    const transactionId = data.get('transactionId');

    console.log(status);
    console.log(merchantId);
    console.log(transactionId);

    console.log(`redirecting to http://localhost:3000/testing/payment`);
    return NextResponse.redirect('http://localhost:3000/testing/payment');
}
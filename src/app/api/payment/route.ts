import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    // const data = await req.formData();
    // const status = data.get('code');
    // const merchantId = data.get('merchantId');
    // const transactionId = data.get('transactionId');

    console.log(`redirecting to orders page...`);
    return NextResponse.redirect("http://lds-sports.vercel.app/orders", { status: 301 });
}
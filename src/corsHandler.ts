import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["*"]

export default function corsHandler(req: NextRequest) {
    console.log('Cors Headers is being invoked');
    // retrieve the current response
    const res = NextResponse.next()
  
    // retrieve the HTTP "Origin" header 
    // from the incoming request
    const origin = req.headers.get("origin");
  
    // if the origin is an allowed one,
    // add it to the 'Access-Control-Allow-Origin' header
    if (origin && (allowedOrigins.includes("*") || allowedOrigins.includes(origin))) {
      res.headers.append('Access-Control-Allow-Origin', origin);
    } else {return res;}
  
    // add the remaining CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
  
    return res
  }
   
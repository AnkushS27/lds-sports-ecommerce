"use server";
import { NextApiRequest, NextApiResponse } from 'next';

////////////// Checks whether user is loggedIn or not /////////////////
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let user = true;
    let data = {};
  
    if (user) {
      data = {
        result: "success",
        user: "Abc",
        loggedIn: true,
      };
    } else {
      data = { result: "failure", loggedIn: false };
    }
  
    res.json(data);
  }
  

///////////////////////////////////
// Works
/*
1. No user searching in db
*/

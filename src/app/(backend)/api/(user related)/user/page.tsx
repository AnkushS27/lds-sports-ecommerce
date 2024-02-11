"use server";
import { NextApiResponse } from "next";

////////////// Checks whether user is loggedIn or not /////////////////import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(
  req: Request,
  res: NextApiResponse
) {
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

import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async (req: NextApiRequest, res: NextApiResponse)=> {
  const accountSid = <string>process.env.TWILIO_ACCOUNT_SID;
  const token = <string>process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phoneNumbers, text } = req.body;

  Promise.all(  
    phoneNumbers.forEach((number: string) => {
      return client.messages
        .create({
          body: text,
          from: '447700137695',
          to: number,
        });
    })
  )
  .then(() => {
    console.log("success!");
    res.json({
      success: true,
    })
  })
  .catch((error) => {
    console.log(error);
    res.json({
      success: false,
    });
  });
};

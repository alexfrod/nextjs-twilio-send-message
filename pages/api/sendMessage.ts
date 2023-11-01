import { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async (req: NextApiRequest, res: NextApiResponse)=> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID as string
  const token = process.env.TWILIO_AUTH_TOKEN as string;
  const client = twilio(accountSid, token);
  const { phoneNumbers, text } = req.body;


  return client.messages
    .create({
      body: text,
      from: process.env.TWILIO_MESSAGE_SERVICE_SID as string,
      to: phoneNumbers[0],
    }).then(() => {
        console.log("individual success!");
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
  
  // QQ below WIP for multiple phone numbers
  
      // Promise.all(  
      //   phoneNumbers.forEach((number: string) => {
      //     console.log(number, text)
      //    
      //     // return client.messages
      //     //   .create({
      //     //     body: text,
      //     //     from: process.env.TWILIO_MESSAGE_SERVICE_SID as string,
      //     //     to: number,
      //     //   }).then(() => {
      //     //       console.log("individual success!");
      //     //       res.json({
      //     //         success: true,
      //     //       })
      //     //     })
      //     //     .catch((error) => {
      //     //       console.log(error);
      //     //       res.json({
      //     //         success: false,
      //     //       });
      //     //     });
      //   })
      // )
      // .then(() => {
      //   console.log("bulk success!");
      //   res.status(200).json({
      //     success: true,
      //   })
      // })
      // .catch((error) => {
      //   console.log(error);
      //   res.status(500).json({
      //     success: false,
      //   });
      // });
};

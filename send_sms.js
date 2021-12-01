require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const resturantNumber = process.env.RESTAURANT_NUMBER;
const client = require('twilio')(accountSid, authToken,twilioNumber,resturantNumber);

client.messages
  .create({
     body: 'Testing twilio messaging',
     from: twilioNumber,
     to: resturantNumber
   })
  .then(message => console.log(message.sid));




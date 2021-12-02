//
// run npm install twilio if you haven't
//
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const resturantNumber = process.env.RESTAURANT_NUMBER;


const twilio = require('twilio')(accountSid, authToken);

// message to user when accept button is triggered
const messageCustomer = (order, number) => {
  const text = `Hello, your order ${orderId} will be ready in ${number} minutes!`;

  twilio.messages
    .create({
       body: text,
       from: twilioNumber,
       to: '+16715135317'
     })
    .then(message => console.log(message.sid));

};


// message to restaurant with order details
const messageRestaurant = (orderId) => {
  const text = `New order number ${orderId} received.`;
  twilio.messages
    .create({
       body: text,
       from: twilioNumber,
       to: resturantNumber

     })
};

const messageOrderReady = (orderId) => {
  const text = `Your order ${orderId} is ready for pickup!`;
  twilio.messages
    .create({
       body: text,
       from: twilioNumber,
       to: '+16715135317'
     })

};

module.exports = {messageCustomer, messageRestaurant, messageOrderReady };
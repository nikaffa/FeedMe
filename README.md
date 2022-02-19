# FeedMe
- FeedMe is a food ordering app for a single restaurant ("Sweet Leaf"). 
- This is a full-stack application that uses Twilio API to connect the restaurant and its customers. 
!["Main page"](https://github.com/nikaffa/FeedMe/blob/master/docs/main_page.png)

## Demo
### User experience
- Users can browse the menu, add items to the cart and place the order. They receive a text message with estimated time of completion once the order is accepted by the restaurant. Another notification will be send to them when the order is ready.
!["User_experience"](https://github.com/nikaffa/FeedMe/blob/master/docs/user_experience.gif)

### Restaurant experience
- The restaurant receives the order once it is placed both online and via SMS. The restaurant can view the incoming and current orders in the dashbord, accept a new order and set up an estimated completion time. Once the order is done, it can mark it as complete.
!["Restaurant_experience"](https://github.com/nikaffa/FeedMe/blob/master/docs/admin_experience.gif)

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Twilio API
- EJS
- SASS

## Setup

1. Install dependencies, reset database and run the server: 
```bash
npm i
npm run db:reset
npm start
```
- Server will be run at `http://localhost:8080/`
- Note: nodemon is used, so you should not have to restart your server

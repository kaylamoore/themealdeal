## PROJECT THREE - THE MEAL DEAL 
#### LINK : *insert link* 

The Meal Deal is an app that allows users to find food specials near them. 

User Experience / How To :

FOR A USER : 
- Sign up to create an account
- OR if you already have an account, Log In 
- Redirected to a personal profile page that displays a map utilizing their location, 
    a Twitter feed pulling from the hash tag "#themealdeal", and a list of current deals. 


FOR A VENDOR : 
- Sign up to create an account, select vendor option
- OR if you already have an account, Log In
- Admin must approve a vendor in order to use their account 
- Vendors are assigned a location by an admin 
- Vendors post a deal - the menu item and the price 


FEATURES WE'D LIKE TO INCLUDE IN THE FUTURE :
- Allowing vendor to post a picture of the deal using Paperclip 
- Live feed of Twitter * 

DEPENDENCIES : 
- Bcrypt for password encryption 
- Body-parser 
- Cookie- parser 
- Express 
- Express-ejs-layouts
- Express-helpers
- Express - session
- Json WEb Token 
- Mongoose
- Morgan 
- Passport
- Passport Facebook
- Socket.io
- Twitter (twit)

CONTROLLERS : 
- apiController
- dealsController
- vendorsController 

MODELS : 
- deal 
- user 
- vendor 

ROUTES FILES : 
- apiRoutes
- dealRoutes
- userRoutes
- vendorRoutes

CONFIG : 
- auth
- database
- passport
- passport for vendors 

VIEWS : 
- admin
- connect-local
- contact 
- deals
- index
- layout 
- login 
- profile 
- show_deals
- signup
- tweets
- vendor_signup
- vendors_profile 

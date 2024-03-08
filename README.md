# Overview
This project focuses on developing a web API implemented in Node.js, aimed at managing the registration of sales, online products, and other business operations of a company. The application is structured into two main sections: administrator and client, each with its own set of functionalities.

> **Online Store** everything in `online management` for you.
>
> [<img src="https://cdn-icons-png.flaticon.com/512/8146/8146003.png" width="300" height="300">](URL_del_Enlace)

## Table of Contents
- #### [How run the project?](#how-run-the-project)
- #### [Create Token](#create-token)
- #### [Specific Functions](#specific-functions)
  - ###### [Important Notes](#important-notes)
  - ###### [Administrator](#administrator)
  - ###### [Client](#client)
- #### [Thanks](#thanks)


## How run the project?

1. Install node dependencies
```
nmp i dependence_name
```
2.  Install execution environment
```
npm i --save-dev nodemon
```

3. Import data to MongoDB from 
```
./onlineStore/configs/data
```

4. Import thunder connection from 
```
./onlineStore/configs/thunder_cnn
```
5. Run project 
```
  npm run dev
```

## Create Token

> These are the "default credentials" to generate your token


|Role            |User                           |Email                         |Pass                         |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|Admin           |`'admin'`                      |`'admin1@kinal.edu.gt'`      |`'adm'`                      |
|User			 |`'user'`                       |`'user1@kinal.edu.gt'`       |`'uss'`                      |



Remember set your variables creating your .env file The variables you should create are:

-   PORT
-   JWT_SECRET

## Specific Functions

> ### **Important Notes:** 
>**All functions** described below require **authentication to access** and are backed by a **MongoDB database** implemented with NodeJS technology.

### Administrator:

- **Product Management**: 
  - Add new products to the database.
  - View individual products and the complete catalog.
  - Edit specific details of a product.
  - Maintain comprehensive inventory control.
  - Identify depleted products.
  - Obtain information about top-selling products.
  - Make modifications to product information.
  - Delete a product.

- **Category Management**: 
  - Add new categories to the database.
  - View all existing categories.
  - Perform edits to category information.
  - Delete a category. If a product is associated with a category that needs to be deleted, the system ensures the product is automatically transferred to a default category.

- **User Management**: 
  - Add new users.
  - Modify the role they belong to (Administrator [ADMIN] or Client [CLIENT]).
  - Edit user information (subject to specific restrictions for users with a client role).
  - Delete users (also subject to the mentioned restrictions).

- **Invoice Management**: 
  - Edit an invoice, with stock validation to ensure its update.
  - View invoices associated with specific users, as well as detailed products in an invoice.

### Customer:

- **User Authentication**: 
  - Log in and/or register, where automatic registration assigns the user the client role. Access to all described functions is conditioned upon successful authentication through username and password.

- **Product Exploration**: 
  - View the catalog of best-selling products.
  - Search for products by name.
  - Explore existing categories.
  - Access the product catalog filtered by category.

- **Shopping Cart Management**: 
  - Enables the option to add products to the shopping cart for later acquisition.

- **Purchase Process**: 
  - Allows users to complete the purchase process, presenting an invoice detailed as a result of the transaction.

- **Purchase History**: 
  - Users can access a complete history of their purchases.

- **Profile Management**: 
  - Provides the ability to edit user profile details, such as personal information and preferences.

- **Account Deletion**: 
  - Allows users to delete their account, subject to confirmation and additional security measures.
  

## Thanks 

I hope you enjoy the project. Thanks for watching.







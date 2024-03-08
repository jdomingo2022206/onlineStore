# Overview
This project focuses on developing a web API implemented in Node.js, aimed at managing the registration of sales, online products, and other business operations of a company. The application is structured into two main sections: administrator and client, each with its own set of functionalities.

> **Online Store** everything in `online management` for you.
>
> [<img src="https://cdn-icons-png.flaticon.com/512/8146/8146003.png" width="300" height="300">](URL_del_Enlace)


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
./tellMe/configs/data
```

4. Import thunder connection from 
```
./tellMe/configs/thunder_cnn
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






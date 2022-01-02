# Authentication API
> Backend process to authenticate users along with some admin privileges.

![Language](https://img.shields.io/badge/node-%3E%3D%206.0.0-brightgreen)
![Platform](https://img.shields.io/badge/npm-v7.0.0-blue)

## Version

1.0

## Requirements

- Node.js 8.0.0+
- Postman
- Xampp
- IDE of your choice

## Getting Started

1. Download the project by cloning this repository on CMD or by downloading the Zip file.
2. Add a new .env file in the common task folder and copy the below global variables:
  - NODE_MOD = Development
  - PORT = 3000
  - TOKEN_SECRET = ntehidklwo85942mnkaleo4rtd2e6
3. Import the postman collection and environment files in Postman.
4. Open XAMPP and start the Apache and MySQL server.
5. Open a terminal and navigate to the project.
6. Run `npm install` to install the dependencies.
7. Run `npm run data:import` to import some sample data.
8. Run `npm run server`

## NPMs used

```ruby
npm 'bcryptjs'
npm 'dotenv'
npm 'express'
npm 'express-async-handler'
npm 'jsonwebtoken'
npm 'mysql2'
npm 'nodemon'
```

## Summary

This app contains 4 APIs to login,sign up, create and edit user.
It contains some mock data to get started and middlewares to handle errors and authentication.
The APIs are shared in postman folder and can be easily imported in the mentioned program.

### APIs: 
The below APIs are shared in postman:
- Login: POST http://localhost:3000/api/users/login
- Sign up: POST http://localhost:3000/api/users/register
- Create User: POST http://localhost:3000/api/users/create
- Edit User: PUT http://localhost:3000/api/users/edit/:id

### Node.js Life Cycle: 
- The view controller accepts a user event, constructs a request object, and send it to the route.
- The route does some work with the request and routes it to the main server.
- The main server formats the data in the response and constructs a JSON object and sends it to the client.

## Features

- [x] JWT Authentication
- [x] Reusable Controllers
- [x] Middlewares
- [x] Mock Data
- [x] Error Handling
- [x] ES6 Modules

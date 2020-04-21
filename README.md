# node-server

[Powered By - Node.js](https://nodejs.org/en/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Simple node js server API for basic user login-signup.

  - Has 2 separate servers.
  - Main Server serves the profiles and other stuff.
  - Auth Server used to authenticate users.
  - This project uses the JWT as authentication architecture.
  - Node version v12.16.1 has been used.
  - Uses plane text http instead of SSL encrypted https.
  - Uses mongoDB as a database interface.


Environment Variables
  - Store access and refresh token secret keys in .env file.
  - They are accessd by,
     ```sh
    process.env.YOUR_VARABLE_NAME
    ```
- In case you want to genertat your random secret key using node crypto library, open terminal and type,
     ```sh
    $ node
    >require('crypto').randomBytes(64).toString('hex')
    ```
    -Note: In order for 'node' command to work you need to have [node.js](https://nodejs.org/en/) installed and added to PATH.


### Initialization
- Go to the server directories and run
     ```sh
    $ npm install
    ```
- This will install the necessary node-modules dependancies.
- npm is preinstalled along with node.js.

### Testing:
- REST Client is a VS code plugin for sending http requests and has an extension .rest.
- client.rest is included.
- Use it for testing
    
  





### API Routes in Main Server



| REST API Request Type | Function | Route | Other Requirements |
|-----| ------ | ------ |----- |
|POST| Register User | http://localhost:[YOUR_MAIN_SERVER_PORT_NUMBER]/api/register|-|
|GET| Get profile info (as of now returns only email).| http://localhost:[YOUR_MAIN_SERVER_PORT_NUMBER]/api/profile  | "access-token" as header in API request. |

### API Routes in Auth Server



| REST API Request Type | Function | Route | Other Requirements |
|-----| ------ | ------ | ------ |
|POST| Login User | http://localhost:[YOUR_AUTH_SERVER_PORT_NUMBER]/api/login | valid email & password in body of request
|DELETE| Logout user from session| http://localhost:[YOUR_AUTH_SERVER_PORT_NUMBER]/api/logout | "refresh-token" as header in API request.|
|POST| Generate new access-token after expiry| http://localhost:[YOUR_AUTH_SERVER_PORT_NUMBER]/api/newToken | "refresh-token" as header in API request.|

### TODO
- Deployment on cloud hosting platforms.
- Add more features and routes.
- To implement decoupled architecture.
- SSL encryption.



### Development

Want to contribute? Great!
Fork this repo, modify and send pull request.





License
----

ISC





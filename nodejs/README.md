# EcmaScript 6 and Classes based Moduler API in NODEJS.

 * NodeJS 8+ 
 * ExpressJS 4+
 * NPM 6+
 * MongoDB 3.2+
 * Mongoose 5+


### Point of start.

 * click on ```server``` folder, you will find the sub folders as per below information. 
 * click on each folder to have access of module wise related files for the API.

### Directory layout

    .server
    ├── api                   # contains api code for cpanel and front-web
    |     ├── cpanel
    |          ├── controller  # all controllers for the admin panel goes here
    |          ├── routes      # all routes for the admin panel goes here
    |          ├── services    # all services for the admin panel goes here
    |     ├── web
    |          ├── controller  # all controllers for the admin panel goes here
    |          ├── routes      # all routes for the admin panel goes here
    |          ├── services    # all services for the admin panel goes here
    ├── config                # configuration for the whole app goes here 
    ├── middleware            # express engine get configures with logger
    ├── seeds                 # Seed methods for database bootstrap
    ├── shared                # common service and functions will reside here
    ├── utils                 # error handler and utility functionality  
    └── README.md             # contains the information

# Getting Started

#### Instructions: 
  * Get the code by this command ``` git clone https://github.com/hb-github/CodeSamples.git ```
  * Ensure you're running the latest versions Node `v8.x.x`+ (or `v9.x.x`) and NPM `5.x.x`+
  * Ensure you have MongoDB 3.2 up and running as service.
  * Please go inside the **nodejs** folder for api code.
  * Open the project from text editor like notepad /sublime text editor/ Visual Studio code.
  * Open the command prompt from this folder to run the ``` npm install ``` to install the dependency.

#### Global packages:
  Once you have those, you should install these globals with `npm install --global`:
  * `eslint` (`npm install --global eslint`)
  * `prettier` (`npm install --global prettier`)
  * `prettier-eslint` (`npm install --global prettier-eslint`)

## Application level Configuration
Configuration files resides in `/config/constants.js` for different environments of this application.

## Seed the Database with Dummy data
Once the MongoDB is runninig and Mongo URL is set from above path in ```/config/constants.js``` development mode in ``` mongo ``` object.
run the command `npm run seed` for data seeding.

### run in local by running below code.
``` npm start ``` 
API endpoint : ``` http://localhost:4000/api/v1/auth/login ``` 

### build api for production mode.
`npm run build`

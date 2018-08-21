# ES7-Express-MongoDB - API

Express js based node application for the API with MongoDB database.

### Directory layout
 * click on ```server``` folder, you will find the sub folders as per below information. 
 * click on each folder to have access of module wise related files for the API.

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
## Dependencies
What you need to run this app:
* `node` and `npm` (`brew install node`)
* Ensure you're running the latest versions Node `v8.x.x`+ (or `v9.x.x`) and NPM `5.x.x`+

Once you have those, you should install these globals with `npm install --global`:
* `eslint` (`npm install --global eslint`)
* `prettier` (`npm install --global prettier`)
* `prettier-eslint` (`npm install --global prettier-eslint`)

# Configuration
Configuration files live in `/config/constants.js` for different environments of your application

## Installing
* `npm install` to install all dependencies or `yarn`
* `npm start` to start the server

## seed data in database
`npm run seed`

### build api
`npm run build`

```
"build": "cross-env NODE_ENV=development rimraf dist/ && babel ./ --out-dir dist/ --ignore ./node_modules,./.babelrc,./npm-debug.log --copy-files",
```

## Note: Make sure MongoDB is up and running before you start the project.

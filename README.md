# SCCBA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.5.

 See https://appdividend.com/2019/06/04/angular-8-tutorial-with-example-learn-angular-8-crud-from-scratch/
     
 On Office iMac (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/):
 
     $ brew tap mongodb/brew
     $ brew install mongodb-community@4.2
     $ mongod --config /usr/local/etc/mongod.conf

   Start mongo, frontend 4200, backend 4001: 
  
    Home iMac:  $ mongod --dbpath ~/
    Office iMac: $ brew services start mongodb-community@4.2
    [if not hooked up to mLab]
    
    $ nodemon server.js (in api directory - may need to install nodemon globally) - starts port 4001
    $ node app.js - starts production frontend in dist (BUILD FIRST)
    $ node start - builds and starts webpack dev server on port 7000 (uses package.json ng serve --port 7000)
    $ ng serve --prod - dev server on port 4200 after building dist
    
 Webpack Dev server
 
     $ ng serve --port xxxx (in root directory) - builds and starts dev server on xxxx - reloads on changes
     
 Deploy
 
     Use pm2 scripts in Applications/node_start (frontend and backend)
     set up nginx - 2 servers (api.omicrondelta.space and [www]omicrondelta.space)
     Add these to certbot certificate
     Test backend: https://api.omicrondelta.space/api/members
 
     

  UI see https://www.w3schools.com/bootstrap/bootstrap_theme_band.asp

    
  SSL for express:
  
    https://stackoverflow.com/questions/11744975/enabling-https-on-express-js
    
    
  Debugging
  
    frontend logging - browser's view console
    backend logging - terminal in api directory ($ nodemon server)
    $ lsof -i :4000 and $ kill -9 [PID]


 Misc
 
    Date formatting:
    https://stackoverflow.com/questions/48183677/how-to-format-date-in-component-of-angular-5
    
Impost csv

    Add final_data.csv to root (from python project)
    cd into project root (members database in sccba collection)
    mongoimport --type csv -d sccba -c members --headerline --drop final_data.csv
    check:
    $ mongo
    > show dbs

   Deleting DB:
    > use [db]
    > db.dropDatabase()

    In DB.js use "DB: 'mongodb://localhost:27017/sccba'
    


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

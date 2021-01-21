# Image-Repository
Shopify Developer Intern Challenge - Summer 2021

## Getting Started

### Prerequisites
 The following tools are required to get the project running
 * [NPM](https://www.npmjs.com/)
 * [Node](https://nodejs.org/en/)
 * [MongoDB](https://mongodb.com)

### Tech stack
* [Nestjs](https://nestjs.com/) - a framework for building efficient, scalable Node.js web applications. Typescript was used in this application
* Passport - authentication package
* [Cloudinary](https://cloudinary.com/) - where images got uploaded
* [Heroku]() - server deployment for both APIs and frontend(Angular)
* [MongoDB](https://mongodb.com) - for saving users and image record
* [Angular](https://angular.io/) - for web view

### How to start this project on local environment
* clone this [repo](https://github.com/emmanuelnwankwo/Image-Repository.git)
* npm install && npm i -g @nestjs/cli
* touch .env && cp .env.example
* register on cloudinary and get the keys
* get connectionString on mongodb
* fill all the variables values in .env
* npm run start:dev

### To get MONGO_URI
* Visit [MongoDB](https://mongodb.com)
* Create an account and then create a database instance
* In the .env, assign the connectionString to MONGO_URI

### Web view Readme
Click [here](https://github.com/emmanuelnwankwo/Image-Repository/tree/frontend) to view the full setup for the web view using Angular

### API Docs
The docs was hosted on Heroku
* [API Documentation](https://image-repository-api.herokuapp.com/)

### Upload image(s) using Postman
1. Login and copy access_token
2. ![alt text](https://res.cloudinary.com/enwankwo/image/upload/v1611222849/ImageRepository/Screenshot_2021-01-21_105312.png)
3. ![alt text](https://res.cloudinary.com/enwankwo/image/upload/v1611222570/ImageRepository/Screenshot_2021-01-21_104505.png)

### User Interface (Web)
The web was hosted on Heroku
* [Web view](https://image-repository-frontend.herokuapp.com/)

### User stories
* SEARCH function
     - from characteristics of the images
     - from text
     - from an image (search for similar images)
* ADD image(s) to the repository
     - one / bulk / enormous amount of images ✅
     - private or public (permissions) ✅
     - secure uploading and stored images ✅
* DELETE image(s)
     - one / bulk / selected / all images ✅
     - prevent a user deleting images from another user (access control) ✅
     - secure deletion of images ✅
* SELL/BUY images
     - ability to manage inventory ✅
     - set price ✅
     - discounts ✅
     - handle money

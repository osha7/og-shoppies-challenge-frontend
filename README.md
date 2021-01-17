# Osha Groetz - SHOPPIES MOVIE API

Search movies with async Fetch requests to [OMDb API](http://www.omdbapi.com/)  
Nominate up to 5 movies while saving data to a backend server using a PostgreSQL database

## How to setup and run your application:

## Application - Front End Repository:

https://github.com/osha7/og-shoppies-challenge-frontend

-   Navigate to frontend github repo - Fork & Clone Repository
-   Clone repository in your local terminal
-   Project was built on ReactJS 17.0.1 or higher

### In the project directory command line,run:

-   npm install

#### To run the app in the development mode:

-   npm start  
    RUN AT: [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Connect program to backend for api calls to persist & obtain data of movie nominations:

## Application - Back End Repository:

https://github.com/osha7/og-shoppies-challenge-backend

-   Navigate to backend github repo - Fork & Clone Repository
-   Clone repository in your local terminal
-   Project was built on Rails 6.0.3

### In the project directory command line,run:

-   bundle install
-   rake db:create
-   rake db:migrate

#### To run the app in the development mode:

-   Navigate to FILE: ConstantURLs.js : make sure to uncomment local host address and comment out url of hosted backend app

-   rails s  
    RUN AT:[http://localhost:3000](http://localhost:3002) ((JSON database can be viewed at [http://localhost:3000/nominated_movies](http://localhost:3002/nominated_movies)))
    While running in local environment, the application will not successfully run if on any other port (front end making calls to local host 3000) unless you change the url address in ConstantURLs.js file

#### To make database queries from backend:

-   rails c

# Landing Page Search Bar:

![MainPage]()

# Search Results:

![Search Bar]()

# Movie Info Page:

![Search Results]()

# Nominations Page:

![Nominations]()

##### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

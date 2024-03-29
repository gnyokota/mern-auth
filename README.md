<!-- ABOUT THE PROJECT -->

## About The Project

![MERN Auth App](https://github.com/gnyokota/mern-auth/blob/807caa951909a9e5a8db505baa366cbb5ff41bde/images/Screenshot%202021-06-16%20at%2017.10.52.png)
![MERN Auth App](https://github.com/gnyokota/mern-auth/blob/807caa951909a9e5a8db505baa366cbb5ff41bde/images/Screenshot%202021-06-16%20at%2017.11.06.png)
![MERN Auth App](https://github.com/gnyokota/mern-auth/blob/807caa951909a9e5a8db505baa366cbb5ff41bde/images/Screenshot%202021-06-16%20at%2017.11.19.png)

This app was built using the MERN-Stack and Typescript. It was built for authentication and authorization.

### Built With

- [MondoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://github.com/facebook/create-react-app).
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Sass](https://sass-lang.com/)
- [axios](https://www.npmjs.com/package/axios)

The password reset was built using [SendGrid](https://sendgrid.com/).

<!-- GETTING STARTED -->

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Getting Started with the backend(server)

The following variables should be defined in the .env file:

- PORT (e.g. 3001)
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES (e.g. 1d)
- RESET_URL
- EMAIL_SERVICE
- EMAIL_USERNAME
- EMAIL_PASSWORD
- EMAIL_FROM

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode using nodemon.

### `npm run build`

Compiles the .ts files from src folder into .js files.

### `npm run start`

Compiles the .ts files from src folder into .js files and runs the server.js file.

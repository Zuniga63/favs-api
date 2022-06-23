# Favs API

This is a favorites list managment project, build using typescript and persited in a non-relational database (MongoDB).

---

## Diagram Model

![diagram-model](src/assets/docs/model.png)

## Technologies

|                                                                                            |                                                                                                                     |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| <img src="https://expressjs.com/images/express-facebook-share.png" width="60">             | [**Express**](https://github.com/expressjs/express) for create server.                                              |
|                                                                                            | [**cors**](https://github.com/expressjs/cors) for communication between servers.                                    |
| <img src="https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.png" width="60"> | [**dotenv**](https://github.com/motdotla/dotenv) to create environment vars in node.                                |
|                                                                                            | [**morgan**](https://github.com/expressjs/morgan) to identify the requests to the server and seeing in the console. |
| <img src="https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png" width="60">  | [**mongoose**](https://mongoosejs.com/) to manage the database.                                                     |
|                                                                                            | [**bcrypt.js**](https://github.com/dcodeIO/bcrypt.js) for password encryption                                       |
|                                                                                            | [**jsonwebtoken**](https://github.com/auth0/node-jsonwebtoken) for creating an authentication token.                |
|                                                                                            | [**Jest**](https://jestjs.io/) for test code.                                                                       |
|                                                                                            | [**SuperTest**](https://github.com/visionmedia/supertest) to clone the server and test the routes.                  |
|                                                                                            | [**Swagger UI Express**](https://github.com/scottie1984/swagger-ui-express) to create the documentation interface   |
|                                                                                            | [**swagger-jsdoc**](https://github.com/Surnet/swagger-jsdoc) to retrive documentatión of routes from code           |

## Dev Technologies

|     |                                                                                                                            |
| --- | -------------------------------------------------------------------------------------------------------------------------- |
|     | [**TypeScript**](https://www.typescriptlang.org/) for writing TypeScript code                                              |
|     | [**ts-node-dev**](https://github.com/whitecolor/ts-node-dev) to mount a local server and observe the changes               |
|     | [**cross-env**](https://github.com/kentcdodds/cross-env) to create the jest sandbox                                        |
|     | [**ESLint**](https://eslint.org/) to examine the code.                                                                     |
|     | [**prettier**](https://prettier.io/) to format the code.                                                                   |
|     | [**husky**](https://github.com/typicode/husky) to ensure that the _eslint_ and _prettier_ rules are applied before commit. |

## Requirements

| Logo                                                                                                                                              | Name                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| <img src="https://cdn-icons-png.flaticon.com/512/919/919825.png" width="60">                                                                      | [**Node**](https://nodejs.org/en/) _version 16.x_ o superior |
| <img src="https://webimages.mongodb.com/_com_assets/cms/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg?auto=format%252Ccompress" width="60"> | [**MongoDB**](https://www.mongodb.com/)                      |

## Installation

1. Clone the repository to your local machine using the terminal `git clone https://github.com/Zuniga63/favs-api.git`
2. Install dependencies `npm install`
3. Create the file _.env_ using the command `cp .env.example .env`.
4. Enter enviroment settings.

   ![env-config](./src/assets/docs/env-config.png)

### For Dev

Run the command `npm run dev`;

### To generate production build

Run the command `npm run build`

### To start server in production

Run the command `npm start` after last command.

## API Documentation

Swagger was used for the documentatión and can be seen in the route **http://localhost:8080/docs/**  
_alert:_ use the .env port.

![doc](src/assets/docs/doc.png)

## Testing

Jest is used to test the code. Tested the code up to about 80%.

![test](src/assets/docs/test-result.png)

## Password encryption

It is done on the model [**User**](src/models/User.model.ts) in the lines 54 to 73

![Encrypt](src/assets/docs/encrypt-password.png);

<br />
<div align="center">
    <img src="./.github/logoShowMeASong.png" alt="Show Me A Song Logo" width="180">
    <h3 align="center">Show Me A Song</h3>
    <p> A test-oriented project.
</div>

# About

We know that the famous phrase "it's ready, just needs testing", actually means that the project is not ready, as testing is a fundamental part of ensuring effective delivery and less rework. 
With this in mind, this project focuses on performing E2E, integration and unitary tests.

## Technologies

These are the main tools, frameworks and languages that were used in this project:<br>

<div>
  <img style='margin: 5px;' src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/-supertest-1a330d?style=for-the-badge&logo=supertest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/postgresql-%23336791.svg?&style=for-the-badge&logo=postgresql&logoColor=white" />

</div>

## How to Run

Run the following command to clone this repository:

```git
git clone https://github.com/CarolaynePenha/showMeASong.git
```

In the front end folder run the following command:

```git
npm i
```

In the back-end folder run the same command:

```git
npm i
```

You must to create a `.env` and `.env.test`, using the `.envExample` as example.

To create your main database use Prisma Migrations:

```git
npx prisma migrate dev
```

Now you're able to run the tests.

## Back-End Tests

### Integration Tests

To run integrantion tests and unit test you must access the back-end folder.

After configuring `.env.test`, to run the integration tests, simply create your test database and run the following command:

```js
npm run test
```
This will create your test database with the prisma schemas and run all the tests (integration and unit).

### Unit Tests

To run the unit tests, simply run the following command:

```js
npm run test:unit
```

This will only run the unit tests.

## Front-End and Back-End Tests

### End-2-End Tests

To run the E2E tests you must access the back-end folder and host your back-end test server, using following command:

```js
npm run dev:test
```

Then you have to run the react app at the front-end folder:

```js
npm start
```

Now you can open the cypress interface and execute the E2E tests in there:

```js
npx cypress open
```

## Authors

### Carolayne Penha Ruotolo.

[![GitHub](https://img.shields.io/badge/-CarolaynePenha-black?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/CarolaynePenha)](https://github.com/CarolaynePenha)
[![Linkedin Badge](https://img.shields.io/badge/-CarolaynePenha-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/carolaynepenha/)](https://www.linkedin.com/in/carolaynepenha/)

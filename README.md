# Bill-Splitter

## Can You Hack It? 2023

#### This Website is a part of hackathon organized in Indian Institute Of Information Technology Jabalpur

# Development Setup

## Requirement

You should have

`node >= ^14.*`

`npm >= ^8.*`

**Steps :**

1. Fork this repository into your github account.
2. clone this repo into your local computer.
3. **Backend Setup**:

   **1.1** Go to `/server` and install all the packages/dependency by using `npm i` or `npm install` or `yarn install` ( if you have yarn installed)

   **1.2** Create a `.env` file

   **1.3** Give these varialbe value

   `DATABASE_URL= ""`

   `NODE_ENV=development`

   `JWT_SECRET= ""`

   `REFRESH_JWT_SECRET=""`

   `PORT= `

   `ORIGIN=http://localhost:3000`

   `COOKIE_EXPIRATION_TIME = 7200`

   **1.4** In database URL make you give your **postgres** DB URL

   **1.5** Now Generate the DB by using this command `npx prisma generate`

   **1.6** Now Migrate The database using command `npx prisma migrate dev`

   **1.7** For Getting a better UI of your database you can use `npx prisma studio`

   **1.8** Now Run the server using `npm run dev`

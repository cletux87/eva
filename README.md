# eva

## Description

This application verifies the prices of the cryptos on the date and when selected the last 8 days. Why
8 days... just beause. Feel free to sort by pressing the headers of the table and filter using the
not so amazing filter magic box.

### The Application

We are very enthusiastic about Crypto! We would like to have a site to view the top 50 Cryptos based on Market Cap. In the first part of this project, we would like to see a list of the 50 best cryptos, and we want to be able to filter them by:

1. Name
2. Price
3. Market Cap
4. Circulating Supply (For example, Bitcoin Max supply is 21 Million Bitcoins, but the circulating supply is approx. 18 million)

## Requirements

As we said before, it can take you a couple of hours or a day.

1. You can use [this api](https://min-api.cryptocompare.com/) or any other API (just try to complete the requirements)
2. Use Typescript
3. Use Hooks
4. Refactor the code
5. Format values (dates, prices, etc)
6. Use TailwindCSS
7. Testing suite
8. Good use of git (commits, pull requests, branches)
9. Use of [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages

## How to deliver

1. Clone this repo and share the link with us at the time to deliver (DO NOT FORK)
2. Deploy this repo (you can use Vercel)
3. Please document the repo and your code (using [JSDoc](https://jsdoc.app/))
4. On the README, explain your architecture, component design, and development choices.
5. A summary of what else you could/would like to have done if you had more time.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Tests

In this project cypress was used to test the flow and react testing library to test the components and the API

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### yarn cy

You need to have the application running and execute also this command. This test covers the flow of the application.

## What would I do If I have more time

Focus more on style, this is the first time I apply Tailwind in a project. I take a look an eye in this one some days ago because I need to take a desicion on project. The application looks really good on mobile devices but definetly needs to work on other devices. Also the filter box needs to be refixed

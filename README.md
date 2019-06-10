# Contextual testing

Use the same end-to-end tests to run context-based validations (e.g., accessibility testing with Axe, functional testing with Protractor, visual testing with Applitools, etc.)

## Installation

Run `npm i` to install the dev dependencies

## Running the tests

Run `npm run test:accessibility` to run the tests in accessibility mode.

Run `npm run test:functional` to run the tests in functional mode.

Run `export APPLITOOLS_API_KEY=<your_api_key> && npm run test:visual` to run the tests in visual mode.

> Note: to run tests in visual mode you need an account on [Applitools](http://applitools.com), and you need to provide your API key in the above command in replacement to `<your_api_key>`.

___

Made with 💚 by Walmyr Filho

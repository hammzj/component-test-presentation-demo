# Component Testing: Bridging the gaps between frontend applications

This is the repository of the demo application that includes component testing by the Cypress framework.

The demo app is build with free, open-source templates from Material UI to construct a React application using "create-react-app":
Please see here for more information:

-   https://github.com/mui/material-ui
-   https://github.com/mui/material-ui/tree/next/examples/material-ui-cra-ts
-   https://mui.com/material-ui/getting-started/templates/

## Installation

Run `yarn install` to get all dependencies.

Next, launch the application on localhost with `yarn start`. This will open the application on `http://localhost:3000`.

## Running tests

### Component tests

To view component tests in `open` mode, run `yarn run test:cypress:open` and then choose "Component Testing". All specs
are available to be opened and executed.

The component tests can also be run by `yarn run test:cypress:run:component` which will run them as headless.

### End-to-end tests

Firstly, launch the application with `yarn start`.

To view e2e tests in `open` mode, run `yarn run test:cypress:open` and then choose "E2E Testing". All specs
are available to be opened and executed.

The e2e tests can also be run by `yarn run test:cypress:run:e2e` which will run them as headless.

---

Author: Zachary J. Hamm, June 2024

---

# Component Testing: Bridging the gaps between frontend applications

This is the repository of the demo application that includes component testing by the Cypress framework.

## Installation

Run `yarn install`

## Running tests

### Component tests

To see component tests in `open` mode , run `yarn run test:cypress:open` and then choose "Component Testing". All specs
are available to be opened and executed.

The component tests can also be run by `yarn run test:cypress:run:component`.


### End-to-end tests

Firstly, launch the application on localhost with `yarn start`. This will open the application on `http://localhost:3000`.

To see e2e tests in `open` mode , run `yarn run test:cypress:open` and then choose "E2E Testing". All specs
are available to be opened and executed.

The e2e tests can also be run by `yarn run test:cypress:run:e2e`.


*** 

Author: Zachary J. Hamm, June 2024

*** 

# Material UI - Create React App example in TypeScript

## How to use

Download the example [or clone the repo](https://github.com/mui/material-ui):

<!-- #default-branch-switch -->

```bash
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2 material-ui-master/examples/material-ui-cra-ts
cd material-ui-cra-ts
```

Install it and run:

```bash
npm install
npm start
```

or:

<!-- #default-branch-switch -->

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/sandbox/github/mui/material-ui/tree/master/examples/material-ui-cra-ts)

[![Edit on StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/mui/material-ui/tree/master/examples/material-ui-cra-ts)

## The idea behind the example

This example demonstrates how you can use Material UI
with [Create React App](https://github.com/facebookincubator/create-react-app)
in [TypeScript](https://github.com/Microsoft/TypeScript).
It includes `@mui/material` and its peer dependencies, including [Emotion](https://emotion.sh/docs/introduction), the
default style engine in Material UI v5.
If you prefer, you
can [use styled-components instead](https://mui.com/material-ui/integrations/interoperability/#styled-components).

## What's next?

<!-- #default-branch-switch -->

You now have a working example project.
You can head back to the documentation and continue by browsing
the [templates](https://mui.com/material-ui/getting-started/templates/) section.

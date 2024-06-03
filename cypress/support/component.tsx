import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "cypress/react18";
import { MountReactComponentOptions } from "cypress/react";
import { ThemeProvider } from "@emotion/react";
import { ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./commands";
import "./chai";
import theme from "../../src/theme";

interface MountOptions extends MountReactComponentOptions {
    routerProps?: {
        initialEntries?: string[];
    };
    theme?: ThemeOptions;
}

Cypress.Commands.add("mount", (component, options: Partial<MountOptions> = {}) => {
    const { routerProps = { initialEntries: ["/"] }, ...mountOptions } = options;
    //Default to base theme if not given
    const wrapped = (
        <MemoryRouter {...routerProps}>
            <ThemeProvider theme={options.theme || theme}>
                <CssBaseline />
                {component}
            </ThemeProvider>
        </MemoryRouter>
    );

    // Wrap any parent components needed
    // ie: return mount(<MyProvider>{component}</MyProvider>, options)
    return mount(wrapped, mountOptions);
});

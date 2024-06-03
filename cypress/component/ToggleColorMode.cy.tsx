import React, {useState} from "react";
import {PaletteMode} from "@mui/material";
import ToggleColorMode from "../../src/components/ToggleColorMode";


const ToggleColorModeRenderer = ({initialMode}: { initialMode: PaletteMode } = {initialMode: 'light'}) => {
    const [mode, setMode] = useState(initialMode)
    const toggleColorMode = () => {
        setMode((prev) => (prev === "dark" ? "light" : "dark"));
    };
    return <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode}/>
}

describe("ToggleColorMode", function () {
    it('renders with a moon icon when on light mode', function () {
        //This component is rendered with static props given to it
        cy.mount(<ToggleColorModeRenderer initialMode='light'/>)
        cy.get('button[aria-label="Theme toggle button"]')
            .find('[data-testid="ModeNightRoundedIcon"]')
            .should('exist')
    })

    it('renders with a moon icon when on dark mode', function () {
        //This component is rendered with static props given to it
        cy.mount(<ToggleColorModeRenderer initialMode='dark'/>)
        cy.get('button[aria-label="Theme toggle button"]')
            .find('[data-testid="WbSunnyRoundedIcon"]')
            .should('exist')
    })

    it('changes modes when clicked', function () {
        //This depends on the function given for `toggleColorMode`, so it should be tested on each component
        //That supplies a color mode function
        cy.mount(<ToggleColorModeRenderer initialMode='light'/>)

        cy.get('button[aria-label="Theme toggle button"]').click()
        cy.get('button[aria-label="Theme toggle button"]').find('[data-testid="WbSunnyRoundedIcon"]').should('exist')
        cy.get('button[aria-label="Theme toggle button"]').find('[data-testid="ModeNightRoundedIcon"]').should('not.exist')

        cy.get('button[aria-label="Theme toggle button"]').click()
        cy.get('button[aria-label="Theme toggle button"]').find('[data-testid="ModeNightRoundedIcon"]').should('exist')
        cy.get('button[aria-label="Theme toggle button"]').find('[data-testid="WbSunnyRoundedIcon"]').should('not.exist')

    })
})

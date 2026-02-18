describe('template spec', () => {
    const baseURL = 'http://localhost:5173/';
    const homeInput = '.searchSection > .input > .input-field';
    const findMissionBtn = '.searchSection > .btns > .btn-primary';
    
    beforeEach(() => {
        cy.visit(baseURL)
    })

    after(() => {
        cy.log("GG tié le boss")
    })

    it('Redirige avec query et préremplit le champ sur /missions (click)', () => {
        const query = 'design'

        cy.get(homeInput)
        .clear()
        .type(query)
        .should('have.value', query)

        cy.get(findMissionBtn).click()

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', `?q=${query}`)

        cy.get(homeInput).should('have.value', query)
    })

    it('Redirige vers /missions sans query si le champ est vide (click)', () => {
        cy.get(homeInput)
        .clear()
        .should('have.value', '')

        cy.get(findMissionBtn).click()

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', '')
        cy.get(homeInput).should('have.value', '')
    })

    it('Redirige avec query et préremplit le champ sur /missions (Enter)', () => {
        const query = 'design'

        cy.get(homeInput)
        .clear()
        .type(`${query}{enter}`)

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', `?q=${query}`)

        cy.get(homeInput).should('have.value', query)
    })

    it('Redirige vers /missions sans query si le champ est vide (Enter)', () => {
        cy.get(homeInput)
        .clear()
        .type('{enter}')

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', '')
        cy.get(homeInput).should('have.value', '')
    })

})

describe('template spec', () => {
    const baseURL = 'http://localhost:5173/';
    const searchInput = '[data-cy="search-input"]';
    const findMissionBtn = '[data-cy="find-mission-btn"]';
    const publishMissionBtn = '[data-cy="publish-mission-btn"]';
    const findMissionBottomBtn = '[data-cy="find-mission-bottom-btn"]';
    const publishMissionBottomBtn = '[data-cy="publish-mission-bottom-btn"]';
    
    beforeEach(() => {
        cy.visit(baseURL)
    })

    after(() => {
        cy.log("GG tié le boss")
    })

    it('Redirige avec query et préremplit le champ sur /missions (click)', () => {
        const query = 'design'

        cy.get(searchInput)
        .clear()
        .type(query)
        .should('have.value', query)

        cy.get(findMissionBtn).click()

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', `?q=${query}`)

        cy.get(searchInput).should('have.value', query)
    })

    it('Redirige vers /missions sans query si le champ est vide (click)', () => {
        cy.get(searchInput)
        .clear()
        .should('have.value', '')

        cy.get(findMissionBtn).click()

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', '')
        cy.get(searchInput).should('have.value', '')
    })

    it('Redirige avec query et préremplit le champ sur /missions (Enter)', () => {
        const query = 'design'

        cy.get(searchInput)
        .clear()
        .type(`${query}{enter}`)

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', `?q=${query}`)

        cy.get(searchInput).should('have.value', query)
    })

    it('Redirige vers /missions sans query si le champ est vide (Enter)', () => {
        cy.get(searchInput)
        .clear()
        .type('{enter}')

        cy.location('pathname').should('eq', '/missions')
        cy.location('search').should('eq', '')
        cy.get(searchInput).should('have.value', '')
    })

})

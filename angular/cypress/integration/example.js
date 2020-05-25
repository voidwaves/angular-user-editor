
describe('Important Actions', () => {
    it('the add page can be reached', () => {
        cy.visit('http://localhost:4200/list')
        cy.contains('add user').click()
        cy.url().should('include', '/add')
    })

    it('a new user can be created', () => {
        const name = 'testuser'
        const age = 23
        const city = 'someplace'

        cy.visit('http://localhost:4200/add')
        cy.get('[placeholder=name]').type(name)
        cy.get('[type=number]').type(age)
        cy.get('[placeholder=city]').type(city)
        cy.contains('add').click()

        cy.url().should('include', '/list')
        // todo: get the last details button and click on it
    })
})
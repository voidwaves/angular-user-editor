
// TODO: Mock the GraphQL Requests!!!
import { extractContent, extractContentAsNumber } from './Utils'
import { makeExecutableSchema } from "graphql-tools"

describe('Testing important Features with mocked requests', () => {
    beforeEach(() => {
        cy.server();
        cy.task("getSchema").then(schema => {
          cy.mockGraphql({ schema: schema });
        });
    });
    

    it('the add page can be reached', () => {
        cy.visit('http://localhost:4200/list')
        cy.contains('add user').click()
        cy.url().should('include', '/add')
    })

    it('a new user can be created', () => {
        // example date for a new user
        const name = 'testuser'
        const age = 23
        const city = 'someplace'

        // fill the fields on the add page with the data and submit
        cy.visit('http://localhost:4200/add')
        cy.get('[placeholder=name]').type(name)
        cy.get('[type=number]').type(age.toString())
        cy.get('[placeholder=city]').type(city)
        cy.get('button:first').click()

        // check if redirected to list view and view details of the new user
        cy.url().should('include', '/list')
        cy.get('button:last').click()

        // check if an Id has been generated and if the data matches
        cy.get('h4:nth(0)').should(element => {
            assert.isNotNaN(extractContentAsNumber(element))
        })
        cy.get('h4:nth(1)').contains(name)
        cy.get('h4:nth(2)').contains(age)
        cy.get('h4:nth(3)').contains(city)
    })

    it('user can be edited', () => {
        cy.visit('http://localhost:4200/list')
        cy.get('button:last').click()

        cy.get('h4:nth(1)').then(name => {
            const oldName = extractContent(name)
            cy.get('h4:nth(2)').then(age => {
                const oldAge = extractContentAsNumber(age)
                cy.get('h4:nth(3)').then(city => {
                    const oldCity = extractContent(city)

                    // edit the user with new values
                    cy.get('button:nth(1)').click()
                    cy.get('[placeholder=name]').clear().type(oldName + 'new')
                    cy.get('[type=number]').clear().type((oldAge + 100).toString())
                    cy.get('[placeholder=city]').clear().type(oldCity + 'new')
                    cy.get('button:nth(1)').click()

                    cy.get('h4:nth(1)').then(name => {
                        const newName = extractContent(name)
                        cy.get('h4:nth(2)').then(age => {
                            const newAge = extractContent(age)
                            cy.get('h4:nth(3)').then(city => {
                                const newCity = extractContent(city)

                                // compare values
                                expect(newName).to.not.eq(oldName)
                                expect(newAge).to.not.eq(oldAge)
                                expect(newCity).to.not.eq(oldCity)

                                // revert values
                                cy.get('button:nth(1)').click()
                                cy.get('[placeholder=name]').clear().type(oldName)
                                cy.get('[type=number]').clear().type(oldAge.toString())
                                cy.get('[placeholder=city]').clear().type(oldCity)
                                cy.get('button:nth(1)').click()
                            })
                        })
                    })
                })
            })
        })
    })

    it('a user can be deleted', () => {
        // select the last users details
        cy.visit('http://localhost:4200/list')
        cy.get('button:last').click()

        cy.get('h4:nth(0)').then(deletedElement => {
            cy.get('button:first').click()

            // check if redirected to list view and select the last user again
            cy.url().should('include', '/list')
            cy.get('button:last').click()

            // extract the users id and assert that they're different
            cy.get('h4:nth(0)').then(lastElement => {
                expect(extractContentAsNumber(lastElement)).to.not.eq(extractContentAsNumber(deletedElement))
            })
        })
    })
})
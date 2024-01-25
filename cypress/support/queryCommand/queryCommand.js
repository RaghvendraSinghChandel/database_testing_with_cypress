/// <reference types = "cypress"/>

/**
 * This command used to fetch query from database
 */
Cypress.Commands.add("database_query_to_fetch_result",(query)=> {
    cy.task("READFROMDB",{
        dbconfig: Cypress.config('DB'),
        sql: query
    })
})
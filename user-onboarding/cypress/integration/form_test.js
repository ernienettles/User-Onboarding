describe("Test our inputs and submit our form", function() 
{
    beforeEach(function() {
        cy.visit("http://localhost:3000/");
    })
    it("Add test to inputs and submit form", function() {
        cy.get('input[name="name"]')
            .type("Ernie")
            .should("have.value", "Ernie");
        cy.get('input[name="email"]')
            .type('ernie@ernie.com')
            .should("have.value", "ernie@ernie.com");
        cy.get('input[name="password"]')
            .type('password')
            .should("have.value", "password");
        cy.get('[type="checkbox"]')
            .check()
            .should("be.checked");
        cy.get('button')
            .click()
    })
})


describe("Validation test", function() 
{
    beforeEach(function() {
        cy.visit("http://localhost:3000/");
    })
    it('Checking for validation', () => {
        cy.get('input[name="name"]').type('Ernie').should('have.length', 1)
        cy.get('input[name="email"]').type('not_an_email')
        cy.get('input[name="password"]').type('password').should('have.length', 1)
        cy.get('[type="checkbox"]').check().should("be.checked")
        cy.get('input[name="email"]').then(($input) => {
          expect($input[0].validationMessage).to.eq('I expect an email!')
        })
      })
})
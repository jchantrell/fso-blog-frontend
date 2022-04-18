describe('Blog app', function () {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Test User',
            username: 'sada',
            password: '!@#123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    it('login form is shown after click', function() {
        cy.contains('login').click()
        cy.contains('Log in to blog app')
        cy.contains('username')
        cy.contains('password')
    })
})
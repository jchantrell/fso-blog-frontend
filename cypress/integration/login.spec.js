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

    it('fails at login with invalid credentials', function() {
        cy.contains('login').click()
        cy.get('#username-input').type('baduser')
        cy.get('#password-input').type('baduser')
        cy.get('#login-button').click()

        cy.contains('Login failed')

    })

    it('succeeds at login with valid credentials', function() {
        cy.contains('login').click()
        cy.get('#username-input').type('sada')
        cy.get('#password-input').type('!@#123')
        cy.get('#login-button').click()

        cy.contains('Logged in as sada')
    })
})
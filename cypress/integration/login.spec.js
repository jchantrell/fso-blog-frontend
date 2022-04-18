

describe('Blog app', function () {

    describe('when initially loading the page', function() {

        beforeEach(function() {
            cy.clearLocalStorage()
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

    describe('when logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'sada', password: '!@#123'
            }).then(response => {
                cy.visit('http://localhost:3000')
            })
        })

        it('a blog can be created', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('sada')
            cy.get('#password-input').type('!@#123')
            cy.get('#login-button').click()
            cy.contains('new blog').click()
            cy.get('.blogTitleInput').type('a blog')
            cy.get('.blogAuthorInput').type('an author')
            cy.get('.blogUrlInput').type('a url')
            cy.get('.blogSubmit').click()

            cy.contains('a blog by an author')

        })

        it('a blog can be liked', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('sada')
            cy.get('#password-input').type('!@#123')
            cy.get('#login-button').click()
            cy.contains('new blog').click()
            cy.get('.blogTitleInput').type('a nice blog')
            cy.get('.blogAuthorInput').type('a nice author')
            cy.get('.blogUrlInput').type('a nice url')
            cy.get('.blogSubmit').click()
            cy.contains('view').click()
            cy.contains('like').click()

            cy.contains('likes: 1')

        })

        it('a blog can be deleted by the owner', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('sada')
            cy.get('#password-input').type('!@#123')
            cy.get('#login-button').click()
            cy.contains('new blog').click()
            cy.get('.blogTitleInput').type('another blog')
            cy.get('.blogAuthorInput').type('another author')
            cy.get('.blogUrlInput').type('another url')
            cy.get('.blogSubmit').click()
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.on('window:confirm', () => true)

            cy.contains('Removed a blog by an author')

        })

        before(function() {
            const user = {
                name: 'Test User 2',
                username: 'other',
                password: '!@#123'
            }
            cy.request('POST', 'http://localhost:3003/api/users/', user)
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'other', password: '!@#123'
            })
            cy.visit('http://localhost:3000')
        })

        it('a blog cant be deleted by someone who doesnt own it', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('other')
            cy.get('#password-input').type('!@#123')
            cy.get('#login-button').click()
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('like').click()

            cy.contains('posted by: sada')
            cy.get('remove').should('not.exist')

        })

        it('blogs are ordered by likes', function() {
            cy.contains('login').click()
            cy.get('#username-input').type('other')
            cy.get('#password-input').type('!@#123')
            cy.get('#login-button').click()
            cy.get('.detailsShowButton').click({ multiple: true })
            cy.get('.blogLikes').then($elements => {
                const likes = [...$elements].map(el => el.innerText)
                expect(likes).to.deep.equal([...likes].sort().reverse())
                console.log(likes)
            })

        })
    })

})
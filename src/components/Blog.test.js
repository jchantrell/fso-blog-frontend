import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('blog displays title and author by default', () => {
    const blog = {
        title: 'a title',
        author: 'an author',
        url: 'the url',
        user: { username: 'a user' }
    }

    const user = {
        username: 'a user'
    }

    render(<Blog blog={blog} user={user} />)

    const element = document.querySelector('.detailsShown')
    expect(element).toHaveStyle('display: none')
})

test('blog displays url and likes when show button is clicked', async () => {
    const blog = {
        title: 'a title',
        author: 'an author',
        url: 'the url',
        user: { username: 'a user' }
    }

    const user = {
        username: 'a user'
    }

    render(<Blog blog={blog} user={user} />)

    const button = document.querySelector('.detailsShowButton')
    await userEvent.click(button)

    const div = document.querySelector('.detailsShown')
    expect(div).toHaveStyle('display: block')
})
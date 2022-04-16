import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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
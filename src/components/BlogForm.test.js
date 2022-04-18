import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('blog form can create valid blogs', async () => {

    const addBlog = jest.fn()

    render(<BlogForm createBlog={addBlog} />)

    const title = document.querySelector('.blogTitleInput')
    const author = document.querySelector('.blogAuthorInput')
    const url = document.querySelector('.blogUrlInput')
    const submit = document.querySelector('.blogSubmit')

    await userEvent.type(title, 'a title')
    await userEvent.type(author, 'an author')
    await userEvent.type(url, 'a url')
    await userEvent.click(submit)


    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('a title')
    expect(addBlog.mock.calls[0][0].author).toBe('an author')
    expect(addBlog.mock.calls[0][0].url).toBe('a url')
})
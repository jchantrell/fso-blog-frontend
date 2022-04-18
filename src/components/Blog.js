import { useState } from 'react'

const Blog = ({ blog, user, updateLikes, deleteBlog }) => {

    const [blogDetails, setBlogDetails] = useState(false)
    const hiddenDetails = { display: blogDetails ? 'none' : '' }
    const shownDetails = { display: blogDetails ? '' : 'none' }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5
    }

    const addLike = (event) => { // eslint-disable-line no-unused-vars
        updateLikes({
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes+=1,
            id: blog.id
        })
    }

    const removeBlog = (event) => { // eslint-disable-line no-unused-vars
        if (window.confirm(`do you want to remove ${blog.title} by ${blog.author}?`)){
            deleteBlog({
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
                id: blog.id
            })
        }
    }

    const deleteButton = () => {
        return (
            <div>
                <button onClick={removeBlog}>remove</button>
            </div>
        )}

    return (

        <div className='blog'>
            <div className='detailsHidden' id={blog.id} style={hiddenDetails}>
                <div style={blogStyle}>
                    {blog.title} by {blog.author}
                    <button className='detailsShowButton' onClick={() => setBlogDetails(true)}>view</button>
                </div>
            </div>
            <div className='detailsShown' id={blog.id} style={shownDetails}>
                <div style={blogStyle}>
                    <div>{blog.title} by {blog.author}
                        <button className='detailsHideButton' onClick={() => setBlogDetails(false)}>hide</button>
                    </div>
                    <div>url: {blog.url}</div>
                    <div className='blogLikes'>likes: {blog.likes}
                        <button className='likeBlogButton' onClick={addLike}>like</button>
                    </div>
                    <div>posted by: {blog.user.username}</div>
                    {user.username === blog.user.username
                        ? deleteButton()
                        : null}
                </div>
            </div>
        </div>
    )}

export default Blog

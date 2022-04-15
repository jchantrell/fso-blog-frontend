import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async blog => {
  console.log(blog)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl+`/${blog.id}`, blog, config)
  return response.data
}

export default { setToken, getAll, create, update }
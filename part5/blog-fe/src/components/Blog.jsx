import { useState } from "react"
import blogService from "../services/blogs";

const Blog = ({ blog, user, setNotification, setBlogs, blogs }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = async () => {
    try {
      await blogService.updateLikes(blog.id, {
        title: blog.title,
        author: blog.author,
        likes: likes + 1,
        url: blog.url,
        user: blog.user.id,
      }, {
        headers: {
          'Authorization': `Bearer ${user.data.token}`
        }
      })
      setLikes(likes + 1);
    } catch (err) {
      console.error(err)
      setNotification({ error: true, message: 'like could not be sent' })
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  }

  const deleteBlog = async () => {
    const answer = window.confirm(`Remove blog '${blog.title}'?`)
    if (!answer) return;

    try {
      await blogService.deletePost(blog.id, {
        headers: {
          'Authorization': `Bearer ${user.data.token}`
        }
      });
      setNotification({ error: false, message: 'blogpost deleted' })
      setBlogs(blogs.filter(item => item.id !== blog.id))
    } catch (err) {
      console.error(err)
      setNotification({ error: true, message: 'blogpost could not be deleted' })
    }
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }

  return <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
    {showDetails && <div>
      <p style={{ margin: 0 }}>{blog.url}</p>
      <p style={{ margin: 0 }}>likes {likes}</p> <button onClick={likeBlog}>like</button>
      <p style={{ margin: 0 }}>{blog.user ? blog.user.name : ''}</p>
      {blog.user.username === user.data.username && <button onClick={deleteBlog}>delete</button>}
    </div>}
  </div>
}


export default Blog
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

const App = () => {
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const savedData = JSON.parse(window.localStorage.getItem('user'));
    if (savedData) setUser(savedData);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.post('/api/login', {
        username: username,
        password: password
      });
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setNotification({ error: true, message: 'failed to log in' });
      setTimeout(() => {
        setNotification(null);
      }, 5000)
      return;
    };
    setNotification({ error: false, message: 'user logged in' });
    setTimeout(() => {
      setNotification(null);
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    window.location.reload();
    setNotification({ error: false, message: 'successfully logged out' });
    setTimeout(() => {
      setNotification(null);
    }, 5000)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const blog = await axios.post('/api/blogs', {
        title: title,
        author: author,
        url: url,
      }, {
        headers: {
          'Authorization': `Bearer ${user.data.token}`
        }
      });
    } catch (error) {
      setNotification({ error: true, message: 'failed to create blog' });
      setTimeout(() => {
        setNotification(null);
      }, 5000)
      return;
    };
    setBlogs(blogs.concat(blog.data));
    setTitle('');
    setAuthor('');
    setUrl('');
    setNotification({ error: false, message: 'blog created' });
    setTimeout(() => {
      setNotification(null);
    }, 5000)
  }

  const usualStyle = {
    backgroundColor: 'gray',
    padding: '4px',
    borderWidth: '2px',
    border: 'solid',
    fontSize: '24px',
  }
  const failStyle = { borderColor: 'red', color: 'red', ...usualStyle }
  const passStyle = { borderColor: 'green', color: 'green', ...usualStyle }
  return (
    <>
      <h2>blogs</h2>
      {notification && <div>
        <p style={notification.error ? failStyle : passStyle}>{notification.message}</p>
      </div>}
      {user && <div>
        <p>{user.data.name} logged in </p>
        <button onClick={handleLogout}>logout</button>
        <div>
          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <label style={{ display: 'block' }}>
              title:
              <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
            </label>
            <label style={{ display: 'block' }}>
              author:
              <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
            </label>
            <label style={{ display: 'block' }}>
              url:
              <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} required />
            </label>
            <button type='submit'>create</button>
          </form>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>}
      {!user && <div>
        <h2>log in to application</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block' }}>
            username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)} required />
          </label>
          <label style={{ display: 'block' }}>
            password
            <input type='text' value={password} onChange={({ target }) => setPassword(target.value)} required />
          </label>
          <button type='submit'>log in</button>
        </form>
      </div>}
    </>
  )
}

export default App
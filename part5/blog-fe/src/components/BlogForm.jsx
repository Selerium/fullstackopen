import { useState } from "react";
import axios from "axios";

const BlogForm = ({ user, setNotification, setBlogs, blogs, toggleVisibility }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

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
            setBlogs(blogs.concat(blog.data));
            setTitle('');
            setAuthor('');
            setUrl('');
            setNotification({ error: false, message: 'blog created' });
            setTimeout(() => {
                setNotification(null);
            }, 5000)
            toggleVisibility();
        } catch (err) {
            console.error(err)
            setNotification({ error: true, message: 'failed to create blog' });
            setTimeout(() => {
                setNotification(null);
            }, 5000)
            return;
        };
    }

    return <div>
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
}

export default BlogForm;
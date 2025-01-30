import { useState, useEffect } from 'react'
import Comentarios from './Comentarios'

function Posts() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch posts
    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postList = await res.json();
            setPosts(postList);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    // Fetch users
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            const userList = await res.json();
            setUsers(userList);
        }

        fetchUsers();
    }, []);

    if (loading) {
        return <p>Cargando publicaciones...</p>;
    }

    return (
        <div className="post-list">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <h1>{post.title}</h1>
                    <h2>Autor: {users[post.userId - 1]?.name}</h2>
                    <p>{post.body}</p>
                    <Comentarios postId={post.id} />
                </div>
            ))}
        </div>
    );
}

export default Posts;

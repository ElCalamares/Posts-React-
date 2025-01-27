import { useState, useEffect } from "react"

function Posts(){
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState([true])
    
    useEffect(() => {
        async function fetchPosts(){
            const res = await fetch('https://jsonplaceholder.typicode.com/posts')
            const postList = await res.json()
            setPosts(postList)
            setLoading(false)
        }

        fetchPosts()

    }, [posts]) //[] --> Lista de dependencias vacía = sólo se llama al crear el componente

    /*Añado otro user Effect para recoger los nombres de usuario */
    useEffect(() =>{
        async function fetchUsernames(){
            const res_ = await fetch('https://jsonplaceholder.typicode.com/users')
            const userList = await res_.json()
            setUsers(userList)
            setLoading(false)
        }

        fetchUsernames()
    }, [users])

    return(
        <div className="post-list">
            {//Código en JS
                posts.map( post => 
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <h2>Autor: {users[post.userId-1]?.name}</h2>
                        <p>{post.body}</p>
                    </div>
                )
            }

        </div>
    )
}

//?.
/*{
    users.map( user => 
    <div className="user" key={user.userId}>
    <p>{user.name}</p>
    </div>
    )
}*/

export default Posts
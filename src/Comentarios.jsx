import { useState, useEffect } from 'react';

function Comentarios({ postId }) {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComentarios() {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const data = await res.json();
            setComentarios(data);
            setLoading(false);
        }

        fetchComentarios();
    }, [postId]);

    if (loading) {
        return <p>Cargando comentarios...</p>;
    }

    return (
        <div className="comentarios">
            <h2>Comentarios:</h2>
            {comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                    <div key={comentario.id} className="comentario">
                        <h3>{comentario.name}</h3>
                        <p>{comentario.body}</p>
                        <p><strong>Email:</strong> {comentario.email}</p>
                    </div>
                ))
            ) : (
                <p>No hay comentarios para este post.</p>
            )}
        </div>
    );
}

export default Comentarios;

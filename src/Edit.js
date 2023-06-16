import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Edit = () => {
    const { posts, setEditTitle, setEditBody, handleEdit, editTitle, editBody } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find((post) => (post.id).toString() === id )

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

  return (
    <main className='newPost'>
        {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => {
                    e.preventDefault()}}>

                    <label htmlFor="editTitle">Title :</label>
                    <input 
                        type="text" 
                        id="editTitle" 
                        name="editTitle" 
                        value={editTitle} 
                        onChange={(e) => setEditTitle(e.target.value)} 
                        required
                    />
                    <label htmlFor="editBody">Content :</label>
                    <textarea 
                        id="editBody" 
                        name="editBody" 
                        value={editBody} 
                        onChange={(e) => setEditBody(e.target.value)} 
                        required
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
            </>
        }
        {!editTitle &&
            <>
                <h2>404 Page not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    Visit our Homepage
                </p>
            </>
        }
    </main>
  )
}
export default Edit

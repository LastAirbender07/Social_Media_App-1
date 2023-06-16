import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find((post) => (post.id).toString() === id )

  return (
    <main className='postPage'>
        <article className='post'>
          {post &&
            <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <div className='postControls'>
                <Link to={`/edit/${post.id}`}>
                  <button className="eButton">Edit</button>
                </Link>&nbsp;&nbsp;&nbsp;
                <button className="dButton" onClick={() => handleDelete(post.id)}>Delete</button>
              </div>
            </>
          }
          {!post &&
            <>
              <h2>404 Page not Found</h2>
              <p>Well, that's disappointing</p>
              <p>
                Visit our Homepage
              </p>
            </>
          }
        </article>
    </main>
  )
}

export default PostPage

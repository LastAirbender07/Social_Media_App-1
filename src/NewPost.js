import React from 'react'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, handleSubmit } = useContext(DataContext);
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title : </label>
        <input
          id='postTitle'
          placeholder='Title'
          type='text'
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          required
        />
        <label htmlFor='postBody'>Body : </label>
        <textarea
          id='postBody'
          placeholder='Content'
          type='text'
          value={postBody}
          required
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost

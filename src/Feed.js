import React from 'react'
import Post from './Post'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Feed = () => {
  const {posts} = useContext(DataContext)
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default Feed

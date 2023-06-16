import { createContext, useState, useEffect } from "react";
import { format } from 'date-fns';
import useWindowSize from '../hooks/useWindowSize';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../api/posts';
import { useNavigate } from 'react-router-dom';


const DataContext = createContext({});

export const DataProvider = ({children}) => {

    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();
    const { width } = useWindowSize();
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');
  
    useEffect(() => {
      setPosts(data);
        }, [data]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = posts.length? posts[posts.length-1].id + 1 : 1;
      const datetime = format(new Date(), 'MMMM dd, yyyy hh:mm:ss a');
      const newPost = {id, title: postTitle, body: postBody, datetime};
      try{
          const response = await api.post('/posts', newPost);
          const allPosts = [...posts, response.data];
          setPosts(allPosts);
          setPostTitle('');
          setPostBody('');
          navigate('/');
      }
        catch(err){
          if(err.response){
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
          }
          else console.log('Error', err.message);
      }
  }
  
    const handleDelete = async (id) => {
      try{
          await api.delete(`/posts/${id}`);
          const newPosts = posts.filter((post) => post.id !== id);
          setPosts(newPosts);
          navigate('/');
      }
      catch(err){
          console.log('Error', err.message);
    }
  }
  
    const handleEdit = async (id) => {
      const datetime = format(new Date(), 'MMMM dd, yyyy hh:mm:ss a');
      const updatedPost = {id, title: editTitle, body: editBody, datetime};
      try{
          const response = await api.put(`/posts/${id}`, updatedPost);
          setPosts(posts.map((post) => (post.id === id ? {...response.data} : post)));
          setEditTitle('');
          setEditBody('');
          navigate('/');
      }
      catch(err) {
          console.log('Error', err.message);
      }	
      }
  
    useEffect(() => {
      const filterResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
  
      setSearchResults(filterResults.reverse());
    }, [search, posts]);
  
    return (
        <DataContext.Provider value={
            {
                posts,
                setPosts,
                searchResults,
                setSearchResults,
                search,
                setSearch,
                postTitle,
                setPostTitle,
                postBody,
                setPostBody,
                editTitle,
                setEditTitle,
                editBody,
                setEditBody,
                navigate,
                width,
                handleSubmit,
                handleDelete,
                handleEdit,
                fetchError,
                isLoading
            }
        }>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
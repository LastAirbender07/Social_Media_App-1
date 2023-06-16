import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import About from './About';
import PostPage from './PostPage';
import Edit from './Edit';
import Missing from './Missing';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {

  return (
    <div className="App">
		<DataProvider>
			<Header title="Social Media App"/>
			<Nav/>
			<Routes>
				<Route path="/" element={<Home/>} />
				<Route path="post">
				<Route index element={
				<NewPost/>} />
				<Route path=":id" element={<PostPage/>} />
				</Route>
				<Route path='/edit/:id' element={<Edit/>}/>
				<Route path="about" element={<About />} />
				<Route path="*" element={<Missing />} />
			</Routes>
			<Footer/>
	  </DataProvider>
    </div>
  );
}

export default App;

/*

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

  useEffect(() => 
  {
	const fetchPosts = async () => {
		try{
			const response = await api.get('/posts');
			setPosts(response.data);
		}
		catch(err){
			if(err.response){
				console.log(err.response.data);
				console.log(err.response.status);
				console.log(err.response.headers);
			}
			else{
				console.log('Error', err.message);
			}
		}
		}
		fetchPosts();
   	}, []);

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
    <div className="App">
		<DataProvider>
      <Header
        title="Social Media App"
		width={width}
      />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={
        <Home 
			posts={searchResults} 
			fetchError={fetchError}
			isLoading={isLoading}
		/>} />
        <Route path="post">
          <Route index element={
          <NewPost
            handleSubmit={handleSubmit}
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
          />} />
          <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>
		<Route path='/edit/:id' element={<Edit
			posts={posts}
		  	handleEdit={handleEdit}
			editTitle={editTitle}
			setEditTitle={setEditTitle}
			editBody={editBody}
			setEditBody={setEditBody}
		  />}/>
        <Route path="about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer/>
	  </DataProvider>
    </div>
  );
*/

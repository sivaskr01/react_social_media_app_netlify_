import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";


const DataContext=createContext({})

export const DataProvider =({children})=>{
    const[posts,setPosts]=useState([])
  const[search,setSearch]=useState('')
  const[postBody,setPostBody]=useState('')
  const[postTitle,setPostTitle]=useState('')
  const[editBody,setEditBody]=useState('')
  const[editTitle,setEditTitle]=useState('')
  const navigate=useNavigate()
  const[searchResults,setSearchResults]=useState([])
  const {width}=useWindowSize();
  const {data,fetchError,isLoading}=useAxiosFetch("http://localhost:3500/posts");

  useEffect(()=>{
    setPosts(data)
  },[data])

  useEffect(() => {
    const filteredItems = posts.filter((post) => {
  
      if (post && post.body !== undefined && post.title !== undefined) {
        const lowercasedBody = (post.body)?.toLowerCase();
        const lowercasedTitle = (post.title)?.toLowerCase();
        
        if (lowercasedBody.includes(search.toLowerCase()) || lowercasedTitle.includes(search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  
    setSearchResults(filteredItems.reverse());
  }, [posts, search]);
  

 const handleSubmit=async (e)=>{
   e.preventDefault();
   const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;
   const datetime=format(new Date(),'MMMM dd, yyyy pp');
   const newPost={id,title:postTitle,datetime,body:postBody}
   try{
      const response=await api.post('/posts', newPost)
      
     // setPosts(allPosts)
     setPosts((prevPosts) => [...prevPosts, response.data]);
      setPostTitle('')
      setPostBody('')
      navigate('/')
  }catch(err){
    console.log(`Error: ${err.message}`)
  }
 }
 const handleDelete = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
    console.log(`Post with ID ${id} deleted successfully.`);
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    navigate('/');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};


  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
  
    try {
      console.log(`Making PUT request to: /posts/${id}`, updatedPost);
      const response = await api.put(`/posts/${id}`, updatedPost);
      console.log('Server response:', response);
  
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? { ...response.data } : post)));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };  
    return (
        <DataContext.Provider value={{
          width,search,setSearch,searchResults,fetchError,isLoading,
          postTitle,setPostTitle,postBody,setPostBody,handleSubmit,
          posts,handleEdit,editTitle,editBody,setEditTitle,setEditBody,handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;
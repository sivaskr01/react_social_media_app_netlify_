import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import DataContext from './context/DataContext';

const EditPost = () => {
  const {posts,handleEdit,editTitle,editBody,setEditTitle,setEditBody}=useContext(DataContext)
    const {id}=useParams();
    const post=posts.find(post => (post.id).toString()===id);

    useEffect(()=>{
      if(post){
        setEditTitle(post.title)
        setEditBody(post.body)
      }
    }, [post,setEditBody,setEditTitle])

  return (
    <main className='PostPage'>
        {editTitle &&
         <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input 
             type='text'
             id='postTitle'
             required
             value={editTitle}
             onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
             type='text'
             id='postBody'
             required
             value={editBody}
             onChange={(e) => setEditBody(e.target.value)}
            />
             <button className='editButton' type='submit' onClick={() => handleEdit(post.id)}>Save Changes</button>

          </form>
        </>
     }
        {!editTitle &&
        <>
         <h3>Page Not Found</h3>
         <p>Well, that's disappointing.</p>
         <p><Link to="/">Visit Our Homepage</Link></p>
        </>
        }
    </main>
  )
}

export default EditPost
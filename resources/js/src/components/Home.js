import React, { useEffect , useState } from 'react';
import { Link } from "react-router-dom";
import AppContainer from './AppContainer';
import Api from '../Api';

const Home = () =>  {

    const [posts, setPosts ] = useState(null);

    const fetchPosts = () => {
        Api.getAllPosts().then(res => {
            //console.log('get all posts');
            //console.log(res);
            const result = res.data;
            setPosts(result.data)
        });
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    
    const renderPosts = () => {

        if(!posts) {
            return (
                <tr>
                    <td colSpan="4">
                        Loading Posts...
                    </td>
                </tr>
            )
        }
        if(posts.length === 0) {
            return (
                <tr>
                    <td colSpan="4">
                        This is no post yet. Add One
                    </td>
                </tr>
            )
        }

        return posts.map((post) => (
            <tr key = {post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                    <Link to={`/edit/${post.id}`} className="btn btn-warning">Edit</Link>
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick = {() => {
                        Api.deletePost(post.id)
                        .then(fetchPosts)
                        .catch(err => {
                            alert('Failed to delete post with id :' + post.id);
                        });
                    }}
                    >DELETE</button>
                </td>
             </tr>   
        )) 
    }

    return (
         <AppContainer title="Laravel React js - CRUD">
             <Link to="/add" className="btn btn-primary">Add Post</Link>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">ID.</th>
                        <th scope="col">title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                         { renderPosts() }
                    </tbody>
                </table>
            </div>
         </AppContainer>
    );

};

export default Home;

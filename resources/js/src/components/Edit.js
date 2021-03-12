import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import AppContainer from './AppContainer';
import Api from '../Api';

const Edit = () =>  {
    
    const { id } = useParams();
    let history = useHistory();
    const [loading, setLoading ] = useState(false);
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');

    const onEditSubmit = async () => {
        setLoading(true);
        try{
            await Api.updatePost({
                title,description
            }, id);
            history.push("/");
        } catch {
            alert('Failed to edit post !');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        Api.getOnePost(id).then(res => {
            console.log('get edit posts');
            console.log(res);
            const result = res.data;
            const post = result.data;
            setTitle(post.title);
            setDescription(post.description);
        });
    }, []);


    return (
         <AppContainer title="EDIT Post">
             <form>
                <div class="form-group">
                    <label>Title</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    id="title" 
                    placeholder="Enter Title"
                    value = { title}
                    onChange = {e => setTitle(e.target.value)}    
                    />
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea 
                    type="text" 
                    className="form-control" 
                    id="description" 
                    value = { description}
                    onChange = {e => setDescription(e.target.value)}
                    />
                </div>
                <div class="form-group">
                    <button type="button" className="btn btn-success" onClick = {onEditSubmit} disabled = { loading }> { loading ? 'LOADING' : 'Edit'}</button>
                </div>
            </form>    
         </AppContainer>
    );

};

export default Edit;

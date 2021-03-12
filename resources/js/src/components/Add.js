import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import AppContainer from './AppContainer';
import Api from '../Api';

const Add = () =>  {
    
    let history = useHistory();
    const [loading, setLoading ] = useState(false);
    const [title, setTitle ] = useState('');
    const [description, setDescription ] = useState('');

    const onAddSubmit = async () => {
        setLoading(true);
        try{
            await Api.addPost({
                title,description
            })
            history.push("/");
        } catch {
            alert('Failed to add post !');
        } finally {
            setLoading(false);
        }
    }

    return (
         <AppContainer title="Add Post">
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
                    <button type="button" className="btn btn-success" onClick = {onAddSubmit} disabled = { loading }> { loading ? 'LOADING' : 'ADD'}</button>
                </div>
            </form>    
         </AppContainer>
    );

};

export default Add;

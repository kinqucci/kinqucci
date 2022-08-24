import { useState } from "react";
import { useHistory } from "react-router-dom";
const Create = () => {
    const [ title, setTitle] = useState('');
    const [ body, setBody] =useState('');
    const [ author, setAuthor]= useState('');
    const [ isPending, setisPending] = useState(false);
    const history = useHistory();

    const handleSubmit=(e) => {
        e.preventDefault();
        const blog = {title, body, author};
        

        setisPending(true);

        fetch("http://localhost:8000/blogs", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(()=> {
            setisPending(false);
            history.push('/');
            console.log("new blig")
        })
        
        
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label> Blog Title</label>
                    <input 
                    type= "text" 
                    required 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    />
                    <label> Blog Body:</label>
                    <textarea 
                    required
                    value={body}
                    onChange={(e)=> setBody(e.target.value)}>
                        
                    </textarea>  
                    <label>Blog Author:</label>
                    <select 
                    value= {author} 
                    onChange={(e)=>setAuthor(e.target.value)}> 
                        <option value="Uche">Uche</option>
                        <option value="Amaka">Amaka</option>

                    </select>
                    {!isPending && <button >Add blog</button>}
                    { isPending && <button >Uploading Post</button>}
                   
                </form>
        </div>
     );
}
 
export default Create;
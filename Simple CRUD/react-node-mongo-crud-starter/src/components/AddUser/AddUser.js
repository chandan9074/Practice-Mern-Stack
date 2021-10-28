import React, { useRef } from 'react';

const AddUser = () => {

    const nameref = useRef();
    const emailref = useRef();

    const handleUser = (e) =>{
        
        const name = nameref.current.value;
        const email = emailref.current.value;
        console.log(name, email)
        // const newUser = { "name": name, "email":email }
        const newUser = { name, email }
        
        fetch("http://localhost:5000/users", {
            method:'POST',
            headers:{
                'content-type': "application/json"
            },
            body: JSON.stringify(newUser)
            
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.insertedId){
                alert("successfully created the users");
                e.target.reset();
            }
        })
        e.preventDefault();

    }

    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleUser}>
                <input type="text" ref={nameref} ></input>
                <input type="email" ref={emailref} ></input>
                <input type="submit" value="Add user"></input>
            </form>
        </div>
    );
};

export default AddUser;
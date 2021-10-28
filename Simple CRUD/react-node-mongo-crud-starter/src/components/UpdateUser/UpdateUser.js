import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState([])
    const {id} = useParams()

    const updateName = useRef();
    const updateEmail = useRef();

    useEffect(()=>{
        fetch(`http://localhost:5000/users/${id}`)
        .then(res => res.json())
        .then(res=>setUser(res))
    }, [])

    const handleUpdate = (e) =>{
        const name =  updateName.current.value;
        const email = updateEmail.current.value;

        const updateUser ={name , email}
        fetch(`http://localhost:5000/users/${id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateUser)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.modifiedCount > 0){
                alert("updated successfully")
            }
        })

        e.preventDefault();
    }

    return (
        <div>
            <h2>This is Update User</h2>
            <h2>{user.name}</h2>
            <form onSubmit={handleUpdate} >
                <input type="text" defaultValue={user.name} ref={updateName} ></input>
                <input type="email" defaultValue={user.email} ref={updateEmail} ></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
};

export default UpdateUser;
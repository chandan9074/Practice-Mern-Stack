import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [ users, setUsers] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(res => setUsers(res))
    }, [])

    const handleDelete = (id) =>{
        // console.log("dukhche")
        const confirmed = window.confirm("Are you sure, you want to delete this user?");
        if(confirmed){
            const url = `http://localhost:5000/users/${id}`;
            fetch(url, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(res =>{
                if(res.deletedCount > 0){
                    alert("deleted successfully");
                    const remainingUser = users.filter(user => user._id !== id);
                    setUsers(remainingUser);
                }
            })
        }
    }

    return (
        <div>
            <h2>Users : {users.length}</h2>
            <ul>
                {
                    users.map(user => <li key={user._id}> 
                    {user.name} :: {user.email} 
                    <Link to={`/users/update/${user._id}`}>Update </Link> 
                    <button onClick={()=>handleDelete(user._id)}>X</button> 
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Users;
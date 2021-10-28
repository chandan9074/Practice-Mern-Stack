import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";


import './addservice.css';

const AddService = () => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        axios.post('http://localhost:5000/services', data)
        .then(res=>{
            console.log("chandan", res)
            reset();
        })
    };
    return ( 
        <div>
        <h1>Add Services</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input {...register("name", { required: true, maxLength: 20 })} placeholder="Enter name" />
            <textarea {...register("description")} placeholder="Enter description" />
            <input type="number" {...register("price")} placeholder="Enter price" />
            <input {...register("img")} placeholder="Enter image" />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            
            <input type="submit" />
        </form>
        </div>
     );
}
 
export default AddService;
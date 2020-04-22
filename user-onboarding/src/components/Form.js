import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

/*
We want to create a form to onboard a new user to our system. We need at least the following pieces of information about our new user:

 Name
 Email
 Password
 Terms of Service (checkbox)
 A Submit button to send our form data to the server
 */

    const formSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email(),
        password: yup.string().required(),
        terms: yup.boolean().required(),
    })


    export default function Form(){

        const [formState, setFormState] = useState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });




        return (
            <form>
                <label htmlFor="name">
                    Name
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    />
                </label>
                <label htmlFor="terms" className="terms">
                    <input
                    type="checkbox"
                    name="terms"
                    checked={true}
                    />
                    Terms & Conditions
                </label>
                <button type="submit">Submit</button>
            </form>
            
        )
    }
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field."),
        email: yup.string().email("Must be a valid email address.").required("Must include an email address."),
        password: yup.string().required("Choose your password."),
        terms: yup.boolean().oneOf([true], "You must accept the Terms & Conditions."),
    })


    export default function Form(){

        const [formState, setFormState] = useState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });

        const [errors, setErrors] = useState({
            name: "",
            email: "",
            password: "",
            terms: ""
        });

        const [buttonDisabled, setButtonDisabled] = useState(true);

        const [users, setUsers] = useState([]);


        const formSubmit = e => {
            e.preventDefault();
            axios.post("https://reqres.in/api/users", formState)
            .then(response => {
                setUsers([...users, response.data]);
                console.log("Success!", users);
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: ""
                })
            })
            .catch(error => {
                console.log(error.response);
            })
        }

        useEffect(() => {
            formSchema.isValid(formState).then(valid => {
                setButtonDisabled(!valid);
            })
        }, [formState]);

        const validateChange = e => {
            yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: ""})
            })
            .catch(error => {
                setErrors({
                    ...errors, [e.target.name]: error.errors[0]
                })
            });
        };

        const inputChange = e => {
            e.persist();
            const newFormData = {
                ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
            };
            validateChange(e);
            setFormState(newFormData);
        };

        return (
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                    <br/>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={inputChange}
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label>
                <br/>
                <label htmlFor="email">
                    Email
                    <br/>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={inputChange}
                    />
                    {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                </label>
                <br/>
                <label htmlFor="password">
                    Password
                    <br/>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={inputChange}
                    />
                    {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                </label>
                <br/>
                <label htmlFor="terms" className="terms">
                    <input
                    type="checkbox"
                    name="terms"
                    checked={formState.terms}
                    onChange={inputChange}
                    />
                    Terms & Conditions
                </label>
                <br/>
                <button disabled={buttonDisabled}>Submit</button>
                <pre>{users.map( user => JSON.stringify(user, null, 2))}</pre>
            </form>    
        )
    }
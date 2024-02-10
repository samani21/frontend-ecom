import React, { useState } from "react";
import './CSS/LoginSignup.css'
import axios from 'axios'

const LoginSignup = () => {
    const [state, steState] = useState("Login");
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
    })

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        console.log("login", formData)
        let responseData;
        const jsonData = JSON.stringify(formData);
        await axios.post("http://localhost:8000/api/login", jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                responseData = response.data;
                console.log(responseData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if (responseData.access_token) {
            console.log(responseData);
            localStorage.setItem('auth-token', responseData.access_token)
            localStorage.setItem('id', responseData.user.id)
            window.location.replace('/')
        } else {
            alert(responseData.message)
        }
    }
    const signup = async () => {
        console.log("sign up", formData)
        let responseData;
        const jsonData = JSON.stringify(formData);
        await axios.post("http://localhost:8000/api/register", jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                responseData = response.data;
                console.log(responseData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        if (responseData.success) {
            console.log(responseData);
            localStorage.setItem('auth-token', responseData.token, responseData.messsage)
            window.location.replace('/')
        } else {
            alert(responseData.message)
        }
    }

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Your Name" /> : <></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
                {state === "Sign Up"
                    ? <p className="loginsignup-login">Already have an account? <span onClick={() => { steState("Login") }}>Login here</span></p>
                    : <p className="loginsignup-login">Create an account? <span onClick={() => { steState("Sign Up") }}>Click here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id="" />
                    <p>By continuing, i agree to the terms of use & privacy police.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
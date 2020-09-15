import React, { useState } from 'react';
import axios from 'axios'
import { TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

import {axiosWithAuth} from '../utils/axiosWithAuth'


const Login = () => {
    const initialLogin = {
        // credentials: {
            username: '',
            password: '',
        // }
    }
    const [login, setLogin] = useState(initialLogin)
    const [isLoading, setIsLoading] = useState(false)
    let history = useHistory()
    const inputHandler = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }
    const submitHandler = (e) => {
        e.preventDefault()
        setIsLoading(true)
        //don't forget to check form validation
        const submittedData = {
            credentials: {
                username: login.username,
                password: login.password
            }
        }
        axiosWithAuth()
            .post('/api/login', submittedData.credentials)
            .then(response => {
                console.log(response)
                window.localStorage.setItem('token', response.data.payload)
                history.push('./protected')
                setLogin(initialLogin)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(
                setIsLoading(false)
            )
    }
    return (
        <>
            <p>hi</p>
            <form onSubmit={submitHandler}>
                <TextField
                    label='Username'
                    variant="outlined"
                    name='username'
                    value={login.username}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Password'
                    variant="outlined"
                    name='password'
                    value={login.password}
                    onChange={inputHandler}
                    type='password'
                />
                <Button type='submit' >
                    Login
                </Button>
            </form>
            {/* {isLoading ? <p>hidsfdsfdsfsdfdsfwefewfe</p> : ''} */}
        </>
    )
}

export default Login
import React, {useEffect, useState} from 'react'
import { TextField, Button } from '@material-ui/core';

import {axiosWithAuth} from '../utils/axiosWithAuth'

const Friend = () => {
    const initalFriend = {
        id: Date.now(),
        name: '',
        age: '',
        email: '',
    }
    const [friends, setFriends] = useState([])
    const [newFriend, setNewFriend] = useState(initalFriend)
    const inputHandler = (e) => {
        setNewFriend({...newFriend, [e.target.name]: e.target.value})
    }
    useEffect(()=> {
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                setFriends(res.data)
            })
            .catch(err => console.log(err))
    }, [friends.length])

    const submitHandler = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('/api/friends', newFriend)
            .then(response => {
                setFriends([...friends, response.data])
                setNewFriend(initalFriend)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <h1>My Friends:</h1>
            {friends.map(friend => {
                return <div key={friend.id}>{friend.name} {friend.age} {friend.email}</div>
            })}
            <form onSubmit={submitHandler}>
                <TextField
                    label='Name'
                    variant="outlined"
                    name='name'
                    value={newFriend.name}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Age'
                    variant="outlined"
                    name='age'
                    value={newFriend.age}
                    onChange={inputHandler}
                    type='text'
                />
                <TextField
                    label='Email'
                    variant="outlined"
                    name='email'
                    value={newFriend.email}
                    onChange={inputHandler}
                    type='text'
                />
                <Button type='submit' >
                    Add Friend
                </Button>
            </form>
        </>
    )
}
export default Friend
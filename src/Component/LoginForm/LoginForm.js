import React, { useState } from 'react'

export const LoginForm = () => {

    const [user, setUser] = useState({
        name: '',
        password: '',
    })

    let name, value
    const getUserData = (event) => {
        name = event.target.name
        value = event.target.value

        setUser({ ...user, [name]: value })
    }

    const postData = async (e) => {
        e.preventDefault()

        const { name, password } = user

        const res = await fetch('https://hrportal-4ab86-default-rtdb.firebaseio.com/hrportal-reactform.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    password,
                })
            })
        console.log(res)
    }

    return (
        <div className='container'>

            <form
                method='POST'
            >
                <div className="container">
                    <input
                        type="text"
                        placeholder=" Username"
                        name="name"
                        value={user.name}
                        onChange={getUserData}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={getUserData}
                        required
                    />
                    <button
                        type="submit"
                        onClick={postData}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='container-fluid'>
            <div className="card">
                <div className="card-body text-center" >
                         OOPS! There is Somthing wrong<br />
                        <Link to='/'>Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Error
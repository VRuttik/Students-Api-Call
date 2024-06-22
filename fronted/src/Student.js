import React from 'react';
import { Link } from 'react-router-dom';

function Student() {
    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className=' container w-100 bg-white rounded'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Class</td>
                            <td>Email</td>
                            <td>Hobbies</td>
                            <td>Gender</td>
                            <td>
                                <Link to='/update' className='btn btn-primary'>Update</Link>
                                <button className='btn btn-danger ms-2'>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Student;

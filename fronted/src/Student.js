import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Student({ students, loading, onDeleteStudent }) {
    if (loading) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='container w-100 bg-white rounded text-center p-3'>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!Array.isArray(students) || students.length === 0) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='container w-100 bg-white rounded'>
                    <Link to="/create" className='btn btn-success'>Add +</Link>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
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
                                <td colSpan="7" className="text-center">No students available</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-100 bg-white rounded'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.class}</td>
                                <td>{student.email}</td>
                                <td>{student.hobbies}</td>
                                <td>{student.gender}</td>
                                <td>
                                    <Link to={`/update/${student.id}`} className='btn btn-primary'>Update</Link>
                                    <button className='btn btn-danger ms-2' onClick={() => onDeleteStudent(student.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Student.propTypes = {
    students: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onDeleteStudent: PropTypes.func.isRequired,
};

export default Student;

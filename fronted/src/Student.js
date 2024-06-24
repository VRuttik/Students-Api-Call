import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Student({ students, onDeleteStudent }) {
    console.log('students prop:', students); // Debugging line

    if (!Array.isArray(students) || students.length === 0) {
        return (
            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='container w-100 bg-white rounded'>
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
                                <td colSpan="6" className="text-center">No students available</td>
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
    students: PropTypes.array,
    onDeleteStudent: PropTypes.func.isRequired,
};

Student.defaultProps = {
    students: [],
};

export default Student;



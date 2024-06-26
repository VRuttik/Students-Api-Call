import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Student.css'; // Import the CSS file for custom styles

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
            <div className='d-flex vh-100 bg-white justify-content-center align-items-center'>
                <div className='container w-100 bg-white rounded'>
                    <Link to="/create" className='btn btn-success' id='faPen' data-toggle="tooltip" data-placement="right" title="Tooltip on right">Add <FontAwesomeIcon icon={faPlus} /></Link>
                    <table className='table table-bordered table-hover bg-transparent'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Class</th>
                                <th>Email</th>
                                <th>Hobbies</th>
                                <th>Gender</th>
                                <th><center>Action</center></th>
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
        <div className='d-flex flex-column vh-100 bg-primary justify-content-center align-items-center'>
            <h1 id="awf">AWF Student's</h1> {/* Heading above the table */}
            <div className='container w-100 bg-white rounded mt-3 myContainer'> {/* Added mt-3 for top margin */}
                <Link to="/create" className='btn btn-success' id='faPen' data-toggle="tooltip" data-placement="right" title="Add new Student">Add <FontAwesomeIcon icon={faPlus} /></Link>
                <table className='table table-bordered table-hover'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                            <th>Gender</th>
                            <th><center>Action</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.name}</td>
                                <td>{student.class}</td>
                                <td>{student.email}</td>
                                <td>{student.hobbies.join(', ')}</td> {/* Display hobbies with comma-separated values */}
                                <td>{student.gender}</td>
                                <td><center>
                                    <Link to={`/update/${student.id}`} className='btn btn-primary' data-toggle="tooltip" data-placement="right" title="Update Student"><FontAwesomeIcon icon={faPen} /></Link>
                                    <button className='btn btn-danger ms-2' data-toggle="tooltip" data-placement="right" title="Delete Student" onClick={() => onDeleteStudent(student.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </center>
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

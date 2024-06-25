import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'w3-css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                    <Link to="/create" className='btn btn-success' style={{ float: "right", marginTop: "20px" }}><FontAwesomeIcon icon={faPlus} /></Link>
                    <table className='table table-bordered table-hover bg-transparent'>
                        <thead>
                            <tr>
                                <th><center>Name</center></th>
                                <th><center>Class</center></th>
                                <th><center>Email</center></th>
                                <th><center>Hobbies</center></th>
                                <th><center>Gender</center></th>
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
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-100 bg-white rounded'>
                <Link to="/create" className='btn btn-success' style={{ float: "right", marginTop: "20px" }}><FontAwesomeIcon icon={faPlus} /></Link>
                <table className='table table-bordered table-hover'>
                    <thead className='thead-dark'>
                        <tr>
                            <th><center>Name</center></th>
                            <th><center>Class</center></th>
                            <th><center>Email</center></th>
                            <th><center>Hobbies</center></th>
                            <th><center>Gender</center></th>
                            <th><center>Action</center></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td><center>{student.name}</center></td>
                                <td><center>{student.class}</center></td>
                                <td><center>{student.email}</center></td>
                                <td><center>{student.hobbies}</center></td>
                                <td><center>{student.gender}</center></td>
                                <td><center>
                                    <Link to={`/update/${student.id}`} className='btn btn-primary'><FontAwesomeIcon icon={faPen} /></Link>
                                    <button className='btn btn-danger ms-2' onClick={() => onDeleteStudent(student.id)}><FontAwesomeIcon icon={faTrash} /></button>
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

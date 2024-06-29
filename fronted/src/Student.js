import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Student.css'; // Import the CSS file for custom styles

function Student({ students, loading, onDeleteStudent }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const handleDeleteClick = (studentId) => {
        setStudentToDelete(studentId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        onDeleteStudent(studentToDelete);
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
        setStudentToDelete(null);
    };

    if (loading) {
        return (
            <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
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
            <div className='d-flex vh-100 bg-light justify-content-center align-items-center'>
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
        <div className='d-flex flex-column bg-light vh-100 justify-content-center align-items-center'>
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
                                    <button className='btn btn-danger ms-2' data-toggle="tooltip" data-placement="right" title="Delete Student" onClick={() => handleDeleteClick(student.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                </center>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={`modal ${showDeleteModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showDeleteModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div>
                        <div className="modal-header">
                            <h5 className="modal-title">AWF Page Say's...</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCancelDelete}></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this Student?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Delete Confirmation Modal */}
        </div>
    );
}

Student.propTypes = {
    students: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onDeleteStudent: PropTypes.func.isRequired,
};

export default Student;

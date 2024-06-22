import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b', {
                headers: {
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            const data = await response.json();
            // Check if data.record.students is defined before setting state
            if (data.record && data.record.students) {
                setStudents(data.record.students);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching students:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            // Remove the deleted student from the state
            setStudents(students.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
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
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.class}</td>
                                    <td>{student.email}</td>
                                    <td>{student.hobbies}</td>
                                    <td>{student.gender}</td>
                                    <td>
                                        <Link to={`/update/${student.id}`} className='btn btn-primary'>Update</Link>
                                        <button className='btn btn-danger ms-2' onClick={() => handleDelete(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No students found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;

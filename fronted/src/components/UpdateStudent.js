import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudent({ onUpdateStudent }) {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b/${id}`, {
            headers: {
                'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
            }
        })
        .then(response => response.json())
        .then(data => {
            setName(data.name);
            setStudentClass(data.class);
            setEmail(data.email);
            setHobbies(data.hobbies);
            setGender(data.gender);
        })
        .catch(error => console.error('Error fetching student data:', error));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStudent = {
            id,
            name,
            class: studentClass,
            email,
            hobbies,
            gender,
        };

        try {
            const response = await fetch(`https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                },
                body: JSON.stringify(updatedStudent),
            });
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            // Update parent component state with the updated student
            onUpdateStudent(updatedStudent);
            navigate('/');
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    {/* Form inputs */}
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='button' className='btn btn-secondary' style={{ float: 'right' }} onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;

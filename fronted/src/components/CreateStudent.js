import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent({ onAddStudent }) {
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudent = {
            id: Date.now().toString(),
            name,
            class: studentClass,
            email,
            hobbies,
            gender,
        };

        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                },
                body: JSON.stringify(newStudent),
            });
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            // Update parent component state with the new student
            onAddStudent(newStudent);
            navigate('/');
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='form-control'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='class'>Class</label>
                        <input
                            type='text'
                            placeholder='Enter Class'
                            className='form-control'
                            id='class'
                            value={studentClass}
                            onChange={(e) => setStudentClass(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='hobbies'>Hobbies</label>
                        <input
                            type='text'
                            placeholder='Enter Hobbies'
                            className='form-control'
                            id='hobbies'
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='gender'>Gender</label>
                        <input
                            type='text'
                            placeholder='Enter Gender'
                            className='form-control'
                            id='gender'
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                    <button type='button' className='btn btn-secondary' style={{ float: 'right' }} onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function UpdateStudent({ onUpdateStudent }) {
    const { id } = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        fetch(`https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b/latest`, {
            headers: {
                'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
            }
        })
        .then(response => response.json())
        .then(data => {
            const student = data.record.find(s => s.id === id);
            setName(student.name);
            setStudentClass(student.class);
            setEmail(student.email);
            setHobbies(student.hobbies);
            setGender(student.gender);
        })
        .catch(error => console.error('Error fetching student data:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = {
            id,
            name,
            class: studentClass,
            email,
            hobbies,
            gender
        };
        onUpdateStudent(updatedStudent);
        history.push('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='class'>Class</label>
                        <input type='text' placeholder='Enter Class' className='form-control' id='class' value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='hobbies'>Hobbies</label>
                        <input type='text' placeholder='Enter Hobbies' className='form-control' id='hobbies' value={hobbies} onChange={(e) => setHobbies(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='gender'>Gender</label>
                        <input type='text' placeholder='Enter Gender' className='form-control' id='gender' value={gender} onChange={(e) => setGender(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='button' className='btn btn-secondary' style={{ float: 'right' }} onClick={() => history.push('/')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;


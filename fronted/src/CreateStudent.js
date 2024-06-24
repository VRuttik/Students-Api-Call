import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'w3-css';

function CreateStudent({ onAddStudent }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            id: Date.now().toString(),
            name,
            class: studentClass,
            email,
            hobbies,
            gender
        };
        onAddStudent(newStudent);
        setName('');
        setStudentClass('');
        setEmail('');
        setHobbies('');
        setGender('');
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2 className='w3-center'>Add Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='studentClass'>Class</label>
                        <input type='text' placeholder='Enter Class' className='form-control' id='studentClass' value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='hobbies'>Hobbies</label>
                        <select
                            id='hobbies'
                            className='form-control'
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                            required
                        >
                            <option value=''>Select Hobby</option>
                            <option value='Reading'>Reading</option>
                            <option value='Writing'>Writing</option>
                            <option value='Driving'>Driving</option>
                            <option value='Swimming'>Swimming</option>
                            <option value='Painting'>Painting</option>
                            <option value='Cycling'>Cycling</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='gender'>Gender</label>
                        <input type='text' placeholder='Enter Gender' className='form-control' id='gender' value={gender} onChange={(e) => setGender(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn btn-success'>Submit</button>
                    <button type='button' className='btn btn-danger' style={{ float: 'right' }} onClick={() => navigate('/')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;


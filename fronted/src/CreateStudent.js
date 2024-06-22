import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function CreateStudent({ onAddStudent }) {
    const history = useHistory();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
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
        history.push('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Student</h2>
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
                    <button type='submit' className='btn btn-success'>Submit</button>
                    <button type='button' className='btn btn-danger' style={{ float: 'right' }} onClick={() => history.push('/')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default CreateStudent;

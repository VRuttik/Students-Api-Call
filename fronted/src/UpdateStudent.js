
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudent({ students, onUpdateStudent }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        const student = students.find(s => s.id === id);
        if (student) {
            setName(student.name);
            setStudentClass(student.class);
            setEmail(student.email);
            setHobbies(student.hobbies);
            setGender(student.gender);
        }
    }, [id, students]);

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
        navigate('/');
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
                    <button type='button' className='btn btn-secondary' style={{ float: 'right' }} onClick={() => navigate('/')}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;

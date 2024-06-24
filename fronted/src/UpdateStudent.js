import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateStudent({ students, onUpdateStudent }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState('');

    useEffect(() => {
        if (Array.isArray(students)) {
            const student = students.find(s => s.id === id);
            if (student) {
                setName(student.name);
                setStudentClass(student.class);
                setEmail(student.email);
                setHobbies(student.hobbies || []);
                setGender(student.gender);
            }
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

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2 className='w3-center'>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'><b>Name:</b></label>
                        <input type='text' placeholder='Enter Name' className='form-control' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='studentClass'><b>Class:</b></label>
                        <input type='text' placeholder='Enter Class' className='form-control' id='studentClass' value={studentClass} onChange={(e) => setStudentClass(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'><b>Email</b></label>
                        <input type='email' placeholder='Enter Email' className='form-control' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='hobbies'><b>Hobbies:</b></label>
                        <select
                            id='hobbies'
                            className='form-control'
                            multiple
                            value={hobbies}
                            onChange={(e) => setHobbies(Array.from(e.target.selectedOptions, option => option.value))}
                            required
                        >
                            <option value='Reading'>Reading</option>
                            <option value='Writing'>Writing</option>
                            <option value='Driving'>Driving</option>
                            <option value='Swimming'>Swimming</option>
                            <option value='Painting'>Painting</option>
                            <option value='Cycling'>Cycling</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='gender'><b>Gender</b></label>
                        <input type='text' placeholder='Enter Gender' className='form-control' id='gender' value={gender} onChange={(e) => setGender(e.target.value)} required />
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <button type='button' className='btn btn-danger' style={{ float: 'right' }} onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateStudent;


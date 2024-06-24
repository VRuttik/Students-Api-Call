import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './Student';
import CreateStudent from './CreateStudent';
import UpdateStudent from './UpdateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b/latest', {
                headers: {
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            const data = await response.json();
            if (data.record) {
                setStudents(data.record);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (newStudent) => {
        try {
            // Ensure the new student conforms to the format
            const { id, name, email, class: studentClass, hobbies, gender } = newStudent;
            const updatedStudents = [...students, { id, name, email, class: studentClass, hobbies, gender }];
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                },
                body: JSON.stringify({ record: updatedStudents }),
            });
            if (!response.ok) {
                throw new Error('Failed to add student');
            }
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    const handleUpdateStudent = async (updatedStudent) => {
        try {
            // Ensure the updated student conforms to the format
            const { id, name, email, class: studentClass, hobbies, gender } = updatedStudent;
            const updatedStudents = students.map(student => 
                student.id === id ? { id, name, email, class: studentClass, hobbies, gender } : student
            );
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                },
                body: JSON.stringify({ record: updatedStudents }),
            });
            if (!response.ok) {
                throw new Error('Failed to update student');
            }
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            const updatedStudents = students.filter(student => student.id !== id);
            const response = await fetch('https://api.jsonbin.io/v3/b/6676a887e41b4d34e407300b', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$R8Bnxpjj80f8ikXutRQjUOgV9YHIWt5h7ZTKEnTAVtMMcVSKYd.L2',
                    'X-Access-Key': '$2a$10$c4R6pg/2VliBAq4lwlbmDOsJNuXN2DWOyPwhlZmZLFxr822dQ7TgK'
                },
                body: JSON.stringify({ record: updatedStudents }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            setStudents(updatedStudents);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Student students={students} loading={loading} onDeleteStudent={handleDeleteStudent} />} />
                    <Route path='/create' element={<CreateStudent onAddStudent={handleAddStudent} />} />
                    <Route path='/update/:id' element={<UpdateStudent students={students} onUpdateStudent={handleUpdateStudent} />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

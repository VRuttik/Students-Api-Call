import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateStudent.css'; // Import your CSS file

function UpdateStudent({ students, onUpdateStudent }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [studentClass, setStudentClass] = useState('');
    const [email, setEmail] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState('');
    const [nameError, setNameError] = useState('');
    const [hobbiesError, setHobbiesError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    useEffect(() => {
        if (Array.isArray(students)) {
            const student = students.find(s => s.id === id);
            if (student) {
                setName(student.name);
                setStudentClass(student.class);
                setEmail(student.email);
                setHobbies(student.hobbies || []);
                setGender(student.gender || '');
            }
        }
    }, [id, students]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate name field
        const nameRegex = /^[A-Z][a-zA-Z ]*$/;
        if (!name.match(nameRegex)) {
            setNameError('Name should start with a capital letter and contain only alphabets.');
            return;
        } else {
            setNameError('');
        }

        // Validate hobbies field
        if (hobbies.length === 0) {
            setHobbiesError('Please select at least one hobby.');
            return;
        } else {
            setHobbiesError('');
        }

        // Validate gender field
        if (!['Male', 'Female'].includes(gender)) {
            setGenderError('Please select gender.');
            return;
        } else {
            setGenderError('');
        }

        const updatedStudent = {
            id,
            name,
            class: studentClass,
            email,
            hobbies,
            gender
        };

        onUpdateStudent(updatedStudent);
        setShowModal(true); // Show the modal upon successful form submission
    };

    const handleClassChange = (e) => {
        setStudentClass(e.target.value);
    };

    const handleHobbiesChange = (e) => {
        const selectedHobby = e.target.value;
        setHobbies(prevHobbies =>
            prevHobbies.includes(selectedHobby)
                ? prevHobbies.filter(hobby => hobby !== selectedHobby)
                : [...prevHobbies, selectedHobby]
        );
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate('/'); // Redirect to home page or any other route upon closing modal
    };

    return (
        <div className='d-flex vh-80 bg-primary justify-content-center align-items-center myClass'>
            <div className='container w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit} id="myform">
                    <h2 className='text-center'>Update Student</h2>
                    <div className='mb-2'>
                        <label htmlFor='name'><b>Name:</b></label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className={`form-control ${nameError ? 'is-invalid' : ''}`}
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {nameError && <div className='invalid-feedback'>{nameError}</div>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='studentClass'><b>Class:</b></label>
                        <select
                            id='studentClass'
                            className='form-control'
                            value={studentClass}
                            onChange={handleClassChange}
                            required
                        >
                            <option value=''>Select Class</option>
                            <option value='11thScience'>11th Science</option>
                            <option value='11thCommerce'>11th Commerce</option>
                            <option value='12thScience'>12th Science</option>
                            <option value='12thCommerce'>12th Commerce</option>
                            <option value='B.TechIT'>B.Tech IT</option>
                            <option value='B.ECSS'>B.E CSS</option>
                            <option value='B.Com'>B.Com</option>
                            <option value='HotelManagement'>Diploma in Hotel Management</option>
                            <option value='BusinessAdministration'>BBA</option>
                            <option value='ComputerApplications'>BCA</option>
                            <option value='CivilEngineering'>Diploma in Civil Engineering</option>
                            <option value='MechanicalEngineering'>Diploma in Mechanical Engineering</option>
                            <option value='ElectricalEngineering'>Diploma in Electrical Engineering</option>
                            <option value='FashionDesign'>Diploma in Fashion Design</option>
                            <option value='CulinaryArts'>Diploma in Culinary Arts</option>
                            <option value='GraphicDesign'>Diploma in Graphic Design</option>
                            <option value='Pharmacy'>Diploma in Pharmacy</option>
                            <option value='Education'>B.Ed</option>
                            <option value='Nursing'>B.Sc Nursing</option>
                            <option value='Architecture'>B.Arch</option>
                        </select>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'><b>Email:</b></label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            className='form-control'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='mb-2'>
                        <label><b>Hobbies:</b></label>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='reading'
                                value='Reading'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Reading')}
                            />
                            <label className='form-check-label' htmlFor='reading'>Reading</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='writing'
                                value='Writing'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Writing')}
                            />
                            <label className='form-check-label' htmlFor='writing'>Writing</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='driving'
                                value='Driving'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Driving')}
                            />
                            <label className='form-check-label' htmlFor='driving'>Driving</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='swimming'
                                value='Swimming'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Swimming')}
                            />
                            <label className='form-check-label' htmlFor='swimming'>Swimming</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='painting'
                                value='Painting'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Painting')}
                            />
                            <label className='form-check-label' htmlFor='painting'>Painting</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='checkbox'
                                className='form-check-input hobby-checkbox'
                                id='cycling'
                                value='Cycling'
                                onChange={handleHobbiesChange}
                                checked={hobbies.includes('Cycling')}
                            />
                            <label className='form-check-label' htmlFor='cycling'>Cycling</label>
                        </div>
                        {hobbiesError && <div className='invalid-feedback d-block'>{hobbiesError}</div>}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='gender'><b>Gender:</b></label>
                        <div className='form-check'>
                            <input
                                type='radio'
                                className='form-check-input'
                                id='male'
                                name='gender'
                                value='Male'
                                onChange={handleGenderChange}
                                checked={gender === 'Male'}
                                required
                            />
                            <label className='form-check-label' htmlFor='male'>Male</label>
                        </div>
                        <div className='form-check'>
                            <input
                                type='radio'
                                className='form-check-input'
                                id='female'
                                name='gender'
                                value='Female'
                                onChange={handleGenderChange}
                                checked={gender === 'Female'}
                                required
                            />
                            <label className='form-check-label' htmlFor='female'>Female</label>
                        </div>
                        {genderError && <div className='invalid-feedback d-block'>{genderError}</div>}
                    </div>
                    <button type='submit' className='btn btn-success' id='myButton1'>Submit</button>
                    &#160; &#160; &#160; &#160;
                    <button
                        type='button'
                        className='btn btn-danger ms-2'
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                </form>

                {/* Modal */}
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Success</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Student updated successfully!</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* End Modal */}
            </div>
        </div>
    );
}

export default UpdateStudent;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateStudent.css"; // Import your CSS file

function CreateStudent({ onAddStudent }) {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [studentClass, setStudentClass] = useState("");
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState("");
    const [nameError, setNameError] = useState("");
    const [hobbiesError, setHobbiesError] = useState("");
    const [genderError, setGenderError] = useState("");
    const [showModal, setShowModal] = useState(false); // State to control modal visibility

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate name field
        const nameRegex = /^[A-Z][a-zA-Z ]*$/;
        if (!name.match(nameRegex)) {
            setNameError("Name should start with a capital letter and contain only alphabets.");
            return;
        } else {
            setNameError("");
        }

        // Validate hobbies field
        if (hobbies.length === 0) {
            setHobbiesError("Please select at least one hobby.");
            return;
        } else {
            setHobbiesError("");
        }

        // Validate gender field
        if (!["Male", "Female"].includes(gender)) {
            setGenderError("Please select gender.");
            return;
        } else {
            setGenderError("");
        }

        const newStudent = {
            id: Date.now().toString(),
            name,
            class: studentClass,
            email,
            hobbies,
            gender,
        };

        onAddStudent(newStudent);
        setName("");
        setStudentClass("");
        setEmail("");
        setHobbies([]);
        setGender("");
        setNameError("");
        setHobbiesError("");
        setGenderError("");

        // Show the modal upon successful form submission
        setShowModal(true);
    };

    const handleClassChange = (e) => {
        setStudentClass(e.target.value);
    };

    const handleHobbiesChange = (e) => {
        const selectedHobby = e.target.value;
        setHobbies((prevHobbies) =>
            prevHobbies.includes(selectedHobby)
                ? prevHobbies.filter((hobby) => hobby !== selectedHobby)
                : [...prevHobbies, selectedHobby],
        );
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/"); // Redirect to home page or any other route upon closing modal
    };

    return (
        <div className="d-flex vh-105 bg-light justify-content-center align-items-center myClass">
            <div className="container w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit} id="myform">
                    <h2 className="text-center">Add Student</h2>
                    <div className="mb-2">
                        <label htmlFor="name">
                            <b>Name:</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            className={`form-control ${nameError ? "is-invalid" : ""}`}
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {nameError && (
                            <div className="invalid-feedback">{nameError}</div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="studentClass">
                            <b>Class:</b>
                        </label>
                        <select
                            id="studentClass"
                            className="form-control"
                            value={studentClass}
                            onChange={handleClassChange}
                            required
                        >
                            <option value="">Select Class</option>
                            <option value="11thScience">11th Science</option>
                            <option value="11thCommerce">11th Commerce</option>
                            <option value="12thScience">12th Science</option>
                            <option value="12thCommerce">12th Commerce</option>
                            <option value="B.TechIT">B.Tech IT</option>
                            <option value="B.ECSS">B.E CSS</option>
                            <option value="B.Com">B.Com</option>
                            <option value="HotelManagement">Diploma in Hotel Management</option>
                            <option value="BusinessAdministration">BBA</option>
                            <option value="ComputerApplications">BCA</option>
                            <option value="CivilEngineering">Diploma in Civil Engineering</option>
                            <option value="MechanicalEngineering">Diploma in Mechanical Engineering</option>
                            <option value="ElectricalEngineering">Diploma in Electrical Engineering</option>
                            <option value="FashionDesign">Diploma in Fashion Design</option>
                            <option value="CulinaryArts">Diploma in Culinary Arts</option>
                            <option value="GraphicDesign">Diploma in Graphic Design</option>
                            <option value="Pharmacy">Diploma in Pharmacy</option>
                            <option value="Education">B.Ed</option>
                            <option value="Nursing">B.Sc Nursing</option>
                            <option value="Architecture">B.Arch</option>
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">
                            <b>Email:</b>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label>
                            <b>Hobbies:</b>
                        </label>
                        <div className="hobbies-combobox">
                            <div
                                className="combobox-toggle"
                                onClick={() =>
                                    document
                                        .getElementById("hobbiesDropdown")
                                        .classList.toggle("show")
                                }
                            >
                                {hobbies.length === 0 ? (
                                    <span>Select Hobbies</span>
                                ) : (
                                    hobbies.map((hobby, index) => (
                                        <span key={index} className="selected-hobby">
                                            {hobby}
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() =>
                                                    setHobbies((prevHobbies) =>
                                                        prevHobbies.filter(
                                                            (h) => h !== hobby
                                                        )
                                                    )
                                                }
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    ))
                                )}
                            </div>
                            <div id="hobbiesDropdown" className="hobbies-dropdown">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="reading"
                                        value="Reading"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Reading")}
                                    />
                                    <label className="form-check-label" htmlFor="reading">
                                        Reading
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="writing"
                                        value="Writing"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Writing")}
                                    />
                                    <label className="form-check-label" htmlFor="writing">
                                        Writing
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="driving"
                                        value="Driving"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Driving")}
                                    />
                                    <label className="form-check-label" htmlFor="driving">
                                        Driving
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="swimming"
                                        value="Swimming"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Swimming")}
                                    />
                                    <label className="form-check-label" htmlFor="swimming">
                                        Swimming
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="painting"
                                        value="Painting"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Painting")}
                                    />
                                    <label className="form-check-label" htmlFor="painting">
                                        Painting
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="cycling"
                                        value="Cycling"
                                        onChange={handleHobbiesChange}
                                        checked={hobbies.includes("Cycling")}
                                    />
                                    <label className="form-check-label" htmlFor="cycling">
                                        Cycling
                                    </label>
                                </div>
                            </div>
                            {hobbiesError && (
                                <div className="invalid-feedback d-block">
                                    {hobbiesError}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender">
                            <b>Gender:</b>
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="male"
                                name="gender"
                                value="Male"
                                onChange={handleGenderChange}
                                checked={gender === "Male"}
                                required
                            />
                            <label className="form-check-label" htmlFor="male">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                id="female"
                                name="gender"
                                value="Female"
                                onChange={handleGenderChange}
                                checked={gender === "Female"}
                                required
                            />
                            <label className="form-check-label" htmlFor="female">
                                Female
                            </label>
                        </div>
                        {genderError && (
                            <div className="invalid-feedback d-block">
                                {genderError}
                            </div>
                        )}
                    </div>

                    <div className="two-btn container">
                        <button
                            type="button"
                            className="btn btn-danger" id="myButton1"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success" id="myButton2"
                        >
                            Submit
                        </button>
                    </div>
                </form>

                {/* Modal */}
                {showModal && (
                    <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "orange" }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">AWF Page Says..</h5>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <p>Student added successfully!</p>
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

export default CreateStudent;

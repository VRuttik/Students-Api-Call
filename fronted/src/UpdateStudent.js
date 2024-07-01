import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateStudent.css"; // Import your CSS file

const hobbiesOptions = [
    "Reading",
    "Writing",
    "Driving",
    "Swimming",
    "Painting",
    "Cycling",
];

function UpdateStudent({ students, onUpdateStudent }) {
    const { id } = useParams();
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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (Array.isArray(students)) {
            const student = students.find((s) => s.id === id);
            if (student) {
                setName(student.name);
                setStudentClass(student.class);
                setEmail(student.email);
                setHobbies(student.hobbies || []);
                setGender(student.gender || "");
            }
        }
    }, [id, students]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate name field
        const nameRegex = /^[A-Z][a-zA-Z ]*$/;
        if (!name.match(nameRegex)) {
            setNameError(
                "Name should start with a capital letter and contain only alphabets.",
            );
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

        const updatedStudent = {
            id,
            name,
            class: studentClass,
            email,
            hobbies,
            gender,
        };

        onUpdateStudent(updatedStudent);
        setShowModal(true); // Show the modal upon successful form submission
    };

    const handleClassChange = (e) => {
        setStudentClass(e.target.value);
    };

    const handleHobbiesChange = (hobby) => {
        setHobbies((prevHobbies) =>
            prevHobbies.includes(hobby)
                ? prevHobbies.filter((h) => h !== hobby)
                : [...prevHobbies, hobby],
        );
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/"); // Redirect to home page or any other route upon closing modal
    };

    const handleCancel = () => {
        navigate("/"); // Navigate to the desired route on cancel
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="d-flex vh-80 bg-light justify-content-center align-items-center myClass">
            <div className="container w-50 bg-white rounded p-3" style={{border: "4px solid #ffc102"}}>
                <form onSubmit={handleSubmit} id="myform">
                    <h2 className="text-center">Update Student</h2>
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
                            <option value="HotelManagement">
                                Diploma in Hotel Management
                            </option>
                            <option value="BusinessAdministration">BBA</option>
                            <option value="ComputerApplications">BCA</option>
                            <option value="CivilEngineering">
                                Diploma in Civil Engineering
                            </option>
                            <option value="MechanicalEngineering">
                                Diploma in Mechanical Engineering
                            </option>
                            <option value="ElectricalEngineering">
                                Diploma in Electrical Engineering
                            </option>
                            <option value="FashionDesign">
                                Diploma in Fashion Design
                            </option>
                            <option value="CulinaryArts">
                                Diploma in Culinary Arts
                            </option>
                            <option value="GraphicDesign">
                                Diploma in Graphic Design
                            </option>
                            <option value="Pharmacy">
                                Diploma in Pharmacy
                            </option>
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
                        <div className="form-control combobox-container">
                            <div
                                className="combobox-toggle"
                                onClick={toggleDropdown}
                            >
                                {hobbies.length === 0
                                    ? "Select Hobbies"
                                    : hobbies.map((hobby, index) => (
                                          <span
                                              key={index}
                                              className="selected-hobby"
                                          >
                                              {hobby}
                                              <button
                                                  type="button"
                                                  className="btn-close"
                                                  aria-label="Close"
                                                  onClick={() =>
                                                      handleHobbiesChange(hobby)
                                                  }
                                              />
                                          </span>
                                      ))}
                                <i
                                    className={`bi bi-chevron-down ${dropdownOpen ? "open" : ""}`}
                                />
                            </div>
                            {dropdownOpen && (
                                <div className="combobox-options">
                                    {hobbiesOptions.map((hobby) => (
                                        <div className="form-check" key={hobby}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input hobby-checkbox"
                                                id={hobby}
                                                value={hobby}
                                                onChange={() =>
                                                    handleHobbiesChange(hobby)
                                                }
                                                checked={hobbies.includes(
                                                    hobby,
                                                )}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor={hobby}
                                            >
                                                {hobby}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {hobbiesError && (
                            <div className="invalid-feedback d-block">
                                {hobbiesError}
                            </div>
                        )}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender">
                            <b>Gender:</b>
                        </label>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="gender"
                                value="Male"
                                checked={gender === "Male"}
                                onChange={handleGenderChange}
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
                                name="gender"
                                value="Female"
                                checked={gender === "Female"}
                                onChange={handleGenderChange}
                                required
                            />
                            <label
                                className="form-check-label"
                                htmlFor="female"
                            >
                                Female
                            </label>
                        </div>
                        {genderError && (
                            <div className="invalid-feedback d-block">
                                {genderError}
                            </div>
                        )}
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                        &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                        <button type="submit" className="btn btn-success">
                            Submit
                        </button>
                    </div>
                </form>

                {/* Modal */}
                {showModal && (
                    <div
                        className="modal"
                        tabIndex="-1"
                        role="dialog"
                        style={{ display: "block" }}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content modal-content">
                                <div className="modal-header" style={{backgroundColor: "#ffd71b"}}>
                                    <h5 className="modal-title" style={{color: "white"}}>
                                        AWF Page Say...
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Student updated successfully!</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
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

import React from 'react'



function CreateStudent() {

    return (
        <div className='d-flex vh-100 bg-primary justify-cotent-center align-items-center'>
            <div className=' container w-50 bg-white rounded p-3'>
                <form>
                    <h2>Add Student</h2>

                    <div className='mb-2'>
                        <label htmlFor=''>Name</label>
                        <input type='text' placeholder='Enter Name' className='form-control'/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Class</label>
                        <input type='email' placeholder='Enter Email' className='form-control'/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Hobbies</label>
                        <input type='hobbies' placeholder='Enter Hobbies' className='form-control'/>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Gender</label>
                        <input type='gender' placeholder='Enter Gender' className='form-control'/>
                    </div>

                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateStudent;
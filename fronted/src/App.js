import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Student from './components/Student';
import CreateStudent from './components/CreateStudent';
import UpdateStudent from './components/UpdateStudent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Student />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/update/:id' element={<UpdateStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/LoginRegister';
import Home from './Components/Home'; // Create this Home component separately
import IncomePage from './Components/IncomePage';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/IncomePage" element={<IncomePage/>} />
                
            </Routes>
        </Router>
    );
};

export default App;

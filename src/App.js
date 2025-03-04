import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/LoginRegister';
import Home from './Components/Home'; // Create this Home component separately
import Reports from './Components/Reports';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/reports" element={<Reports />} />
                
            </Routes>
        </Router>
    );
};

export default App;

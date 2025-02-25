import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Expenses from "./Components/Expenses";
import Profit from "./Components/Profit";
import Income from "./Components/Income";
import SuperAdmin from "./Components/SuperAdmin";
import Login from "./Components/Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/profit" element={<Profit />} />
        <Route path="/income" element={<Income />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

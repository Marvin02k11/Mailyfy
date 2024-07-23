import './App.css';
import AllMail from './components/AllMail';
import MailBox from './components/MailBox';
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/home" element={<MailBox />} />
    <Route path="/allmail" element={<AllMail />} />
    </Routes>
    {/* <MailBox/>
    <AllMail/> */}
    

    </>
    
  );
}

export default App;

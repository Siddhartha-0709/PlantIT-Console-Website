import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './screens/Upload'
import Home from './screens/Home';
import { SignUpTwo } from './screens/Signup';
import BlogUpload from './screens/BlogUpload';
import Orders from './screens/Orders';
import Dashboard from './screens/Dashboard';
import Contact from './screens/Contact';
import './index.css';
import Privacy from './screens/Privacy';
import ContactUs from './screens/ContactUs';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signup"  element={<SignUpTwo />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/blogupload" element={<BlogUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/touch" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

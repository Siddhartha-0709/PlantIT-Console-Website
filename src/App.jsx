import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './screens/Upload'
import Home from './screens/Home';
import { SignUpTwo } from './screens/Signup';
import BlogUpload from './screens/BlogUpload';
import Orders from './screens/Orders';
import Dashboard from './screens/Dashboard';
import Contact from './screens/Contact';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/signup" index element={<SignUpTwo />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/blogupload" element={<BlogUpload />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

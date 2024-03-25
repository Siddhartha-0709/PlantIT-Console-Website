import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from './screens/Upload'
import Home from './screens/Home';
import { SignUpTwo } from './screens/Signup';
import BlogUpload from './screens/BlogUpload';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpTwo />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/blogUpload" element={<BlogUpload />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

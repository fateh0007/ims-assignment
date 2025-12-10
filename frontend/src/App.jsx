import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CourseDetail from './pages/CourseDetail';
import LMS from './pages/LMS';
import AdminUpload from './pages/AdminUpload';

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:slug" element={<CourseDetail />} />
        <Route path="/course/:slug/lms" element={<LMS />} />
        <Route path="/admin/upload" element={<AdminUpload />} />
      </Routes>
    </BrowserRouter>
  )
}

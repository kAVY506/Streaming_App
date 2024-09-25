import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import VideoUpload from './components/VideoUpload';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/upload" element={<VideoUpload />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/video/:id" element={<VideoPlayer />} /> {/* Directly render VideoPlayer */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

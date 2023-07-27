import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponent from './Components/FormComponent';
import DisplayComponent from './Components/DisplayComponent.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormComponent />} />
        <Route path="/display" element={<DisplayComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
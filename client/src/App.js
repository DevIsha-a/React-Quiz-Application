import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Batches from "./batches/Batches";
import Subjects from "./subjects/subjects"
import Exams from "./exams/teacher/exams";
import AddExam from "./exams/teacher/addExam";
import SelectExam from "./exams/student/SelectExam";
import  AttemptExam from "./exams/student/attempExam"
import './App.css'
import { ToastContainer } from "react-toastify";
import { Signup } from "./Signup/Signup";
import { SignIn } from "./SignIn/Signin";
import Protected from "./protected";
import Header from "./Navbar/Header";
function App() {
  return (
    <div  className="App">
      
        <BrowserRouter>
        <Header></Header>
        <Routes>
          
        <Route path="/" element={<Protected Component= {Batches}/>}></Route>
        <Route path="/signup" element={<Protected Component= {Signup}/>}></Route>
         <Route path="/signin"   element={<Protected Component= {SignIn}/>}></Route>
           <Route path="/:batch"  element={<Protected Component= {Subjects}/>}></Route>
           <Route path="/:batch/:sub/quiz"   element={<Protected Component= {Exams}/>}></Route>
           <Route path="/:batch/:sub/:exam/add" element={<Protected Component= {AddExam}/> }></Route>
           <Route path="/:batch/:sub/quizes"element={<Protected Component= {SelectExam}/> }></Route>
           <Route path="/:batch/:sub/quizes/:chapter" element={<Protected Component= {AttemptExam}/> }> </Route>
         </Routes>
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;

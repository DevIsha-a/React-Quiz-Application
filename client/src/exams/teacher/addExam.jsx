import React, { useState, useRef } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import "./addExam.css" ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddExam = () => {
    const [question, setquestion] = useState('')
    const [exam, setexam] = useState([])
  // const exam = useSelector(state => state.exam)
  const [id, setId]= useState()
const activeSub= useSelector(state=>state.activeSub)
const [inputs, setInputs] = useState([]);

const [correctans, setcorrectans] = useState('')
const ref1= useRef()
const ref2= useRef()
const ref3= useRef()
const ref4= useRef()
const ref5= useRef()
const ref6= useRef()
const handleInputChange = (event, index) => {
  const newInputs = [...inputs];
  newInputs[index] = event.target.value;
  setInputs(newInputs);
};

  async function savequiz(e) {

    showToast()
  e.preventDefault()
  setexam([...exam, {quest:question, options: inputs, correct_ans:correctans}])
  console.log(exam)
  if (exam.length===4){
    mytoast()
  let resp= await axios.post ('/saveQuiz', {
    ex_id: id,
    sub_name: activeSub,
    exam:exam,
  
  
  }
  )
}

 
  
  
  }
  function mytoast(){
    toast.success('quiz added !', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
  });
  
  }
function showToast(){

// ref1.current.focus()
ref1.current.value='';
ref2.current.value='';
ref3.current.value='';
ref4.current.value='';
ref5.current.value='';
ref6.current.value='';
setInputs([])
setquestion('')
}

  return (
    <div className="wrapper">
      <form >

      <div>
        <input  id="question" ref={ref1} type="text" value={question} placeholder='Question' onChange={(e) =>setquestion(e.target.value)} />
      </div>
      <input
      placeholder="option1"
      ref={ref2}
        type="text"
        value={inputs[0]}
        onChange={(event) => handleInputChange(event, 0)}
      />
      <input
     ref={ref3}
        placeholder="option2"
        type="text"
        value={inputs[1]}
        onChange={(event) => handleInputChange(event, 1)}
      />
      <input
        placeholder="option3"
        ref={ref4}
        type="text"
        value={inputs[2]}
        onChange={(event) => handleInputChange(event, 2)}
      />
      <input
        placeholder="option4"
        ref={ref5}
        type="text"
        value={inputs[3]}
        onChange={(event) => handleInputChange(event, 3)}
      />
       <input

        placeholder="correct answer"
        ref={ref6}
        type="text"
        onChange={(e) => setcorrectans(e.target.value)}
      />
      <button type='submit' id="btn-save" onClick={(e)=>{savequiz(e)}}>Save  quiz</button> 
      </form>
      
      {/* <button onClick={() => setInputs([])}>Clear Inputs</button> */}
      <ToastContainer></ToastContainer>
         
    </div>

  )
}

export default AddExam
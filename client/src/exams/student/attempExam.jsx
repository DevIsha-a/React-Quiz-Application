import axios from 'axios'
import { func } from 'joi'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './attempt.css'

import '../teacher/exams.css'
import { render } from 'react-dom'
const AttemptExam = (props) => {
  const [corr, setcorr] = useState(false)
  const [last, setLast] = useState(false)
  const [first, setFirst] = useState(true)
  const [index, setIndex] = useState(0)
  const [allexams, setallexams] = useState([])
  const [eindex, seteindex] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setanswers] = useState([])
  const [result, setResult] = useState(0)
  const [showR, setshowR] = useState(false)
  const [qno, setqno] = useState(1)



  const currBatch = useSelector(state => state.activeBatch)
  const sub = useSelector(state => state.activeSub)
  const currbatch = useSelector(state => state.currBatch)
  const stu_id= useSelector(state=> state._id)
  const nav = useNavigate()
const dispatch= useDispatch()
  const exams = useSelector(state => state.exam)
const e_id= useSelector(state=>state.curr_e_id)
// console.log(e_id)
// console.log(allexams[eindex]._id)


  const l = exams[eindex].Question.length
  useEffect(() => {
    setallexams(exams)
  }, [exams])
  const radioButtons = document.querySelectorAll(".check");
  radioButtons.forEach(button => {
    button.checked = false;
  });
  function Inc() {
    setqno(qno + 1)
    setSubmitted(false)
    if (index === exams[eindex].Question.length) {
      setshowR(true)
    }
    if (index === exams[eindex].Question.length - 1) {
      setLast(true)
      return

    }
    else
      setIndex(index + 1)
  }
  function dec() {
    //   if(index===0)
    // {
    //   setFirst(true)
    //   setLast(false)

    // }
    // else
    //     setIndex(index - 1)
    //     setFirst(false)
    //     setLast(false)
    //   setcorr(false)

  }
  function saveAnswer(opt, ind) {
    answers.push(opt)
    setSubmitted(true)
    if (allexams[eindex].Question[index].correct_ans === opt) {
      setResult(result + 1)
    }
  }
  function submitQuiz() {
let e= allexams[eindex].ex_id
    setshowR(true)
    setanswers([])
    setSubmitted(false)
    dispatch({
      type:"submitQ",
      payload: {e, result, l, }
    })
    // console.log(answers, e, result, l)
    let jwt =localStorage.getItem('jwt');
    let resp= axios.post('/saveAnswers',{sub, e_id, result, l, stu_id, headers:{
      Authorization:jwt
    }})


  }
  function goback() {
    nav("/" + localStorage.getItem('batch') + "/" + sub + "/quizes")

  }

  return (<>
    <div>
      <h3 id='quiz-heading'> {sub} Quiz</h3>
      {/* <h5>Question# 1/{allexams[index].Question.length}</h5> */}

      {!showR && allexams.length > 0 ? <div div className="container mt-sm-5 my-1">
       
        <h3> Question# {qno}</h3>
        <div id='quest' className="py-2 h5"><h2>{allexams[eindex].Question[index].quest}</h2>
          {allexams[eindex].Question[index].options.map(opt => {
            return <div key={opt._id} className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
              {
                <div className={`options opt-container`}>

                  <input type='radio' name='radio' onClick={() => { saveAnswer(opt, index) }} className="check"></input>
                  <label className='options'>{opt}</label>
                </div>


              }
            </div>
//  ${(submitted && allexams[eindex].Question[index].correct_ans === opt) ? "green" : (submitted && opt === answers[index]) ? "yellow" : submitted ? "red" : null}

          })}


        </div>

      </div> : null}


      {!currBatch ? <p>No batch selected</p> : null}
      {currBatch && allexams.length <= 0 ? <p> No quizes found! ☹</p> : null}
      {!showR && currBatch ? <div className=" btn-container  " >
        <button disabled className="btn btn-success" onClick={() => { dec() }}>Previous</button>
        <button disabled={last} className="btn btn-success" onClick={() => { Inc() }}>Next</button>
      </div> : null}
      {!showR && last ? <button onClick={() => { submitQuiz() }} className='btn btn-success'> Submit Quiz </button> : null}

    </div>

    {showR ? <div className="result">
      <h2 className='result'>Your Final Points are : {result}/{qno}</h2>
      <button className='btn btn-success' onClick={() => { goback() }}>Back to subject </button>
    </div> : null}

  </>
  )
}

export default AttemptExam;
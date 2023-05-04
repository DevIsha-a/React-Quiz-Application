import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './exams.css'
const Exams = (props) => {
  const [corr, setcorr] = useState(false)
  const [index, setIndex] = useState(0)
  const [allexams, setallexams] = useState([])
  const [eindex, seteindex]= useState(0)

  const currBatch = useSelector(state => state.activeBatch)
  const sub = useSelector(state => state.activeSub)
  const nav = useNavigate()

  const exams = useSelector(state => state.exam)
  useEffect(() => {
    setallexams(exams)

  }, [exams])
  if (allexams.length > 0) {
    console.log(allexams[index].Question)
    console.log(allexams[index].sub_name)
    allexams[index].Question.map(q => {
      console.log(q.quest)
    })
  }
  function addQuiz() {
    nav("/" + currBatch + "/" + sub + "/quiz/add")
  }
  function Inc() {
    seteindex(index+1)
    if (index === exams.length - 1) {
      alert('no more quizes')
      return

    }
    else
      setIndex(index + 1)
    setcorr(false)
  }
  function dec() {
    if (index == 0) {
      alert('This is the first quiz')

      return
    }
    else
      setIndex(index - 1)
    setcorr(false)

  }
  function showcorrect() {
    setcorr(!corr)
  }

  return (<>
    <div>
      <h3 id='quiz-heading'> {sub} Quiz</h3>
      {allexams.length>0? allexams.map((e, i)=> {return<div> <button className='chapter'>Chapter {i+1} Quiz</button></div>}): <p> No quizes found! ☹</p>}

      {allexams.length > 0 ? allexams[index].Question.map(q => {
        return <div className="container mt-sm-5 my-1">
        <div id='quest' className="py-2 h5"><h4>{q.quest}</h4></div>
          <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
            {
              q.options.map(opt=>{
                return(
              <div className='opt-container'>
                <input className='check' type="radio" name="radio" />
                <span className='options'>{opt}</span>
              </div>

                )
              })
            }
          </div>
          <div className=" btn-container  " >
            <button className="btn btn-success" onClick={showcorrect}> {!corr ? <>Unhide answer</> : <>hide answer</>}</button>
          </div>
          {
            corr ? <p className='options'>{q.correct_ans}</p> : null
          }
        </div>
        



      }) : <p> No quizes found! ☹</p>}
      {/* 
       {allexams.length ? <div className="container mt-sm-5 my-1">
        <div className="question ml-sm-5 pl-sm-5 pt-2">
          <div id='quest' className="py-2 h5"><h4>{allexams[index].Question.quest}</h4></div>
          <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
            {
              allexams[index].Question.options.map((opt) => {
                return (
                  <div className='opt-container'>
                    <input className='check' type="radio" name="radio" />
                    <span className='options'>{opt}</span>
                  </div>

                )
              })
            }

          </div>
          <div className=" btn-container  " >
            <button className="btn btn-success" onClick={() => { dec() }}>Previous</button>
            <button className="btn btn-success" onClick={showcorrect}> {!corr ? <>Unhide answer</> : <>hide answer</>}</button>
            <button className="btn btn-success" onClick={() => { Inc() }}>Next</button>
          </div>
          {
            corr ? <p className='options'>{allexams[index].correct_ans}</p> : null
          }

        </div>   */}

      {/* </div> : */}
     { !currBatch ? <p>No batch selected</p> : null}
     {currBatch?  <div className=" btn-container  " >
            <button className="btn btn-success" onClick={() => { dec() }}>Previous</button>
            <button className="btn btn-success" onClick={() => { Inc() }}>Next</button>
          </div>:null }
    
      {currBatch ? <button className='btn-add' onClick={() => { addQuiz() }}>+</button> : null} 


    </div>


  </>
  )
}

export default Exams;
// {exams.length>0?exams.map(exam=>{return(<><h1>{exam.question}</h1>
// {exam.options.map(opt=> <li>{opt} </li>)}
//   </> ) }): <h2>No quized found</h2>}
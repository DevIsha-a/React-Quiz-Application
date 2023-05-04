import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./select.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import '../teacher/exams.css'
// import exam from '../../../../server/models/exam'
const SelectExam = (props) => {
  const [corr, setcorr] = useState(false)
  const [index, setIndex] = useState(0)
  const [allexams, setallexams] = useState([])
  const [att, setatt] = useState([])
  const [results, setresults] = useState([])
  const [fet_results, setFetchR] = useState([])
  const fr = useSelector(state => state.fet_results)
  // console.log(fr)
  const type = useSelector(state => state.type)
  const currBatch = useSelector(state => state.activeBatch)
  const sub = useSelector(state => state.activeSub)
  const nav = useNavigate()

  useEffect(() => { setFetchR(fr) }, [fr])
  const stu_id = useSelector(state => state._id)
  const exams = useSelector(state => state.exam)
  const attempted_q = useSelector(state => state.attempted_q)
  const res = useSelector(state => state.results)
  useEffect(() => {
    setallexams(exams)

  }, [exams])
  useEffect(() => {
    setatt(attempted_q)
  }, [attempted_q])

  useEffect(() => {
    setresults(res)
    
  }, [res])
console.log(fet_results)
  const dispatch = useDispatch()
  function selectEx(i, e) {
    // console.log(e)
    let c = "/" + i
    nav("/" +localStorage.getItem('batch') + "/" + sub + "/quizes" + c)
    dispatch({
      type: 'showCurrentExam',
      payload: e
    })
  }
  function addQuiz() {
    nav("/" + localStorage.getItem('batch')  + "/" + sub + "/quiz/add")
  }
  // fet_results.map((r, i)=>{
  //   // console.log(r._id)

  // })
  // allexams.map(e=>{
  //   console.log(e)
  // })
  return (<>
    <div className='main'>
      <h3 id='quiz-heading'> {sub} Quiz</h3>
      {/* disabled={att.map(r=> r.ex_id===e.ex_id)} */}
      <div className='single-main'>
        {allexams.length > 0 ? allexams.map((ex, i) => {
          return <div key={ex._id} className='inner'> <button  className='chapter' onClick={(e) => { selectEx(i + 1, ex._id) }}>Chapter {i + 1} Quiz </button>

            {
              fet_results.map((r, i) => {
                if (
                  (r.ex_id === ex._id)) { return <span className='r'>{r.obt_marks}/{r.total_marks}</span> }
                 
              })
            }
          </div>
        }) : <p> No quizes found! ☹</p>}


      </div>

      {type === 'staff' ? <button onClick={() => { addQuiz() }} className='btn-add'>+</button> : null}
    </div>

    <Link className='back' to={`/${sub}`}> go back</Link>


  </>
  )
}

export default SelectExam;
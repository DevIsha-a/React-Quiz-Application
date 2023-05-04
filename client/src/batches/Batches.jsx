import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Subjects from '../subjects/subjects';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App.css'
import './batch.css'
export const Batches = () => {
  const nav = useNavigate()
  const [batches, setBatches] = useState([]);
  const [fetchedSub, setFetchedSub] = useState([])
  const [currbatch, setCurrent] = useState()
  const [bExist, setB] = useState(false)

  let jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()
  useEffect(() => {

    async function abc() {
      const resp = await axios.get('/batches', {
        headers: {
          Authorization: jwt
        }
      })
      let data = await resp.data;
      dispatch({
        type: "fetchBatches",
        payload: data
      })

    }
    abc()


  }, [])
  const allBatches = useSelector(state => state.batches)
  const FetchSubjects = async (batch) => {
    setCurrent(batch);
    const resp = await axios.post('/subjects', { batch },{ headers: {
      Authorization: jwt
    }})
    let data = await resp.data;
  setFetchedSub(data)

  nav(batch)
  dispatch({
    type: 'showSubjects',
    payload: { data, batch }
  })

}

return (
  <div className='batch-container'>
    <select id='b' onChange={(e) => FetchSubjects(e.target.value)}>
      <option > Select a field</option>
      {
        allBatches.length > 0 ? allBatches.map(batch => {
          return (<option key={batch._id} >{batch.title}  </option>)
        }) : null
      }

    </select>

  </div>
)
}

export default Batches;

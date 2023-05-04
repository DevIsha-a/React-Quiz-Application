import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify'
import '../App.css'
import "./subject.css"
function Subjects(props) {
    const inputRef = useRef()
    const [curr, setcurr] = useState([])
    const [add, setAdd] = useState(false)
    const [batch, setb_name] = useState()
    const [sub, setSub] = useState('')
    const [currSubs, setcurrSubs] = useState([])
    const [esubs, setesub] = useState([])


    let ssubs = useSelector(state => state.subjects)
    const type = useSelector(state => state.type)
    const enr_subs = useSelector(state => state.enr_subs)

    const fr = useSelector(state => state.fet_results)
    const stu_id = useSelector(state => state._id)
    useEffect(() => {
        let s = localStorage.getItem('subjects')

        setcurrSubs(JSON.parse(s));
    }, []);
    useEffect(() => {
        setesub(enr_subs)
    }, [enr_subs])
    const currbatch = localStorage.getItem("batch")
    // useSelector(state => state.activeBatch)

    const nav = useNavigate()
    const AddSubject = async () => {
        let jwt = localStorage.getItem('jwt')
        inputRef.current.value = '';
        let resp = await axios.post('/subjects/add', { b_name: currbatch, title: sub }, {
            headers: {
                Authorization: jwt
            }
        })

        showToast()
        //    setItems([...items, newItem]);
        setcurrSubs([...currSubs, { b_name: currbatch, title: sub }])
    }
    function showToast() {
        toast.success('Subject added !', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000
        });

    }
    function showEnrolledToast() {
        toast.success('Subject enrolled !', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000
        });

    }
    const dispatch = useDispatch()
    async function fetchExam(sub) {
        let jwt = localStorage.getItem('jwt')
        let resp = await axios.post('/fetchExams', { sub: sub, stu_id }, {
            headers: {
                Authorization: jwt
            }
        })
        let data = await resp.data.quiz;
        let results = await resp.data.results
        // console.log(data)
        // console.log(results)
        dispatch({
            type: "SHOWEXAM",
            payload: { data, sub, results }
        })
        nav("/" + currbatch + "/" + sub + "/quizes")

    }
    function showAdd() {
        setAdd(!add)

    }
    function enroll(sub) {
        if (enr_subs.length >= 3) {
            toast.warn('You can only enroll in 3 subjects!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            });
            return

        }
        else {

            showEnrolledToast()
            dispatch({
                type: "enroll",
                payload: sub.title
            })
        }
    }
    function editSubject(){

    }
    function deleteSubject(){
        
    }

    return (
        <div>
            {!currbatch.length ? <p> No batch selected yet.</p> : <> <h1> This batch has following subjects: </h1>
                <p>Note: click on the subject to see more relatede quizes </p></>}
            
            {currSubs.length <= 0 && currbatch.length ? <p> Sorry, this batch has no current subjects.</p> : currSubs.map(sub => {
                return <Container>
                    
                    <Row xs={1} md={2} className="g-4">
                        <Card key={sub._id} style={{}} >

                            <Card.Body >
                                <Row>
                                    {type === 'staff' ? <Col ><h2 onClick={(e) => { fetchExam(sub.title) }}> {sub.title}</h2></Col>
                                        : <Col ><h2 disabled={!esubs.includes(sub.title)} onClick={(e) => { fetchExam(sub.title) }}> {sub.title}</h2> 
                                         </Col>}
                                    
                                    {type === 'student'? <Col> <Button style={{ width: '131px', padding: '6px' }} variant='primary' disabled={esubs.includes(sub.title)} onClick={() => enroll(sub)}> {esubs.includes(sub.title) ? "enrolled" : "enroll now"} </Button></Col>
                                        : null}
                                </Row>
                            </Card.Body>
                        </Card></Row>
                </Container>
            })}


            {type === 'staff' && currbatch ? <button className='btn-add' onClick={() => { showAdd() }}>+</button> : null}

            {add ? <div className='sub-inp'><input ref={inputRef} placeholder='subjectname' onChange={(e) => setSub(e.target.value)} />
                <button type='button' className='sav-sub' onClick={() => { AddSubject() }}>save subject</button></div> : null

            }


            <ToastContainer></ToastContainer>

        </div>
    )
}


export default Subjects
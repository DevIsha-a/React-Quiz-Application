import { useReducer } from "react";
import { createStore } from "redux";
import axios from "axios";
const initialState = {
    activeBatch: '',
    subjects: [],
    activeSub: '',
    exam: [],
    batches: [],
    user: '',
    type: 'student',
    enr_subs:[],
    attempted_q:[],
    _id:'',
    fet_results:[],
    curr_e_id:'',
    results:[{
        ex_id:'',
        obt:'',
        total:''
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'Login': {
            return {
                ...state,
                user: action.payload.name,
                type: action.payload.type,
                _id:action.payload._id
            }

        }
        case 'Logout':{
            return {
                ...state,
                user:'',
                type:'',
                results:[]

            }
        }

        case 'showSubjects':
            {
                localStorage.setItem("batch", action.payload.batch)
                localStorage.setItem("subjects", JSON.stringify (action.payload.data))
                console.log(action.payload.data)
                return {
                    ...state,
                    subjects: action.payload.data,
                    activeBatch: action.payload.batch

                }
            }
        case "SHOWEXAM": {
            // console.log(action.payload.results)
            localStorage.setItem('exam', action.payload.sub)
            localStorage.setItem('fet_results' , action.payload.results)
            return {
                ...state,
                exam: action.payload.data,
                activeSub: action.payload.sub,
                fet_results: action.payload.results

            }
        }
        case "fetchBatches": {
            return {
                ...state,
                batches: action.payload
            }
        }
        case "enroll":{
            return{
                ...state,
                enr_subs:[...state.enr_subs, action.payload]
            }

        }
        case 'showCurrentExam':{
            return{
                ...state,
                curr_e_id: action.payload
            }

        }
        case "submitQ":{
            return{
                ...state,
                attempted_q:[...state.attempted_q,action.payload.e],
                results:[...state.results, { 
                ex_id:action.payload.e,
                obt:action.payload.result,
                total:action.payload.l}]
            }
            

        }
        default:
            return state;

    }





}

export const store = createStore(reducer)
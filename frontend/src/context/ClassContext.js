import { useContext, useReducer, createContext } from "react";
import ClassReducer from "../reducer/ClassReducer"
import axios from 'axios';

const ClassContext = createContext();

const initialState = {
    isClassLoading: false,
    isSubjectLoading: false,
    //Error
    isClassError: false,
    classErrorMsg: "",
    //Succes
    isSuccess: false,
    classSuccessMsg: "",
    //Data
    ownClasses: [],
    otherClasses: [],
    //Single Class Data
    singleClass: {},
    allSubjects: [],
    allTeachers: [],
    admin: false,
    name: "",
    role: ""
}

const ClassProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassReducer, initialState);

    //GET ALL CLASSES
    const getClasses = async (url) => {
        dispatch({ type: "FALSE_SUCCESS" });
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            const classes = resp.data;
            dispatch({ type: "MY_CLASSES", payload: classes });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }

    //ADD CLASS
    const addClass = async (url, body) => {
        dispatch({ type: "FALSE_SUCCESS" });
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch({ type: "CLASS_ADDED" });
            dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    }

    //Join Institute
    const joinInsitute = async (url, body) => {
        dispatch({ type: "FALSE_SUCCESS" });
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            dispatch({ type: "JOIN INSTITUTE" });
            dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message });
        }
    }

    // GET SINGLE CLASS 
    const getSingleClass = async (url) => {
        dispatch({ type: "FALSE_SUCCESS" });
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            console.log(resp);
            dispatch({ type: "SINGLE_CLASS", payload: resp.data });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response?.data.message })
        }
    }

    //CREATE SUBJECT
    const createSubject = async (url, body) => {
        dispatch({ type: "FALSE_SUCCESS" });
        try {
            const resp = await axios.post(url, JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            console.log(resp);
            dispatch({ type: "SUBJECT_CREATED" });
            dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    }

    //GET ALL SUBJECTS
    const getSubjects = async (url) => {
        dispatch({ type: "FALSE_SUCCESS" });
        dispatch({ type: "SET_SUBJECT_LOADING" });
        try {
            const resp = await axios.get(url);
            dispatch({ type: "SUBJECTS", payload: resp.data.subjects });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    }

    //GET ALL TEACHERS
    const getTeachers = async (url) => {
        dispatch({ type: "FALSE_SUCCESS" });
        dispatch({ type: "SET_SUBJECT_LOADING" });
        try {
            const resp = await axios.get(url);
            dispatch({ type: "TEACHERS", payload: resp.data.teachers });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }

    //ADD OTHER TEACHERS TO CLASS
    const addTeacherToClass = async (url, body) => {
        dispatch({ type: "FALSE_SUCCESS" });
        try {
            console.log(body);
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(resp);
            dispatch({ type: "TEACHER_ADDED", payload: resp });
            dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            console.log(error)
            dispatch({ type: "API_ERROR", payload: error })
            // return 
        }


    }



    return <ClassContext.Provider value={{ ...state, getClasses, addClass, getSingleClass, joinInsitute, createSubject, getSubjects, getTeachers, addTeacherToClass }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

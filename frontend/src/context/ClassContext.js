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
    teacherarray: [],
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
        // dispatch({ type: "FALSE_SUCCESS" });
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
        // dispatch({ type: "FALSE_SUCCESS" });
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch({ type: "CLASS_ADDED" });
            return false;
            // dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
            return error.response.data.message;
        }
    }

    //Join Institute
    const joinInsitute = async (url, body) => {
        // dispatch({ type: "FALSE_SUCCESS" });
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            dispatch({ type: "JOIN INSTITUTE" });
            return false;
            // dispatch({ type: "TRUE_SUCCESS", payload: resp.data.message });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message });
            return error.response.data.message;
        }
    }

    // GET SINGLE CLASS 
    const getSingleClass = async (url) => {
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
        try {
            const resp = await axios.post(url, JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            console.log(resp);
            dispatch({ type: "SUBJECT_CREATED" });
            return false;
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
            return error.response.data.message;
        }
    }

    //GET ALL CLASS SUBJECTS
    const getClassSubjects = async (url) => {
        dispatch({ type: "SET_SUBJECT_LOADING" });
        try {
            const resp = await axios.get(url);
            dispatch({ type: "SUBJECTS", payload: resp.data.subjects });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    }

    //GET ALL CLASS TEACHERS
    const getAllClassTeachers = async (url) => {
        dispatch({ type: "SET_SUBJECT_LOADING" });
        console.log(url);
        try {
            const resp = await axios.get(url);
            console.log(resp);
            dispatch({ type: "ALL_CLASS_TEACHERS", payload: resp.data.teachers });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    };



    //ADD OTHER TEACHERS TO CLASS
    const addTeacherToClass = async (url, body) => {
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
            return false;
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message });
            return error.response.data.message;
        }


    }



    return <ClassContext.Provider value={{ ...state, getClasses, addClass, getSingleClass, joinInsitute, createSubject, getClassSubjects, addTeacherToClass, getAllClassTeachers }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

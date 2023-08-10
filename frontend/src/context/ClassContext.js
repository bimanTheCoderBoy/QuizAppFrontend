import { useContext, useReducer, createContext } from "react";
import ClassReducer from "../reducer/ClassReducer"
import axios from 'axios';

const ClassContext = createContext();

const classroom = {
    name: "batchY",
    students: [{ name: "jyoti" }, { name: "aluu1" }, { name: "aluu2" }, { name: "aluu3" }, { name: "aluu4" }, { name: "aluu5" }, { name: "aluu6" }],
    teachers: [{ name: "jyoti" }, { name: "aluu" }],
    quizes: [{ name: "Science Quiz" }, { name: "Maths Quiz" }]
}

const initialState = {
    isClassLoading: false,
    isSubjectLoading: false,
    isClassError: false,
    classErrorMsg: "",
    classSuccesMsg: "",
    ownClasses: [],
    otherClasses: [],
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
        dispatch({ type: "SET_LOADING" });
        try {
            console.log("C");
            const resp = await axios.get(url);
            const classes = resp.data;
            console.log("c2");
            console.log(classes);
            dispatch({ type: "MY_CLASSES", payload: classes });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }

    //ADD CLASS
    const addClass = async (url, body) => {
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch({ type: "CLASS_ADDED" });
            return 1;
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message })
        }
    }

    //Join Institute
    const joinInsitute = async (url, body) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            // console.log(resp);
            dispatch({ type: "JOIN INSTITUTE" });
        } catch (error) {
            console.log("checkkkkkk");
            dispatch({ type: "API_ERROR", payload: error.response.data.message });
        }
    }

    // GET SINGLE CLASS 
    const getSingleClass = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            console.log(resp.data.classData);
            dispatch({ type: "SINGLE_CLASS", payload: resp.data.classData });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }

    //CREATE SUBJECT
    const createSubject = async (url, body) => {
        dispatch({ type: "SET_SUBJECT_LOADING" });
        try {
            const resp = await axios.post(url, JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            dispatch({ type: "SUBJECT_CREATED", payload: resp.data.success });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }

    //GET ALL SUBJECTS
    const getSubjects = async (url) => {
        dispatch({ type: "SET_SUBJECT_LOADING" });
        try {
            const resp = await axios.get(url);
            dispatch({ type: "SUBJECTS", payload: resp.data.subjects });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }


    //GET ALL TEACHERS
    const getTeachers = async (url) => {
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
        dispatch({ type: "SET_LOADING" });
        try {
            console.log(body);
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log("dad");
            console.log(resp)
            dispatch({ type: "TEACHER_ADDED", payload: resp });
        } catch (error) {
            console.log(error)
            dispatch({ type: "API_ERROR", payload: error })
        }


    }

    const getError = async (value) => {
        // console.log(state);
        if (value) {
            console.log(state);
            return state.classErrorMsg;
        }
        return false;
    }


    return <ClassContext.Provider value={{ ...state, getClasses, addClass, getSingleClass, joinInsitute, createSubject, getSubjects, getTeachers, addTeacherToClass, getError }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

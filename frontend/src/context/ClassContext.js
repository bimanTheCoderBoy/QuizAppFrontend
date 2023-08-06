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
    isClassError: 0,
    classErrorMsg: "",
    ownClasses: [],
    otherClasses: [],
    singleClass: {},
    admin: false,
    name: "",
    role: ""
}

const ClassProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassReducer, initialState);

    //GET ALL CLASSES
    const getClasses = async (url) => {
        console.log("check 1");
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
        console.log("check 1");
        console.log(body);
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            console.log(resp);
            dispatch({ type: "JOIN INSTITUTE" });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error.response.data.message });
        }
    }

    // GET SINGLE CLASS 
    const getSingleClass = async (url) => {
        dispatch({ type: "SET_LOADING" });
        console.log(url);
        try {
            const resp = await axios.get(url);
            console.log(resp.data.classData);
            dispatch({ type: "SINGLE_CLASS", payload: resp.data.classData });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }

    return <ClassContext.Provider value={{ ...state, getClasses, addClass, getSingleClass, joinInsitute }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

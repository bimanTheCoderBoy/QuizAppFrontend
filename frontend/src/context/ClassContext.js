import { useContext, useReducer, createContext } from "react";
import ClassReducer from "../reducer/ClassReducer"
import axios from 'axios';

const ClassContext = createContext();

const classroom = {
    name: "batchY",
    students: [{ name: "jyoti" }, { name: "aluu1" }, { name: "aluu2" }, { name: "aluu3" }, { name: "aluu4" }, { name: "aluu5" }, { name: "aluu6" }],
    teachers: [{ name: "jyoti" }, { name: "aluu" }]
}

const initialState = {
    isClassLoading: false,
    isClassError: 0,
    classErrorMsg: "",
    ownClasses: [],
    otherClasses: [],
    singleClass: {}
}

const ClassProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ClassReducer, initialState);
    //GET ALL CLASSES
    const getClasses = async (url) => {
        console.log("check 1");
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            const classes = resp.data;
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

    // GET SINGLE CLASS 
    const getSingleClass = async (url, body) => {
        dispatch({ type: "SET_LOADING" });
        console.log("acl");
        try {
            // const resp = await axios.get(url);
            dispatch({ type: "SINGLE_CLASS", payload: classroom });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error })
        }
    }

    return <ClassContext.Provider value={{ ...state, getClasses, addClass, getSingleClass }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

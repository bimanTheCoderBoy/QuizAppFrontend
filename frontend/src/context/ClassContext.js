import { useContext, useReducer, createContext } from "react";
import ClassReducer from "../reducer/ClassReducer"
import axios from 'axios';

const ClassContext = createContext();

const check = {
    ownClasses:
        [{ name: "cse1", subject: "science" },
        { name: "cse2", subject: "humanities" },
        { name: "cse3", subject: "science" },
        { name: "csbs", subject: "maths" },
        { name: "batch-x", subject: "eco" },
        { name: "csbs", subject: "maths" },
        { name: "batch-x", subject: "eco" },
        { name: "csbs", subject: "maths" },
        { name: "batch-x", subject: "eco" },
        { name: "batch-y", subject: "maths" },
        ],
    otherClasses: [{ name: "csbs", subject: "maths" },
    { name: "batch-x", subject: "eco" },
    { name: "csbs", subject: "maths" },
    { name: "batch-x", subject: "eco" },
    { name: "batch-y", subject: "maths" },]

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
    //GET CLASSES
    const getClasses = async (url) => {
        console.log("check 1");
        dispatch({ type: "SET_LOADING" });
        try {
            // const resp = await axios.get(url);
            // const classes = resp.data;
            // console.log()
            dispatch({ type: "MY_CLASSES", payload: check });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }

    return <ClassContext.Provider value={{ ...state, getClasses }}>
        {children}
    </ClassContext.Provider>

}

const useClassContext = () => {
    return useContext(ClassContext);
}

export { ClassProvider, ClassContext, useClassContext };

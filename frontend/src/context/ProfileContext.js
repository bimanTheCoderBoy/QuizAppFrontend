import { createContext, isValidElement, useContext, useReducer } from "react";
import ProfileReducer from "../reducer/ProfileReducer";
import axios, { isAxiosError } from 'axios';

const ProfileContext = createContext();

const initialState = {
    isLoading: false,
    isError: false,
    errorMsg: "",
    isLogin: false,
    profile: {},
    userId: ""
}

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    // GET PROFILE 
    const getProfile = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            const profile = resp.data;
            console.log(profile);
            dispatch({ type: "MY_PROFILE", payload: profile });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }


    // LOGIN API 
    const userLogin = async (url, body) => {
        try {
            const resp = await axios.post(url,
                JSON.stringify({}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(resp);
            dispatch({ type: "LOGIN_SUCCESS", payload: resp });
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: error })
        }
    }

    // REGISTRATION API 
    const userRegistration = async (url, body) => {
        try {
            const resp = await axios.post(url,
                JSON.stringify({}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(resp);
            dispatch({ type: "LOGIN_SUCCESS", payload: resp });
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: error })
        }
    }


    return <ProfileContext.Provider value={{ ...state, getProfile, userLogin }}>
        {children}
    </ProfileContext.Provider>

}


// custom hooks
const useProfileContext = () => {
    return useContext(ProfileContext);
}


export { ProfileProvider, ProfileContext, useProfileContext };
import { createContext, isValidElement, useContext, useReducer } from "react";
import ProfileReducer from "../reducer/ProfileReducer";
import axios from 'axios';

const ProfileContext = createContext();

// isError = 0 = nothing
// isError = 1 = true
// isError = 2 = false

const initialState = {
    isLoading: false,
    isError: 0,
    errorMsg: "",
    isLogin: 0,
    profile: {}
}

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProfileReducer, initialState);

    //IS LOGIN
    const checkLogin = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const resp = await axios.get(url);
            const profileLogin = resp.data;
            // console.log(profileLogin);
            if (profileLogin.success) {
                dispatch({ type: "MY_PROFILE", payload: { name: "jyoti" } });
            }
            else {
                dispatch({ type: "API_ERROR", payload: profileLogin.message });
            }
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }

    // GET PROFILE 
    const getProfile = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            // const resp = await axios.get(url);
            // const profile = resp.data;
            // console.log(profile);
            dispatch({ type: "MY_PROFILE", payload: { name: "aluu" } });
        } catch (error) {
            dispatch({ type: "API_ERROR", payload: error });
        }
    }


    // LOGIN API 
    const userLogin = async (url, body) => {
        try {
            const resp = await axios.post(url,
                JSON.stringify(body),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(resp);
            dispatch({ type: "LOGIN_SUCCESS" });
        } catch (error) {
            dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message })
        }
    }

    // REGISTRATION API 
    const userRegistration = async (url, { name, email, password, role }) => {
        try {
            console.log({ name, email, password, role });
            const resp = await axios.post(url,
                JSON.stringify({
                    name, email, password, role
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(resp);
            dispatch({ type: "LOGIN_SUCCESS" });
        } catch (error) {

            dispatch({ type: "LOGIN_ERROR", payload: error.response.data.message })
        }
    }

    // LOGOUT
    const userLogout = async (url) => {
        try {
            const resp = await axios.delete(url,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            dispatch({ type: "LOGOUT_SUCCESS" });
        } catch (error) {
            dispatch({ type: "LOGOUT_ERROR", payload: error.response.data.message })
        }

    }

    return <ProfileContext.Provider value={{ ...state, getProfile, userLogin, userRegistration, checkLogin, userLogout }}>
        {children}
    </ProfileContext.Provider>

}


// custom hooks
const useProfileContext = () => {
    return useContext(ProfileContext);
}


export { ProfileProvider, ProfileContext, useProfileContext };
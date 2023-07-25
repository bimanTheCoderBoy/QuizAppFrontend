import { createContext, useContext, useReducer } from "react";
import ProfileReducer from "../reducer/ProfileReducer";
import axios from 'axios';

const ProfileContext = createContext();

const initialStage = {
    isLoading: false,
    isError: false,
    isLogin: false,
    profile: {},
    userId: ""
}

const ProfileProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ProfileReducer, initialStage);

    const getProfile = async (url) => {
        dispatch({ type: "SET_LOADING" });
        try {
            const
        } catch (error) {
            dispatch({ type: "API_ERROR" })
        }
    }
}

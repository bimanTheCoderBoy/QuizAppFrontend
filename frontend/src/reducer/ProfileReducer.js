const ProfileReducer = (state, action) => {

    // GET PROFILE 
    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isLoading: true
        }
    }
    else if (action.type === "MY_PROFILE") {
        return {
            ...state,
            isLoading: false,
            profile: action.payload
        }
    }
    else if (action.type === "API_ERROR") {
        return {
            ...state,
            isLoading: false,
            isError: true,
            errorMsg: action.payload,
        }
    }


    //LOGIN
    else if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
            isLogin: true,
            userId: action.payload,
        }
    }
    else if (action.type === "LOGIN_ERROR") {
        return {
            ...state,
            isError: true,
            errorMsg: action.payload,
        }
    }

    else {
        return {
            ...state,
        }
    }
}

export default ProfileReducer;
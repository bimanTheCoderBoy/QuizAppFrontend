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
            isLogin: true,
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
        console.log("check");
        return {
            ...state,
            isLogin: true
        }
    }
    else if (action.type === "LOGIN_ERROR") {
        console.log("error check");
        return {
            ...state,
            isError: true,
            errorMsg: action.payload,
        }
    }

    //LOGOUT
    else if (action.type === "LOGOUT_SUCCESS") {
        return {
            ...state,
            isLogin: false,
        }
    }

    else {
        return {
            ...state,
        }
    }


}

export default ProfileReducer;
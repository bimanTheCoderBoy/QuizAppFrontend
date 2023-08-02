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
            // isError: 1,
            isLogin: false,
            errorMsg: action.payload,
        }
    }


    //LOGIN
    else if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
            isError: 2,
            // isLogin: true,
        }
    }
    else if (action.type === "LOGIN_ERROR") {
        console.log(action.payload);
        return {
            ...state,
            isError: 1,
            errorMsg: action.payload,
        }
    }

    //LOGOUT
    else if (action.type === "LOGOUT_SUCCESS") {
        return {
            ...state,
            isLogin: false,
            isError: 0
        }
    }

    else if (action.type === "LOGOUT_ERROR") {
        return {
            ...state,
            isError: 1,
            errorMsg: action.payload
        }
    }

    else {
        return {
            ...state,
        }
    }


}

export default ProfileReducer;
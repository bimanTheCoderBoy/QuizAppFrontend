const ProfileReducer = (state, action) => {

    // GET PROFILE 
    if (action.type === "SET_LOADING") {

        return {
            ...state,
            isError: 0,
            isLoading: true,
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
            isError: 1,
            isLogin: false,
            errorMsg: action.payload,
        }
    }

    else if (action.type === "MY_TEACHERS") {
        return {
            ...state,
            myTeachers: action.payload,
        }
    }

    //IS LOGIN
    else if (action.type === "LOGGED_IN") {
        return {
            ...state,
            isLogin: true
        }
    }

    //LOGIN
    else if (action.type === "LOGIN_SUCCESS") {
        return {
            ...state,
            isError: 2,
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
            isError: 0,
            errorMsg: "",
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
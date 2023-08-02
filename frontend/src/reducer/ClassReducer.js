const ClassReducer = (state, action) => {

    //GET ALL CLASSES
    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isClassLoading: true
        }
    }
    else if (action.type === "MY_CLASSES") {
        return {
            ...state,
            isClassLoading: false,
            ownClasses: action.payload.ownClasses,
            otherClasses: action.payload.otherClasses,
            // ownClasses: action.payload
        }
    }
    else if (action.type === "API_ERROR") {
        return {
            ...state,
            isLoading: false,
            classErrorMsg: action.payload,
        }
    }

    else {
        return {
            ...state,
        }
    }

}

export default ClassReducer;
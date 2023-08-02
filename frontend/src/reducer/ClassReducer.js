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
            isClassLoading: false,
            classErrorMsg: action.payload,
        }
    }

    //CLASS ADDED
    else if (action.type === "CLASS_ADDED") {
        return {
            ...state,
            isClassLoading: false
        }
    }

    else {
        return {
            ...state,
        }
    }

}

export default ClassReducer;
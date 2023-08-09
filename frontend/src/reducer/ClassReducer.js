const ClassReducer = (state, action) => {

    //GET ALL CLASSES
    if (action.type === "SET_LOADING") {
        console.log("ss");
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
            name: action.payload.userName,
            role: action.payload.role
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

    //JOIN INSTITUTE
    else if (action.type === "JOIN INSTITUTE") {
        return {
            ...state,
        }
    }

    //GET SINGLE CLASS
    else if (action.type === "SINGLE_CLASS") {
        console.log("S");
        console.log(action.payload);
        return {
            ...state,
            isClassLoading: false,
            singleClass: action.payload,
        }
    }

    //SUBJECT TEACHER LOADING
    else if (action.type === 'SET_SUBJECT_LOADING') {
        return {
            ...state,
            isSubjectLoading: true,
        };
    }

    //ADD SUBJECTS
    else if (action.type === "ADD_SUBJECTS") {
        return {
            ...state,
            isSubjectLoading: false,
        }
    }


    //GET SUBJECTS
    else if (action.type === "SUBJECTS") {
        console.log("sssss");
        return {
            ...state,
            isSubjectLoading: false,
            allSubjects: action.payload
        }
    }

    //GET TEACHERS
    else if (action.type === "TEACHERS") {
        console.log("check");
        return {
            ...state,
            isSubjectLoading: false,
            allTeachers: action.payload
        }
    }

    //ADDING TEACHERS TO CLASS
    else if (action.type === "TEACHER_ADDED") {
        return {
            ...state,
            isSubjectLoading: false,
        }
    }
    else {
        return {
            ...state,
        }
    }

}

export default ClassReducer;
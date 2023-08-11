const ClassReducer = (state, action) => {


    //GET ALL CLASSES
    if (action.type === "SET_LOADING") {
        return {
            ...state,
            isClassLoading: true,
            isClassError: false
        }
    }

    else if (action.type === "MY_CLASSES") {
        return {
            ...state,
            isClassLoading: false,
            ownClasses: action.payload.ownClasses,
            otherClasses: action.payload.otherClasses,
            name: action.payload.userName,
            role: action.payload.role
        }
    }
    else if (action.type === "API_ERROR") {
        return {
            ...state,
            isClassLoading: false,
            isClassError: true,
            classErrorMsg: action.payload,
        }
    }

    //CLASS ADDED
    else if (action.type === "CLASS_ADDED") {
        return {
            ...state,
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
        return {
            ...state,
            isClassLoading: false,
            singleClass: action.payload.classData,
            admin: action.payload.isAdmin,
        }
    }

    //SUBJECT TEACHER LOADING
    else if (action.type === 'SET_SUBJECT_LOADING') {
        return {
            ...state,
            isSubjectLoading: true,
            isClassError: false,
        };
    }

    //ADD SUBJECTS
    else if (action.type === "SUBJECT_CREATED") {
        return {
            ...state,
        }
    }


    //GET SUBJECTS
    else if (action.type === "SUBJECTS") {
        return {
            ...state,
            isSubjectLoading: false,
            allSubjects: action.payload
        }
    }

    //GET TEACHERS UNDER ME
    else if (action.type === "TEACHERS_UNDER_ME") {
        return {
            ...state,
            isSubjectLoading: false,
            myTeachers: action.payload
        }
    }

    //ADDING TEACHERS TO CLASS
    else if (action.type === "TEACHER_ADDED") {
        return {
            ...state,
            isClassLoading: false,
        }
    }

    //SET SUCCESS FALSE
    else if (action.type === "FALSE_SUCCESS") {
        console.log("falseeeeee ho jaaaaa");
        return {
            ...state,
            isSuccess: false,
            classSuccessMsg: ""
        }
    }

    //SET SUCCESS TRUE
    else if (action.type === "TRUE_SUCCESS") {
        console.log("sdssssssssssssssssssssssssssssssssssssssssssssssssssssssssss");
        return {
            ...state,
            isSuccess: true,
            classSuccessMsg: action.payload,
        };
    }


    else {
        return {
            ...state,
        }
    }

}

export default ClassReducer;
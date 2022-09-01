import { REGISTRATION_FAIL,LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST,
        REGISTRATION_REQUEST, REGISTRATION_SUCCESS, LOGOUT,SEARCH_REQUEST, 
        SEARCH_FAIL, SEARCH_SUCCESS,  GET_FAVOURITE_REQUEST, GET_FAVOURITE_SUCCESS, GET_FAVOURITE_FAIL,
        ADD_FAVOURITE_REQUEST, ADD_FAVOURITE_SUCCESS,  ADD_FAVOURITE_FAIL, 
        GET_FAVOURITES_REQUEST, GET_FAVOURITES_SUCCESS, GET_FAVOURITES_FAIL,
        REMOVE_FAVOURITE_REQUEST, REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_FAIL, USER_LOADED } from "../../constants"

const reducer = (state, action) =>{
    switch(action.type){
            case REGISTRATION_REQUEST:
            case LOGIN_REQUEST:
                case SEARCH_REQUEST:
                case GET_FAVOURITE_REQUEST:
                case ADD_FAVOURITE_REQUEST:
                case REMOVE_FAVOURITE_REQUEST:
                case GET_FAVOURITES_REQUEST:
                return{
                    ...state,
                    loading:true
                }
            
           case REGISTRATION_SUCCESS:
           case LOGIN_SUCCESS:
           localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                user:action.payload
            } 

            case LOGOUT:
            case LOGIN_FAIL:
            case REGISTRATION_FAIL:
            localStorage.removeItem("token")
                return{
                    ...state,
                    token:null,
                    isAuthenticated: null,
                    loading: false,
                    
                }
            case SEARCH_SUCCESS:
                console.log(action.payload)
                return{
                    ...state,
                    searchedWord: action.payload
                }
            case SEARCH_FAIL:
                return{
                    ...state,
                    searchedWord: null
                }


            case GET_FAVOURITE_SUCCESS:
                    return{
                        ...state,
                        getfavourite: action.payload
                    }
            case GET_FAVOURITE_FAIL:
                    return{
                        ...state,
                        getfavourite: null
                     }


            case GET_FAVOURITES_SUCCESS:
                    return{
                            ...state,
                            getfavourites: action.payload
                        }
            case GET_FAVOURITES_FAIL:
                    return{
                            ...state,
                            getfavourites: null
                        }


            case ADD_FAVOURITE_SUCCESS:
                     return{
                                ...state,
                                addfavourite: action.payload
                        }
            case ADD_FAVOURITE_FAIL:
                    return{
                                ...state,
                                addfavourite: null
                        }
            case REMOVE_FAVOURITE_SUCCESS:
                    return{
                            ...state,
                            getfavourites: state.getfavourites.filter(x => x.id !== action.payload)
                         }
            case REMOVE_FAVOURITE_FAIL:
                    return{
                            ...state,
                             getfavourites: null
                        }
            case USER_LOADED :
                return{
            ...state,
            isAuthenticated: true,
            loading:false,
            user: action.payload
        }

        default: return state
    }
}

export default reducer
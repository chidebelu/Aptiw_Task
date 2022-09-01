    import React, {useReducer} from "react"
    import AuthReducer from "./authReducer"
    import AuthContext from "./authContext"
    import { REGISTRATION_FAIL,LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, REGISTRATION_REQUEST, 
             REGISTRATION_SUCCESS, LOGOUT, AUTH_ERROR, USER_LOADED, SEARCH_REQUEST, SEARCH_FAIL, 
             SEARCH_SUCCESS, GET_FAVOURITE_REQUEST, GET_FAVOURITE_SUCCESS, GET_FAVOURITE_FAIL,
             ADD_FAVOURITE_REQUEST, ADD_FAVOURITE_SUCCESS,  ADD_FAVOURITE_FAIL, 
             GET_FAVOURITES_REQUEST, GET_FAVOURITES_SUCCESS, GET_FAVOURITES_FAIL,
             REMOVE_FAVOURITE_REQUEST, REMOVE_FAVOURITE_SUCCESS, REMOVE_FAVOURITE_FAIL} from "../../constants"
    import axios from "axios"
    import setAuthToken from "../../utils/setAuthToken"


const AuthState = props =>{
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: false,
        loading: false,
        user : {},
        searchedWord: [],
        getfavourite:{},
        getfavourites: {},
        addfavourite:{}
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const loaduser = async()=>{
        if(localStorage.token){
            setAuthToken(localStorage.token)
            try{
                const response = await axios.get("/profile")
                dispatch({
                    type: USER_LOADED,
                    payload: response.data
                })
            }
            catch(err){
                dispatch({
                    type: AUTH_ERROR
                })
            }
        }
    }
    
    const signup = async (user) =>{
        
        dispatch({
            type: REGISTRATION_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try{
            const response = await axios.post("/register", user , config)
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: response.data
            })
        //   loaduser()
        }
        catch(err){
            dispatch({
                type: REGISTRATION_FAIL,
                payload: err.response && err.response.data.message
                ? err.response.data.message
                : err.message
            })
        }
    }

    const login = async(user) =>{
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }

        }
        try{
            const response = await axios.post("/login", user, config)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            })

            // loaduser()
           
        }
        catch(err){
            dispatch({
                type: LOGIN_FAIL,
                payload: err.resposne && err.response.data.message
                ? err.response.data.message
                : err.message
            })
        }
    }

        const logout = () =>{
            dispatch({
                type: LOGOUT
            })
        }

    const searchWord = async (word) =>{
        dispatch({
            type: SEARCH_REQUEST,
        })
        const config = {
            headers:{
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await axios.get(`/search?word=${word}`, config)
            
            dispatch({
                type: SEARCH_SUCCESS,
                payload: response.data
            })
        
        } catch (err) {
            dispatch({
                type: SEARCH_FAIL,
                payload: err.resposne && err.response.data.message
                ? err.response.data.message
                : err.message
            })
            }
        } 

        const getFavourite = async (word) =>{
            dispatch({
                type: GET_FAVOURITE_REQUEST,
            })
            const config = {
                headers:{
                    "Content-Type": "application/json"
                }
            }
    
            try {
                const response = await axios.get(`/get-favorite/:${word}`, config)
                dispatch({
                    type: GET_FAVOURITE_SUCCESS,
                    payload: response.data
                })
            
            } catch (err) {
                dispatch({
                    type: GET_FAVOURITE_FAIL,
                    payload: err.resposne && err.response.data.message
                    ? err.response.data.message
                    : err.message
                })
                }
            } 


            const addFavourite = async (word) =>{
                dispatch({
                    type: ADD_FAVOURITE_REQUEST,
                })
                const config = {
                    headers:{
                        "Content-Type": "application/json"
                    }
                }
        
                try {
                    const response = await axios.post(`/add-favorite`, {word}, config)
                    dispatch({
                        type: ADD_FAVOURITE_SUCCESS,
                        payload: response.data
                    })
                
                } catch (err) {
                    dispatch({
                        type: ADD_FAVOURITE_FAIL,
                        payload: err.resposne && err.response.data.message
                        ? err.response.data.message
                        : err.message
            
                    })
                    }
                } 


                const getFavourites = async () =>{
                    dispatch({
                        type: GET_FAVOURITES_REQUEST,
                    })
                    const config = {
                        headers:{
                            "Content-Type": "application/json"
                        }
                    }
            
                    try {
                        const response = await axios.get(`/get-favorites`,  config)
                        dispatch({
                            type: GET_FAVOURITES_SUCCESS,
                            payload: response.data
                        })
                    
                    } catch (err) {
                        dispatch({
                            type: GET_FAVOURITES_FAIL,
                            payload: err.resposne && err.response.data.message
                            ? err.response.data.message
                            : err.message
                
                        })
                        }
                    }

                    const removeFavourite = async (id) =>{
                        
                        dispatch({
                            type: REMOVE_FAVOURITE_REQUEST,
                        })
                        const config = {
                            headers:{
                                "Content-Type": "application/json"
                            }
                        }
                
                        try {
                           await axios.delete(`/remove-favorite/:${id}`, config)
                            dispatch({
                                type: REMOVE_FAVOURITE_SUCCESS,
                                payload: id
                            })
                        
                        } catch (err) {
                            dispatch({
                                type: REMOVE_FAVOURITE_FAIL,
                                payload: err.resposne && err.response.data.message
                                ? err.response.data.message
                                : err.message
                    
                            })
                            }
                        }


    return <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        searchedWord: state.searchedWord,
        getfavourites: state.getfavourites,
        getfavourite: state.getfavourite,
        addfavourite: state.addfavourite,
        signup,
        login,
        loaduser,
        logout,
        searchWord,
        getFavourite,
        addFavourite,
        getFavourites,
        removeFavourite
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthState
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"

export const login = (email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const headers = {
            'Content-Type': 'application/json'
        }

        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers,
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (data.message) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: data.message
            })
        } else {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password) => async dispatch => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const headers = {
            'Content-Type': 'application/json'
        }

        const res = await fetch('/api/users', {
            method: 'POST',
            headers,
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        if (data.message) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.message
            })
        } else if (data.error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
        }

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }

        const res = await fetch(`/api/users/${id}`, {
            method: 'GET',
            headers,
        })

        const data = await res.json()

        if (data.message) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: data.message
            })
        } else if (data.error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })
        }
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }

        const res = await fetch(`/api/users/profile`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(user)
        })

        const data = await res.json()

        if (data.message) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: data.message
            })
        } else if (data.error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))
        }
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const userUpdateProfileReset = () => async (dispatch) => {
    dispatch({ type: USER_UPDATE_PROFILE_RESET })
}
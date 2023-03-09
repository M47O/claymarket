import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_SUCCESS } from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }

        const res = await fetch(`/api/orders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(order)
        })

        const data = await res.json()

        if (data.error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })

        }
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const headers = {
            Authorization: `Bearer ${userInfo.token}`
        }

        const res = await fetch(`/api/orders/${id}`, { headers })

        const data = await res.json()

        if (data.error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: data
            })

        }
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }

        const res = await fetch(`/api/orders/${id}/pay`, {
            method: 'POST',
            headers,
            body: JSON.stringify(paymentResult)
        })

        const data = await res.json()

        if (data.error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: data.error
            })
        } else {
            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload: data
            })

        }
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
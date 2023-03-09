import { PayPalButtons } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector, } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails } from '../actions/orderActions'


function OrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay

    if (!loading) {
        //Calculate prices
        const addDecimals = num => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }


    useEffect(() => {
        const addPayPalScript = async () => {
            const res = await fetch('/api/config/paypal')
            const clientId = await res.json()

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }



        if (!order || order._id !== params.id || successPay) {
            dispatch(getOrderDetails(params.id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, params.id, order, successPay])


    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <><h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant='success'>Delivered at {order.isDelivered}</Message> : <Message variant='danger'>Not Yet Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt} </Message> : <Message variant='danger'>Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message>
                            : <ListGroup variant='flush'>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButtons></PayPalButtons>
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row></>


}

export default OrderScreen
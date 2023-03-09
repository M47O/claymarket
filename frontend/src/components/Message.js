import { Alert } from 'react-bootstrap'

const Message = (props) => {
    return (
        <Alert variant={props.variant}>
            {props.children}
        </Alert>
    )
}

Message.defaultProps = {
    //blue color
    variant: 'info'
}

export default Message
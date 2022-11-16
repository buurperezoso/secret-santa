import { FC } from 'react';
import { Field } from 'formik';
import { Col, Form } from 'react-bootstrap';
import InvalidFeedback from './InvalidFeedback';

const HostForm: FC = () => {
    return (
        <Form.Group className='row'>
            <Col sm={4} className="mb-3 mb-sm-0">
                <Form.Label>Host Name</Form.Label>
                <Field className="form-control" name="hostName" type="text" />
                <InvalidFeedback name="hostName" />
            </Col>
            <Col sm={4}>
                <Form.Label>Host Email</Form.Label>
                <Field className="form-control" name="hostEmail" type="email" />
                <InvalidFeedback name="hostEmail" />

            </Col>
            <Col sm={4} className="d-flex align-items-center mb-3 mb-sm-0">
                <Form.Text muted>
                    This person is a participant too.
                </Form.Text>
            </Col>
        </Form.Group>
    )
}

export default HostForm;
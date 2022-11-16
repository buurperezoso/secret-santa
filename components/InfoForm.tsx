import { FC } from 'react';
import { Field } from 'formik';
import { Col, Form, InputGroup } from 'react-bootstrap';
import InvalidFeedback from './InvalidFeedback';

const InfoForm: FC = () => {
    const { Label, Group } = Form;

    const getActualDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    };

    return (
        <Group className='row mb-3'>
            <Col sm={4} className="mb-3 mb-sm-0">
                <Label>Date</Label>
                <Field className="form-control" name="date" type="date" min={getActualDate()} />
                <InvalidFeedback name="date" />
            </Col>
            <Col sm={4} className="mb-3 mb-sm-0">
                <Label>Location</Label>
                <Field className="form-control" name="location" type="text" />
                <InvalidFeedback name="location" />
            </Col>
            <Col sm={4} className="mb-3 mb-sm-0">
                <Label>Amount to spend</Label>
                <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Field className="form-control" name="amount" type="number" />
                </InputGroup>
                <InvalidFeedback name="amount" />
            </Col>
        </Group>
    )
}

export default InfoForm;
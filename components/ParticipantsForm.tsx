import { FieldArray, useFormikContext, Field } from 'formik';
import { FC } from 'react';
import { Col, Row, Button, CloseButton, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { EventForm } from '../interfaces/EventForm';
import InvalidFeedback from './InvalidFeedback';
import styles from '../styles/_ParticipantsForm.module.css';

const ParticipantsForm: FC = () => {
    const { values } = useFormikContext<EventForm>();
    return (
        <>
            <div className='mt-3'>
                <Form.Label>Participants</Form.Label>
            </div>
            <FieldArray name="participants">
                {({ remove, push }) => (
                    <div>
                        {values.participants.length > 0 &&
                            values.participants.map((_participant, index) => (
                                <div key={index} className="d-flex d-sm-block mb-3">
                                    <Row>
                                        <Col sm={4} className="mb-3 mb-sm-0">
                                            <Field
                                                className="form-control"
                                                name={`participants.${index}.name`}
                                                type="text"
                                                placeholder="Name"
                                            />
                                            <InvalidFeedback name={`participants.${index}.name`} />
                                        </Col>
                                        <Col sm={4} className="mb-3 mb-sm-0">
                                            <Field
                                                className="form-control"
                                                name={`participants.${index}.email`}
                                                type="text"
                                                placeholder="Email"
                                            />
                                            <InvalidFeedback name={`participants.${index}.email`} />
                                        </Col>
                                        <Col sm={4} className="d-none d-sm-block">
                                            <CloseButton className={`mt-2 ${styles['remove-button']}`} onClick={() => remove(index)} />
                                        </Col>
                                    </Row>
                                    <div className="d-block d-sm-none ms-2">
                                        <CloseButton className={`mt-2 ${styles['remove-button']}`} onClick={() => remove(index)} />
                                    </div>
                                </div>
                            ))}
                        <Button
                            variant="success"
                            type="button"
                            onClick={() => push({
                                id: nanoid(),
                                name: '',
                                email: '',
                                assignee: ''
                            })}
                        >
                            Add Friend
                        </Button>
                    </div>
                )}
            </FieldArray>
        </>
    )
}

export default ParticipantsForm;
import { FC, useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Button, Col, Form as BoostrapForm, Row } from 'react-bootstrap';
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { EventForm } from '../interfaces/EventForm';
import { HostForm, ParticipantsForm, InfoForm } from './';
import { useHttpRequest } from '../hooks';
import { Method } from '../interfaces/HttpMethods';
import { Routes } from '../constants/routes';

const CreateEventForm: FC = () => {
    const { Label } = BoostrapForm;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { invoke, response } = useHttpRequest();

    const initialValues: EventForm = {
        id: nanoid(),
        date: '',
        location: '',
        amount: '',
        hostName: '',
        hostEmail: '',
        participants: [
            {
                id: nanoid(),
                name: '',
                email: '',
                assignee: ''
            },
        ],
        message: ''
    }

    const CreateEventFormSchema = Yup.object().shape({
        date: Yup.string().required('Required'),
        location: Yup.string().required('Required'),
        amount: Yup.number().required('Required'),
        hostName: Yup.string().required('Required'),
        hostEmail: Yup.string().email('Invalid email').required('Required'),
        participants: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email').required('Required'),
            })
        ),
        message: Yup.string()
    });

    const onSubmit = async (values: EventForm) => {
        setIsLoading(true);
        await invoke({ method: Method.POST, route: Routes.createEvent, body: values });
        setIsLoading(false);
    }

    useEffect(() => {
        if (response) {
            const { eventId } = response;
            router.push({
                pathname: `participants-list/${eventId}`,
            });

        }
    }, [response])

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={CreateEventFormSchema}
            onSubmit={onSubmit}
        >
            {({ values }) => (
                <Form>
                    <InfoForm />
                    <HostForm />
                    <ParticipantsForm />
                    <Row className='mt-3'>
                        <Col>
                            <Label>Add a personal message</Label>
                            <Field className="form-control" name="message" as="textarea" />
                        </Col>
                    </Row>
                    <Button
                        type='submit'
                        variant='danger'
                        className='mt-3'
                        disabled={values.participants.length === 0 || isLoading}
                    >
                        Create your event!
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default CreateEventForm;
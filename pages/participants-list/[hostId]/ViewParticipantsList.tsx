import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Layout } from "../../../components";
import { Routes } from "../../../constants/routes";
import { useHttpRequest } from "../../../hooks";
import { Method } from "../../../interfaces/HttpMethods";
import { Participant } from "../../../interfaces/ParticipantsForm";
import styles from '../../../styles/_ViewParticipantsList.module.css';

const ViewParticipantsList = () => {
    const router = useRouter();
    const { hostId } = router.query
    const { invoke, response } = useHttpRequest();

    useEffect(() => {
        if (hostId) {
            invoke({ method: Method.GET, route: Routes.getParticipantsList + `?hostId=${hostId}` });
        }
    }, [hostId]);

    useEffect(() => {
        if (response) {
            console.log("response", response);
        }
    }, [response]);

    return (
        <Layout>
            <>
                <h2 className={styles['capitalized-name']}>Hi {response?.hostName}</h2>
                <p>Here's the list of the participants of your next event!</p>
                <p>Date: {response?.date && new Date(response?.date).toLocaleDateString()}</p>
                <p>Location: {response?.location}</p>
                <div>
                    <h3>Participants</h3>
                    <Table striped bordered >
                        <tbody>
                            {
                                (response?.participants ?? []).map(({ name, id }: Participant) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>Name: <span className={styles['capitalized-name']}>{name}</span></td>
                                                <td><Link
                                                    target="_blank"
                                                    href={{
                                                        pathname: '/[hostId]/participant/[participantId]',
                                                        query: { hostId: response?.id, participantId: id },
                                                    }}
                                                >
                                                    View assigned buddy
                                                </Link></td>
                                                <td><Button
                                                    variant='secondary'
                                                    type="button"
                                                    onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${response?.id}/participant/${id}`) }}
                                                >
                                                    Copy!
                                                </Button></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </>
        </Layout>
    )
};

export default ViewParticipantsList;
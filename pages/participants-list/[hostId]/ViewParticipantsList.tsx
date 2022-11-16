import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
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
    const firstRender = useRef(true);

    useEffect(() => {
        if (hostId && firstRender.current) {
            invoke({ method: Method.GET, route: Routes.getParticipantsList + `?hostId=${hostId}` });
            firstRender.current = false;
        }
    }, [hostId, invoke]);

    return (
        <Layout>
            <>
                <h2 className={styles['capitalized-name']}>Hi {response?.hostName}</h2>
                <p>Here&apos;s the list of the participants of your next event!</p>
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
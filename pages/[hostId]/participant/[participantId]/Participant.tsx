import { useRouter } from "next/router";
import { FC, useEffect, useRef } from "react";
import { Layout } from "../../../../components";
import { Routes } from "../../../../constants/routes";
import useHttpRequest from "../../../../hooks/useHttpRequest";
import styles from "../../../../styles/_Participant.module.css";

const Participant: FC = () => {

    const firstRender = useRef(true);
    const { invoke, response } = useHttpRequest();
    const router = useRouter();
    const { hostId, participantId } = router.query

    useEffect(() => {
        if (hostId && participantId && firstRender.current) {
            invoke({ method: 'GET', route: Routes.getParticipant + `?hostId=${hostId}&participantId=${participantId}` });
            firstRender.current = false;
        }
    }, [hostId, participantId, invoke]);

    return (
        <Layout>
            <>
                <h2>Tu amigo de regalo asignado</h2>
                <p>Hola <span className={styles['capitalized-name']}>{response?.participantName}</span></p>
                <p>Se te ha asignado como Secret Santa para entregar un regalo a:</p>
                <div>
                    <span className={styles['assignee-background']}>{response?.assignedBuddy}</span>
                </div>
                {
                    response?.message && (
                        <div className="mt-3">
                            <h5>Message from host</h5>
                            <div className="py-2 px-2 border rounded">
                                <p>{response?.message}</p>
                            </div>
                        </div>
                    )
                }
            </>
        </Layout>
    )
};

export default Participant;
import createError from 'http-errors';
import db from '../../db';
import { Participant } from '../../interfaces/ParticipantsForm';

interface GetParticipantRequest {
    query: {
        hostId: string;
        participantId: string;
    }
}

export default async (req: GetParticipantRequest, res: any) => {
    const { hostId, participantId } = req.query;

    const params = {
        TableName: process.env.EVENTS_TABLE_NAME,
        IndexName: 'id-index',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': hostId,
        }
    };

    let eventInfo;

    try {
        const result = await db.query(params as any).promise();
        const { participants, location, date, message } = (result.Items as any)[0];
        const { assignee, name } = participants.find((participant: Participant) => participant.id === participantId);
        const { name: assignedBuddy } = participants.find(({ id }: Participant) => id === assignee);
        eventInfo = { participantName: name, location, date, message, assignedBuddy };

    } catch (error: any) {
        throw new createError.InternalServerError(error);
    }

    res.json({
        ...eventInfo
    });
}
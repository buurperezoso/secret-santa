import createError from 'http-errors';
import db from '../../db';

interface GetParticipantsListRequest {
    query: {
        hostId: string;
    }
}

export default async (req: GetParticipantsListRequest, res: any) => {
    const hostId = req.query.hostId;

    const params = {
        TableName: process.env.EVENTS_TABLE_NAME,
        IndexName: 'id-index',
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: {
            ':id': hostId,
        }
    };

    let participants;

    try {
        const result = await db.query(params as any).promise();
        participants = result.Items;
    } catch (error: any) {
        throw new createError.InternalServerError(error);
    }

    res.json((participants as any)[0]);
}
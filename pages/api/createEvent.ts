import createError from 'http-errors';
import { nanoid } from 'nanoid';
import db from '../../db';
import { EventForm } from '../../interfaces/EventForm';
import { Participant } from '../../interfaces/ParticipantsForm';

interface CreateEventRequest {
  body: EventForm
}

const buddyAssigner = (array: Participant[]): Participant[] => {
  let indexArr: number[] = [];
  for (let i = 0; i < array.length; i++) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const isExcluded = indexArr.filter(index => index != i).includes(randomIndex);
    if (randomIndex != i && !isExcluded) {
      const randomParticipant = { ...array[randomIndex] };
      array[i].assignee = randomParticipant.id;
      indexArr.push(randomIndex);
    } else {
      i = i - 1;
    }
  }
  return array;
}

export default async (req: CreateEventRequest, res: any) => {
  const participantsArray = [
    ...req.body.participants,
    {
      id: nanoid(),
      name: req.body.hostName,
      email: req.body.hostEmail,
      assignee: ''
    }
  ];
  const assignedBudyArray = buddyAssigner(participantsArray);

  try {
    await db.put({
      TableName: process.env.EVENTS_TABLE_NAME as any,
      Item: {
        ...req.body,
        participants: assignedBudyArray
      },
    }).promise();


  } catch (error: any) {
    throw new createError.InternalServerError(error);
  }

  res.json({ eventId: req.body.id });
}

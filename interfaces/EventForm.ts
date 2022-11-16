import { HostForm } from "./HostForm";
import { Participant } from "./ParticipantsForm";

export interface EventForm extends HostForm {
    id: string;
    date: string;
    location: string;
    amount: string;
    participants: Participant[],
    message: string;
}
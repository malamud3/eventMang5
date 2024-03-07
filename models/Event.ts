import User from "./User";

type EventF = {
    id: string;
    name: string;
    type: EventType;
    dateTime: Date;
    location: string;
    description: string;
    invited: (Record<string, string> )[] | null;
}

export default EventF;


export enum EventStatus {
    APPROVED = 'approved',
    DECLINED = 'declined',
    WAITING = 'not_accepted'
}

// Enum for event types
export enum EventType {
    GirlsOnly   =   "GirlsOnly",
    BoysOnly    =   "BoysOnly",
    Poker       =   "Poker",
    Sea         =   "Sea",
    BBQ         =   "BBQ"
}



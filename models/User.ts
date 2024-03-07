import EventF from "./Event";

type User = {
    userEmail: string;
    userName: string;
    events?: EventF[];
    friends?: string[]; // Assuming friends are stored as user IDs
}
export default User;
